"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Settings, Save, AlertTriangle, Shield, Bell, CreditCard, Calendar, Building } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    clinicName: "City Medical Center",
    address: "123 Healthcare Ave, Suite 100\nSan Francisco, CA 94102",
    phone: "+1 (555) 123-4567",
    email: "info@citymedical.com",
    timezone: "America/Los_Angeles"
  });

  const [appointmentSettings, setAppointmentSettings] = useState({
    defaultDuration: "30",
    bookingWindow: "30",
    allowOnlineBooking: true,
    requireConfirmation: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    reminderTime: "24"
  });

  const [billingSettings, setBillingSettings] = useState({
    currency: "USD",
    taxRate: "8.5",
    autoGenerateInvoices: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSaveSettings = async (section: string) => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${section} settings...`);
      // Here you would make actual API calls to save settings
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    // Here you would make an API call to delete the account
    console.log('Deleting account...');
    setIsDeleteModalOpen(false);
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Here you would make an API call to change password
    console.log('Changing password...');
    setIsPasswordModalOpen(false);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="mb-8">
        <div className="flex items-center">
          <Settings className="w-8 h-8 mr-3 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your clinic settings and preferences.
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 health-card border-0">
          <TabsTrigger value="general" className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2 text-primary" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="clinic-name">Clinic Name</Label>
                <Input
                  type="text"
                  id="clinic-name"
                  value={generalSettings.clinicName}
                  onChange={(e) => setGeneralSettings({...generalSettings, clinicName: e.target.value})}
                  className="health-card border-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-address">Address</Label>
                <Textarea
                  id="clinic-address"
                  rows={3}
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                  className="health-card border-0"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="clinic-phone"
                    value={generalSettings.phone}
                    onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
                    className="health-card border-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clinic-email">Email</Label>
                  <Input
                    type="email"
                    id="clinic-email"
                    value={generalSettings.email}
                    onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                    className="health-card border-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({...generalSettings, timezone: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button 
                  onClick={() => handleSaveSettings('general')}
                  disabled={isSaving}
                  className="health-btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setGeneralSettings({
                    clinicName: "City Medical Center",
                    address: "123 Healthcare Ave, Suite 100\nSan Francisco, CA 94102",
                    phone: "+1 (555) 123-4567",
                    email: "info@citymedical.com",
                    timezone: "America/Los_Angeles"
                  })}
                  className="health-btn-secondary"
                >
                  Reset to Default
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Appointment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="appointment-duration">Default Appointment Duration</Label>
                <Select value={appointmentSettings.defaultDuration} onValueChange={(value) => setAppointmentSettings({...appointmentSettings, defaultDuration: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-window">Booking Window (days in advance)</Label>
                <Input
                  type="number"
                  id="booking-window"
                  value={appointmentSettings.bookingWindow}
                  onChange={(e) => setAppointmentSettings({...appointmentSettings, bookingWindow: e.target.value})}
                  min="1"
                  max="365"
                  className="health-card border-0"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Allow Online Booking</Label>
                  <p className="text-sm text-muted-foreground">Enable patients to book appointments online</p>
                </div>
                <Checkbox 
                  id="online-booking" 
                  checked={appointmentSettings.allowOnlineBooking}
                  onCheckedChange={(checked) => setAppointmentSettings({...appointmentSettings, allowOnlineBooking: checked as boolean})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Require Confirmation</Label>
                  <p className="text-sm text-muted-foreground">Manually confirm all appointments</p>
                </div>
                <Checkbox 
                  id="require-confirmation" 
                  checked={appointmentSettings.requireConfirmation}
                  onCheckedChange={(checked) => setAppointmentSettings({...appointmentSettings, requireConfirmation: checked as boolean})}
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button 
                  onClick={() => handleSaveSettings('appointments')}
                  disabled={isSaving}
                  className="health-btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2 text-primary" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Checkbox 
                  id="email-notifications" 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked as boolean})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Checkbox 
                  id="sms-notifications" 
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked as boolean})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Appointment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send reminders to patients</p>
                </div>
                <Checkbox 
                  id="appointment-reminders" 
                  checked={notificationSettings.appointmentReminders}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, appointmentReminders: checked as boolean})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reminder-time">Reminder Time (hours before appointment)</Label>
                <Input
                  type="number"
                  id="reminder-time"
                  value={notificationSettings.reminderTime}
                  onChange={(e) => setNotificationSettings({...notificationSettings, reminderTime: e.target.value})}
                  min="1"
                  max="168"
                  className="health-card border-0"
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button 
                  onClick={() => handleSaveSettings('notifications')}
                  disabled={isSaving}
                  className="health-btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-primary" />
                Billing Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={billingSettings.currency} onValueChange={(value) => setBillingSettings({...billingSettings, currency: value})}>
                  <SelectTrigger className="health-card border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                    <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  type="number"
                  id="tax-rate"
                  value={billingSettings.taxRate}
                  onChange={(e) => setBillingSettings({...billingSettings, taxRate: e.target.value})}
                  step="0.1"
                  min="0"
                  max="100"
                  className="health-card border-0"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto-generate Invoices</Label>
                  <p className="text-sm text-muted-foreground">Automatically create invoices for appointments</p>
                </div>
                <Checkbox 
                  id="auto-invoices" 
                  checked={billingSettings.autoGenerateInvoices}
                  onCheckedChange={(checked) => setBillingSettings({...billingSettings, autoGenerateInvoices: checked as boolean})}
                />
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button 
                  onClick={() => handleSaveSettings('billing')}
                  disabled={isSaving}
                  className="health-btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="health-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-primary" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Checkbox 
                  id="2fa" 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked as boolean})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  id="session-timeout"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: e.target.value})}
                  min="5"
                  max="480"
                  className="health-card border-0"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Login Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                </div>
                <Checkbox 
                  id="login-notifications" 
                  checked={securitySettings.loginNotifications}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, loginNotifications: checked as boolean})}
                />
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-4">Change Password</h4>
                <Button 
                  variant="outline" 
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="health-btn-secondary"
                >
                  Change Password
                </Button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button 
                  onClick={() => handleSaveSettings('security')}
                  disabled={isSaving}
                  className="health-btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="health-btn-destructive"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Account Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="health-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
              Delete Account
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="health-btn-secondary"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteAccount}
              className="health-btn-destructive"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="health-card border-0">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              Change Password
            </DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new password.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                type="password"
                id="current-password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                className="health-card border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                type="password"
                id="new-password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                className="health-card border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                type="password"
                id="confirm-password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                className="health-card border-0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsPasswordModalOpen(false)}
              className="health-btn-secondary"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleChangePassword}
              disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
              className="health-btn-primary"
            >
              <Shield className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 