"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Lock, 
  Bell, 
  Shield,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  Palette
} from "lucide-react";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { DisplaySettings } from "@/components/settings/DisplaySettings";

interface SettingsData {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    emergencyContact: string;
    medicalHistory: string;
  };
  account: {
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  notifications: {
    appointmentReminders: boolean;
    testResults: boolean;
    billingUpdates: boolean;
    healthTips: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
  };
  privacy: {
    shareDataWithProviders: boolean;
    allowMarketingEmails: boolean;
    showOnlineStatus: boolean;
  };
  display: {
    theme: string;
    language: string;
    timezone: string;
  };
}

export default function ClientSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [settings, setSettings] = useState<SettingsData>({
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1990-01-15",
      address: "123 Main Street, New York, NY 10001",
      emergencyContact: "+1 (555) 987-6543",
      medicalHistory: "No known allergies. Previous surgeries: None."
    },
    account: {
      email: "john.doe@example.com",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    notifications: {
      appointmentReminders: true,
      testResults: true,
      billingUpdates: true,
      healthTips: false,
      emailNotifications: true,
      smsNotifications: false
    },
    privacy: {
      shareDataWithProviders: true,
      allowMarketingEmails: false,
      showOnlineStatus: true
    },
    display: {
      theme: "light",
      language: "English",
      timezone: "America/New_York"
    }
  });

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Patient"
  };

  const handleSaveSettings = () => {
    console.log('Saving settings...');
    // Here you would typically make an API call to save settings
  };

  const handleChangePassword = () => {
    if (settings.account.newPassword !== settings.account.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    console.log('Changing password...');
    setIsChangePasswordModalOpen(false);
    setSettings({
      ...settings,
      account: {
        ...settings.account,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    });
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
    setIsDeleteAccountModalOpen(false);
  };

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your account settings and preferences.
            </p>
          </div>
          <Button onClick={handleSaveSettings} className="health-btn-primary">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Display</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <ProfileSettings
              profile={settings.profile}
              onChange={(profile) => setSettings({ ...settings, profile })}
            />
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <AccountSettings
              account={settings.account}
              onChange={(account) => setSettings({ ...settings, account })}
              onChangePassword={handleChangePassword}
              onDeleteAccount={handleDeleteAccount}
              onOpenChangePassword={() => setIsChangePasswordModalOpen(true)}
              onOpenDeleteAccount={() => setIsDeleteAccountModalOpen(true)}
            />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings
              notifications={settings.notifications}
              onChange={(notifications) => setSettings({ ...settings, notifications })}
            />
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <PrivacySettings
              privacy={settings.privacy}
              onChange={(privacy) => setSettings({ ...settings, privacy })}
            />
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display" className="space-y-6">
            <DisplaySettings
              display={settings.display}
              onChange={(display) => setSettings({ ...settings, display })}
            />
          </TabsContent>
        </Tabs>

        {/* Change Password Modal */}
        <Dialog open={isChangePasswordModalOpen} onOpenChange={setIsChangePasswordModalOpen}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={settings.account.currentPassword}
                    onChange={(e) => setSettings({
                      ...settings,
                      account: {...settings.account, currentPassword: e.target.value}
                    })}
                    className="health-card border-0 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={settings.account.newPassword}
                    onChange={(e) => setSettings({
                      ...settings,
                      account: {...settings.account, newPassword: e.target.value}
                    })}
                    className="health-card border-0 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={settings.account.confirmPassword}
                    onChange={(e) => setSettings({
                      ...settings,
                      account: {...settings.account, confirmPassword: e.target.value}
                    })}
                    className="health-card border-0 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsChangePasswordModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleChangePassword}
                className="health-btn-primary"
              >
                Change Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Account Modal */}
        <Dialog open={isDeleteAccountModalOpen} onOpenChange={setIsDeleteAccountModalOpen}>
          <DialogContent className="health-card border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
                Delete Account
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
              </p>
              <div className="p-4 bg-destructive/10 rounded-lg">
                <p className="text-sm text-destructive">
                  <strong>Warning:</strong> This will delete all your medical records, appointments, and account information.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteAccountModalOpen(false)}
                className="health-btn-secondary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDeleteAccount}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
} 