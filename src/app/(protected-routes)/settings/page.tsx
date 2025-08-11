import React from 'react'

import PageContainer from '@/components/layout/PageContainer'
import ProfileForm from '@/components/pages/settings/ProfileForm'
import SecurityForm from '@/components/pages/settings/SecurityForm'
import { Button } from '@/components/ui/shadcn/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select'
import { Switch } from '@/components/ui/shadcn/switch'

export default function SettingsPage() {
  return (
    <PageContainer className="grid grid-cols-1 gap-4 space-y-0 md:grid-cols-2">
      <ProfileForm />

      <Card className="h-auto">
        <CardHeader>
          <CardTitle>Betting Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Default Stake Amount</Label>
              <p className="text-sm text-gray-500">
                Set your default bet amount
              </p>
            </div>
            <Input className="w-32" defaultValue="100" type="number" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Odds Format</Label>
              <p className="text-sm text-gray-500">
                Choose your preferred odds display
              </p>
            </div>
            <Select defaultValue="american">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="american">American (-110)</SelectItem>
                <SelectItem value="decimal">Decimal (1.91)</SelectItem>
                <SelectItem value="fractional">Fractional (10/11)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Cash Out</Label>
              <p className="text-sm text-gray-500">
                Automatically cash out at profit target
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <SecurityForm />

      <div className="h-full space-y-4">
        <Card className="h-auto">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive bet updates via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">
                  Get real-time bet notifications
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive important updates via SMS
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="h-auto">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Export Data</Label>
                <p className="text-sm text-gray-500">
                  Download your betting history and data
                </p>
              </div>
              <Button variant="outline">Export</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Delete Account</Label>
                <p className="text-sm text-gray-500">
                  Permanently delete your account and data
                </p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
