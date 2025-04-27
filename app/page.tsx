'use client';

import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Layers2, BrainCircuit, Bot, Code2, Webhook, BarChart3, Zap, ChevronRight, CreditCard, Sparkles, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Logo from '@/components/logo';
import { cn } from '@/lib/utils';

// Navigation link component with hover animation
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="relative text-muted-foreground hover:text-foreground transition-colors"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  // Add smooth scrolling behavior to the page
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Subtle Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#fcfcfc] dark:bg-[#0c0c0c]" />
        <div className="absolute inset-0 opacity-30">
          {/* Top right gradient */}
          <div className="absolute top-0 right-0 w-[40vw] h-[40vh] bg-gradient-to-b from-primary/20 to-transparent rounded-full filter blur-[80px] opacity-50 animate-float" />
          
          {/* Bottom left gradient */}
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-gradient-to-t from-blue-400/10 to-transparent rounded-full filter blur-[80px] opacity-50 animate-float-delayed" />
          
          {/* Center accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-gradient-to-r from-rose-300/5 via-primary/10 to-blue-300/5 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow" />
        </div>
      </div>

      {/* Header with Glass Effect */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/20 transition-all duration-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Logo iconSize={32} />
          </motion.div>
          
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a 
              href="#features" 
              onClick={(e) => smoothScroll(e, 'features')}
              className="relative text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="relative z-10">Features</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#demo" 
              onClick={(e) => smoothScroll(e, 'demo')}
              className="relative text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="relative z-10">Demo</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => smoothScroll(e, 'pricing')}
              className="relative text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="relative z-10">Pricing</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.nav>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button className="btn-stylish btn-primary">
                  Dashboard
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div className="flex gap-4 items-center">
                <Link href="/sign-in">
                  <Button variant="ghost" className="hover:text-primary transition-colors btn-stylish btn-outline">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="btn-stylish btn-primary">
                    Get Started
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 px-3 py-1 text-sm bg-secondary text-secondary-foreground">
                Web Scraping Reinvented
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                Extract Web Data with Precision and Ease
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Build powerful web scraping workflows without coding. Extract, transform, and deliver data from any website with our intuitive visual platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                  <Button
                    size="lg"
                    className="btn-stylish btn-primary"
                  >
                    Start Scraping Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a 
                  href="#demo" 
                  onClick={(e) => smoothScroll(e, 'demo')}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="btn-stylish btn-outline"
                  >
                    See How It Works
                  </Button>
                </a>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center"
              >
                <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5 transform rotate-90 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20" id="features">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-2">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need for Web Data Extraction
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our powerful platform combines ease of use with advanced capabilities
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Visual Workflow Builder",
                description: "Create complex scraping workflows with our intuitive drag-and-drop interface",
                icon: Layers2,
                delay: 0
              },
              {
                title: "AI-Powered Extraction",
                description: "Use AI to intelligently extract structured data from any website",
                icon: BrainCircuit,
                delay: 0.1
              },
              {
                title: "Automated Browser Actions",
                description: "Navigate, click, fill forms, and scroll automatically",
                icon: Bot,
                delay: 0.2
              },
              {
                title: "CSS Selector Targeting",
                description: "Precisely extract text from specific elements using CSS selectors",
                icon: Code2,
                delay: 0.3
              },
              {
                title: "Webhook Integration",
                description: "Send extracted data directly to your applications via webhooks",
                icon: Webhook,
                delay: 0.4
              },
              {
                title: "Execution Analytics",
                description: "Monitor your workflow performance with detailed analytics",
                icon: BarChart3,
                delay: 0.5
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: feature.delay, duration: 0.5 }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" id="demo">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-2">Demo</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  See Nextract in Action
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Watch how easy it is to extract data from any website
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto rounded-xl overflow-hidden border border-border/30 shadow-lg shadow-primary/5"
            >
              <div className="relative w-full pb-[56.25%] bg-black/90">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <span className="block text-2xl font-semibold mb-4">Demo Video Placeholder</span>
                    <p className="text-muted-foreground mb-4">Your actual demo video would go here</p>
                    <Button
                      className="btn-stylish btn-primary"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Watch Demo
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="mt-16 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
              >
                {[
                  { stat: "3 Minutes", label: "Average setup time" },
                  { stat: "95%", label: "Extraction accuracy" },
                  { stat: "100+", label: "Sites supported" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{item.stat}</div>
                    <div className="text-muted-foreground">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="container mx-auto px-4 py-20" id="pricing">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-2">Pricing</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pay As You Go Credit System
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Only pay for what you use. Purchase credits in packs that suit your needs.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Small Pack",
                price: "$9.99",
                credits: "1,000 credits",
                description: "Perfect for individuals and small projects",
                delay: 0
              },
              {
                name: "Medium Pack",
                price: "$39",
                credits: "5,000 credits",
                description: "Ideal for growing businesses and regular scraping needs",
                featured: true,
                delay: 0.1
              },
              {
                name: "Large Pack",
                price: "$69",
                credits: "10,000 credits",
                description: "Best value for companies with extensive data needs",
                delay: 0.2
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: plan.delay, duration: 0.5 }}
                className={`relative ${plan.featured ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                <PricingCard plan={plan} isSignedIn={isSignedIn ?? false} />
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-muted-foreground mb-4">
                All new users get <span className="text-primary font-medium">100 free credits</span> to try Nextract
              </p>
              <Link href="/sign-up">
                <Button 
                  variant="outline"
                  className="btn-stylish btn-outline"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Start with free credits
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Extract Web Data with Ease?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of businesses that use Nextract to collect and analyze web data efficiently.
              </p>
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button 
                  size="lg" 
                  className="btn-stylish btn-primary"
                >
                  Get Started For Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo iconSize={24} />
              <p className="text-sm text-muted-foreground mt-1">
                © {new Date().getFullYear()} Nextract. All rights reserved.
              </p>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

 
    </div>
  );
}

// Feature card component with hover effects
function FeatureCard({ feature }: { feature: { title: string; description: string; icon: any } }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="h-full border-border/30 bg-card/80 backdrop-blur-sm hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
        <CardHeader>
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <feature.icon className="h-12 w-12 text-primary mb-4" />
          </motion.div>
          <CardTitle>{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{feature.description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Pricing card component with enhanced styling
function PricingCard({ plan, isSignedIn }: { 
  plan: { 
    name: string; 
    price: string; 
    credits: string; 
    description: string; 
    featured?: boolean; 
    delay?: number;
  }; 
  isSignedIn: boolean; 
}) {
  const isFeatured: boolean = Boolean(plan.featured);
  
  return (
    <Card className={cn(
      "h-full border-border/30 transition-all duration-300",
      isFeatured 
        ? "border-primary/50 shadow-md shadow-primary/10" 
        : "hover:border-primary/30 hover:shadow-sm hover:shadow-primary/5"
    )}>
      {isFeatured && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}
      <CardHeader className={cn("text-center", isFeatured && "pt-8")}>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <div>
          <span className="text-4xl font-bold">{plan.price}</span>
        </div>
        <CardDescription className="text-lg font-medium text-primary">
          {plan.credits}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-6">{plan.description}</p>
        <ul className="space-y-2 mb-6 text-left">
          <li className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
            <span>Access to all features</span>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
            <span>No expiration on credits</span>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
            <span>Email support</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={isSignedIn ? "/billing" : "/sign-up"} className="w-full">
          <Button 
            className={cn(
              "w-full relative transition-all duration-300 overflow-hidden btn-stylish",
              isFeatured 
                ? "btn-primary" 
                : "btn-outline"
            )}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

