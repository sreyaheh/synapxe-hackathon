import { Calendar, Pill, FileText, Eye, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageHeader from "@/components/PageHeader";

const visits = [
  {
    id: 1, date: "Feb 28, 2026", patient: "Ahmad Al-Rashid",
    diagnosis: "Type 2 Diabetes – Well Controlled",
    medications: ["Metformin 500mg", "Glimepiride 2mg"],
    summarySent: true,
  },
  {
    id: 2, date: "Feb 20, 2026", patient: "Fatima Hassan",
    diagnosis: "Upper Respiratory Infection",
    medications: ["Amoxicillin 500mg", "Paracetamol 500mg"],
    summarySent: true,
  },
  {
    id: 3, date: "Feb 15, 2026", patient: "Omar Khalil",
    diagnosis: "Hypertension – Stage 1",
    medications: ["Amlodipine 5mg"],
    summarySent: false,
  },
  {
    id: 4, date: "Feb 10, 2026", patient: "Layla Mahmoud",
    diagnosis: "Post-Appendectomy Recovery",
    medications: ["Ibuprofen 400mg", "Omeprazole 20mg"],
    summarySent: true,
  },
];

const PatientHistory = () => {
  return (
    <div>
      <PageHeader title="Patient History" subtitle="Past visits and records" />

      <div className="space-y-4">
        {visits.map((visit) => (
          <Card key={visit.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{visit.patient}</h3>
                    {visit.summarySent ? (
                      <Badge variant="secondary" className="text-xs bg-green-50 text-green-600">Summary Sent</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs bg-amber-50 text-amber-600">Pending</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{visit.date}</span>
                    <span className="flex items-center gap-1.5"><FileText className="h-4 w-4" />{visit.diagnosis}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {visit.medications.map((med) => (
                      <span key={med} className="inline-flex items-center gap-1 text-xs bg-accent/60 text-accent-foreground px-2.5 py-1 rounded-full">
                        <Pill className="h-3 w-3" />{med}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1.5" />View</Button>
                  <Button variant="outline" size="sm"><Pencil className="h-4 w-4 mr-1.5" />Edit Summary</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;
