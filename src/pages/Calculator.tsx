import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator as CalcIcon, User, Ruler, Weight } from "lucide-react";

type UnitSystem = "metric" | "imperial";
type Gender = "male" | "female";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

const Calculator = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);

  const getBMICategory = (bmi: number): { category: string; color: string } => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-warning" };
    if (bmi < 25) return { category: "Normal Weight", color: "text-success" };
    if (bmi < 30) return { category: "Overweight", color: "text-warning" };
    return { category: "Obese", color: "text-destructive" };
  };

  const calculateBMI = () => {
    let heightInMeters: number;
    let weightInKg: number;

    if (unitSystem === "metric") {
      heightInMeters = parseFloat(height) / 100;
      weightInKg = parseFloat(weight);
    } else {
      // Convert imperial to metric
      heightInMeters = parseFloat(height) * 0.0254;
      weightInKg = parseFloat(weight) * 0.453592;
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      const { category, color } = getBMICategory(bmi);
      setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block p-3 rounded-2xl bg-gradient-wellness mb-4">
            <CalcIcon className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">BMI Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Calculate your Body Mass Index and understand your health status
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="border-2 shadow-card">
            <CardHeader>
              <CardTitle>Enter Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Unit System */}
              <div className="space-y-3">
                <Label>Unit System</Label>
                <RadioGroup 
                  value={unitSystem} 
                  onValueChange={(value) => setUnitSystem(value as UnitSystem)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric" className="cursor-pointer">Metric (cm, kg)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial" className="cursor-pointer">Imperial (in, lbs)</Label>
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
                  onValueChange={(value) => setGender(value as Gender)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer">Female</Label>
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
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unitSystem === "metric" ? "170" : "67"}
                  className="rounded-xl"
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
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unitSystem === "metric" ? "70" : "154"}
                  className="rounded-xl"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={calculateBMI}
                  className="flex-1 rounded-full bg-primary hover:bg-accent shadow-soft"
                  disabled={!height || !weight}
                >
                  Calculate BMI
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="rounded-full"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
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
                    <div className="h-4 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          result.category === "Normal Weight" ? "bg-success" :
                          result.category === "Overweight" ? "bg-warning" :
                          "bg-destructive"
                        }`}
                        style={{ width: `${Math.min((result.bmi / 40) * 100, 100)}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 shadow-card bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">What This Means</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {result.category === "Underweight" && 
                        "Your BMI indicates you may be underweight. Consider consulting with a healthcare provider about healthy weight gain strategies."}
                      {result.category === "Normal Weight" && 
                        "Great! Your BMI is in the healthy range. Maintain your current lifestyle with balanced nutrition and regular exercise."}
                      {result.category === "Overweight" && 
                        "Your BMI suggests you may be overweight. Consider adopting healthier eating habits and increasing physical activity."}
                      {result.category === "Obese" && 
                        "Your BMI indicates obesity. We recommend consulting with a healthcare provider to develop a safe weight management plan."}
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed shadow-card">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <CalcIcon className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">Enter Your Details</h3>
                  <p className="text-muted-foreground text-sm">
                    Fill in your height and weight to calculate your BMI
                  </p>
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
