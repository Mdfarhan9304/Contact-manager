import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Users,
  Search,
  Shield,
  Smartphone,
  Globe,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">Contact Manager</h1>
            <div className="flex items-center gap-4">
              <ModeToggle />
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Manage Your Contacts
                <span className="block mt-2">With Ease</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Streamline your contact management with our powerful and
                intuitive platform. Keep all your connections organized in one
                place.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="px-8 w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold">10k+</p>
                <p className="text-muted-foreground mt-2">Active Users</p>
              </div>
              <div>
                <p className="text-4xl font-bold">1M+</p>
                <p className="text-muted-foreground mt-2">Contacts Managed</p>
              </div>
              <div>
                <p className="text-4xl font-bold">99.9%</p>
                <p className="text-muted-foreground mt-2">Uptime</p>
              </div>
              <div>
                <p className="text-4xl font-bold">24/7</p>
                <p className="text-muted-foreground mt-2">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Powerful Features
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to manage your contacts effectively
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Smart Organization
                </h3>
                <p className="text-muted-foreground">
                  Organize contacts with tags, groups, and custom fields for
                  better management.
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quick Search</h3>
                <p className="text-muted-foreground">
                  Find any contact instantly with our powerful search and
                  filtering system.
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl shadow-sm border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
                <p className="text-muted-foreground">
                  Your data is protected with enterprise-grade security and
                  encryption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Why Choose Our Platform?
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">
                        Cross-Platform Access
                      </h3>
                      <p className="text-muted-foreground">
                        Access your contacts from any device, anywhere in the
                        world.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Easy Import/Export</h3>
                      <p className="text-muted-foreground">
                        Seamlessly import contacts from various sources or
                        export them anytime.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Regular Updates</h3>
                      <p className="text-muted-foreground">
                        We constantly improve our platform with new features and
                        enhancements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-background rounded-xl shadow-sm border">
                  <Smartphone className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Mobile Ready</h3>
                </div>
                <div className="p-4 bg-background rounded-xl shadow-sm border">
                  <Globe className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Cloud Sync</h3>
                </div>
                <div className="p-4 bg-background rounded-xl shadow-sm border">
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Fast Performance</h3>
                </div>
                <div className="p-4 bg-background rounded-xl shadow-sm border">
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <h3 className="font-semibold">Secure Data</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Find answers to common questions about our platform
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Is there a free plan available?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer a free plan that includes basic contact
                  management features. You can upgrade anytime to access premium
                  features.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I import contacts from other platforms?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! You can import contacts from CSV files, Google
                  Contacts, and other major platforms with just a few clicks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How secure is my data?</AccordionTrigger>
                <AccordionContent>
                  We use industry-standard encryption and security measures to
                  protect your data. Your information is stored in secure
                  servers with regular backups.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  What kind of support do you offer?
                </AccordionTrigger>
                <AccordionContent>
                  We provide 24/7 email support for all users. Premium users
                  also get access to priority support and live chat assistance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust our platform for managing their
              contacts efficiently.
            </p>
            <Link href="/signup">
              <Button size="lg" className="px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="md:text-left text-center">
              <p className="text-muted-foreground mt-2">
                Built by <span className="font-bold">Farhan Muzaffar</span>
              </p>
              <div className="flex md:justify-start justify-center gap-4 mt-2">
                <a
                  href="https://www.linkedin.com/in/farhanmuzaffar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/mdfarhan9304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="text-right">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Contact Manager. All rights
                reserved.
              </p>
            </div>

        
          </div>
        </div>
      </footer>
    </div>
  );
}
