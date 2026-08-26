"use client";

import { useState } from "react";
import Image from "next/image";

type Answers = {
  leads_per_day: string;
  missed_followup: string;
  current_tool: string;
  prioritization: string;
  biggest_friction: string;
  value_perception: string;
};

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    leads_per_day: "",
    missed_followup: "",
    current_tool: "",
    prioritization: "",
    biggest_friction: "",
    value_perception: "",
  });

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [team, setTeam] = useState("");
  const [industry, setIndustry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 7;

  const selectOption = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = (step: number) => {
    setCurrentStep(step);
    // window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !contact.trim()) {
      alert("Please fill in your name and contact details.");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      name,
      contact,
      team_size: team,
      industry,
      ...answers,
      _subject: `New Sales Diagnostic from ${name}`,
    };

    try {
      // ============================================
      // REPLACE with your Formspree endpoint
      // Example: https://formspree.io/f/xpzgkqyz
      // ============================================
      const response = await fetch("https://formspree.io/f/xppzapjj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setCurrentStep(7);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {/* NAV */}
      <nav>
        <div className="logo-div">
          <Image
            src="/vigyaapn.png"
            alt="Vigyaapn"
            width={160}
            height={46}
            priority
            style={{ height: "46px", width: "auto" }}
          />
          &nbsp;&nbsp;
          <span className="logo-png">VIGYAAPN</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="badge">Sales Performance Diagnostic</div>
        <h1>
          Where is your sales pipeline
          <br />
          <span>actually leaking revenue?</span>
        </h1>
        <p>
          Complete this 2-minute diagnostic. Receive a clear assessment of the
          biggest conversion gaps in your current process.
        </p>
        <p className="sub-note">
          Confidential • No sales call • Built for decision-makers
        </p>
      </section>

      {/* QUIZ CARD */}
      <div className="quiz-card">
        {/* Progress */}
        <div className="progress">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`progress-dot ${i + 1 <= currentStep ? "active" : ""}`}
            />
          ))}
        </div>

        {/* STEP 1 */}
        {currentStep === 1 && (
          <div>
            <div className="step-label">Question 1 of 7</div>
            <div className="question">
              How many new leads does your team typically receive per day?
            </div>
            <div className="options">
              {["Fewer than 10", "10 – 30", "31 – 100", "More than 100"].map(
                (opt) => (
                  <div
                    key={opt}
                    className={`option ${
                      answers.leads_per_day === opt ? "selected" : ""
                    }`}
                    onClick={() => selectOption("leads_per_day", opt)}
                  >
                    <span className="emoji">•</span> {opt}
                  </div>
                ),
              )}
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => nextStep(2)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div>
            <div className="step-label">Question 2 of 7</div>
            <div className="question">
              What percentage of inbound leads fail to receive timely follow-up?
            </div>
            <div className="options">
              {["Less than 15%", "15 – 35%", "35 – 55%", "More than 55%"].map(
                (opt) => (
                  <div
                    key={opt}
                    className={`option ${
                      answers.missed_followup === opt ? "selected" : ""
                    }`}
                    onClick={() => selectOption("missed_followup", opt)}
                  >
                    <span className="emoji">•</span> {opt}
                  </div>
                ),
              )}
            </div>
            <div className="btn-row">
              <button className="btn btn-secondary" onClick={() => prevStep(1)}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => nextStep(3)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div>
            <div className="step-label">Question 3 of 7</div>
            <div className="question">
              Where are lead conversations and status currently managed?
            </div>
            <div className="options">
              {[
                "Primarily on WhatsApp",
                "Spreadsheets (Excel / Google Sheets)",
                "An existing CRM platform",
                "Multiple disconnected tools",
              ].map((opt) => (
                <div
                  key={opt}
                  className={`option ${
                    answers.current_tool === opt ? "selected" : ""
                  }`}
                  onClick={() => selectOption("current_tool", opt)}
                >
                  <span className="emoji">•</span> {opt}
                </div>
              ))}
            </div>
            <div className="btn-row">
              <button className="btn btn-secondary" onClick={() => prevStep(2)}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => nextStep(4)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <div>
            <div className="step-label">Question 4 of 7</div>
            <div className="question">
              How does your team currently decide which leads to prioritize?
            </div>
            <div className="options">
              {[
                "Based on salesperson judgment",
                "First-in, first-out / chronological",
                "Basic rules or scoring in current system",
                "No consistent prioritization method",
              ].map((opt) => (
                <div
                  key={opt}
                  className={`option ${
                    answers.prioritization === opt ? "selected" : ""
                  }`}
                  onClick={() => selectOption("prioritization", opt)}
                >
                  <span className="emoji">•</span> {opt}
                </div>
              ))}
            </div>
            <div className="btn-row">
              <button className="btn btn-secondary" onClick={() => prevStep(3)}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => nextStep(5)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {currentStep === 5 && (
          <div>
            <div className="step-label">Question 5 of 7</div>
            <div className="question">
              What is the biggest operational friction in your current sales
              process?
            </div>
            <div className="options">
              {[
                "Missed or delayed follow-ups",
                "Difficulty identifying high-intent leads",
                "Scattered customer history and context",
                "Poor visibility into team performance",
              ].map((opt) => (
                <div
                  key={opt}
                  className={`option ${
                    answers.biggest_friction === opt ? "selected" : ""
                  }`}
                  onClick={() => selectOption("biggest_friction", opt)}
                >
                  <span className="emoji">•</span> {opt}
                </div>
              ))}
            </div>
            <div className="btn-row">
              <button className="btn btn-secondary" onClick={() => prevStep(4)}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => nextStep(6)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 6 */}
        {currentStep === 6 && (
          <div>
            <div className="step-label">Question 6 of 7</div>
            <div className="question">
              How valuable would it be if your system could automatically:
            </div>
            <div className="options" style={{ marginBottom: 14 }}>
              <div
                className="option"
                style={{ pointerEvents: "none", opacity: 0.8 }}
              >
                <span className="emoji">🔥</span> Score every lead by real
                buying intent
              </div>
              <div
                className="option"
                style={{ pointerEvents: "none", opacity: 0.8 }}
              >
                <span className="emoji">💬</span> Draft context-aware follow-up
                messages
              </div>
              <div
                className="option"
                style={{ pointerEvents: "none", opacity: 0.8 }}
              >
                <span className="emoji">📋</span> Tell each salesperson exactly
                who to contact today
              </div>
            </div>
            <div className="options">
              {[
                "Extremely valuable — this is a priority",
                "Valuable if execution is reliable",
                "Moderately interesting",
              ].map((opt) => (
                <div
                  key={opt}
                  className={`option ${
                    answers.value_perception === opt ? "selected" : ""
                  }`}
                  onClick={() => selectOption("value_perception", opt)}
                >
                  <span className="emoji">•</span> {opt}
                </div>
              ))}
            </div>
            <div className="btn-row">
              <button className="btn btn-secondary" onClick={() => prevStep(5)}>
                ← Back
              </button>
              <button className="btn btn-primary" onClick={() => nextStep(7)}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* STEP 7 - Contact Form */}
        {currentStep === 7 && !isSuccess && (
          <div>
            <div className="step-label">Final Step</div>
            <div className="question">
              Where should we send your diagnostic summary?
            </div>

            <div className="field">
              <label>Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
              />
            </div>
            <div className="field">
              <label>Work Email or WhatsApp Number *</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="name@company.com or +91 98765 43210"
              />
            </div>
            <div className="field">
              <label>Company / Team Size</label>
              <select value={team} onChange={(e) => setTeam(e.target.value)}>
                <option value="">Select</option>
                <option>1 – 3 salespeople</option>
                <option>4 – 10 salespeople</option>
                <option>11 – 25 salespeople</option>
                <option>26+ salespeople</option>
              </select>
            </div>
            <div className="field">
              <label>Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Select industry</option>
                <option>Real Estate</option>
                <option>Insurance</option>
                <option>Education / Study Abroad</option>
                <option>Digital Marketing Agency</option>
                <option>IT / SaaS / Software Services</option>
                <option>B2B Distribution / Wholesale</option>
                <option>Other</option>
              </select>
            </div>

            <div className="btn-row">
              <button className="btn btn-secondary" onClick={() => prevStep(6)}>
                ← Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Get Diagnostic Summary →"}
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {isSuccess && (
          <div className="success-message">
            <div style={{ fontSize: "2.8rem", marginBottom: 12 }}>✅</div>
            <h2>Thank you! Your response has been received.</h2>
            <p style={{ color: "#94a3b8", marginTop: 10 }}>
              We will review your answers and get back to you shortly with
              personalized insights.
            </p>
          </div>
        )}
      </div>

      {/* DIFFERENTIATION */}
      <section className="section">
        <h2>A fundamentally different approach</h2>
        <p className="subtitle">
          Most CRMs record activity. Vigyaapn drives action.
        </p>

        <div className="diff-grid">
          <div className="diff-card">
            <h3>Conventional CRM</h3>
            <p>
              Centralizes data and pipeline stages. Salespeople still decide
              prioritization and messaging manually.
            </p>
          </div>
          <div className="diff-card">
            <h3>Vigyaapn AI CRM</h3>
            <p>
              Continuously analyzes conversations, scores intent, surfaces the
              next best action, and drafts context-aware outreach.
            </p>
          </div>
          <div className="diff-card">
            <h3>Generic AI assistants</h3>
            <p>
              Produce generic copy without deep pipeline context or historical
              interaction data.
            </p>
          </div>
          <div className="diff-card">
            <h3>Our Design Principle</h3>
            <p>
              AI embedded inside the daily sales workflow — so every lead
              receives the right attention at the right time.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <h2>Core capabilities</h2>
        <p className="subtitle">Engineered for high-velocity sales teams</p>

        <div className="feature-grid">
          {[
            {
              icon: "🔥",
              title: "Real-time Lead Scoring",
              desc: "Every lead is ranked by buying intent using conversation signals and engagement patterns.",
            },
            {
              icon: "💬",
              title: "Context-Aware Messaging",
              desc: "Follow-up drafts that reference the full history of the relationship, not generic templates.",
            },
            {
              icon: "📋",
              title: "Daily Action Prioritization",
              desc: "Each salesperson receives a clear, ranked list of who to contact and why.",
            },
            {
              icon: "⚠️",
              title: "Deal Risk Detection",
              desc: "Automatically flags deals showing early signs of stalling, with recommended recovery actions.",
            },
            {
              icon: "📱",
              title: "WhatsApp-Native Design",
              desc: "Built around the communication channel most Indian sales teams already live in.",
            },
            {
              icon: "🤖",
              title: "Conversational AI Assistant",
              desc: "Query your pipeline in natural language: “Show me deals at risk this week.”",
            },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        © 2026 Vigyaapn — AI CRM purpose-built to eliminate silent revenue
        leakage
      </footer>

      <style jsx>{`
        .container {
          max-width: 740px;
          margin: 0 auto;
          padding: 0 20px;
        }

        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22px 0;
        }

        .hero {
          text-align: center;
          padding: 40px 0 20px;
        }

        .badge {
          display: inline-block;
          background: linear-gradient(90deg, #f97316, #ec4899);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 6px 16px;
          border-radius: 50px;
          margin-bottom: 18px;
          letter-spacing: 0.7px;
          text-transform: uppercase;
        }

        .hero h1 {
          font-size: 2.35rem;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }

        .hero h1 span {
          background: linear-gradient(90deg, #f97316, #ec4899, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          color: #94a3b8;
          font-size: 1.1rem;
          max-width: 560px;
          margin: 0 auto;
        }

        .sub-note {
          color: #64748b;
          font-size: 0.88rem;
          margin-top: 10px;
          font-weight: 500;
        }

        .quiz-card {
          background: #111;
          border: 1px solid #222;
          border-radius: 20px;
          padding: 32px 28px;
          margin: 28px 0 45px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .progress {
          display: flex;
          gap: 5px;
          margin-bottom: 24px;
        }

        .progress-dot {
          height: 4px;
          flex: 1;
          background: #222;
          border-radius: 10px;
        }

        .progress-dot.active {
          background: linear-gradient(90deg, #f97316, #ec4899);
        }

        .step-label {
          font-size: 0.78rem;
          color: #ec4899;
          font-weight: 600;
          margin-bottom: 8px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .question {
          font-size: 1.32rem;
          font-weight: 700;
          margin-bottom: 24px;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .option {
          background: #0a0a0a;
          border: 2px solid #222;
          border-radius: 12px;
          padding: 14px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 13px;
          transition: all 0.2s;
          font-size: 1rem;
          font-weight: 500;
        }

        .option:hover {
          border-color: #f97316;
          background: #151515;
          transform: translateX(3px);
        }

        .option.selected {
          border-color: #ec4899;
          background: linear-gradient(
            90deg,
            rgba(249, 115, 22, 0.12),
            rgba(236, 72, 153, 0.12)
          );
        }

        .option .emoji {
          font-size: 1.25rem;
          min-width: 28px;
        }

        .field {
          margin-bottom: 16px;
        }

        .field label {
          display: block;
          font-size: 0.88rem;
          color: #94a3b8;
          margin-bottom: 6px;
          font-weight: 500;
        }

        .field input,
        .field select {
          width: 100%;
          padding: 13px 15px;
          border-radius: 10px;
          border: 1px solid #333;
          background: #0a0a0a;
          color: #f1f5f9;
          font-size: 1rem;
        }

        .field input:focus,
        .field select:focus {
          outline: none;
          border-color: #06b6d4;
        }

        .btn-row {
          display: flex;
          gap: 12px;
          margin-top: 26px;
        }

        .btn {
          flex: 1;
          padding: 14px;
          border-radius: 11px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #f97316, #ec4899, #06b6d4);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(236, 72, 153, 0.35);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: #1a1a1a;
          color: #94a3b8;
          border: 1px solid #333;
        }

        .btn-secondary:hover {
          background: #222;
          color: white;
        }

        .success-message {
          text-align: center;
          padding: 30px 20px;
        }

        .success-message h2 {
          font-size: 1.5rem;
          margin-bottom: 12px;
        }

        .section {
          margin: 50px 0 20px;
        }

        .logo-png {
          font-size: 25px;
          color: white;
          font-weight: bold;
        }

        .logo-div {
          display: flex;
          align-items: center;
        }

        .section h2 {
          font-size: 1.65rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .section .subtitle {
          text-align: center;
          color: #94a3b8;
          margin-bottom: 30px;
          font-size: 1.05rem;
        }

        .diff-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 40px;
        }

        .diff-card {
          background: #111;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 20px;
        }

        .diff-card h3 {
          font-size: 0.98rem;
          margin-bottom: 8px;
          color: #f97316;
          font-weight: 600;
        }

        .diff-card p {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.45;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }

        .feature-card {
          background: #111;
          border: 1px solid #222;
          border-radius: 14px;
          padding: 20px 16px;
          transition: border-color 0.2s;
        }

        .feature-card:hover {
          border-color: #f97316;
        }

        .feature-card .icon {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .feature-card h3 {
          font-size: 1.02rem;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .feature-card p {
          color: #94a3b8;
          font-size: 0.88rem;
        }

        footer {
          text-align: center;
          padding: 35px 0 45px;
          color: #475569;
          font-size: 0.85rem;
          border-top: 1px solid #1a1a1a;
          margin-top: 50px;
        }

        @media (max-width: 600px) {
          .hero h1 {
            font-size: 1.85rem;
          }
          .quiz-card {
            padding: 26px 18px;
          }
          .question {
            font-size: 1.2rem;
          }
          .diff-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

