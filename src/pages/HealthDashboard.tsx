import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, BarChart3, HeartPulse, Scale, Flame } from "lucide-react";

const API_URL = "http://localhost:5000";

const HealthDashboard = () => {
  const [latestBMI, setLatestBMI] = useState<any>(null);
  const [idealWeight, setIdealWeight] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  // Load latest BMI from backend
  const fetchLatestBMI = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/bmi/latest`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (response.ok) setLatestBMI(data);
  };

  // Load ideal weight
  const fetchIdealWeight = async () => {
    const response = await fetch(`${API_URL}/api/ideal-weight/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        height: latestBMI?.height,
        gender: user?.gender || "male",
      }),
    });

    const data = await response.json();
    setIdealWeight(Number(data.idealWeight));
  };

  // Load calorie need
  const fetchCalories = async () => {
    const response = await fetch(`${API_URL}/api/calories/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: 20,
        gender: user?.gender || "male",
        height: latestBMI?.height,
        weight: latestBMI?.weight,
        activity: "moderate",
      }),
    });

    const data = await response.json();
    setCalories(data.calories);
  };

  useEffect(() => {
    fetchLatestBMI();
  }, []);

  useEffect(() => {
    if (latestBMI) {
      fetchIdealWeight();
      fetchCalories();
    }
  }, [latestBMI]);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Your Health Dashboard</h1>
          <p className="text-muted-foreground">
            Track your BMI, ideal weight, calories & progress in one place
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* BMI CARD */}
          <Card className="border-2 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Activity /> Latest BMI
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              {latestBMI ? (
                <>
                  <div className="text-5xl font-bold">{latestBMI.bmi}</div>
                  <p className="text-lg text-muted-foreground mt-2">
                    {latestBMI.category}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground">No BMI record yet</p>
              )}

              <Button className="mt-6 w-full" asChild>
                <a href="/calculator">Update BMI</a>
              </Button>
            </CardContent>
          </Card>

          {/* IDEAL WEIGHT */}
          <Card className="border-2 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Scale /> Ideal Weight
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              {idealWeight ? (
                <div className="text-4xl font-bold">{idealWeight} kg</div>
              ) : (
                <p className="text-muted-foreground">Enter BMI first</p>
              )}

              <Button className="mt-6 w-full" asChild>
                <a href="/ideal-weight">Calculate Ideal Weight</a>
              </Button>
            </CardContent>
          </Card>

          {/* CALORIES */}
          <Card className="border-2 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Flame /> Daily Calories
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              {calories ? (
                <div className="text-4xl font-bold">{calories} kcal</div>
              ) : (
                <p className="text-muted-foreground">Needs BMI data</p>
              )}

              <Button className="mt-6 w-full" asChild>
                <a href="/calories">Calculate Calories</a>
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* PROGRESS BUTTON */}
        <div className="text-center">
          <Button size="lg" className="rounded-full px-8" asChild>
            <a href="/history">
              <BarChart3 className="mr-2" /> View BMI History
            </a>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default HealthDashboard;
