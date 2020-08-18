const Tasks = () => {
  const obj = {}
  obj.tasks = []

  obj.addTask = (command, agentId) => {
    const task = {}
    task.agentId = agentId
    task.command = command
    task.id = obj.tasks.length + 1
    task.tasked_date = new Date(Date.now()).toLocaleString()
    task.complete_date = ''
    task.response = ''
    obj.tasks.push(task)
    return task.id
  }

  obj.getTaskById = (taskId) => {
    const task = obj.tasks.find(t => t.id = taskId)
    return task
      ? task
      : null
  }

  obj.getNextTaskForAgent = (agentId) => {
    const task = obj.tasks.find(t => t.agentId === agentId && t.response === '')
    return task
      ? task
      : null
  }

  obj.updateTaskById = (taskId, response) => {
    obj.tasks.forEach(t => {
      if (t.id === taskId) {
        t.response = response
        t.complete_date = new Date(Date.now()).toLocaleString()
      }
    })
  }

  obj.getAllTasksForAgent = (agentId) => {
    const tasks = objs.tasks.filter(t => t.agentId === agentId)
    return tasks.length !== 0 
      ? tasks
      : null
  }

  obj.getAllTasks = () => obj.tasks

  return obj
}

module.exports = Tasks