import React, { useState } from 'react';
import { 
  Play, 
  Cpu, 
  Zap, 
  Workflow, 
  Check, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  X,
  Sparkles,
  Users
} from 'lucide-react';
import saasHeroImg from '../assets/images/demo_saas_dashboard_abstract_1793552555356.jpg';

export const SaaSDemo: React.FC = () => {
  // Workflow Simulator State
  const [triggerSource, setTriggerSource] = useState<'stripe' | 'hubspot' | 'form'>('form');
  const [enrichmentModel, setEnrichmentModel] = useState<'gemini' | 'firmographic' | 'intent'>('gemini');
  const [actionDestination, setActionDestination] = useState<'slack' | 'salesforce' | 'email'>('slack');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<any | null>(null);

  // Pricing & ROI Calculator State
  const [teamSeats, setTeamSeats] = useState(15);
  const [monthlyRuns, setMonthlyRuns] = useState(50000);

  // Trial Modal State
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [trialSuccess, setTrialSuccess] = useState(false);
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationLogs(['Initializing secure sandbox execution container...']);
    setSimulationResult(null);

    setTimeout(() => {
      setSimulationLogs(prev => [
        ...prev,
        `[0ms] Inbound payload caught from trigger: ${triggerSource.toUpperCase()}`,
        `[12ms] Parsing schema and validating auth headers: OK`
      ]);
    }, 400);

    setTimeout(() => {
      setSimulationLogs(prev => [
        ...prev,
        `[24ms] Dispatching to AI model: ${enrichmentModel.toUpperCase()} (latency: 18ms)`,
        `[38ms] Generated lead propensity score: 96/100 (HIGH INTENT)`
      ]);
    }, 850);

    setTimeout(() => {
      setSimulationLogs(prev => [
        ...prev,
        `[52ms] Executed downstream sink: ${actionDestination.toUpperCase()}`,
        `[60ms] Pipeline executed successfully with 0 dropped events.`
      ]);
      setSimulationResult({
        status: 'SUCCESS',
        latencyMs: 60,
        leadScore: 96,
        routedTier: 'Enterprise VIP SDR',
        timestamp: new Date().toISOString()
      });
      setIsSimulating(false);
    }, 1300);
  };

  // Pricing calculations
  const calculatedTier = teamSeats <= 10 && monthlyRuns <= 25000 
    ? { name: 'Starter', price: 49, extra: 'Ideal for early-stage teams' }
    : teamSeats <= 40 && monthlyRuns <= 100000 
    ? { name: 'Growth Pro', price: 179, extra: 'Our most popular scaling tier' }
    : { name: 'Enterprise Scale', price: 499, extra: 'Dedicated clusters & 99.99% SLA' };

  const hoursSavedPerWeek = Math.round((monthlyRuns / 1000) * 1.8 + teamSeats * 2.5);
  const estimatedDollarsSaved = hoursSavedPerWeek * 65 * 4;

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrialSuccess(true);
    setTimeout(() => {
      setTrialSuccess(false);
      setIsTrialOpen(false);
      setWorkEmail('');
      setCompanyName('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-[#E1E7EF] font-sans selection:bg-[#2563EB] selection:text-white">
      {/* Top Banner */}
      <div className="bg-[#0F172A] border-b border-[#1E293B] text-xs py-2 px-4 text-center font-medium text-[#94A3B8] flex items-center justify-center gap-2">
        <span>PulseFlow 3.0 Live Engine</span>
        <span aria-hidden="true">·</span>
        <span>Sub-50ms Global Event Latency</span>
        <span aria-hidden="true">·</span>
        <span className="text-[#38BDF8]">SOC-2 Type II Certified</span>
      </div>

      {/* Header */}
      <header className="border-b border-[#1E293B] bg-[#090D16]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              PulseFlow
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold text-[#94A3B8]">
            <a href="#pipeline-demo" className="hover:text-white transition-colors">Interactive Pipeline</a>
            <a href="#features" className="hover:text-white transition-colors">Architecture</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing & ROI</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTrialOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm shadow-blue-600/30"
            >
              Start Free 14-Day Trial
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-[#1E293B] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] tracking-wide bg-[#0F172A] px-3 py-1 rounded-md border border-[#1E293B]">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-Time Event Processing Engine</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Automate enterprise data workflows in sub-second milliseconds.
            </h1>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-xl leading-relaxed">
              Connect incoming customer signals, score lead intent with embedded AI models, and dispatch enriched payloads directly into your CRM, data warehouse, and Slack.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsTrialOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/25"
              >
                Launch Production Cluster
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#pipeline-demo"
                className="border border-[#334155] text-white px-5 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#1E293B] transition-colors inline-flex items-center gap-2"
              >
                <Workflow className="w-4 h-4 text-[#38BDF8]" />
                Try Interactive Pipeline
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1E293B]">
              <div>
                <div className="font-mono text-xl font-bold text-white">&lt;50ms</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">Pipeline Latency</div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-white">Zero-Code</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">Webhook Connections</div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-white">99.9%</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">Target Availability SLA</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-[#1E293B] shadow-2xl aspect-4/3 relative bg-[#0F172A]">
              <img
                src={saasHeroImg}
                alt="PulseFlow visual automation architecture"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Builder Demo */}
      <section id="pipeline-demo" className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider mb-1">
            Live Sandbox Environment
          </div>
          <h2 className="font-display text-3xl font-bold text-white">
            Build & Test an Automation Pipeline
          </h2>
          <p className="text-sm text-[#94A3B8] mt-1">
            Configure the trigger, intelligence node, and downstream action below, then run the simulation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Builder Controls */}
          <div className="lg:col-span-6 space-y-6 bg-[#0F172A] border border-[#1E293B] rounded-xl p-6">
            {/* Step 1 */}
            <div>
              <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-400 flex items-center justify-center text-[10px]">1</span>
                Inbound Signal Trigger
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'form', label: 'Lead Form Submission' },
                  { id: 'stripe', label: 'Stripe Checkout Hook' },
                  { id: 'hubspot', label: 'CRM Lifecycle Change' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setTriggerSource(item.id as any)}
                    className={`p-3 text-left rounded-lg border text-xs transition-colors ${
                      triggerSource === item.id
                        ? 'border-blue-500 bg-blue-950/40 text-white font-medium shadow-xs'
                        : 'border-[#1E293B] bg-[#090D16] text-[#94A3B8] hover:border-[#334155]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-400 flex items-center justify-center text-[10px]">2</span>
                Real-Time AI Enrichment Node
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gemini', label: 'Propensity & Qualification' },
                  { id: 'firmographic', label: 'Company Revenue Enrichment' },
                  { id: 'intent', label: 'Urgency & Sentiment Rank' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setEnrichmentModel(item.id as any)}
                    className={`p-3 text-left rounded-lg border text-xs transition-colors ${
                      enrichmentModel === item.id
                        ? 'border-indigo-500 bg-indigo-950/40 text-white font-medium shadow-xs'
                        : 'border-[#1E293B] bg-[#090D16] text-[#94A3B8] hover:border-[#334155]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-900/60 text-blue-400 flex items-center justify-center text-[10px]">3</span>
                Downstream Action Dispatch
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'slack', label: 'Alert VIP SDR Channel' },
                  { id: 'salesforce', label: 'Create Opportunity in CRM' },
                  { id: 'email', label: 'Send Dynamic Email Campaign' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActionDestination(item.id as any)}
                    className={`p-3 text-left rounded-lg border text-xs transition-colors ${
                      actionDestination === item.id
                        ? 'border-cyan-500 bg-cyan-950/40 text-white font-medium shadow-xs'
                        : 'border-[#1E293B] bg-[#090D16] text-[#94A3B8] hover:border-[#334155]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={runSimulation}
              disabled={isSimulating}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-600/30"
            >
              {isSimulating ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  Executing Pipeline Simulation...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  Run Live Pipeline Simulation
                </>
              )}
            </button>
          </div>

          {/* Real-time Terminal Output */}
          <div className="lg:col-span-6 bg-[#090D16] border border-[#1E293B] rounded-xl p-6 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E293B]">
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <Terminal className="w-4 h-4 text-[#38BDF8]" />
                <span>telemetry_stream.log</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">READY</span>
            </div>

            <div className="space-y-2 min-h-[220px] max-h-[300px] overflow-y-auto text-[#94A3B8]">
              {simulationLogs.length === 0 ? (
                <div className="text-neutral-500 py-12 text-center">
                  Click "Run Live Pipeline Simulation" to view execution traces and performance metrics.
                </div>
              ) : (
                simulationLogs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-blue-400">›</span> {log}
                  </div>
                ))
              )}
            </div>

            {simulationResult && (
              <div className="mt-4 pt-4 border-t border-[#1E293B] bg-[#0F172A] p-3 rounded-lg text-emerald-300">
                <div className="font-bold flex items-center justify-between">
                  <span>PAYLOAD DELIVERED</span>
                  <span className="text-white font-mono">{simulationResult.latencyMs}ms</span>
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-1">
                  Routing: {simulationResult.routedTier} · Score: {simulationResult.leadScore}/100
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Pricing & ROI Calculator */}
      <section id="pricing" className="border-y border-[#1E293B] bg-[#0F172A] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-2 mb-10">
            <div className="text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
              Transparent Scalability
            </div>
            <h2 className="font-display text-3xl font-bold text-white">
              Interactive ROI & Plan Calculator
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
              Calculate your projected engineering hours saved and optimal infrastructure tier.
            </p>
          </div>

          <div className="bg-[#090D16] border border-[#1E293B] rounded-xl p-8 shadow-xl space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Slider 1: Team Seats */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-white">Active Team Seats</span>
                  <span className="font-mono text-blue-400 font-bold">{teamSeats} seats</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={teamSeats}
                  onChange={e => setTeamSeats(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="text-[11px] text-[#94A3B8] mt-1">SDRs, RevOps engineers, and marketing operators</div>
              </div>

              {/* Slider 2: Monthly Events */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-white">Monthly Events Processed</span>
                  <span className="font-mono text-blue-400 font-bold">{monthlyRuns.toLocaleString()} events</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="10000"
                  value={monthlyRuns}
                  onChange={e => setMonthlyRuns(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="text-[11px] text-[#94A3B8] mt-1">Webhooks, form posts, and API triggers</div>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#1E293B]">
              <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                <div className="text-xs text-[#94A3B8]">Recommended Tier</div>
                <div className="font-display text-lg font-bold text-white mt-1">{calculatedTier.name}</div>
                <div className="text-xs font-mono text-blue-400 font-bold mt-0.5">${calculatedTier.price}/month</div>
              </div>

              <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                <div className="text-xs text-[#94A3B8]">Manual Hours Saved</div>
                <div className="font-mono text-xl font-bold text-white mt-1">{hoursSavedPerWeek} hrs</div>
                <div className="text-xs text-emerald-400 mt-0.5">Every single week</div>
              </div>

              <div className="bg-[#0F172A] p-4 rounded-lg border border-[#1E293B]">
                <div className="text-xs text-[#94A3B8]">Projected Monthly ROI</div>
                <div className="font-mono text-xl font-bold text-emerald-400 mt-1">${estimatedDollarsSaved.toLocaleString()}</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">In recovered engineering capacity</div>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setIsTrialOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors shadow-lg shadow-blue-600/30"
              >
                Start 14-Day Free Trial on {calculatedTier.name}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Free Trial Modal */}
      {isTrialOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-[#E1E7EF]">
            <button
              onClick={() => setIsTrialOpen(false)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <h3 className="font-display text-xl font-bold text-white">
                Start Your 14-Day Free Trial
              </h3>
            </div>
            <p className="text-xs text-[#94A3B8] mb-6">
              Instant cluster deployment. No credit card required. Full API access.
            </p>

            {trialSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-display text-xl font-bold text-white">Cluster Provisioned!</div>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
                  A verification link and initial API key have been sent to <span className="text-white font-mono">{workEmail}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTrialSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#94A3B8] block mb-1">Company Work Email</label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={e => setWorkEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full text-xs px-3 py-2.5 bg-[#090D16] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#94A3B8] block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Acme Cloud Systems"
                    className="w-full text-xs px-3 py-2.5 bg-[#090D16] border border-[#1E293B] rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Deploy Sandbox Cluster
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#1E293B] bg-[#090D16] text-[#64748B] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm text-white">PulseFlow</span>
            <span>·</span>
            <span>San Francisco, CA</span>
          </div>
          <div>© 2026 PulseFlow Technologies Inc. High-throughput automation engine.</div>
        </div>
      </footer>
    </div>
  );
};
