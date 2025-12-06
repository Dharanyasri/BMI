import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Ruler } from "lucide-react";

const API_URL = "http://localhost:5000";

const IdealWeight = () => {
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [ideal, setIdeal] = useState<number | null>(null);

  const calculate = async () => {
    if (!height) return;

    const res = await fetch(`${API_URL}/api/ideal-weight/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ height: parseFloat(height), gender }),
    });

    const data = await res.json();
    setIdeal(Number(data.idealWeight));
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-xl mx-auto">
        <Card className="border-2 shadow-soft">
          <CardHeader>
            <CardTitle>Ideal Weight Calculator</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Height */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Height (cm)
              </Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="rounded-xl"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="w-4 h-4" /> Gender
              </Label>

              <select
                className="border p-2 rounded-xl w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Calculate Button */}
            <Button
              className="w-full rounded-full bg-primary"
              onClick={calculate}
            >
              Calculate Ideal Weight
            </Button>

            {/* Result */}
            {ideal !== null && (
              <div className="mt-6 p-4 rounded-xl bg-primary/10 text-center">
                <h2 className="text-xl font-semibold">
                  Ideal Weight:{" "}
                  <span className="text-primary">{ideal} kg</span>
                </h2>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IdealWeight;
