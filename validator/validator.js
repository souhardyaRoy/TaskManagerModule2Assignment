class Validator {
    static validateTasksInfo(tasksInfo) {
        if (
            tasksInfo.hasOwnProperty("id") &&
            tasksInfo.hasOwnProperty("title") && 
            tasksInfo.title.trim() !== "" && // Check if title is not empty or whitespace
            tasksInfo.hasOwnProperty("description") && 
            tasksInfo.description.trim() !== "" && // Check if description is not empty or whitespace
            tasksInfo.hasOwnProperty("completed") &&
            typeof tasksInfo.completed === "boolean" // Check if completed is a boolean
        ) {
            return {
                "status": true,
                "message": "task has been added"
            };
        } else {
            return {
                "status": false,
                "message": "task info is malformed, please provide all the parameters"
            };
        }
    }
}

module.exports = Validator;
