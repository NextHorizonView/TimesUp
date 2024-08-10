import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { getRandomMessage } from './messages';

export async function cancelNotification(id) {
    console.log(id);
    await notifee.cancelNotification(id);
}

export async function sendCongratulatoryMessage() {
    const timeStamp = new Date().getTime() + 6000
    const message = getRandomMessage();
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: timeStamp,
    };
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
    await notifee.createTriggerNotification(
        {
            id: `timeStamp`,
            title: 'Tasks Completed!',
            body: message,
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger,
    );
}


export async function scheduleEventNotification(notificationId, eventName, eventDate) {
    await notifee.requestPermission();
    const eventDateObj = new Date(eventDate);
    eventDateObj.setHours(0, 0, 0, 0); // Normalize the date

    // Calculate the trigger date (one day before the event)
    const triggerDate = new Date(eventDateObj);
    triggerDate.setDate(triggerDate.getDate() - 1);

    // If the event is less than one day away, notify instantaneously
    if (triggerDate < new Date()) {
        triggerDate.setTime(Date.now() + 30000);
    }

    console.log(triggerDate);
    // Create a timestamp trigger
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
    };
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Schedule the notification
    await notifee.createTriggerNotification(
        {
            id: notificationId,
            title: 'Reminder!',
            body: `Event ${eventName} is tomorrow!`,
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger,
    );

    console.log(`Notification scheduled with ID: ${notificationId}`);
}

export const updateEventNotification = (id, eventName, eventDate) => {
    const eventDateObj = new Date(eventDate);
    eventDateObj.setHours(0, 0, 0, 0); // Normalize the date

    // Calculate the trigger date (one day before the event)
    const triggerDate = new Date(eventDateObj);
    triggerDate.setDate(triggerDate.getDate() - 1);

    // If the event is less than one day away, notify instantaneously
    if (triggerDate < new Date()) {
        triggerDate.setTime(Date.now() + 30000);
    }

    // Create a timestamp trigger
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
    };

    // Schedule the notification
    notifee.createTriggerNotification(
        {
            id: `${id}`,
            title: 'Reminder!',
            body: `Event ${eventName} is tomorrow!`,
            android: {
                channelId: 'default',
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger,
    );

    console.log(`Notification updated with ID: ${id}`);
}


export async function scheduleTaskNotification(notificationId, body, taskDate) {
    console.log(notificationId);
    await notifee.requestPermission();
    const taskDateObj = new Date(taskDate);
    taskDateObj.setHours(0, 0, 0, 0); // Normalize the date

    // Calculate the trigger date (one day before the event)
    const triggerDate = new Date(taskDateObj);
    triggerDate.setMinutes(triggerDate.getMinutes() - 5);

    // If the event is less than one day away, notify instantaneously
    if (triggerDate < new Date()) {
        triggerDate.setTime(Date.now() + 30000);
    }

    console.log(triggerDate);
    // Create a timestamp trigger
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
    };
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Schedule the notification
    await notifee.createTriggerNotification(
        {
            id: notificationId,
            title: 'Reminder!',
            body: body,
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger,
    );

    console.log(`Notification scheduled with ID: ${notificationId}`);
}

export const updateTaskNotification = (id, body, taskDate) => {
    const taskDateObj = new Date(taskDate);
    taskDateObj.setHours(0, 0, 0, 0); // Normalize the date

    // Calculate the trigger date (one day before the event)
    const triggerDate = new Date(taskDateObj);
    triggerDate.setMinutes(triggerDate.getMinutes() - 5);

    // If the event is less than one day away, notify instantaneously
    if (triggerDate < new Date()) {
        triggerDate.setTime(Date.now() + 30000);
    }

    // Create a timestamp trigger
    const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
    };

    // Schedule the notification
    notifee.createTriggerNotification(
        {
            id: id,
            title: 'Reminder!',
            body: body,
            android: {
                channelId: 'default',
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger,
    );

    console.log(`Notification updated with ID: ${id}`);
}

export const scheduleNotification = async (id, name, startDate) => {
    
}
