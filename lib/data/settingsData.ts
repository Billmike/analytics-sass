export interface SettingsData {
  general: {
    companyName: string;
    timezone: string;
    dateFormat: string;
    defaultCurrency: string;
    fiscalYearStart: string;
  };
  notifications: {
    emailNotifications: boolean;
    dailyReports: boolean;
    weeklyReports: boolean;
    monthlyReports: boolean;
    supportAlerts: boolean;
    securityAlerts: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiration: number;
    ipWhitelist: string[];
    lastPasswordChange: Date;
    lastSecurityAudit: Date;
  };
  display: {
    defaultTheme: 'light' | 'dark';
    compactMode: boolean;
    animationsEnabled: boolean;
    showTips: boolean;
  };
  integrations: Array<{
    id: string;
    name: string;
    status: 'connected' | 'disconnected';
    lastSync?: Date;
    type: 'crm' | 'payment' | 'email' | 'analytics';
  }>;
  team: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'invited' | 'disabled';
    lastActive?: Date;
    permissions: string[];
  }>;
}

export const generateSettingsData = (): SettingsData => {
  return {
    general: {
      companyName: "Acme Corp",
      timezone: "America/New_York",
      dateFormat: "MM/DD/YYYY",
      defaultCurrency: "USD",
      fiscalYearStart: "01/01"
    },
    notifications: {
      emailNotifications: true,
      dailyReports: true,
      weeklyReports: true,
      monthlyReports: false,
      supportAlerts: true,
      securityAlerts: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordExpiration: 90,
      ipWhitelist: ["192.168.1.1", "10.0.0.1"],
      lastPasswordChange: new Date("2024-01-15"),
      lastSecurityAudit: new Date("2024-02-01")
    },
    display: {
      defaultTheme: 'light',
      compactMode: false,
      animationsEnabled: true,
      showTips: true
    },
    integrations: [
      {
        id: "int-001",
        name: "Salesforce",
        status: "connected",
        lastSync: new Date("2024-03-01"),
        type: "crm"
      },
      {
        id: "int-002",
        name: "Stripe",
        status: "connected",
        lastSync: new Date("2024-03-01"),
        type: "payment"
      },
      {
        id: "int-003",
        name: "Mailchimp",
        status: "disconnected",
        type: "email"
      },
      {
        id: "int-004",
        name: "Google Analytics",
        status: "connected",
        lastSync: new Date("2024-03-01"),
        type: "analytics"
      }
    ],
    team: [
      {
        id: "usr-001",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "active",
        lastActive: new Date("2024-03-01"),
        permissions: ["all"]
      },
      {
        id: "usr-002",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Manager",
        status: "active",
        lastActive: new Date("2024-03-01"),
        permissions: ["view", "edit"]
      },
      {
        id: "usr-003",
        name: "Bob Wilson",
        email: "bob@example.com",
        role: "Analyst",
        status: "invited",
        permissions: ["view"]
      }
    ]
  };
};