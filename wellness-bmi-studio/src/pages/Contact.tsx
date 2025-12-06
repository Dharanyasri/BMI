import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });

    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-3 rounded-2xl bg-gradient-wellness mb-4">
            <Mail className="w-8 h-8 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-muted-foreground text-lg">
            Have questions or feedback? We'd love to hear from you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-2 shadow-card">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-block p-4 rounded-full bg-success/20 mb-4">
                    <CheckCircle className="w-12 h-12 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for contacting us. We'll respond shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="rounded-xl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      className="rounded-xl min-h-[150px] resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-full bg-primary hover:bg-accent shadow-soft"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="space-y-6">
            <Card className="border-2 shadow-card bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Quick Response</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We typically respond to all inquiries within 24-48 hours during business days.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Support Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Common Questions</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Before reaching out, check our Learn BMI page which answers many frequently asked questions about BMI calculations and health recommendations.
                </p>
                <a href="/learn">
                  <Button variant="outline" className="w-full rounded-full">
                    Visit FAQ
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
