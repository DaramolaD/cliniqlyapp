import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Bell } from "lucide-react";

interface NotificationData {
  appointmentReminders: boolean;
  testResults: boolean;
  billingUpdates: boolean;
  healthTips: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface NotificationSettingsProps {
  notifications: NotificationData;
  onChange: (notifications: NotificationData) => void;
}

export function NotificationSettings({ notifications, onChange }: NotificationSettingsProps) {
  return (
    <Card className="health-card border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="w-5 h-5 mr-2 text-primary" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="appointment-reminders"
              checked={notifications.appointmentReminders}
              onChange={(e) => onChange({ ...notifications, appointmentReminders: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="appointment-reminders">Appointment Reminders</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="test-results"
              checked={notifications.testResults}
              onChange={(e) => onChange({ ...notifications, testResults: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="test-results">Test Results</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="billing-updates"
              checked={notifications.billingUpdates}
              onChange={(e) => onChange({ ...notifications, billingUpdates: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="billing-updates">Billing Updates</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="health-tips"
              checked={notifications.healthTips}
              onChange={(e) => onChange({ ...notifications, healthTips: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="health-tips">Health Tips</Label>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Notification Channels</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="email-notifications"
                checked={notifications.emailNotifications}
                onChange={(e) => onChange({ ...notifications, emailNotifications: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sms-notifications"
                checked={notifications.smsNotifications}
                onChange={(e) => onChange({ ...notifications, smsNotifications: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 