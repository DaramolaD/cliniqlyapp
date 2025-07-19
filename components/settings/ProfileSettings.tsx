import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string;
}

interface ProfileSettingsProps {
  profile: ProfileData;
  onChange: (profile: ProfileData) => void;
}

export function ProfileSettings({ profile, onChange }: ProfileSettingsProps) {
  return (
    <Card className="health-card border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="w-5 h-5 mr-2 text-primary" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-lg">
              {profile.firstName[0]}{profile.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <Button variant="outline" className="health-btn-secondary">
              Change Photo
            </Button>
          </div>
        </div>

        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profile.firstName}
              onChange={(e) => onChange({ ...profile, firstName: e.target.value })}
              className="health-card border-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={profile.lastName}
              onChange={(e) => onChange({ ...profile, lastName: e.target.value })}
              className="health-card border-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => onChange({ ...profile, email: e.target.value })}
              className="health-card border-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => onChange({ ...profile, phone: e.target.value })}
              className="health-card border-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => onChange({ ...profile, dateOfBirth: e.target.value })}
              className="health-card border-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              type="tel"
              value={profile.emergencyContact}
              onChange={(e) => onChange({ ...profile, emergencyContact: e.target.value })}
              className="health-card border-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={profile.address}
            onChange={(e) => onChange({ ...profile, address: e.target.value })}
            className="health-card border-0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalHistory">Medical History</Label>
          <textarea
            id="medicalHistory"
            value={profile.medicalHistory}
            onChange={(e) => onChange({ ...profile, medicalHistory: e.target.value })}
            rows={4}
            className="w-full p-3 border rounded-md bg-background"
            placeholder="Enter your medical history, allergies, and previous conditions..."
          />
        </div>
      </CardContent>
    </Card>
  );
} 