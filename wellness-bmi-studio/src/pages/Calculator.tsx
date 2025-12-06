import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator as CalcIcon, User, Ruler, Weight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API_URL = "http://localhost:5000";

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

const Calculator = () => {
  const { toast } = useToast();

  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [loading, setLoading] = useState(false);

  // ⭐ AI State
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const getBMICategoryColor = (category: string) => {
    if (category === "Underweight") return "text-warning";
    if (category === "Normal") return "text-success";
    if (category === "Overweight") return "text-warning";
    return "text-destructive";
  };

  // ⭐ Backend BMI
  const calculateBMI = async () => {
    if (!height || !weight) {
      toast({
        title: "Missing Values",
        description: "Enter height and weight first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/bmi/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          height: parseFloat(height),
          weight: parseFloat(weight),
          gender,
          units: unitSystem,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Backend error occurred.",
          variant: "destructive",
        });
        return;
      }

      setResult({
        bmi: data.bmi,
        category: data.category,
        color: getBMICategoryColor(data.category),
      });

      toast({
        title: "BMI Calculated",
        description: `BMI: ${data.bmi} (${data.category})`,
      });
    } catch {
      toast({
        title: "Server Error",
        description: "Cannot reach backend.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Save BMI to history
  const saveBMI = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast({
        title: "Login Required",
        description: "Please login to save your BMI history.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/bmi/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          height: parseFloat(height),
          weight: parseFloat(weight),
          gender,
          units: unitSystem,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Unable to save record.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Saved!",
        description: "Your BMI record has been added to history.",
      });

    } catch {
      toast({
        title: "Server Error",
        description: "Could not connect to backend.",
        variant: "destructive",
      });
    }
  };

  // ⭐⭐⭐ AI FUNCTION — HEALTH RECOMMENDATIONS
  const getAIRecommendations = async () => {
    if (!result) {
      toast({
        title: "No BMI Found",
        description: "Please calculate BMI first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setAiLoading(true);
      setAiAdvice(null);

      const res = await fetch(`${API_URL}/api/ai/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bmi: result.bmi,
          category: result.category,
          gender,
          age: 20,
          activityLevel: "moderate",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "AI Error",
          description: data.message || "AI failed to generate tips.",
          variant: "destructive",
        });
        return;
      }

      setAiAdvice(data.advice);

    } catch {
      toast({
        title: "Server Error",
        description: "AI backend not responding.",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setResult(null);
    setAiAdvice(null);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 rounded-2xl bg-gradient-wellness mb-4">
            <CalcIcon className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">BMI Calculator</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT: FORM */}
          <Card className="border-2 shadow-card">
            <CardHeader>
              <CardTitle>Enter Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Units */}
              <div className="space-y-3">
                <Label>Unit System</Label>
                <RadioGroup
                  value={unitSystem}
                  onValueChange={(v) => setUnitSystem(v as UnitSystem)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric">Metric (cm, kg)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial">Imperial (in, lbs)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Gender */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Gender
                </Label>

                <RadioGroup
                  value={gender}
                  onValueChange={(v) => setGender(v as Gender)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Height */}
              <div className="space-y-3">
                <Label htmlFor="height" className="flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Height ({unitSystem === "metric" ? "cm" : "inches"})
                </Label>
                <Input
                  id="height"
                  type="number"
                  className="rounded-xl"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              {/* Weight */}
              <div className="space-y-3">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Weight className="w-4 h-4" />
                  Weight ({unitSystem === "metric" ? "kg" : "lbs"})
                </Label>
                <Input
                  id="weight"
                  type="number"
                  className="rounded-xl"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              {/* FORM BUTTONS */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={calculateBMI}
                  className="flex-1 rounded-full bg-primary"
                  disabled={!height || !weight || loading}
                >
                  {loading ? "Calculating..." : "Calculate BMI"}
                </Button>

                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="rounded-full"
                >
                  Reset
                </Button>
              </div>

              {result && (
                <Button
                  onClick={saveBMI}
                  className="w-full mt-4 rounded-full bg-secondary"
                >
                  Save to History
                </Button>
              )}
            </CardContent>
          </Card>

          {/* RIGHT: RESULTS */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* BMI Result */}
                <Card className="border-2 shadow-card">
                  <CardHeader>
                    <CardTitle>Your Results</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <div className="mb-6">
                      <div className="text-6xl font-bold mb-2">{result.bmi}</div>
                      <div className="text-sm text-muted-foreground">BMI Score</div>
                    </div>

                    <div className={`text-2xl font-semibold mb-4 ${result.color}`}>
                      {result.category}
                    </div>
                  </CardContent>
                </Card>

                {/* EXPLANATION */}
                <Card className="border-2 shadow-card bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">What This Means</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {result.category === "Underweight" &&
                        "You may be underweight. Consider consulting a healthcare provider."}

                      {result.category === "Normal" &&
                        "Great! Your BMI is in the healthy range. Maintain your lifestyle."}

                      {result.category === "Overweight" &&
                        "You may be overweight. Consider lifestyle changes and exercise."}

                      {result.category === "Obese" &&
                        "Your BMI indicates obesity. It's recommended to seek medical help."}
                    </p>
                  </CardContent>
                </Card>

                {/* ⭐ AI BUTTON */}
                <Button
                  onClick={getAIRecommendations}
                  className="w-full rounded-full"
                  disabled={aiLoading}
                >
                  {aiLoading ? "Getting AI Tips..." : "Get AI Health Recommendations"}
                </Button>

                {/* ⭐ AI Response Card */}
                {aiAdvice && (
                  <Card className="border-2 shadow-card mt-4">
                    <CardHeader>
                      <CardTitle className="text-lg">AI Health Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="whitespace-pre-line leading-relaxed">
                      {aiAdvice}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="border-2 border-dashed shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <CalcIcon className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Enter Your Details</h3>
                </CardContent>
              </Card>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Calculator;
