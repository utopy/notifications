import Notification, { NotificationParams } from './notification'

class Notifications{

  private list: Notification[] = []
  private target: HTMLElement = null as any as HTMLElement;

  public setTarget(target:HTMLElement | string | null){
    
    if(!target) return

    if(typeof target === "string"){

      this.setTarget(target)

      return

    }
    
    this.target = target

    this.target.classList.add("un-wrapper")

    return
    
  }

  public create(params:NotificationParams){
    
    const notification = new Notification(params, this.target)

    this.list.push(notification)

    return notification
    
  }


  public test(notification: Notification){

    this.target.appendChild(notification.component)
       
  }
  
}

export default new Notifications()