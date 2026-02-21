import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

import { SiteLogo } from "@/components/SiteLogo";

interface PublicLayoutProps {
  children: ReactNode;
  activeTab?: string;
  showLogin?: boolean;
}

const PublicLayout = ({ children, activeTab, showLogin = true }: PublicLayoutProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineId, setOnlineId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      setError("Invalid Online ID or Passcode. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* FDIC Notice at top */}
      <div className="bg-[#012169] text-white text-xs py-1.5 px-4 text-center">
        <span>Bank of America, N.A. Member FDIC. Equal Housing Lender.</span>
      </div>

      {/* Top utility bar - gray with logo at traditional top-left */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2" style={{ background: "transparent" }}>
                <SiteLogo className="h-8 object-contain" />
              </Link>
              <Link to="/personal" className="text-[#012169] hover:underline font-medium">Personal</Link>
              <Link to="/small-business" className="text-[#012169] hover:underline font-medium">Small Business</Link>
              <Link to="/wealth-management" className="text-[#012169] hover:underline font-medium">Wealth Management</Link>
              <Link to="/businesses-institutions" className="text-[#012169] hover:underline font-medium">Businesses & Institutions</Link>
              <Link to="/about" className="text-[#012169] hover:underline font-medium">About Us</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/locations" className="text-[#012169] hover:underline">Locations</Link>
              <Link to="/contact-us" className="text-[#012169] hover:underline">Contact Us</Link>
              <Link to="/help" className="text-[#012169] hover:underline">Help</Link>
              <a href="#" className="text-[#012169] hover:underline">En español</a>
              <input
                type="text"
                placeholder="How can we help you?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-sm w-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main header - Sign-in */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {showLogin && (
              <div className="flex flex-col lg:flex-row gap-4 flex-1 items-stretch lg:items-center">
                <div className="w-full lg:w-80">
                  <div className="bg-[#E31837] text-white rounded-lg p-5">
                    <h2 className="text-lg font-bold mb-4">Enter your Online ID</h2>
                    <form onSubmit={handleLogin} className="space-y-3">
                      <Input
                        type="text"
                        placeholder="Online ID"
                        value={onlineId}
                        onChange={(e) => {
                          setOnlineId(e.target.value);
                          setError("");
                        }}
                        className="h-10 bg-white text-gray-900 border-0"
                        disabled={isLoading}
                      />
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="saveId"
                          checked={saveId}
                          onCheckedChange={(c) => setSaveId(!!c)}
                          className="border-white data-[state=checked]:bg-white data-[state=checked]:text-[#E31837]"
                        />
                        <label htmlFor="saveId" className="text-sm text-white/90 cursor-pointer">Save this Online ID</label>
                        <a href="#" className="text-sm text-white underline ml-auto">Help/options</a>
                      </div>
                      <Input
                        type="password"
                        placeholder="Passcode"
                        value={passcode}
                        onChange={(e) => {
                          setPasscode(e.target.value);
                          setError("");
                        }}
                        disabled={isLoading || onlineId.trim().length < 6}
                        className={`h-10 bg-white text-gray-900 border-0 ${onlineId.trim().length < 6 ? "opacity-60" : ""}`}
                      />
                      {error && (
                        <p className="text-sm text-white bg-white/20 rounded px-2 py-1">{error}</p>
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
                    <Link to="/login" className="text-sm text-white underline mt-2 inline-block">Enroll</Link>
                  </div>
                </div>
                <div className="hidden lg:flex flex-1 min-w-0">
                  <img src="/yy.png" alt="Sign in" className="w-full h-auto object-contain rounded-lg shadow-lg" />
                </div>
                <div className="block lg:hidden w-full">
                  <img src="/yy.png" alt="Sign in" className="w-full h-auto object-contain rounded-lg shadow-lg" />
                </div>
              </div>
            )}
          </div>
          {/* Main nav tabs */}
          <nav className="flex gap-1 mt-6 border-b border-gray-200">
            {[
              { name: "Banking", path: "/banking" },
              { name: "Credit Cards", path: "/credit-cards-public" },
              { name: "Loans", path: "/loans" },
              { name: "Investments", path: "/investments-public" },
              { name: "Learning", path: "/learning" },
            ].map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                  activeTab === tab.name ? "border-[#E31837] text-[#E31837]" : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Banking</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/banking" className="hover:text-[#E31837]">Checking</Link></li>
                <li><Link to="/banking" className="hover:text-[#E31837]">Savings & CDs</Link></li>
                <li><Link to="/banking" className="hover:text-[#E31837]">Online Banking</Link></li>
                <li><Link to="/banking" className="hover:text-[#E31837]">Mobile Banking</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Credit Cards</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/credit-cards-public" className="hover:text-[#E31837]">View All Cards</Link></li>
                <li><Link to="/credit-cards-public" className="hover:text-[#E31837]">Cash Back Cards</Link></li>
                <li><Link to="/credit-cards-public" className="hover:text-[#E31837]">Travel Cards</Link></li>
                <li><Link to="/credit-cards-public" className="hover:text-[#E31837]">Rewards Cards</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Loans</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/loans" className="hover:text-[#E31837]">Home Loans</Link></li>
                <li><Link to="/loans" className="hover:text-[#E31837]">Auto Loans</Link></li>
                <li><Link to="/loans" className="hover:text-[#E31837]">Personal Loans</Link></li>
                <li><Link to="/loans" className="hover:text-[#E31837]">Refinance</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">About</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/about" className="hover:text-[#E31837]">About Us</Link></li>
                <li><Link to="/contact-us" className="hover:text-[#E31837]">Contact Us</Link></li>
                <li><Link to="/locations" className="hover:text-[#E31837]">Locations</Link></li>
                <li><Link to="/help" className="hover:text-[#E31837]">Help</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex flex-wrap gap-4">
                <a href="#" className="hover:text-[#E31837]">Privacy</a>
                <a href="#" className="hover:text-[#E31837]">Security</a>
                <a href="#" className="hover:text-[#E31837]">Advertising Practices</a>
                <a href="#" className="hover:text-[#E31837]">Terms & Conditions</a>
              </div>
              <p>Bank of America, N.A. Member FDIC. Equal Housing Lender. © 2026 Bank of America Corporation.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
