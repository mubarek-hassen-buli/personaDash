import { Scan, CheckSquare, Cloud, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import { AnimatedListDemo } from "@/components/Testimonials";
import { AuroraText } from "@/components/magicui/aurora-text";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-5xl mb-7">
          <AuroraText>PersonaDash</AuroraText>
        </h1>

        <h1 className="text-3xl font-bold mb-2">
          Your Personal Dashboard,
          <br />
          Reimagined
        </h1>
        <p className="text-gray-600 mb-8">
          Smart, Secure, and Personalized Dashboard Powered by Face Recognition.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-black text-white hover:bg-gray-800">
            <Link href="/auth/signup"> Get Started</Link>
          </Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </section>
      {/* Features Section */}
      <div className=" mx-auto text-center mb-7">
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-5xl mb-7">
          Features
        </h1>
      </div>
      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
        <FeatureCard
          icon={Scan}
          title="Face Recognition"
          description="Secure authentication using advanced face recognition technology."
        />
        <FeatureCard
          icon={CheckSquare}
          title="Task Management"
          description="Prioritize and stay on track with organization tools."
        />
        <FeatureCard
          icon={Cloud}
          title="Weather Widget"
          description="Real-time weather updates and forecasts."
        />
        <FeatureCard
          icon={Music}
          title="Spotify Integration"
          description="Control your music directly from the dashboard."
        />
      </section>
      {/* Testimonials */}
      <section>
        <div className=" mx-auto text-center mb-7">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-5xl mb-7">
            Testimonials
          </h1>
        </div>
        <AnimatedListDemo />
      </section>
      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center">
                P
              </div>
              <span className="font-medium">PersonaDash</span>
            </div>
            <p className="text-sm text-gray-400">
              Smart, Secure, and Personalized Dashboard
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About</li>
              <li>Features</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">social media</h4>
            <div className=" flex gap-4">
              <span className="text-gray-400">twitter</span>
              <span className="text-gray-400">facebook</span>
              <span className="text-gray-400">tiktok</span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-8 mt-8 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            © 2025 PersonaDash. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
