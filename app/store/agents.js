const moment = require('moment')

const Agents = () => {
  const obj = {}
  obj.agents = []

  obj.addAgent = (os, ip, profile, interval) => {
    const agent = {}
    agent.id = obj.agents.length + 1
    agent.os = os
    agent.ip = ip
    agent.profile = profile
    agent.interval = parseInterval(interval)
    agent.last_beacon_date = new Date(Date.now()).toLocaleString()
    agent.status = true
    obj.agents.push(agent)
    return agent.id
  }

  obj.getAgentById = (agentId) => {
    const agent = obj.agents.find(a => a.id === agentId)
    if (!agent) {
      return null
    } else {
      const lbd = moment(agent.last_beacon_date)
      const diff = (lbd.diff(moment(), 'second') * -1)
      if (diff > agent.interval) {
        agent.status = false
      }
      return agent
    }
  }

  obj.updateAgentBeaconTime = (agentId) => {
    obj.agents.forEach(a => {
      if (a.id === agentId) {
        a.last_beacon_date = new Date(Date.now()).toLocaleString()
        return true
      }
    })
    return false
  }

  obj.updateAgentStatus = (agentId) => {
    obj.agents.forEach(a => {
      if (a.id === agentId) {
        a.status = !a.status
        return true
      }
    })
    return false
  }

  obj.deleteAgentById = (agentId) => {
    const index = obj.agents.findIndex(agent => agent.id === agentId)
    if (index !== -1) {
      obj.agents.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  obj.getAllAgents = () => {
    obj.agents.forEach(agent => {
      const lbd = moment(agent.last_beacon_date)
      const diff = (lbd.diff(moment(), 'second') * -1)
      if (diff > agent.interval) {
        agent.status = false
      }
    })
    return obj.agents
  }

  return obj
}

module.exports = Agents