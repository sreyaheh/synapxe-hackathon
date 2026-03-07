import { useState } from "react";
import { Send, Sparkles, Pencil, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";

const PatientAppointment = () => {
  const [notes, setNotes] = useState({
    symptoms: "",
    diagnosis: "",
    treatment: "",
    medication: "",
    followUp: "",
  });
  const [summaryGenerated, setSummaryGenerated] = useState(false);

  const handleChange = (field: string, value: string) => {
    setNotes((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => setSummaryGenerated(true);

  const fields = [
    { key: "symptoms", label: "Symptoms", placeholder: "Describe the patient's symptoms..." },
    { key: "diagnosis", label: "Diagnosis", placeholder: "Enter diagnosis..." },
    { key: "treatment", label: "Treatment Plan", placeholder: "Outline the treatment plan..." },
    { key: "medication", label: "Medication Prescribed", placeholder: "List medications and dosages..." },
    { key: "followUp", label: "Follow-up Instructions", placeholder: "Any follow-up notes..." },
  ];

  return (
    <div>
      <PageHeader title="Patient Appointment" subtitle="Fatima Hassan · Age 34 · ID: MED-2024-0847">
        <Badge variant="secondary" className="text-sm">In Progress</Badge>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Doctor Notes */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Appointment Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
                <Textarea
                  placeholder={field.placeholder}
                  value={notes[field.key as keyof typeof notes]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="resize-none bg-accent/30 border-border focus:border-primary"
                  rows={3}
                />
              </div>
            ))}
            <Button onClick={handleGenerate} className="w-full mt-2" size="lg">
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Patient Summary
            </Button>
          </CardContent>
        </Card>

        {/* Right: AI Summary Preview */}
        <Card className={`border-none shadow-sm transition-opacity ${summaryGenerated ? "opacity-100" : "opacity-40"}`}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Patient-Friendly Summary</CardTitle>
            {summaryGenerated && <Badge className="bg-green-100 text-green-700 hover:bg-green-100">AI Generated</Badge>}
          </CardHeader>
          <CardContent>
            {summaryGenerated ? (
              <div className="space-y-4">
                <div className="bg-accent/40 rounded-xl p-5 text-sm text-foreground leading-relaxed space-y-3">
                  <p><strong>Hello Fatima,</strong></p>
                  <p>Here's a summary of your visit today with Dr. Sarah Ahmed:</p>
                  <p>Based on the symptoms you described, you have been diagnosed and a treatment plan has been prepared for you. Please follow the prescribed medications and instructions carefully.</p>
                  <p>If you have any questions or your symptoms worsen, please don't hesitate to contact us.</p>
                  <p className="text-muted-foreground italic">— Generated from doctor's notes</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button className="flex-1">
                    <Check className="h-4 w-4 mr-2" /> Approve & Send
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <Sparkles className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Fill in the appointment notes and click<br />"Generate Patient Summary" to preview.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientAppointment;
