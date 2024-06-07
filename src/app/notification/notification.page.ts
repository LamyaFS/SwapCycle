import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue,remove } from 'firebase/database';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications: any[] = [];
  constructor() {}

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications');
    onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.notifications = Object.values(data);
        this.notifications = this.notifications.filter(notification =>
          notification.message && notification.timestamp
        );
      }
    });
  }
  clearNotifications() {
    const db = getDatabase();
    const notificationsRef = ref(db, 'notifications');
    remove(notificationsRef).then(() => {
      this.notifications = []; // Clear the notifications array after removing data
    }).catch((error) => {
      console.error("Error removing notifications: ", error);
    });
  }
}
