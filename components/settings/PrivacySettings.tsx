import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

interface PrivacyData {
  shareDataWithProviders: boolean;
  allowMarketingEmails: boolean;
  showOnlineStatus: boolean;
}

interface PrivacySettingsProps {
  privacy: PrivacyData;
  onChange: (privacy: PrivacyData) => void;
}

export function PrivacySettings({ privacy, onChange }: PrivacySettingsProps) {
  return (
    <Card className="health-card border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="w-5 h-5 mr-2 text-primary" />
          Privacy Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="share-data"
              checked={privacy.shareDataWithProviders}
              onChange={(e) => onChange({ ...privacy, shareDataWithProviders: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="share-data">Share data with healthcare providers</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="marketing-emails"
              checked={privacy.allowMarketingEmails}
              onChange={(e) => onChange({ ...privacy, allowMarketingEmails: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="marketing-emails">Allow marketing emails</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="online-status"
              checked={privacy.showOnlineStatus}
              onChange={(e) => onChange({ ...privacy, showOnlineStatus: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="online-status">Show online status</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 