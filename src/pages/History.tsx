import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Activity } from "lucide-react";

const API_URL = "http://localhost:5000";

interface HistoryRecord {
  bmi: number;
  category: string;
  height: number;
  weight: number;
  gender: string;
  units: string;
  createdAt: string;
}

const History = () => {
  const { toast } = useToast();
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // ⭐ Fetch history from backend
  const loadHistory = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Login Required",
        description: "Please log in to view your BMI history.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/bmi/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Unable to load history.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      setRecords(data.records);
    } catch (err) {
      toast({
        title: "Server Error",
        description: "Could not connect to backend.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 rounded-2xl bg-gradient-wellness mb-4">
            <Activity className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-3xl font-bold">BMI History</h1>
          <p className="text-muted-foreground text-lg">
            View all your saved BMI calculations
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-muted-foreground">Loading...</p>
        )}

        {/* No Records */}
        {!loading && records.length === 0 && (
          <Card className="border-2 border-dashed shadow-card">
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">
                No BMI records found. Save your first BMI result!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Display History */}
        <div className="space-y-6">
          {records.map((rec, i) => (
            <Card key={i} className="border-2 shadow-card">
              <CardHeader>
                <CardTitle>
                  BMI: {rec.bmi} — {rec.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <p><strong>Height:</strong> {rec.height} {rec.units === "metric" ? "cm" : "in"}</p>
                <p><strong>Weight:</strong> {rec.weight} {rec.units === "metric" ? "kg" : "lbs"}</p>
                <p><strong>Gender:</strong> {rec.gender}</p>
                <p className="text-muted-foreground text-sm">
                  Saved on: {new Date(rec.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="text-center mt-8">
          <Button
            onClick={loadHistory}
            className="rounded-full shadow-soft"
          >
            Refresh History
          </Button>
        </div>

      </div>
    </div>
  );
};

export default History;
