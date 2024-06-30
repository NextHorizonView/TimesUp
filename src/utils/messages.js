const completionMessages = [
    // Congratulatory Messages
    "Great job! You've completed all your tasks for today! 🎉",
    "Well done! You're on top of your game! Keep it up! 💪",
    "Fantastic work! You've achieved everything on your list! 🌟",

    // Encouraging Messages
    "You're amazing! All tasks completed. Time to relax! 😌",
    "You did it! Every task is done. Enjoy your free time! 🎈",
    "Way to go! You've nailed all your tasks for the day! 🏆",

    // Inspirational Messages
    "Success is the sum of small efforts. You've proven it today! 🌠",
    "Every task completed is a step towards your goals. Keep moving forward! 🚀",
    "Your hard work is paying off! All tasks completed. Keep shining! ✨",

    // Humorous Messages
    "To-do list: conquered! You’re a productivity ninja! 🥷",
    "You're a task-master! Everything done and dusted! 🧹",
    "Task list? What task list? You've crushed it! 🥳",

    // Personal Growth Messages
    "Every task you complete is progress. You're growing stronger every day! 🌱",
    "Completion feels great, doesn’t it? Keep pushing your limits! 🌟",
    "You've proven your dedication. Let's tackle tomorrow with the same energy! 💥"
];


export function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * completionMessages.length);
    return completionMessages[randomIndex];
}
