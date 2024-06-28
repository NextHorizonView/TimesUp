import notifee from '@notifee/react-native';

export async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: 'Hi',
        body: 'How are you?',
        android: {
            channelId,
            largeIcon: require('../assets/profile.png'),
            pressAction: {
                id: 'default',
            },
        },
    });
}
