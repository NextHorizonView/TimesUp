import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { getRandomMessage } from './messages';

export async function sendTaskReminder(startDate, title) {
    await notifee.requestPermission();

    const notificationTime = new Date(new Date(startDate).getTime() - 5 * 60000);
    const oneDayBeforeTime = new Date(new Date(startDate).getTime() - 24 * 60 * 60000);

    // Send notification 5 minutes before the start date
    if (notificationTime > new Date()) {
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: notificationTime.getTime(),
        };

        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.createTriggerNotification(
            {
                id: `${startDate.getTime()}`,
                title: title,
                body: `Today at ${startDate.getHours()}:${startDate.getMinutes()}`,
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

    // Send notification one day before the start date
    if (oneDayBeforeTime > new Date()) {
        const triggerOneDayBefore = {
            type: TriggerType.TIMESTAMP,
            timestamp: oneDayBeforeTime.getTime(),
        };

        const channelIdOneDayBefore = await notifee.createChannel({
            id: 'default-one-day-before',
            name: 'One Day Before Channel',
        });

        await notifee.createTriggerNotification(
            {
                id: `${startDate.getTime()}-one-day-before`,
                title: title,
                body: `Tomorrow at ${startDate.getHours()}:${startDate.getMinutes()}`,
                android: {
                    channelId: channelIdOneDayBefore,
                    pressAction: {
                        id: 'default',
                    },
                },
            },
            triggerOneDayBefore,
        );
    }
}

export async function cancelNotification(id) {
    await notifee.cancelNotification(`${id}`);
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
            id: `timeStamp`,
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
