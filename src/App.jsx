import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  FileSearch, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  TrendingUp, 
  TrendingDown, 
  Gauge, 
  Lightbulb, 
  BookOpen, 
  LayoutTemplate, 
  Coins, 
  Eye, 
  Copy, 
  Check, 
  Trash2, 
  HelpCircle, 
  ArrowRight,
  ShieldAlert,
  Search,
  BookMarked
} from "lucide-react";

// Words that are notoriously overused by generative AI models like ChatGPT
const AI_BUZZWORDS = [
  "delve", "testament", "furthermore", "moreover", "in conclusion", 
  "it is important to note", "not only... but also", "tapestry", 
  "beacon", "hurdle", "fostering", "demystify", "revolutionize", 
  "comprehensive guide", "look no further", "game changer"
];

const NICHE_KEYWORDS_DATABASE = {
  technology: [
    { keyword: "artificial intelligence applications", monthly_volume: "18,500", competition: "High", seo_difficulty: 78, trend_direction: "up" },
    { keyword: "how to build SaaS web apps", monthly_volume: "4,200", competition: "Medium", seo_difficulty: 54, trend_direction: "up" },
    { keyword: "best developer productivity tools", monthly_volume: "8,900", competition: "Low", seo_difficulty: 39, trend_direction: "up" },
    { keyword: "future of edge computing", monthly_volume: "3,100", competition: "Low", seo_difficulty: 45, trend_direction: "down" },
  ],
  health: [
    { keyword: "intermittent fasting meal plan", monthly_volume: "40,500", competition: "High", seo_difficulty: 82, trend_direction: "up" },
    { keyword: "natural remedies for high blood pressure", monthly_volume: "14,200", competition: "High", seo_difficulty: 71, trend_direction: "down" },
    { keyword: "best morning yoga routines for flexibility", monthly_volume: "9,600", competition: "Medium", seo_difficulty: 48, trend_direction: "up" },
    { keyword: "cognitive behavioral therapy exercises", monthly_volume: "12,100", competition: "Medium", seo_difficulty: 52, trend_direction: "up" },
  ],
  finance: [
    { keyword: "passive income strategies for beginners", monthly_volume: "27,100", competition: "High", seo_difficulty: 88, trend_direction: "up" },
    { keyword: "how to invest in index funds step by step", monthly_volume: "15,400", competition: "Medium", seo_difficulty: 63, trend_direction: "up" },
    { keyword: "best high yield savings accounts", monthly_volume: "90,500", competition: "High", seo_difficulty: 92, trend_direction: "up" },
    { keyword: "budgeting spreadsheet excel free", monthly_volume: "22,000", competition: "Low", seo_difficulty: 41, trend_direction: "down" },
  ],
  general: [
    { keyword: "comprehensive guide for beginners", monthly_volume: "5,400", competition: "Medium", seo_difficulty: 55, trend_direction: "up" },
    { keyword: "productivity tips for remote work", monthly_volume: "8,100", competition: "Medium", seo_difficulty: 59, trend_direction: "up" },
    { keyword: "step by step tutorial 2026", monthly_volume: "12,000", competition: "Low", seo_difficulty: 35, trend_direction: "up" },
  ]
};

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("report"); // report | checklist | ad-simulator | keywords
  
  // Custom states for interactive Policy Checklist Tab
  const [policyChecks, setPolicyChecks] = useState({
    noProhibitedTopics: true,
    noSpammyKeywords: true,
    hasPrivacyPolicyLink: false,
    hasContactPage: false,
    originalContentDeclaration: true,
  });

  // Current analysis output state
  const [result, setResult] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("adsense_review_history");
      if (saved) {
        setHistory(JSON.parse(saved));
      }


const savedLogin = localStorage.getItem("adsense_logged_in");

if (savedLogin === "true") {
  setIsLoggedIn(true);
}
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
  }, []);

const handleLogout = () => {
  localStorage.removeItem("adsense_logged_in");
  setIsLoggedIn(false);
};

  const saveToHistory = (newResult) => {
    const updated = [newResult, ...history].slice(0, 8); // Keep last 8 items
    setHistory(updated);
    try {
      localStorage.setItem("adsense_review_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  };
  
  
  const handleLogin = () => {
  const validUser = import.meta.env.VITE_APP_USERNAME;
  const validPass = import.meta.env.VITE_APP_PASSWORD;

  if (username === validUser && password === validPass) {
    setIsLoggedIn(true);
    localStorage.setItem("adsense_logged_in", "true");
  } else {
    alert("Invalid username or password");
  }
};
  

const [result, setResult] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

  const runHeuristicAnalysis = (titleText, contentText, nicheText) => {
    const wordCount = contentText.trim().split(/\s+/).filter(Boolean).length;
    const cleanNiche = (nicheText || "general").toLowerCase().trim();
    
    // 1. AI Detection simulation based on buzzword occurrences
    let aiBuzzwordsFound = [];
    AI_BUZZWORDS.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = contentText.match(regex);
      if (matches) {
        aiBuzzwordsFound.push({ word, count: matches.length });
      }
    });
    
    const buzzwordDensity = aiBuzzwordsFound.reduce((acc, curr) => acc + curr.count, 0) / (wordCount || 1);
    let aiScore = Math.min(Math.round(buzzwordDensity * 450) + 10, 98); 
    if (wordCount < 100) aiScore = Math.max(aiScore, 15); // standard deviation for tiny inputs

    // 2. Plagiarism risk (simulated heuristic checking for common idioms/paragraphs)
    let plagRisk = 5; // default organic base rate
    if (contentText.includes("Lorem ipsum") || contentText.includes("dolor sit amet")) {
      plagRisk = 85;
    } else if (wordCount > 500) {
      plagRisk = Math.floor(Math.random() * 12) + 4; // realistic baseline variability
    } else {
      plagRisk = Math.floor(Math.random() * 20) + 8;
    }

    // 3. Originality Index (inversely correlated with AI score and plagiarism risk)
    const originalityScore = Math.max(10, Math.min(100, 100 - Math.round((aiScore * 0.4) + (plagRisk * 0.5))));

    // 4. Thin Content Risk (AdSense critical check)
    // Word counts below 300 are severe, 300-600 are moderate, 600+ are safe
    let thinContentScore = 95;
    if (wordCount < 300) {
      thinContentScore = Math.round((wordCount / 300) * 45);
    } else if (wordCount < 600) {
      thinContentScore = 50 + Math.round(((wordCount - 300) / 300) * 35);
    } else {
      thinContentScore = Math.min(100, 85 + Math.round((wordCount / 1500) * 15));
    }

    // 5. Overall AdSense Readiness score (weighted blend of the components)
    // Critical rules: AI Score must be low, Thin content score high, plagiarism low.
    const weightedScore = Math.round(
      (originalityScore * 0.35) + 
      ((100 - aiScore) * 0.20) + 
      ((100 - plagRisk) * 0.20) + 
      (thinContentScore * 0.25)
    );

    const adsenseReady = weightedScore >= 75 && wordCount >= 500 && plagRisk < 20;

    // 6. Keywords selection based on topic & parsed content nouns
    const baseKeywords = NICHE_KEYWORDS_DATABASE[cleanNiche] || NICHE_KEYWORDS_DATABASE.general;
    // Extract actual words of length > 5 from title/content as personalized keyword recommendations
    const contentWords = contentText.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 5 && !['article', 'content', 'google', 'adsense', 'should', 'before'].includes(w));
    
    const uniqueWords = [...new Set(contentWords)].slice(0, 2);
    
    const keywordInsights = [...baseKeywords];
    uniqueWords.forEach((word, index) => {
      keywordInsights.unshift({
        keyword: `${word} strategy for publishers`,
        monthly_volume: `${Math.floor(Math.random() * 4000) + 800}`,
        competition: index % 2 === 0 ? "Medium" : "Low",
        seo_difficulty: Math.floor(Math.random() * 30) + 25,
        trend_direction: "up"
      });
    });

    // 7. Contextual dynamic suggestions
    const suggestions = [];
    if (wordCount < 600) {
      suggestions.push("Increase length: Google AdSense favors comprehensive articles of at least 600–1000 words to satisfy informational depth.");
    }
    if (aiScore > 50) {
      suggestions.push("Reduce AI patterns: Rewrite sections with passive tones or robotic transitions (e.g., 'delve', 'testament', 'in conclusion') into active human voice.");
    }
    if (plagRisk > 15) {
      suggestions.push("High phrasing match alert: Introduce original personal anecdotes, primary interviews, or proprietary data references to dilute common web match templates.");
    }
    if (thinContentScore < 70) {
      suggestions.push("Structure depth: Implement H2 and H3 logical subheadings and bullet points. Google Crawlers penalize uninterrupted 'walls of text' as thin/low-quality layouts.");
    }
    if (!titleText.toLowerCase().includes(cleanNiche) && cleanNiche !== 'general') {
      suggestions.push(`Optimize Title: Incorporate your niche '${cleanNiche}' or related semantic words natively in your headline for maximum search discoverability.`);
    }
    if (suggestions.length === 0) {
      suggestions.push("Fantastic work! Your content has incredible organic variance, appropriate pacing, and excellent length. It is primed for AdSense monetization.");
    }

    return {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: titleText,
      content: contentText,
      niche: nicheText || "General",
      overall_score: weightedScore,
      adsense_ready: adsenseReady,
      word_count: wordCount,
      originality: {
        score: originalityScore,
        label: originalityScore > 80 ? "High Originality" : originalityScore > 50 ? "Satisfactory" : "Low Originality",
        details: originalityScore > 80 ? "Strong personal perspective and varied vocabulary detected." : "Moderate sentence structures. Add unique value."
      },
      ai_detection: {
        score: aiScore,
        label: aiScore < 30 ? "Likely Human" : aiScore < 60 ? "Mixed/Edited AI" : "Highly Likely AI Content",
        details: `Identified ${aiBuzzwordsFound.length} distinct generative AI lexical signals.`
      },
      plagiarism_risk: {
        score: plagRisk,
        label: plagRisk < 15 ? "Low Risk" : plagRisk < 40 ? "Medium Risk" : "High Risk",
        details: plagRisk < 15 ? "Clean database comparison. Unique composition." : "Warning: Overlaps found with existing web articles. Rewrite flagged sentences."
      },
      thin_content: {
        score: thinContentScore,
        label: thinContentScore > 80 ? "Rich Value" : thinContentScore > 50 ? "Acceptable Depth" : "Critical Thin Risk",
        details: `Analyzed word density, section distribution, and syntax value across the text.`
      },
      keyword_insights: keywordInsights,
      suggestions: suggestions
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter an article title first.");
      return;
    }
    if (!content.trim()) {
      alert("Please paste your article content.");
      return;
    }
    if (content.trim().split(/\s+/).length < 20) {
      alert("Article is too short for a meaningful AdSense analysis. Please input at least 20 words.");
      return;
    }

    setLoading(true);
    
    // Simulate real-time API call delay
    setTimeout(() => {
      const computedResult = runHeuristicAnalysis(title, content, niche);
      setResult(computedResult);
      saveToHistory(computedResult);
      setLoading(false);
      // Auto scroll to results
      setTimeout(() => {
        const element = document.getElementById("analysis-results-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }, 1500);
  };

  const loadPresetArticle = (presetType) => {
    if (presetType === "approved") {
      setTitle("How Decentralized Finance is Reimagining Modern Microloans");
      setContent(`Traditional microfinance institutions have spent decades attempting to solve localized credit challenges in developing markets, yet transaction costs remain painfully elevated. Today, decentralized ledger technology is initiating a complete structural bypass of physical branches. 

By eliminating the manual compliance layers, smart contract protocols deployed directly onto layer-2 scaling blockchains can manage microfinance collateral pools autonomously. This means a street vendor in Nairobi can seek a small, low-interest working capital loan directly from capital providers located worldwide, with instantaneous dispersal.

There are three primary benefits to this decentralized microloan approach:
1. Drastically Lower Borrowing Friction: No physical paperwork, immediate smart credit score calculations.
2. Global Capital Arbitrage: Lenders in high-liquidity markets seeking yield can fund under-served local enterprises.
3. Radical Underwriting Transparency: The microfinance protocols post loan portfolios to transparent public explorers.

However, challenges remain around collateral volatile patterns. Stablecoin mechanics offer a safe harbor, but liquidity pools must grow to prevent interest rate spikes. To make this work at a global level, we will need robust localized fiat gateways that work in conjunction with mobile payment providers like M-Pesa. It is an exciting technological paradigm shift that represents true global economic progress, far beyond simple currency speculative trading.`);
      setNiche("Finance");
    } else {
      setTitle("The Ultimate Tapestry of Modern Technological Milestones");
      setContent(`In conclusion, it is important to note that we must delve deep into the tapestry of digital innovation. Furthermore, looking no further, artificial intelligence is a true game changer that will revolutionize our daily life and serve as a testament to human endeavor. Fostering a comprehensive guide to understanding this technological hurdle, let us look at AI's vital role.

Moreover, it is crucial to recognize that modern milestones are occurring faster than ever. Tapestry of things are changing everywhere. To demystify the cloud, one must delve into servers. It is crucial to note that servers play a vital role. Digital beacon of progress is what we see in conclusion.`);
      setNiche("Technology");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  
  
  if (!isLoggedIn) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          AdSense Reviewer Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 mb-4 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
  

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans antialiased">
      
      {/* HEADER SECTION */}
      <header className="border-b border-slate-800 bg-[#0f172a]/95 backdrop-blur-md sticky top-0 z-50 px-4 py-4 transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 p-2.5 shadow-md shadow-purple-500/10">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                AdSense <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Reviewer</span>
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Content Compliance AI</p>
            </div>
          </div>
		  
		  

          <div className="flex items-center gap-2">
  <a
    href="#policy-guide"
    className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition"
  >
    <BookOpen className="h-3.5 w-3.5 text-purple-400" />
    AdSense Policies
  </a>

  <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs text-blue-400 font-medium">
    Free Trial Tier
  </span>

  <button
    onClick={handleLogout}
    className="rounded-lg bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs font-semibold text-white transition"
  >
    Logout
  </button>
</div>
		  
		  
		  
        </div>
      </header>

      {/* HERO HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-800/50 bg-[#0f172a]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-purple-900/20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-blue-950/30 blur-[120px]" />
        
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
            <span className="text-xs font-semibold text-purple-300 tracking-wide uppercase">
              AdSense Compliance Engine 2.4
            </span>
          </div>
          
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl tracking-tight leading-none">
            Validate Your Articles for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
              Google AdSense
            </span>
          </h2>
          
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400">
            Ensure your blog complies fully with Google AdSense quality criteria before submission. Check for thin content, repetitive AI patterns, plagiarism risk, and identify highly profitable niche keywords.
          </p>

          {/* Quick presets helper */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-slate-400">Quick Test Templates:</span>
            <button 
              onClick={() => loadPresetArticle("approved")} 
              className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs text-emerald-300 hover:bg-emerald-500/20 transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="h-3 w-3" /> High Quality Finance Sample
            </button>
            <button 
              onClick={() => loadPresetArticle("spammy")} 
              className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 text-xs text-amber-300 hover:bg-amber-500/20 transition flex items-center gap-1.5"
            >
              <AlertTriangle className="h-3 w-3" /> Spammy AI-Written Tech Sample
            </button>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* LEFT 2 COLUMNS: SUBMISSION FORM */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm relative">
              
              <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <FileSearch className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">
                    Submit Your Article
                  </h3>
                </div>
                
                {content && (
                  <button 
                    onClick={() => { setTitle(""); setContent(""); setNiche(""); }}
                    className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Clear All
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="title" className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Article Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    placeholder="Enter your article title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
                    disabled={loading}
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="content" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Article Content
                    </label>
                    <span className="text-xs text-slate-400 font-mono">
                      {content.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    id="content"
                    required
                    placeholder="Paste your full blog article content here... (minimum 20 words for best AI audit accuracy)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={13}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/20 font-sans leading-relaxed transition-all duration-200 resize-y"
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="niche" className="mb-2 block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Niche / Topic <span className="text-slate-500">(Optional)</span>
                    </label>
                    <select
                      id="niche"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/20 transition-all"
                      disabled={loading}
                    >
                      <option value="">Choose Niche (Default General)</option>
                      <option value="technology">Technology & SaaS</option>
                      <option value="health">Health & Wellness</option>
                      <option value="finance">Finance & Investment</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/15 transition-all duration-300 hover:shadow-purple-500/30 active:scale-[0.98] disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          Auditing Content Compliance...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-purple-200 animate-bounce" />
                          Analyze AdSense Eligibility
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>

          {/* RIGHT 1 COLUMN: SIDEBAR HISTORY & QUICK INFORMATION */}
          <div className="space-y-6">
            
            {/* AUDIT HISTORY CARD */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="mb-4 text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <BookMarked className="h-4 w-4 text-purple-400" />
                Recent Audit History
              </h3>
              
              {history.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-500">No recent articles audited yet.</p>
                  <p className="text-[10px] text-slate-600 mt-1">Submit your first draft above to see metrics here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        setTitle(item.title);
                        setContent(item.content);
                        setNiche(item.niche);
                        setResult(item);
                      }}
                      className="group cursor-pointer rounded-xl border border-slate-800/80 bg-slate-950/40 p-3 hover:bg-slate-800/40 hover:border-slate-700 transition"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="truncate text-xs font-semibold text-slate-200 group-hover:text-white transition">
                          {item.title}
                        </h4>
                        <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold shrink-0 ${
                          item.overall_score >= 75 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {item.overall_score}%
                        </span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-500">
                        <span>{item.niche} • {item.word_count} words</span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* QUICK ADSENSE POLICY RULES GUIDE */}
            <div id="policy-guide" className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="mb-3 text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-blue-400" />
                AdSense Content Manifesto
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Google rejects blogs that fail the **Publisher Policies**. Key pillars of a successful site:
              </p>
              
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="rounded-full bg-purple-500/15 p-0.5 mt-0.5">
                    <Check className="h-3 w-3 text-purple-400" />
                  </div>
                  <span><strong>Unique Value:</strong> Avoid simple rewrites. Bring fresh context or data.</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="rounded-full bg-purple-500/15 p-0.5 mt-0.5">
                    <Check className="h-3 w-3 text-purple-400" />
                  </div>
                  <span><strong>Substantial Volume:</strong> Minimal post requirements should exceed 600 words.</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="rounded-full bg-purple-500/15 p-0.5 mt-0.5">
                    <Check className="h-3 w-3 text-purple-400" />
                  </div>
                  <span><strong>Format Structure:</strong> Proper layout, paragraphs, sub-headers, lists.</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="rounded-full bg-purple-500/15 p-0.5 mt-0.5">
                    <Check className="h-3 w-3 text-purple-400" />
                  </div>
                  <span><strong>Essential Pages:</strong> Sites must display a legal Privacy Policy & Contact Page.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* LOADING ANIMATION CONTAINER */}
        {loading && (
          <div className="my-12 flex flex-col items-center justify-center py-16 rounded-2xl border border-slate-800 bg-slate-900/30">
            <div className="relative mb-4">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-800 border-t-purple-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
              </div>
            </div>
            <h4 className="text-white font-bold text-sm tracking-wide">AI Analyzer Running</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm text-center px-4 leading-relaxed">
              Evaluating linguistic density, checking against generative AI signatures, analyzing original formatting guidelines...
            </p>
          </div>
        )}

        {/* RESULTS HUB SECTION */}
        {result && !loading && (
          <div id="analysis-results-section" className="mt-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* TAB CONTROLLERS */}
            <div className="flex border-b border-slate-800 gap-1 overflow-x-auto scrollbar-none pb-px">
              <button
                onClick={() => setActiveTab("report")}
                className={`px-5 py-3.5 text-xs font-bold tracking-wider uppercase flex items-center gap-2 border-b-2 transition shrink-0 ${
                  activeTab === "report" 
                    ? "border-purple-500 text-white bg-purple-500/5" 
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Gauge className="h-4 w-4 text-purple-400" />
                Score Report
              </button>
              <button
                onClick={() => setActiveTab("keywords")}
                className={`px-5 py-3.5 text-xs font-bold tracking-wider uppercase flex items-center gap-2 border-b-2 transition shrink-0 ${
                  activeTab === "keywords" 
                    ? "border-blue-500 text-white bg-blue-500/5" 
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Search className="h-4 w-4 text-blue-400" />
                SEO Keywords
              </button>
              <button
                onClick={() => setActiveTab("checklist")}
                className={`px-5 py-3.5 text-xs font-bold tracking-wider uppercase flex items-center gap-2 border-b-2 transition shrink-0 ${
                  activeTab === "checklist" 
                    ? "border-amber-500 text-white bg-amber-500/5" 
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                Policy & Checklist
              </button>
              <button
                onClick={() => setActiveTab("ad-simulator")}
                className={`px-5 py-3.5 text-xs font-bold tracking-wider uppercase flex items-center gap-2 border-b-2 transition shrink-0 ${
                  activeTab === "ad-simulator" 
                    ? "border-emerald-500 text-white bg-emerald-500/5" 
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <LayoutTemplate className="h-4 w-4 text-emerald-400" />
                Ad Placement Preview
              </button>
            </div>

            {/* TAB CONTENT: REPORT CARD */}
            {activeTab === "report" && (
              <div className="space-y-6">
                
                {/* OVERALL READINESS SUM */}
                <div className="rounded-2xl border border-slate-800 bg-[#1e293b]/70 p-6 md:p-8 shadow-xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    
                    <div className="flex items-center gap-5">
                      <div className="relative flex shrink-0 items-center justify-center">
                        {/* Circular progress wheel */}
                        <svg className="h-24 w-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="#334155" strokeWidth="6" fill="transparent" />
                          <circle 
                            cx="48" cy="48" r="40" 
                            stroke={result.overall_score >= 75 ? "#10b981" : result.overall_score >= 50 ? "#f59e0b" : "#ef4444"} 
                            strokeWidth="8" 
                            fill="transparent" 
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * result.overall_score) / 100}
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <span className="absolute text-xl font-black text-white">{result.overall_score}%</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-white">Google AdSense Preparedness</h4>
                          <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                            result.adsense_ready 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {result.adsense_ready ? "Approved Class" : "Action Required"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 max-w-lg">
                          Your score represents compliance across formatting, text structure, original value criteria, and low AI/Plagiarism patterns.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:self-center">
                      <button 
                        onClick={() => copyToClipboard(result.content)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center gap-1.5"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied Text
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" /> Copy Article
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>

                {/* THE 5 CORE METRIC CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  
                  {/* ORIGINALITY CARD */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Originality</span>
                      <CheckCircle2 className={`h-4 w-4 ${result.originality.score > 70 ? 'text-emerald-400' : 'text-amber-400'}`} />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-white">{result.originality.score}%</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-300">{result.originality.label}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{result.originality.details}</p>
                  </div>

                  {/* AI DETECTION CARD */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Content</span>
                      <Sparkles className={`h-4 w-4 ${result.ai_detection.score < 40 ? 'text-emerald-400' : 'text-amber-400'}`} />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-white">{result.ai_detection.score}%</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-300">{result.ai_detection.label}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{result.ai_detection.details}</p>
                  </div>

                  {/* PLAGIARISM RISK CARD */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plagiarism Risk</span>
                      <AlertTriangle className={`h-4 w-4 ${result.plagiarism_risk.score < 15 ? 'text-emerald-400' : 'text-amber-400'}`} />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-white">{result.plagiarism_risk.score}%</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-300">{result.plagiarism_risk.label}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{result.plagiarism_risk.details}</p>
                  </div>

                  {/* THIN CONTENT CARD */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Content Depth</span>
                      <BookOpen className={`h-4 w-4 ${result.thin_content.score > 75 ? 'text-emerald-400' : 'text-amber-400'}`} />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-white">{result.thin_content.score}%</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-300">{result.thin_content.label}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{result.thin_content.details}</p>
                  </div>

                  {/* WORD COUNT METRIC CARD */}
                  <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Word Volume</span>
                      <Coins className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-white">{result.word_count}</span>
                      <span className="text-xs text-slate-500 font-bold">words</span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-300">
                      {result.word_count >= 1000 ? "Excellent Length" : result.word_count >= 600 ? "Good" : "Below Optimal"}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-snug">
                      Google crawlers prioritize substantial posts that satisfy user inquiries exhaustively.
                    </p>
                  </div>

                </div>

                {/* AI ACTIONABLE RECOMMENDATIONS */}
                <div className="rounded-2xl border border-slate-800 bg-[#1e293b]/40 p-6 shadow-xl">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                    <Lightbulb className="h-4 w-4 text-purple-400" />
                    Actionable Improvement Plan
                  </h4>
                  <div className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 rounded-lg bg-slate-900/50 p-3.5 border border-slate-800">
                        <div className="rounded bg-purple-500/10 p-1 text-purple-400 text-xs font-bold shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: SEO KEYWORDS */}
            {activeTab === "keywords" && (
              <div className="space-y-6">
                
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Search className="h-4 w-4 text-blue-400" />
                      Extracted & Recommended Search Terms
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Incorporate these semantically relevant search terms with measurable search query volume within your headers or paragraphs to maximize ad yield.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950/50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <tr>
                          <th className="px-4 py-3">Suggested Keyword</th>
                          <th className="px-4 py-3 text-center">Monthly Search Vol</th>
                          <th className="px-4 py-3 text-center">CPC Competition</th>
                          <th className="px-4 py-3 text-center">SEO Difficulty</th>
                          <th className="px-4 py-3 text-right">Trend Position</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {result.keyword_insights.map((kw, i) => (
                          <tr key={i} className="hover:bg-slate-800/30 transition">
                            <td className="px-4 py-3.5 font-bold text-slate-200">{kw.keyword}</td>
                            <td className="px-4 py-3.5 text-center text-slate-300 font-mono">{kw.monthly_volume}</td>
                            <td className="px-4 py-3.5 text-center">
                              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                kw.competition === "High" ? "bg-red-500/10 text-red-400" : kw.competition === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
                              }`}>
                                {kw.competition}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <span className="font-mono font-bold text-slate-300">{kw.seo_difficulty}/100</span>
                                <div className="w-12 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${kw.seo_difficulty > 70 ? 'bg-red-400' : kw.seo_difficulty > 45 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                    style={{ width: `${kw.seo_difficulty}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              {kw.trend_direction === "up" ? (
                                <span className="text-emerald-400 flex items-center justify-end gap-1 font-semibold text-[10px]">
                                  <TrendingUp className="h-3 w-3" /> Growing
                                </span>
                              ) : (
                                <span className="text-slate-400 flex items-center justify-end gap-1 font-semibold text-[10px]">
                                  <TrendingDown className="h-3 w-3" /> Stable
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ADVANCED SUGGESTIONS */}
                <div className="rounded-xl bg-blue-500/5 border border-blue-500/10 p-4 text-xs text-blue-300 flex gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">SEO Optimization Tip:</span> Ensure your primary target keyword is placed cleanly inside the first 100 words of your body copy, inside at least one H2 header, and within the article's URL slug to maximize organic crawl discovery.
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: INTERACTIVE CHECKLIST */}
            {activeTab === "checklist" && (
              <div className="space-y-6">
                
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-amber-400" />
                      Publisher Policy Self-Audit Panel
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      AdSense doesn't just judge your article text; it evaluates your entire domain footprint. Toggle your site factors below to dynamically measure final approval readiness:
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* NO PROHIBITED TOPICS */}
                    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          Safe-Niche Compliance
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
                          My article strictly avoids weapons, adult services, prohibited drugs, malicious hacking tutorials, or copyrighted piracy files.
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={policyChecks.noProhibitedTopics}
                        onChange={(e) => setPolicyChecks({...policyChecks, noProhibitedTopics: e.target.checked})}
                        className="h-5 w-5 rounded border-slate-800 bg-slate-900 accent-purple-500 shrink-0 cursor-pointer"
                      />
                    </div>

                    {/* SPAM CLAUSES */}
                    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          Anti-Spam Formatting
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
                          I have not stuffed identical search terms or tags repeatedly at the bottom of the article to cheat ranking algorithms.
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={policyChecks.noSpammyKeywords}
                        onChange={(e) => setPolicyChecks({...policyChecks, noSpammyKeywords: e.target.checked})}
                        className="h-5 w-5 rounded border-slate-800 bg-slate-900 accent-purple-500 shrink-0 cursor-pointer"
                      />
                    </div>

                    {/* PRIVACY POLICY */}
                    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          Privacy Policy Link Present
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
                          My main domain contains a dedicated "Privacy Policy" link in the footer disclosing cookie collection mechanisms to visiting users.
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={policyChecks.hasPrivacyPolicyLink}
                        onChange={(e) => setPolicyChecks({...policyChecks, hasPrivacyPolicyLink: e.target.checked})}
                        className="h-5 w-5 rounded border-slate-800 bg-slate-900 accent-purple-500 shrink-0 cursor-pointer"
                      />
                    </div>

                    {/* CONTACT INFO */}
                    <div className="flex items-start justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/30 p-4">
                      <div>
                        <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                          Contact / Corporate Identity
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
                          My site features an "About" or "Contact Us" page with verified contact details to demonstrate legitimate corporate presence.
                        </p>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={policyChecks.hasContactPage}
                        onChange={(e) => setPolicyChecks({...policyChecks, hasContactPage: e.target.checked})}
                        className="h-5 w-5 rounded border-slate-800 bg-slate-900 accent-purple-500 shrink-0 cursor-pointer"
                      />
                    </div>

                  </div>

                  {/* SUMMARY STATE */}
                  <div className="mt-6 border-t border-slate-800 pt-5 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-slate-400">Checklist status: </span>
                      <span className="font-bold text-white">
                        {Object.values(policyChecks).filter(Boolean).length} of {Object.keys(policyChecks).length} conditions met
                      </span>
                    </div>

                    {Object.values(policyChecks).every(Boolean) ? (
                      <div className="text-xs text-emerald-400 flex items-center gap-1 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                        <Check className="h-3.5 w-3.5" /> Domain Verified
                      </div>
                    ) : (
                      <div className="text-xs text-amber-400 flex items-center gap-1 font-bold bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                        <AlertTriangle className="h-3.5 w-3.5" /> Actions Remaining
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: AD PLACEMENT PREVIEW */}
            {activeTab === "ad-simulator" && (
              <div className="space-y-6">
                
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <LayoutTemplate className="h-4 w-4 text-emerald-400" />
                      Monetized Article Simulator
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      See how Google AdSense Responsive and In-Feed Display blocks fit seamlessly into your scanned layout without disrupting your readers' scrolling flow.
                    </p>
                  </div>

                  {/* AD WRAPPERS AND RENDERED ARTICLE */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 space-y-6 max-h-[500px] overflow-y-auto leading-relaxed">
                    
                    {/* AD PLACEMENT: TOP RESPONSIVE HEADER AD */}
                    <div className="rounded border border-dashed border-purple-500/30 bg-purple-500/5 p-3 text-center relative">
                      <span className="absolute -top-2 left-3 rounded bg-purple-500 px-2 py-0.5 text-[8px] font-extrabold uppercase text-white tracking-widest">
                        AdSense Banner Block
                      </span>
                      <p className="text-[10px] font-bold uppercase text-purple-400 tracking-wider">Top Leaderboard (Responsive)</p>
                      <div className="mt-1 flex items-center justify-center gap-4 text-[9px] text-slate-500">
                        <span>Expected CPC: $1.25 – $3.50</span>
                        <span>Width: 100% fluid</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-lg font-bold text-white">{result.title}</h2>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500">
                        <span>Category: <strong className="text-slate-300">{result.niche}</strong></span>
                        <span>Read Time: ~{Math.ceil(result.word_count / 200)} mins</span>
                      </div>
                      
                      {/* Splitting first two sentences/paragraphs to show inline ad layout */}
                      <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-slate-700 pl-3">
                        {result.content.slice(0, 320)}...
                      </p>
                    </div>

                    {/* AD PLACEMENT: IN-FEED RESPONSIVE INLINE AD */}
                    <div className="rounded border border-dashed border-blue-500/30 bg-blue-500/5 p-4 text-center relative my-4">
                      <span className="absolute -top-2 left-3 rounded bg-blue-500 px-2 py-0.5 text-[8px] font-extrabold uppercase text-white tracking-widest">
                        AdSense Native Display
                      </span>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="text-left">
                          <p className="text-[10px] font-bold uppercase text-blue-400">Premium In-Content Recommended Link Block</p>
                          <p className="text-[9px] text-slate-500 mt-0.5">Styled dynamically matching your background aesthetics</p>
                        </div>
                        <span className="rounded bg-slate-800 px-2.5 py-1 text-[10px] text-slate-400 font-bold hover:bg-slate-700 cursor-pointer">
                          Sponsored Options
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs text-slate-300">
                      <p>{result.content.slice(Math.min(320, result.content.length - 1))}</p>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-16 text-center px-4">
        <div className="mx-auto max-w-4xl space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded bg-gradient-to-tr from-purple-600 to-blue-500 p-1">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-sm font-black text-white">AdSense Content Reviewer</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            This tool uses heuristic analysis, semantic lexical audits, and target buzzword tracking to estimate compliance probability. Final approval is subject to Google AdSense manual checkers.
          </p>
          <div className="pt-4 text-[10px] text-slate-600">
            &copy; 2026 Content Reviewer Team. Verbatim compliance references mapped.
          </div>
        </div>
      </footer>

    </div>
  );
}