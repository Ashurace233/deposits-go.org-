 // Main account data used on the dashboard.
// You can change the names, account numbers, and balances below.
export const accountData = {
  checking: {
    // Name shown on the dashboard for the primary checking account
    name: "Checking Account",
    // Last 4 digits of the account number
    number: "7284",
    // Current balance (edit this to change what shows on login)
    balance: 130.45,
    available: 130.45,
    type: "checking" as const,
  },
  savings: {
    name: "Savings Account",
    number: "7297",
    balance: 5000000,
    available: 5000000,
    type: "savings" as const,
  },
  // Net worth summary amount shown on the dashboard (edit here)
  totalBalance: 5000130.45,
};

// Dashboard summary amounts (edit these to change Credit Cards and Investments on the dashboard)
export const dashboardSummary = {
  creditCardsBalance: 0,
  investmentsBalance: 0,
};

export const transactions = [
  { id: 1, date: "02/18/2026", description: "Direct Deposit - Employer", amount: 12500.0, type: "credit" as const, category: "Income" },
  { id: 2, date: "02/17/2026", description: "Amazon.com", amount: -234.56, type: "debit" as const, category: "Shopping" },
  { id: 3, date: "02/16/2026", description: "Whole Foods Market", amount: -187.32, type: "debit" as const, category: "Groceries" },
  { id: 4, date: "02/15/2026", description: "Transfer from Savings", amount: 5000.0, type: "credit" as const, category: "Transfer" },
  { id: 5, date: "02/14/2026", description: "Netflix Subscription", amount: -22.99, type: "debit" as const, category: "Entertainment" },
  { id: 6, date: "02/13/2026", description: "Shell Gas Station", amount: -65.40, type: "debit" as const, category: "Auto" },
  { id: 7, date: "02/12/2026", description: "Wire Transfer Received", amount: 50000.0, type: "credit" as const, category: "Transfer" },
  { id: 8, date: "02/11/2026", description: "Electric Bill - ConEd", amount: -245.80, type: "debit" as const, category: "Utilities" },
  { id: 9, date: "02/10/2026", description: "Starbucks", amount: -8.75, type: "debit" as const, category: "Dining" },
  { id: 10, date: "02/09/2026", description: "Investment Dividend", amount: 3200.0, type: "credit" as const, category: "Income" },
  { id: 11, date: "02/08/2026", description: "AT&T Wireless", amount: -95.00, type: "debit" as const, category: "Utilities" },
  { id: 12, date: "02/07/2026", description: "Uber Rides", amount: -42.30, type: "debit" as const, category: "Transportation" },
];

export const billPayees = [
  { id: 1, name: "ConEd Electric", accountNumber: "****8832", nextDue: "03/01/2026", amount: 245.80 },
  { id: 2, name: "AT&T Wireless", accountNumber: "****1156", nextDue: "03/05/2026", amount: 95.00 },
  { id: 3, name: "State Farm Insurance", accountNumber: "****4401", nextDue: "03/10/2026", amount: 180.00 },
  { id: 4, name: "Mortgage - Wells Fargo", accountNumber: "****9920", nextDue: "03/01/2026", amount: 3250.00 },
];

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
