# Redirector

## API Routes

### Agents

```json
GET /api/agents

RESPONSE 200 (No Agents)
[]
RESPONSE 200 (Agents)
[
  {
    "id": 1,
    "os": "windows",
    "ip": "192.168.1.10",
    "profile: "g1",
    ...
  },
  ...
]
```

```json
GET /api/agents/:agentId

RESPONSE 200
{
  "id": 1,
  "os": "windows",
  "ip": "192.168.1.10",
  "profile: "g1",
}
RESPONSE 404 (Invalid Agent)
{
  "message": "agent does not exist"
}
```

```json
PUT /api/agents/:agentId/status

RESPONSE 200
```

```json
GET /api/agents/:agentId/tasks

RESPONSE 200 (No Tasks)
[]
RESPONSE 200 (Tasks)
[
  {
    "id" 1,
    "agentId": 1,
    "command": "Z2V0LWhvc3Q=".
    ...
  },
  ...
]
RESPONSE 404 (Invalid Agent)
{
  "message": "agent does not exist"
}
```

### Tasks

```json
POST /api/tasks
{
  "command": "Z2V0LWhvc3Q=",
  "agentId": 1
}

RESPONSE 200
{
  "taskId": 1,
  "agentId: 1
}
```

```json
GET /api/tasks

RESPONSE 200 (No Tasks)
[]
RESPONSE 200 (Tasks)
[
  {
    "id" 1,
    "agentId": 1,
    "command": "Z2V0LWhvc3Q=".
    ...
  },
  ...
]
```

```json
GET /api/tasks/:taskId

RESPONSE 200
{
  "id" 1,
  "agentId": 1,
  "command": "Z2V0LWhvc3Q=".
  ...
}
RESPONSE (Invalid Task)
{
  "message": "task does not exist"
}
```
