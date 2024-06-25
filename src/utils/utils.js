import { format } from "date-fns";

export function getDateDetails(date, categories) {
    const categoryDetails = [];
    for (let i = 0; i < categories.categoriesList.length; i++) {
        const detail = {};
        const category = categories.categoriesList[i];
        if (categories[category]) {
            const tasks = categories[category]["tasks"];
            if (tasks[date]) {
                detail.name = category;
                let numOfTaskLeft = 0;
                for (let j = 0; j < tasks[date].length; j++) {
                    if (tasks[date][j]["isCompleted"] === false) {
                        numOfTaskLeft++;
                        detail.description = tasks[date][j]["name"];
                        if (!detail.nextTime) {
                            detail.startTime = new Date(tasks[date][j]["startDate"]);
                            detail.endTime = new Date(tasks[date][j]["endDate"]);

                        }
                    }
                }
                detail.numOfTaskLeft = numOfTaskLeft;
                detail.numOfTaskCompleted = tasks[date].length - numOfTaskLeft;
            }
        }
        if (Object.keys(detail).length != 0) {
            categoryDetails.push(detail);
        }
    }
    return categoryDetails;
}

function isToday(date) {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();
}

function isPastDateTime(passedDateTime) {
    const currentDateTime = new Date();
    // console.log(passedDateTime < currentDateTime);
    return passedDateTime < currentDateTime;
}

export const getTodaysTask = (categories) => {
    return new Promise((resolve) => {
        const categoriesList = categories.categoriesList;
        const tasks = [];
        for (let i = 0; i < categoriesList.length; i++) {
            const category = categoriesList[i];
            if (categories[category].pendingTasks.length > 0) {
                const pendingTasks = categories[category].pendingTasks;
                for (let j = 0; j < pendingTasks.length; j++) {
                    const startTime = new Date(pendingTasks[j]["startDate"]);
                    if (isToday(startTime)) {
                        tasks.push({
                            name: pendingTasks[j]["name"],
                            category,
                            priority: categories[category].priority,
                            startTime: new Date(pendingTasks[j]["startDate"]),
                            isDue: isPastDateTime(new Date(pendingTasks[j]["endDate"])),
                            due: pendingTasks[j]["endDate"]
                        });
                    }
                }
            }
        }
        resolve(tasks);
    });
};


export function completeTask(categories, category, startDate) {
    const formattedDate = format(startDate, "MMMM d, yyyy");
    const taskIndex = categories[category]["tasks"][formattedDate].findIndex(task => task["startDate"] == startDate);
    const taskList = categories[category]["tasks"][formattedDate];
    const pendingList = categories[category]["pendingTasks"];
    if (taskList[taskIndex]["isCompleted"] == false) {
        taskList[taskIndex]["isCompleted"] = true;
        pendingList.filter(task => task["startDate"] != startDate);
    } else {
        taskList[taskIndex]["isCompleted"] = false;
        pendingList.push(taskList[taskIndex]);
    }

}

