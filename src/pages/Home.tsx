import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, BookOpen, Heart, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: "BMI Calculator",
      description: "Get instant, accurate BMI calculations with personalized insights",
      link: "/calculator",
      gradient: "from-primary/20 to-accent/20"
    },
    {
      icon: BookOpen,
      title: "Learn BMI",
      description: "Understand BMI ranges and what they mean for your health",
      link: "/learn",
      gradient: "from-secondary/20 to-primary/20"
    },
    {
      icon: Heart,
      title: "Health Tips",
      description: "Expert advice tailored to your BMI category",
      link: "/tips",
      gradient: "from-accent/20 to-secondary/20"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-primary/20 rounded-full">
                <span className="text-sm font-medium">Your Wellness Starts Here</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Calculate Your BMI
                <span className="block text-muted-foreground">Instantly</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Take the first step towards a healthier you. Our simple BMI calculator provides instant results and personalized health insights.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/calculator">
                  <Button size="lg" className="rounded-full bg-primary hover:bg-accent shadow-medium transition-all hover:scale-105">
                    Calculate Now
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="rounded-full border-2 hover:bg-muted/50">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold">100k+</div>
                  <div className="text-sm text-muted-foreground">Happy Users</div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div>
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-medium">
                <img 
                  src={heroImage} 
                  alt="Healthy lifestyle with fruits and wellness items" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-wellness rounded-3xl blur-3xl opacity-50"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/30 rounded-3xl blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive tools and resources to help you understand and improve your health
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} to={feature.link}>
                  <Card className="group h-full border-2 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-medium cursor-pointer overflow-hidden">
                    <CardContent className="p-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-6 flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                        Get Started →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "Fast", label: "Instant Results" },
              { value: "Free", label: "Always Free" },
              { value: "Easy", label: "Simple to Use" },
              { value: "Safe", label: "Private & Secure" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2 bg-gradient-wellness bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-primary/20 shadow-medium overflow-hidden">
            <div className="bg-gradient-wellness p-12 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-6 text-foreground" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Wellness Journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of people who've taken control of their health. Calculate your BMI in seconds.
              </p>
              <Link to="/calculator">
                <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 shadow-medium">
                  Calculate Your BMI Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
