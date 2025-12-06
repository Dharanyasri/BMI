import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_URL = "http://localhost:5000";

const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [calories, setCalories] = useState<number | null>(null);

  const calculate = async () => {
    const response = await fetch(`${API_URL}/api/calories/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gender,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        activity,
      }),
    });

    const data = await response.json();
    setCalories(data.calories);
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-xl mx-auto">
        <Card className="border-2 shadow-soft">
          <CardHeader>
            <CardTitle>Daily Calorie Requirement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Age */}
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <Label>Gender</Label>
              <select
                className="border p-2 rounded-xl w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <Label>Height (cm)</Label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            {/* Weight */}
            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            {/* Activity Level */}
            <div>
              <Label>Activity Level</Label>
              <select
                className="border p-2 rounded-xl w-full"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="sedentary">Sedentary (little exercise)</option>
                <option value="light">Light Exercise (1–3 days/week)</option>
                <option value="moderate">Moderate (3–5 days/week)</option>
                <option value="active">Active (6–7 days/week)</option>
                <option value="very_active">Very Active (intense training)</option>
              </select>
            </div>

            <Button className="w-full rounded-full" onClick={calculate}>
              Calculate Calories
            </Button>

            {calories && (
              <div className="mt-6 p-4 text-center bg-primary/10 rounded-xl">
                <h2 className="text-xl font-semibold">
                  You need <span className="text-primary">{calories} kcal/day</span>
                </h2>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalorieCalculator;
