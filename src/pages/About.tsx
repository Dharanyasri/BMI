import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Code } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Health First",
      description: "We believe everyone deserves access to simple, accurate health tools"
    },
    {
      icon: Target,
      title: "Accuracy",
      description: "Our calculations follow WHO and medical standards for BMI assessment"
    },
    {
      icon: Users,
      title: "Privacy",
      description: "Your health data stays private. We don't store or share your information"
    }
  ];

  const technologies = [
    { name: "React", purpose: "Modern, responsive user interface" },
    { name: "TypeScript", purpose: "Type-safe, reliable code" },
    { name: "Tailwind CSS", purpose: "Beautiful, consistent design" },
    { name: "Vite", purpose: "Fast, optimized performance" }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-2xl bg-gradient-wellness mb-4">
            <Users className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">About BMI Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Making health tracking simple, accessible, and beautiful
          </p>
        </div>

        {/* Mission */}
        <Card className="border-2 shadow-card mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We created this BMI calculator to provide everyone with free, instant access to an essential health metric. 
              Understanding your BMI is a crucial first step in your wellness journey, and we believe this information 
              should be simple to access and easy to understand.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our goal is to empower individuals with knowledge about their health status and provide actionable insights 
              that can guide positive lifestyle changes. We've designed every aspect of this tool to be welcoming, 
              non-judgmental, and focused on your wellbeing.
            </p>
          </CardContent>
        </Card>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-2 shadow-card text-center">
                  <CardContent className="p-6">
                    <div className="inline-block p-3 rounded-2xl bg-gradient-wellness mb-4">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technologies */}
        <Card className="border-2 shadow-card mb-12 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Code className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Built With Modern Technology</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              We use cutting-edge web technologies to ensure a fast, reliable, and beautiful experience:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <div key={index} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <div className="font-semibold">{tech.name}</div>
                    <div className="text-sm text-muted-foreground">{tech.purpose}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="border-2 border-warning/30 bg-warning/5 shadow-card">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Medical Disclaimer
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This BMI calculator is provided for informational purposes only and should not be considered medical advice. 
              BMI is a general indicator and may not accurately reflect health status for all individuals, including athletes, 
              pregnant women, and elderly persons. Always consult with qualified healthcare professionals for medical advice, 
              diagnosis, or treatment.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
