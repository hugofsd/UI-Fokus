import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor( @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  requestPermission(): Promise<NotificationPermission> {
    if (this.notificationSupported){
      return Promise.reject('Notification not supported');
    }
    return Notification.requestPermission();
  }

  showNotification(title: string, options?: NotificationOptions):
  void {
    if(!this.notificationSupported){
      console.warn("Notification not supported");
      return;
    }
    if(window.Notification.permission === 'granted'){
      new window.Notification(title, options);
      return;
    }
  }

  // confirmar se o navegador da suporte a notificações
  private get notificationSupported(): boolean {
    return isPlatformBrowser(this.platformId) && 'Notification' in window;
  }

}
