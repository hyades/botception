var rules = [
    {
        "type": "root",
        "command": ["create-bot"],
        "param": ["name", "description"],
        "description": "Create a new bot"
    },
    {
        "type": "root",
        "command": ["my-bots"],
        "description": "get a list of your bots"
    },
    {
        "type": "root",
        "command": ["help", "bot"],
        "description": "get functionalities that can be added to a bot"
    },
    {
        "type": "root",
        "command": ["help", "step"],
        "description": "learn how to create atomic tasks that your bot can run"
    },
    {
        "type": "root",
        "command": ["help", "task"],
        "description": "learn how to create a task sub tasks"
    },
    {
        "type": "bot",
        "command": ["add"],
        "param": ["info"],
        "description": "add a data value to a bot"
    },
    {
        "type": "bot",
        "command": ["delete"],
        "param": ["id"],
        "description": "delete a data value from a bot"
    },
    {
        "type": "bot",
        "command": ["get"],
        "param": ["id"],
        "description": "get a data value from a bot"
    },
    {
        "type": "bot",
        "command": ["get-all"],
        "param": ["id"],
        "description": "get all data values of a bot"
    },
    {
        "type": "bot",
        "commamd": ["search"],
        "param": ["regex"],
        "description": "enter a regex for searching data values of a bot"
    },
    {
        "type": "step",
        "commamd": ["create-step"],
        "param": ["db-query"],
        "description": "create an atomic task that can be combined with other tasks"
    },
    {
        "type": "task",
        "command": ["create-task"],
        "param": ["name"],
        "description": "create a task to be executed"
    },
    {
        "type": "task",
        "command": ["pipe"],
        "param": ["task", "list of steps"],
        "description": "create a task as a seriers of steps"
    },
    {
        "type": "task",
        "command": ["repeat"],
        "param": ["task", "time_of_first_occurrence", "interval"],
        "description": "repeat task on regular interval of time"
    }
];

module.exports = rules;