import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export async function createTriggerNotification(startDate, title) {
    const notificationTime = new Date(new Date(startDate).getTime() - 5 * 60000);
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
