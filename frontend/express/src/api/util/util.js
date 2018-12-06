import { ToastAndroid } from 'react-native';

export function sendToast(message) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
    );
}