// Notification service for real-time updates and notifications
export interface Notification {
  id: string;
  type: 'appointment' | 'test_result' | 'billing' | 'system' | 'reminder';
  title: string;
  message: string;
  userId: string;
  userRole: 'client' | 'staff' | 'admin';
  appointmentId?: number;
  isRead: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
}

export interface NotificationTemplate {
  type: Notification['type'];
  title: string;
  message: string;
  priority: Notification['priority'];
}

// Notification templates for different events
export const notificationTemplates: Record<string, NotificationTemplate> = {
  // Appointment notifications
  'appointment_confirmed': {
    type: 'appointment',
    title: 'Appointment Confirmed',
    message: 'Your appointment has been confirmed. Please arrive 15 minutes early.',
    priority: 'medium'
  },
  'appointment_cancelled': {
    type: 'appointment',
    title: 'Appointment Cancelled',
    message: 'Your appointment has been cancelled. Please reschedule if needed.',
    priority: 'high'
  },
  'appointment_reminder': {
    type: 'reminder',
    title: 'Appointment Reminder',
    message: 'You have an appointment tomorrow. Please confirm your attendance.',
    priority: 'medium'
  },
  'appointment_rescheduled': {
    type: 'appointment',
    title: 'Appointment Rescheduled',
    message: 'Your appointment has been rescheduled. Check your calendar for details.',
    priority: 'high'
  },
  'appointment_assigned': {
    type: 'appointment',
    title: 'New Appointment Assigned',
    message: 'A new appointment has been assigned to you.',
    priority: 'medium'
  },
  'appointment_reassigned': {
    type: 'appointment',
    title: 'Appointment Reassigned',
    message: 'An appointment has been reassigned to you.',
    priority: 'medium'
  },

  // Test result notifications
  'test_result_ready': {
    type: 'test_result',
    title: 'Test Results Ready',
    message: 'Your test results are now available. Please review them.',
    priority: 'high'
  },
  'test_result_abnormal': {
    type: 'test_result',
    title: 'Test Results - Action Required',
    message: 'Your test results require immediate attention. Please contact your doctor.',
    priority: 'urgent'
  },

  // Billing notifications
  'payment_due': {
    type: 'billing',
    title: 'Payment Due',
    message: 'You have a payment due. Please complete payment to avoid service interruption.',
    priority: 'high'
  },
  'payment_received': {
    type: 'billing',
    title: 'Payment Received',
    message: 'Your payment has been received. Thank you.',
    priority: 'low'
  },
  'insurance_claim': {
    type: 'billing',
    title: 'Insurance Claim Processed',
    message: 'Your insurance claim has been processed. Check your account for details.',
    priority: 'medium'
  },

  // System notifications
  'system_maintenance': {
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight. Some services may be temporarily unavailable.',
    priority: 'medium'
  },
  'security_alert': {
    type: 'system',
    title: 'Security Alert',
    message: 'Unusual activity detected on your account. Please verify your login.',
    priority: 'urgent'
  }
};

// Notification service class
export class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  private constructor() {
    this.loadNotifications();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  // Load notifications from localStorage
  private loadNotifications(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        this.notifications = JSON.parse(stored);
      }
    }
  }

  // Save notifications to localStorage
  private saveNotifications(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }
  }

  // Subscribe to notification updates
  subscribe(listener: (notifications: Notification[]) => void): () => void {
    this.listeners.push(listener);
    listener(this.notifications);
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.notifications));
  }

  // Create a new notification
  createNotification(
    templateKey: string,
    userId: string,
    userRole: 'client' | 'staff' | 'admin',
    appointmentId?: number,
    actionUrl?: string
  ): Notification {
    const template = notificationTemplates[templateKey];
    if (!template) {
      throw new Error(`Notification template '${templateKey}' not found`);
    }

    const notification: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: template.type,
      title: template.title,
      message: template.message,
      userId,
      userRole,
      appointmentId,
      isRead: false,
      createdAt: new Date().toISOString(),
      priority: template.priority,
      actionUrl
    };

    this.notifications.unshift(notification);
    this.saveNotifications();
    this.notifyListeners();

    return notification;
  }

  // Get notifications for a user
  getNotifications(userId: string, userRole: 'client' | 'staff' | 'admin'): Notification[] {
    return this.notifications.filter(
      notif => notif.userId === userId && notif.userRole === userRole
    );
  }

  // Get unread notifications count
  getUnreadCount(userId: string, userRole: 'client' | 'staff' | 'admin'): number {
    return this.notifications.filter(
      notif => notif.userId === userId && notif.userRole === userRole && !notif.isRead
    ).length;
  }

  // Mark notification as read
  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      this.saveNotifications();
      this.notifyListeners();
    }
  }

  // Mark all notifications as read for a user
  markAllAsRead(userId: string, userRole: 'client' | 'staff' | 'admin'): void {
    this.notifications.forEach(notification => {
      if (notification.userId === userId && notification.userRole === userRole) {
        notification.isRead = true;
      }
    });
    this.saveNotifications();
    this.notifyListeners();
  }

  // Delete a notification
  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.saveNotifications();
    this.notifyListeners();
  }

  // Clear all notifications for a user
  clearNotifications(userId: string, userRole: 'client' | 'staff' | 'admin'): void {
    this.notifications = this.notifications.filter(
      notif => !(notif.userId === userId && notif.userRole === userRole)
    );
    this.saveNotifications();
    this.notifyListeners();
  }

  // Create appointment-related notifications
  createAppointmentNotification(
    event: 'confirmed' | 'cancelled' | 'reminder' | 'rescheduled' | 'assigned' | 'reassigned',
    userId: string,
    userRole: 'client' | 'staff' | 'admin',
    appointmentId: number,
    appointmentDate?: string
  ): Notification {
    const templateKey = `appointment_${event}`;
    let message = notificationTemplates[templateKey].message;
    
    if (appointmentDate && event === 'reminder') {
      message = `You have an appointment on ${new Date(appointmentDate).toLocaleDateString()}. Please confirm your attendance.`;
    }

    return this.createNotification(
      templateKey,
      userId,
      userRole,
      appointmentId,
      `/appointments/${appointmentId}`
    );
  }

  // Create test result notification
  createTestResultNotification(
    isAbnormal: boolean,
    userId: string,
    userRole: 'client' | 'staff' | 'admin',
    appointmentId?: number
  ): Notification {
    const templateKey = isAbnormal ? 'test_result_abnormal' : 'test_result_ready';
    return this.createNotification(
      templateKey,
      userId,
      userRole,
      appointmentId,
      isAbnormal ? '/health/results' : '/health/results'
    );
  }

  // Create billing notification
  createBillingNotification(
    event: 'payment_due' | 'payment_received' | 'insurance_claim',
    userId: string,
    userRole: 'client' | 'staff' | 'admin',
    amount?: number
  ): Notification {
    const templateKey = event;
    let message = notificationTemplates[templateKey].message;
    
    if (amount && event === 'payment_due') {
      message = `You have a payment of $${amount} due. Please complete payment to avoid service interruption.`;
    }

    return this.createNotification(
      templateKey,
      userId,
      userRole,
      undefined,
      '/billing'
    );
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();

// React hook for notifications (for use in components)
import { useState, useEffect, useCallback } from 'react';

export function useNotifications(userId: string, userRole: 'client' | 'staff' | 'admin') {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((allNotifications) => {
      const userNotifications = notificationService.getNotifications(userId, userRole);
      const unread = notificationService.getUnreadCount(userId, userRole);
      setNotifications(userNotifications);
      setUnreadCount(unread);
    });

    return unsubscribe;
  }, [userId, userRole]);

  const markAsRead = useCallback((notificationId: string) => {
    notificationService.markAsRead(notificationId);
  }, []);

  const markAllAsRead = useCallback(() => {
    notificationService.markAllAsRead(userId, userRole);
  }, [userId, userRole]);

  const deleteNotification = useCallback((notificationId: string) => {
    notificationService.deleteNotification(notificationId);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification
  };
} 