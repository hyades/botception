var rules = [
    {
        "type": "root",
        "command": ["create-bot"],
        "param": ["name"],
        "description": "Create a new bot"
    },
    {
        "type": "root",
        "command": ["bots"],
        "descritption": "get a list of your bots"
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
    }
];

module.exports = rules;