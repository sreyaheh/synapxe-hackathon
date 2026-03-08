import { Users, FileText, AlertTriangle, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/auth/AuthContext";

const stats = [
  { label: "Patients Today", value: "12", icon: Users, color: "text-primary" },
  { label: "Pending Summaries", value: "4", icon: FileText, color: "text-amber-500" },
  { label: "Medication Alerts", value: "2", icon: AlertTriangle, color: "text-destructive" },
];

const appointments = [
  { id: 1, patient: "Ahmad Al-Rashid", time: "09:00 AM", reason: "Follow-up: Diabetes Management", status: "upcoming" },
  { id: 2, patient: "Fatima Hassan", time: "09:45 AM", reason: "Annual Physical Examination", status: "in-progress" },
  { id: 3, patient: "Omar Khalil", time: "10:30 AM", reason: "Chest Pain Evaluation", status: "upcoming" },
  { id: 4, patient: "Layla Mahmoud", time: "11:15 AM", reason: "Post-Surgery Review", status: "upcoming" },
  { id: 5, patient: "Yusuf Ibrahim", time: "01:00 PM", reason: "Hypertension Check", status: "upcoming" },
];

const Dashboard = () => {
  const { user, doctorParticulars } = useAuth();
  const subtitleParts = [doctorParticulars?.hospital, doctorParticulars?.department].filter(Boolean);
  const subtitle = subtitleParts.length > 0 ? subtitleParts.join(" · ") : "Complete doctor particulars";

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name ?? "Doctor"}`}
        subtitle={subtitle}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Appointments */}
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold">Today's Appointments</CardTitle>
          <Badge variant="secondary" className="font-normal">
            <Clock className="h-3 w-3 mr-1" />
            {appointments.length} scheduled
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {appointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between px-6 py-4 hover:bg-accent/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {appt.patient.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{appt.patient}</p>
                    <p className="text-sm text-muted-foreground">{appt.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-foreground">{appt.time}</p>
                    {appt.status === "in-progress" && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">In Progress</Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    Open Patient <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
