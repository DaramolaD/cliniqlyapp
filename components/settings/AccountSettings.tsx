import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, AlertTriangle } from "lucide-react";

interface AccountData {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface AccountSettingsProps {
  account: AccountData;
  onChange: (account: AccountData) => void;
  onChangePassword: () => void;
  onDeleteAccount: () => void;
  onOpenChangePassword: () => void;
  onOpenDeleteAccount: () => void;
}

export function AccountSettings({ 
  account, 
  onChange, 
  onChangePassword, 
  onDeleteAccount,
  onOpenChangePassword,
  onOpenDeleteAccount 
}: AccountSettingsProps) {
  return (
    <Card className="health-card border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lock className="w-5 h-5 mr-2 text-primary" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="accountEmail">Email Address</Label>
          <Input
            id="accountEmail"
            type="email"
            value={account.email}
            onChange={(e) => onChange({ ...account, email: e.target.value })}
            className="health-card border-0"
          />
        </div>
        
        <div className="flex space-x-4">
          <Button 
            variant="outline"
            onClick={onOpenChangePassword}
            className="health-btn-secondary"
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
          <Button 
            variant="outline"
            onClick={onOpenDeleteAccount}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 