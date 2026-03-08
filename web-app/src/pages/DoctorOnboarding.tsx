import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";

const DoctorOnboarding = () => {
  const navigate = useNavigate();
  const { saveDoctorParticulars, doctorParticulars, user } = useAuth();
  const [hospital, setHospital] = useState(doctorParticulars?.hospital ?? "");
  const [department, setDepartment] = useState(doctorParticulars?.department ?? "");
  const [phone, setPhone] = useState(doctorParticulars?.phone ?? "");
  const [licenseNumber, setLicenseNumber] = useState(doctorParticulars?.licenseNumber ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!hospital.trim() || !department.trim() || !phone.trim() || !licenseNumber.trim()) {
      setError("Please complete all doctor particulars.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await saveDoctorParticulars({
        hospital: hospital.trim(),
        department: department.trim(),
        phone: phone.trim(),
        licenseNumber: licenseNumber.trim(),
      });
      navigate("/", { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save particulars");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white flex items-center justify-center p-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ffffff_0%,#f8f5ff_40%,#f3edff_100%)]" />
      </div>
      <div className="relative w-full max-w-lg rounded-2xl border border-purple-100 bg-white/90 p-8 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Complete Doctor Profile</h1>
            <p className="text-sm text-muted-foreground">{user?.name ?? "Doctor"} · one-time setup</p>
          </div>
        </div>

        <div className="space-y-3">
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Hospital / Clinic"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          />
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Department / Specialty"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Medical License Number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-primary text-primary-foreground px-4 py-2.5 font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save and Continue"}
        </button>

        {error ? <p className="text-sm text-destructive mt-4">{error}</p> : null}
      </div>
    </div>
  );
};

export default DoctorOnboarding;
