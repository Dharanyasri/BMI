import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Info, TrendingUp, AlertTriangle } from "lucide-react";

const LearnBMI = () => {
  const bmiRanges = [
    { range: "Below 18.5", category: "Underweight", color: "bg-warning", description: "May indicate malnutrition or health issues" },
    { range: "18.5 - 24.9", category: "Normal Weight", color: "bg-success", description: "Healthy weight range for most adults" },
    { range: "25.0 - 29.9", category: "Overweight", color: "bg-warning", description: "May increase risk of health conditions" },
    { range: "30.0 and above", category: "Obese", color: "bg-destructive", description: "Higher risk of serious health conditions" }
  ];

  const faqs = [
    {
      question: "What is BMI?",
      answer: "Body Mass Index (BMI) is a measure that uses your height and weight to estimate body fat. It's calculated by dividing your weight in kilograms by your height in meters squared (kg/m²)."
    },
    {
      question: "Why is BMI important?",
      answer: "BMI helps identify potential weight-related health risks. While not a perfect measure, it's a useful screening tool that's easy to calculate and widely used by healthcare professionals."
    },
    {
      question: "What are BMI limitations?",
      answer: "BMI doesn't distinguish between muscle and fat mass. Athletes may have high BMI due to muscle. It also doesn't account for age, gender, bone density, or body composition differences."
    },
    {
      question: "How often should I check my BMI?",
      answer: "For general health monitoring, checking your BMI monthly or quarterly is sufficient. If you're actively working on weight management, weekly checks can help track progress."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-2xl bg-gradient-wellness mb-4">
            <BookOpen className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Understanding BMI</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn what BMI means, how it's calculated, and what your results indicate about your health
          </p>
        </div>

        {/* BMI Chart */}
        <Card className="border-2 shadow-card mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              BMI Categories Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bmiRanges.map((range, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-16 h-16 rounded-xl ${range.color} flex items-center justify-center text-white font-bold shadow-soft`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{range.category}</div>
                      <div className="text-sm text-muted-foreground">BMI: {range.range}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground sm:text-right">
                    {range.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Bar */}
            <div className="mt-8 h-8 rounded-full overflow-hidden flex shadow-soft">
              <div className="bg-warning flex-1 flex items-center justify-center text-xs font-medium text-warning-foreground">
                Under
              </div>
              <div className="bg-success flex-[2] flex items-center justify-center text-xs font-medium text-success-foreground">
                Normal
              </div>
              <div className="bg-warning flex-1 flex items-center justify-center text-xs font-medium text-warning-foreground">
                Over
              </div>
              <div className="bg-destructive flex-1 flex items-center justify-center text-xs font-medium text-destructive-foreground">
                Obese
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                How BMI is Calculated
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold mb-2">BMI = kg/m²</div>
                  <div className="text-sm text-muted-foreground">Weight (kg) ÷ Height² (m²)</div>
                </div>
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Example:</strong> A person weighing 70 kg and 1.75 m tall would have a BMI of:
                  </p>
                  <p className="text-center font-mono text-lg mt-2">
                    70 ÷ (1.75 × 1.75) = 22.9
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Important Considerations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">BMI is a screening tool, not a diagnostic tool</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Athletes may have higher BMI due to muscle mass</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Elderly people may have lower BMI naturally</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Pregnancy affects BMI calculations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Different ethnicities may have different healthy ranges</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-2 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="border-2 border-primary/30 shadow-medium bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Calculate Your BMI?</h3>
            <p className="text-muted-foreground mb-6">
              Understanding your BMI is the first step towards better health awareness
            </p>
            <a href="/calculator">
              <button className="px-8 py-3 rounded-full bg-primary hover:bg-accent text-foreground font-medium shadow-soft transition-all hover:scale-105">
                Calculate Now
              </button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearnBMI;
