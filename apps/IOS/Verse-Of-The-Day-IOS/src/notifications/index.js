import {
  PushNotificationIOS,
} from 'react-native';
import storage from './../storage';

async function notifications(settings) {
  const original = await storage.getJSON('notifications');

  function handleGetScheduledLocalNotifications(scheduledNotifications) {
    if (scheduledNotifications && scheduledNotifications.length) {
      // Cancel so they can be reset.
      PushNotificationIOS.cancelAllLocalNotifications();
    }

    if (settings.allowed) {
      // Add updated settings.
      PushNotificationIOS.scheduleLocalNotification({
        fireDate: settings.date.toISOString(),
        alertBody: 'It\'s time for your daily Bible verse!',
        repeatInterval: settings.interval,
      });
    }
  }

  function handleRequestPermissions(permissions) {
    if (permissions.alert) {
      PushNotificationIOS.getScheduledLocalNotifications(handleGetScheduledLocalNotifications);
    }
  }

  function checkPermissions(permissions) {
    if (!permissions.alert) {
      return PushNotificationIOS.requestPermissions({ alert: true, badge: true })
        .then(handleRequestPermissions)
        .catch(handleRequestPermissions);
    }
    return handleRequestPermissions(permissions);
  }

  function isValidNotification() {
    return Boolean(settings && settings.allowed && settings.date);
  }

  function isNotTheSame(old) {
    return Boolean(!old || (old.allowed !== settings.allowed || old.date !== settings.allowed));
  }

  if (isValidNotification() && isNotTheSame(original)) {
    PushNotificationIOS.checkPermissions(checkPermissions);
    storage.setJSON('notifications', settings);
  }
}

export default notifications;
