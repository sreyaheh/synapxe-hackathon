import { Building2, Mail, Phone, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const DoctorProfile = () => {
  const [chatbotEnabled, setChatbotEnabled] = useState(true);
  const [tone, setTone] = useState("friendly");
  const [language, setLanguage] = useState("en");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  return (
    <div>
      <PageHeader title="Doctor Profile" subtitle="Manage your settings" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doctor Info */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">SA</div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">Dr. Sarah Ahmed</h3>
                <p className="text-sm text-muted-foreground">Internal Medicine Specialist</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Building2 className="h-4 w-4" /> City General Hospital – Department of Internal Medicine
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4" /> dr.sarah@citygeneral.med
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4" /> +966 50 123 4567
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Award className="h-4 w-4" /> License: MD-2019-45892
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Appointment reminders & alerts</p>
              </div>
              <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Real-time patient updates</p>
              </div>
              <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant Settings */}
        <Card className="border-none shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">AI Assistant Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Label className="font-medium">Enable AI Chatbot</Label>
                    <p className="text-sm text-muted-foreground">In-app assistant</p>
                  </div>
                  <Switch checked={chatbotEnabled} onCheckedChange={setChatbotEnabled} />
                </div>
              </div>

              <div>
                <Label className="font-medium mb-3 block">Summary Tone</Label>
                <RadioGroup value={tone} onValueChange={setTone} className="space-y-2">
                  {[
                    { value: "formal", label: "Formal" },
                    { value: "friendly", label: "Friendly" },
                    { value: "simple", label: "Simple" },
                  ].map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`tone-${opt.value}`} />
                      <Label htmlFor={`tone-${opt.value}`} className="cursor-pointer">{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <Label className="font-medium mb-3 block">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-accent/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorProfile;
