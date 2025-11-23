import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Apple, Dumbbell, Moon, Brain, Sparkles } from "lucide-react";

const HealthTips = () => {
  const categories = [
    {
      title: "Underweight Tips",
      icon: Apple,
      color: "from-warning/20 to-warning/10",
      tips: [
        "Eat nutrient-dense, calorie-rich foods like nuts, seeds, and avocados",
        "Include healthy fats and proteins in every meal",
        "Eat smaller, frequent meals throughout the day",
        "Add strength training to build muscle mass",
        "Consider protein shakes or smoothies between meals",
        "Consult a healthcare provider to rule out underlying conditions"
      ]
    },
    {
      title: "Normal Weight Tips",
      icon: Heart,
      color: "from-success/20 to-success/10",
      tips: [
        "Maintain a balanced diet with variety of foods",
        "Stay active with at least 150 minutes of moderate exercise weekly",
        "Stay hydrated with 8-10 glasses of water daily",
        "Get 7-9 hours of quality sleep each night",
        "Manage stress through meditation or yoga",
        "Regular health check-ups to monitor your wellness"
      ]
    },
    {
      title: "Overweight Tips",
      icon: Dumbbell,
      color: "from-warning/20 to-warning/10",
      tips: [
        "Create a sustainable calorie deficit through portion control",
        "Focus on whole foods and reduce processed food intake",
        "Incorporate both cardio and strength training exercises",
        "Track your food intake to build awareness",
        "Stay consistent with small, achievable goals",
        "Seek support from friends, family, or professionals"
      ]
    },
    {
      title: "Obesity Management Tips",
      icon: Brain,
      color: "from-destructive/20 to-destructive/10",
      tips: [
        "Consult with healthcare providers for a personalized plan",
        "Start with small, sustainable lifestyle changes",
        "Consider working with a registered dietitian",
        "Incorporate low-impact exercises like walking or swimming",
        "Address emotional eating patterns with professional help",
        "Be patient and celebrate small victories along the way"
      ]
    }
  ];

  const generalTips = [
    {
      icon: Moon,
      title: "Quality Sleep",
      description: "7-9 hours of sleep helps regulate hormones that control hunger and metabolism"
    },
    {
      icon: Sparkles,
      title: "Stress Management",
      description: "Chronic stress can affect weight. Practice mindfulness and relaxation techniques"
    },
    {
      icon: Heart,
      title: "Stay Hydrated",
      description: "Drinking water before meals can help with portion control and digestion"
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-2xl bg-gradient-wellness mb-4">
            <Heart className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Health Tips</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expert advice tailored to different BMI categories to help you achieve your health goals
          </p>
        </div>

        {/* Category-Specific Tips */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="border-2 shadow-card overflow-hidden">
                <div className={`bg-gradient-to-br ${category.color} p-1`}>
                  <CardHeader className="bg-card">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-wellness">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex gap-3">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground flex-1">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* General Tips */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Universal Wellness Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {generalTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-block p-4 rounded-2xl bg-gradient-wellness mb-4">
                    <Icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="mt-12 border-2 border-warning/30 bg-warning/5">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Disclaimer:</strong> These tips are for general information only. 
              Always consult with qualified healthcare professionals before making significant changes to your diet or exercise routine.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthTips;
