// ============================================================================
// SECURITY & COMPLIANCE DASHBOARD
// Comprehensive security monitoring and compliance tracking system
// ============================================================================

import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bug,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Key,
  Lock,
  Mail,
  PieChart,
  RefreshCw,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

// ============================================================================
// INTERFACES
// ============================================================================

interface SecurityMetric {
  id: string;
  title: string;
  value: string | number;
  status: 'secure' | 'warning' | 'critical';
  change: number;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  color: string;
  description: string;
}

interface SecurityIncident {
  id: string;
  type: 'breach_attempt' | 'malware' | 'phishing' | 'ddos' | 'unauthorized_access' | 'data_leak';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  timestamp: string;
  affectedSystems: string[];
  assignedTo?: string;
  source: string;
}

interface ComplianceCheck {
  id: string;
  standard: 'GDPR' | 'CCPA' | 'FERPA' | 'SOC2' | 'ISO27001' | 'HIPAA';
  requirement: string;
  status: 'compliant' | 'non_compliant' | 'partial' | 'pending';
  lastChecked: string;
  nextReview: string;
  evidence: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface SecurityTrend {
  date: string;
  incidents: number;
  blocked: number;
  resolved: number;
}

interface ThreatIntelligence {
  id: string;
  threatType: 'malware' | 'phishing' | 'ransomware' | 'apt' | 'botnet' | 'insider';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  source: string;
  indicators: string[];
  description: string;
  mitigation: string[];
  firstSeen: string;
  lastSeen: string;
  affectedAssets: number;
}

interface VulnerabilityAssessment {
  id: string;
  cve: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  cvssScore: number;
  affectedSystems: string[];
  patchAvailable: boolean;
  exploitAvailable: boolean;
  discoveredDate: string;
  dueDate: string;
  status: 'open' | 'in_progress' | 'patched' | 'mitigated';
  assignedTo: string;
}

interface SecurityPolicy {
  id: string;
  name: string;
  category: 'access_control' | 'data_protection' | 'network_security' | 'incident_response';
  status: 'active' | 'draft' | 'deprecated';
  compliance: string[];
  lastUpdated: string;
  nextReview: string;
  violations: number;
  coverage: number;
}

// ============================================================================
// MOCK DATA GENERATION
// ============================================================================

const generateSecurityMetrics = (): SecurityMetric[] => [
  {
    id: 'threat_detection',
    title: 'Threat Detection Rate',
    value: '99.8%',
    status: 'secure',
    change: 0.3,
    icon: Shield,
    color: 'emerald',
    description: 'AI-powered threat detection accuracy',
  },
  {
    id: 'blocked_attacks',
    title: 'Blocked Attacks',
    value: 1247,
    status: 'secure',
    change: -12.5,
    icon: Lock,
    color: 'blue',
    description: 'Attacks blocked in last 24 hours',
  },
  {
    id: 'vulnerabilities',
    title: 'Open Vulnerabilities',
    value: 3,
    status: 'warning',
    change: -25.0,
    icon: Bug,
    color: 'yellow',
    description: 'Critical vulnerabilities requiring attention',
  },
  {
    id: 'compliance_score',
    title: 'Compliance Score',
    value: '94%',
    status: 'secure',
    change: 2.1,
    icon: CheckCircle,
    color: 'purple',
    description: 'Overall regulatory compliance rating',
  },
  {
    id: 'data_encryption',
    title: 'Data Encryption',
    value: '100%',
    status: 'secure',
    change: 0,
    icon: Key,
    color: 'indigo',
    description: 'Percentage of data encrypted at rest',
  },
  {
    id: 'access_violations',
    title: 'Access Violations',
    value: 12,
    status: 'warning',
    change: 8.3,
    icon: AlertTriangle,
    color: 'orange',
    description: 'Unauthorized access attempts today',
  },
];

const generateSecurityIncidents = (): SecurityIncident[] => [
  {
    id: '1',
    type: 'breach_attempt',
    title: 'SQL Injection Attempt Detected',
    description: 'Automated SQL injection attack blocked by WAF. Source IP: 192.168.1.100',
    severity: 'high',
    status: 'resolved',
    timestamp: '2024-01-15T09:30:00Z',
    affectedSystems: ['Web Application', 'Database'],
    assignedTo: 'Security Team',
    source: '192.168.1.100',
  },
  {
    id: '2',
    type: 'unauthorized_access',
    title: 'Multiple Failed Login Attempts',
    description: 'User account locked after 5 failed login attempts from suspicious IP',
    severity: 'medium',
    status: 'investigating',
    timestamp: '2024-01-15T08:15:00Z',
    affectedSystems: ['Authentication Service'],
    assignedTo: 'John Smith',
    source: '203.0.113.45',
  },
  {
    id: '3',
    type: 'phishing',
    title: 'Phishing Email Campaign Detected',
    description: 'Malicious emails targeting user credentials blocked by email security',
    severity: 'medium',
    status: 'resolved',
    timestamp: '2024-01-15T07:45:00Z',
    affectedSystems: ['Email System'],
    assignedTo: 'Security Team',
    source: 'External',
  },
  {
    id: '4',
    type: 'ddos',
    title: 'DDoS Attack Mitigated',
    description: 'Distributed denial of service attack successfully mitigated by CDN',
    severity: 'high',
    status: 'resolved',
    timestamp: '2024-01-14T22:30:00Z',
    affectedSystems: ['CDN', 'Load Balancer'],
    assignedTo: 'Infrastructure Team',
    source: 'Multiple IPs',
  },
];

const generateComplianceChecks = (): ComplianceCheck[] => [
  {
    id: '1',
    standard: 'GDPR',
    requirement: 'Data Processing Consent',
    status: 'compliant',
    lastChecked: '2024-01-10T10:00:00Z',
    nextReview: '2024-04-10T10:00:00Z',
    evidence: ['Consent Forms', 'Privacy Policy', 'Data Processing Records'],
    riskLevel: 'low',
  },
  {
    id: '2',
    standard: 'FERPA',
    requirement: 'Student Data Protection',
    status: 'compliant',
    lastChecked: '2024-01-08T14:30:00Z',
    nextReview: '2024-04-08T14:30:00Z',
    evidence: ['Access Controls', 'Audit Logs', 'Training Records'],
    riskLevel: 'low',
  },
  {
    id: '3',
    standard: 'SOC2',
    requirement: 'Security Controls',
    status: 'partial',
    lastChecked: '2024-01-05T09:15:00Z',
    nextReview: '2024-02-05T09:15:00Z',
    evidence: ['Security Policies', 'Penetration Test Results'],
    riskLevel: 'medium',
  },
  {
    id: '4',
    standard: 'ISO27001',
    requirement: 'Information Security Management',
    status: 'pending',
    lastChecked: '2023-12-20T16:00:00Z',
    nextReview: '2024-01-20T16:00:00Z',
    evidence: ['ISMS Documentation'],
    riskLevel: 'high',
  },
];

const generateThreatIntelligence = (): ThreatIntelligence[] => [
  {
    id: '1',
    threatType: 'apt',
    severity: 'critical',
    confidence: 95,
    source: 'Threat Intelligence Feed',
    indicators: ['192.168.1.100', 'malicious-domain.com', 'SHA256:abc123...'],
    description: 'Advanced Persistent Threat targeting educational institutions',
    mitigation: ['Block IP ranges', 'Update firewall rules', 'Monitor network traffic'],
    firstSeen: '2024-01-10T08:00:00Z',
    lastSeen: '2024-01-15T10:30:00Z',
    affectedAssets: 3,
  },
  {
    id: '2',
    threatType: 'phishing',
    severity: 'high',
    confidence: 87,
    source: 'Email Security Gateway',
    indicators: ['phishing-email@fake-domain.com', 'suspicious-link.com'],
    description: 'Credential harvesting campaign targeting faculty members',
    mitigation: ['Email filtering', 'User awareness training', 'MFA enforcement'],
    firstSeen: '2024-01-14T12:00:00Z',
    lastSeen: '2024-01-15T09:45:00Z',
    affectedAssets: 12,
  },
];

const generateVulnerabilities = (): VulnerabilityAssessment[] => [
  {
    id: '1',
    cve: 'CVE-2024-0001',
    title: 'Critical SQL Injection in Web Application',
    severity: 'critical',
    cvssScore: 9.8,
    affectedSystems: ['Web Application Server', 'Database Server'],
    patchAvailable: true,
    exploitAvailable: false,
    discoveredDate: '2024-01-10T10:00:00Z',
    dueDate: '2024-01-17T10:00:00Z',
    status: 'in_progress',
    assignedTo: 'Security Team',
  },
  {
    id: '2',
    cve: 'CVE-2024-0002',
    title: 'Cross-Site Scripting (XSS) Vulnerability',
    severity: 'medium',
    cvssScore: 6.1,
    affectedSystems: ['Student Portal'],
    patchAvailable: true,
    exploitAvailable: true,
    discoveredDate: '2024-01-08T14:30:00Z',
    dueDate: '2024-01-22T14:30:00Z',
    status: 'open',
    assignedTo: 'Development Team',
  },
];

const generateSecurityPolicies = (): SecurityPolicy[] => [
  {
    id: '1',
    name: 'Password Policy',
    category: 'access_control',
    status: 'active',
    compliance: ['NIST', 'ISO27001'],
    lastUpdated: '2024-01-01T09:00:00Z',
    nextReview: '2024-07-01T09:00:00Z',
    violations: 23,
    coverage: 98,
  },
  {
    id: '2',
    name: 'Data Classification Policy',
    category: 'data_protection',
    status: 'active',
    compliance: ['GDPR', 'FERPA'],
    lastUpdated: '2023-12-15T10:00:00Z',
    nextReview: '2024-06-15T10:00:00Z',
    violations: 5,
    coverage: 95,
  },
];

// ============================================================================
// SECURITY COMPLIANCE DASHBOARD COMPONENT
// ============================================================================

const SecurityComplianceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [compliance, setCompliance] = useState<ComplianceCheck[]>([]);
  const [threats, setThreats] = useState<ThreatIntelligence[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityAssessment[]>([]);
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [activeTab] = useState('overview');

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetrics(generateSecurityMetrics());
      setIncidents(generateSecurityIncidents());
      setCompliance(generateComplianceChecks());
      setThreats(generateThreatIntelligence());
      setVulnerabilities(generateVulnerabilities());
      setPolicies(generateSecurityPolicies());
      setIsLoading(false);
    };

    loadData();

    // Auto-refresh every 30 seconds
    const interval = autoRefresh ? setInterval(loadData, 30000) : null;
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  // ============================================================================
  // RENDER FUNCTIONS
  // ============================================================================

  const renderThreatIntelligence = (threat: ThreatIntelligence) => {
    const severityColors = {
      low: 'blue',
      medium: 'yellow',
      high: 'orange',
      critical: 'red',
    };

    const threatTypeIcons = {
      malware: Bug,
      phishing: Mail,
      ransomware: Lock,
      apt: Shield,
      botnet: Globe,
      insider: Users,
    };

    const ThreatIcon = threatTypeIcons[threat.threatType];

    return (
      <motion.div
        key={threat.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 border-l-4 border-${severityColors[threat.severity]}-500 bg-white dark:bg-slate-800 rounded-r-xl`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <ThreatIcon size={20} className={`text-${severityColors[threat.severity]}-500 mt-0.5`} />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-slate-900 dark:text-white capitalize">
                  {threat.threatType.replace('_', ' ')} Threat
                </h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${severityColors[threat.severity]}-100 text-${severityColors[threat.severity]}-800 dark:bg-${severityColors[threat.severity]}-900/30 dark:text-${severityColors[threat.severity]}-300`}>
                  {threat.severity}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {threat.confidence}% confidence
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                {threat.description}
              </p>
              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                <div>Source: {threat.source}</div>
                <div>Affected Assets: {threat.affectedAssets}</div>
                <div>First Seen: {new Date(threat.firstSeen).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderVulnerability = (vuln: VulnerabilityAssessment) => {
    const severityColors = {
      low: 'blue',
      medium: 'yellow',
      high: 'orange',
      critical: 'red',
    };

    const statusColors = {
      open: 'red',
      in_progress: 'yellow',
      patched: 'emerald',
      mitigated: 'blue',
    };

    return (
      <motion.div
        key={vuln.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                {vuln.cve}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded bg-${severityColors[vuln.severity]}-100 text-${severityColors[vuln.severity]}-800 dark:bg-${severityColors[vuln.severity]}-900/30 dark:text-${severityColors[vuln.severity]}-300`}>
                CVSS {vuln.cvssScore}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded bg-${statusColors[vuln.status]}-100 text-${statusColors[vuln.status]}-800 dark:bg-${statusColors[vuln.status]}-900/30 dark:text-${statusColors[vuln.status]}-300`}>
                {vuln.status.replace('_', ' ')}
              </span>
            </div>
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">
              {vuln.title}
            </h4>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
          <div>
            <span className="font-medium">Affected Systems:</span>
            <div className="text-xs mt-1">{vuln.affectedSystems.join(', ')}</div>
          </div>
          <div>
            <span className="font-medium">Assigned To:</span>
            <div className="text-xs mt-1">{vuln.assignedTo}</div>
          </div>
          <div>
            <span className="font-medium">Due Date:</span>
            <div className="text-xs mt-1">{new Date(vuln.dueDate).toLocaleDateString()}</div>
          </div>
          <div className="flex items-center space-x-2">
            {vuln.patchAvailable && (
              <span className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded">
                Patch Available
              </span>
            )}
            {vuln.exploitAvailable && (
              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded">
                Exploit Available
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSecurityPolicy = (policy: SecurityPolicy) => {
    const categoryColors = {
      access_control: 'blue',
      data_protection: 'emerald',
      network_security: 'purple',
      incident_response: 'orange',
    };

    const statusColors = {
      active: 'emerald',
      draft: 'yellow',
      deprecated: 'red',
    };

    return (
      <motion.div
        key={policy.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-${categoryColors[policy.category]}-100 dark:bg-${categoryColors[policy.category]}-900/30 rounded-lg`}>
            <FileText size={16} className={`text-${categoryColors[policy.category]}-600 dark:text-${categoryColors[policy.category]}-400`} />
          </div>
          <div>
            <h4 className="font-medium text-slate-900 dark:text-white">
              {policy.name}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
              <span className="capitalize">{policy.category.replace('_', ' ')}</span>
              <span>•</span>
              <span>{policy.coverage}% coverage</span>
              <span>•</span>
              <span>{policy.violations} violations</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className={`px-2 py-1 text-xs font-medium rounded bg-${statusColors[policy.status]}-100 text-${statusColors[policy.status]}-800 dark:bg-${statusColors[policy.status]}-900/30 dark:text-${statusColors[policy.status]}-300 mb-1 block`}>
            {policy.status}
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Next review: {new Date(policy.nextReview).toLocaleDateString()}
          </p>
        </div>
      </motion.div>
    );
  };

  const renderSecurityMetric = (metric: SecurityMetric) => {
    const Icon = metric.icon;
    const statusColors = {
      secure: 'emerald',
      warning: 'yellow',
      critical: 'red',
    };

    const isPositive = metric.change > 0;
    const changeColor = metric.id === 'blocked_attacks' || metric.id === 'vulnerabilities' ? !isPositive : isPositive;

    return (
      <motion.div
        key={metric.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={`bg-gradient-to-br from-white to-${metric.color}-50 dark:from-slate-800 dark:to-${metric.color}-900/20 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600 rounded-xl shadow-lg`}>
            <Icon size={24} className="text-white" />
          </div>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-${statusColors[metric.status]}-100 text-${statusColors[metric.status]}-800 dark:bg-${statusColors[metric.status]}-900/30 dark:text-${statusColors[metric.status]}-300`}>
            <div className={`w-2 h-2 rounded-full bg-${statusColors[metric.status]}-500`}></div>
            <span className="capitalize">{metric.status}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {metric.title}
          </h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {metric.value}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {metric.description}
            </p>
            <div className={`flex items-center space-x-1 text-xs ${
              changeColor ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {changeColor ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{Math.abs(metric.change)}%</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderIncident = (incident: SecurityIncident) => {
    const typeColors = {
      breach_attempt: 'red',
      malware: 'red',
      phishing: 'orange',
      ddos: 'red',
      unauthorized_access: 'yellow',
      data_leak: 'red',
    };

    const severityColors = {
      low: 'blue',
      medium: 'yellow',
      high: 'orange',
      critical: 'red',
    };

    const statusColors = {
      open: 'red',
      investigating: 'yellow',
      resolved: 'emerald',
      closed: 'slate',
    };

    return (
      <motion.div
        key={incident.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 border-l-4 border-${typeColors[incident.type]}-500 bg-white dark:bg-slate-800 rounded-r-xl`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-medium text-slate-900 dark:text-white">
                {incident.title}
              </h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${severityColors[incident.severity]}-100 text-${severityColors[incident.severity]}-800 dark:bg-${severityColors[incident.severity]}-900/30 dark:text-${severityColors[incident.severity]}-300`}>
                {incident.severity}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${statusColors[incident.status]}-100 text-${statusColors[incident.status]}-800 dark:bg-${statusColors[incident.status]}-900/30 dark:text-${statusColors[incident.status]}-300`}>
                {incident.status}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {incident.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
              <span>Source: {incident.source}</span>
              <span>Systems: {incident.affectedSystems.join(', ')}</span>
              {incident.assignedTo && <span>Assigned: {incident.assignedTo}</span>}
              <span>{new Date(incident.timestamp).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderComplianceCheck = (check: ComplianceCheck) => {
    const statusColors = {
      compliant: 'emerald',
      non_compliant: 'red',
      partial: 'yellow',
      pending: 'blue',
    };

    const riskColors = {
      low: 'emerald',
      medium: 'yellow',
      high: 'red',
    };

    return (
      <motion.div
        key={check.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded">
                {check.standard}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded bg-${statusColors[check.status]}-100 text-${statusColors[check.status]}-800 dark:bg-${statusColors[check.status]}-900/30 dark:text-${statusColors[check.status]}-300`}>
                {check.status.replace('_', ' ')}
              </span>
            </div>
            <h4 className="font-medium text-slate-900 dark:text-white">
              {check.requirement}
            </h4>
          </div>
          <div className={`px-2 py-1 text-xs font-medium rounded bg-${riskColors[check.riskLevel]}-100 text-${riskColors[check.riskLevel]}-800 dark:bg-${riskColors[check.riskLevel]}-900/30 dark:text-${riskColors[check.riskLevel]}-300`}>
            {check.riskLevel} risk
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <Clock size={14} />
            <span>Last checked: {new Date(check.lastChecked).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={14} />
            <span>Next review: {new Date(check.nextReview).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FileText size={14} />
            <span>Evidence: {check.evidence.join(', ')}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // ============================================================================
  // LOADING STATE
  // ============================================================================

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="mx-auto mb-4 p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full"
          >
            <Shield size={32} className="text-white" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Loading Security Data
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Analyzing security posture and compliance status...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="space-y-8">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Security & Compliance Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Real-time security monitoring and regulatory compliance tracking
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              autoRefresh
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
            }`}
          >
            <RefreshCw size={16} className={autoRefresh ? 'animate-spin' : ''} />
            <span className="text-sm">Auto Refresh</span>
          </button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {metrics.map(renderSecurityMetric)}
      </div>

      {/* Security Incidents and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Security Incidents */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Security Incidents
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Recent security events and threats
                </p>
              </div>
            </div>

            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              View All
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {incidents.map(renderIncident)}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Compliance Status
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Regulatory compliance tracking
                </p>
              </div>
            </div>

            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Full Report
            </button>
          </div>

          <div className="space-y-4">
            {compliance.map(renderComplianceCheck)}
          </div>
        </div>
      </div>

      {/* Threat Intelligence and Vulnerabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Intelligence */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Threat Intelligence
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Active threats and indicators
                </p>
              </div>
            </div>

            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              View All
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {threats.map(renderThreatIntelligence)}
          </div>
        </div>

        {/* Vulnerability Assessment */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                <Bug size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Vulnerability Assessment
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Critical vulnerabilities requiring attention
                </p>
              </div>
            </div>

            <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Scan Report
            </button>
          </div>

          <div className="space-y-4">
            {vulnerabilities.map(renderVulnerability)}
          </div>
        </div>
      </div>

      {/* Security Policies */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Security Policies
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Policy compliance and coverage status
              </p>
            </div>
          </div>

          <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
            Manage Policies
          </button>
        </div>

        <div className="space-y-4">
          {policies.map(renderSecurityPolicy)}
        </div>
      </div>

      {/* Security Trends Chart Placeholder */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
              <BarChart3 size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Security Trends
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Historical security metrics and incident patterns
              </p>
            </div>
          </div>
        </div>

        <div className="text-center py-8">
          <div className="flex justify-center space-x-4 mb-6">
            <Activity size={32} className="text-blue-500" />
            <BarChart3 size={32} className="text-purple-500" />
            <PieChart size={32} className="text-indigo-500" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
            Security Analytics Charts
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Interactive security trend analysis and threat intelligence visualization
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityComplianceDashboard;
