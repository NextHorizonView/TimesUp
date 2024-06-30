import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';
import { getRandomMessage } from './messages';

export async function sendTaskReminder(startDate, title) {
    await notifee.requestPermission()
    const notificationTime = new Date(new Date(startDate).getTime() - 5 * 60000);
    console.log('0', notificationTime);
    if (notificationTime <= new Date()) return;
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
                largeIcon: require('../assets/profile.png'),
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger,
    );
}

export const cancelNotification = async (id) => {
    await notifee.cancelNotification(`${id}`);
}

export const sendCongratulatoryMessage = async () => {
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
