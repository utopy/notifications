import './style/style.css'
import Notifications from './notifications'
import {NotificationParams} from './notification'

(window as any).UNotifications = Notifications

const target = document.getElementById("target")

const params:NotificationParams= {
  
  title: "test",
  subtitle: "",
  type: "card",
  hasToggle: true,
  body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  `
  
}

const notification = Notifications.create(params)
const notification2 = Notifications.create({...params, type: "notification"})

console.log(Notifications)

Notifications.setTarget(target)
Notifications.test(notification)
Notifications.test(notification2)