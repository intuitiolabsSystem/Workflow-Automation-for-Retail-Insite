import { useState, useRef, useEffect } from "react";

const PROJECT_CONTEXT = `
You are the Retail Insite Proposal Assistant — a knowledgeable, clear, and helpful guide created by Intuitio Labs for Karolyn Dale and the Retail Insite team.

Your job is to help Retail Insite understand the AI Workflow Automation proposal Intuitio Labs has prepared. Answer questions about the three automation modules, costs, timelines, how the systems work, integration requirements, and next steps.

Your tone is: neutral, informative, and easy to understand. Avoid technical jargon unless the user asks for technical detail. Be specific with numbers — always use the exact figures from the proposal below. If something is not covered in these materials, say so clearly and suggest reaching out to the Intuitio Labs team directly.

CONTACT: For questions not answered here, contact Deep Kalina at deep.kalina@intuitiolabs.com or the Intuitio Labs team directly.


== WHO IS INTUITIO LABS ==

Intuitio Labs is a software development studio specializing in building AI-powered digital products — 32+ products launched across 11 industry verticals, $225M+ in product value created, 95% client retention rate. Their engagement model includes weekly 30-minute syncs with pre-circulated updates (so you can skip the call if everything is clear), sprint-based development in focused 2-week cycles, and real-time project dashboards in Asana.

Tools used during delivery: Slack (daily comms), Linear (planning), Google Meet (recorded calls), Notion (notes/docs), Figma (design reviews).


== WHO IS RETAIL INSITE ==

Retail Insite is a 23-person boutique commercial real estate brokerage specializing in retail properties in Southern California (Los Angeles to San Diego). The company has been in business for approximately 30 years, with 13 brokers and 5 principals, serving both landlords and tenant representation — from large-format tenants like Dick's Sporting Goods to boutique concepts like Shake Shack.

Karolyn Dale is the Director of Operations and is leading the modernization initiative at Retail Insite.

Current systems in use:
- Microsoft Dynamics CRM (property and deal management)
- Microsoft Outlook (communications)
- QuickBooks (accounting/invoicing — vendor change pending)
- Retail Insite website (primary property data source)
- LoopNet (external listings platform)
- RingCentral (communications platform)

The company recently launched a new CRM (migrating from an older one) and built an internal mapping data platform that houses their real estate knowledge to help brokers close deals. Deal data is currently scattered across QuickBooks, Excel vouchers, and incomplete CRM records.


== THE PROBLEM ==

Manual coordination across disconnected systems is consuming broker and staff time that could be spent closing deals. Three high-priority pain points were identified:

1. INBOUND PROPERTY INQUIRIES: Brokers and their assistants manually research property details and draft responses to inbound emails about property availability. The data lives on the website and (partially) in Dynamics CRM. This is repetitive, time-consuming work.

2. INVOICE GENERATION: The current process involves inputting deal details into an Excel spreadsheet, then an outsourced bookkeeper manually re-types every row into QuickBooks. This is error-prone, slow, and entirely manual. Commission splits are nuanced — involving broker splits, inside/outside brokers, payment timing, and multiple deal variables.

3. LOI & LEASE DRAFTING: 8–9 of 13 brokers print out LOIs and leases, handwrite their changes/markups, then send them to word processors (including virtual assistants in the Philippines) to manually retype the changes and produce clean redlines. This is high-volume, time-sensitive, and cannot be eliminated because brokers will not change how they work.


== THE SOLUTION: 3 AUTOMATION MODULES ==

All three modules share one core principle: AI drafts or automates the work, but a human approves before anything is sent, posted, or finalized. No autonomous actions are taken without broker or finance review.

The three modules run on a shared automation platform with a shared data normalization layer.


--- MODULE 1: AI PROPERTY INQUIRY RESPONSE ---
Status: CONFIRMED FEASIBLE — Ready to build

What it does:
- Monitors the Outlook inbox for inbound property inquiry emails
- Identifies the property mentioned in the inquiry
- Pulls relevant property information from the Retail Insite website and Dynamics CRM
- Generates a draft email response with source-attributed property facts
- Routes the draft to the broker for review, editing, and approval in Outlook
- The broker sends the email — nothing is auto-sent

Guardrails and controls:
- Draft-first: no auto-send in initial phase
- All facts include source references so brokers can verify before sending
- System escalates to broker when data is incomplete rather than guessing
- 2–3 month human feedback loop planned before considering any auto-send capability

Data sources: Retail Insite website (primary) + Dynamics CRM (growing)

Investment: 269 hours | $18,292


--- MODULE 2: INVOICE PROCESSING AUTOMATION ---
Status: PENDING ACCOUNTING VENDOR SELECTION (Karolyn has vendor selection calls; decision will unlock this module)

What it does:
- Pulls deal data directly from Dynamics CRM
- Normalizes and standardizes deal information
- Generates an invoice draft including reconciliation notes and commission splits
- Routes the invoice to finance for review and approval
- Posts the approved invoice to the accounting system (QuickBooks or equivalent) after sign-off
- Maintains a full audit log for the invoice lifecycle

Key complexity handled:
- Nuanced commission splits: inside/outside brokers, payment timing, multiple deal details per transaction

Controls:
- Human approval required before any accounting system posting
- Full audit log maintained throughout

Status note: The architecture for this module depends on which accounting vendor Retail Insite selects. There is a possible move from QuickBooks to Ramp or another platform. The estimate shown is a placeholder until the vendor decision is confirmed. Karolyn has vendor selection calls scheduled — once the vendor is confirmed, scoping for this module can be finalized.

Investment: 331 hours | $22,508 (placeholder pending vendor confirmation)


--- MODULE 3: LOI DRAFT ASSISTANT ---
Status: CONFIRMED FEASIBLE — Ready to build

What it does:
- Ingests handwritten broker markups on LOIs and lease documents (scanned or photographed)
- Uses AI to read the handwriting and annotations on the printed documents
- Generates an initial digital draft of the document incorporating the broker's changes
- Routes the draft to the broker for review, editing, and final export

Why this matters — key insight:
- 8–9 of 13 brokers use the handwriting workflow and will not change their behavior
- The solution is intentionally designed to "meet brokers where they are" — no behavior change required
- The system handles the tedious first draft; humans handle the nuance (exhibit placement, complex formatting, clause decisions)
- Currently supported by virtual assistants in the Philippines for manual retyping — this module reduces that workload significantly

Note: Retail Insite previously attempted handwriting-to-text with Claude directly and had limited success. The LOI Draft Assistant is purpose-built for their workflow, using their own letterhead and document templates so the AI has structured context to work with — which significantly improves accuracy over ad-hoc attempts.

Investment: 245 hours | $16,660


== SHARED ARCHITECTURE ==

The underlying automation platform is shared across all three modules. This means the foundation built for Module 1 is reused for Modules 2 and 3, reducing total cost and complexity.

Architecture layers (high level):
1. Output systems: Outlook, QuickBooks (or equivalent), LOI/Lease PDFs
2. Human review layer: broker review interface + finance review interface
3. AI processing layer: intent detection + draft generation (shared LLM infrastructure)
4. Workflow engine: inquiry agent + invoice automation engine + LOI draft assistant
5. Integration/external sources: API connectors/webhooks → LoopNet, Outlook, Dynamics CRM


== IMPLEMENTATION OPTIONS ==

Option A — Embedded Automation (RECOMMENDED):
Integrate directly into existing tools (Outlook + Dynamics CRM). Brokers work in the tools they already use.
- Pros: Minimal behavior change, faster adoption, no new tools to learn
- Cons: Less centralized visibility; analytics distributed across tools

Option B — Operations Console (Future State):
A central dashboard for reviewing and managing all AI-generated tasks across all three modules.
- Pros: Centralized visibility, consistent approval workflow, easier reporting
- Cons: Requires adopting a new internal system; change management needed

Recommendation: Start with Embedded Automation. Add the Operations Console later once adoption is established and the team sees value in centralized management.


== INVESTMENT SUMMARY ==

Module 1 — AI Inquiry Response: 269 hours | $18,292
Module 2 — Invoice Automation: 331 hours | $22,508 (placeholder)
Module 3 — LOI Draft Assistant: 245 hours | $16,660
Total shown in proposal: ~$73,000

Note: The total investment figure (~$73K) is the combined estimate for all three modules. Module 2 is a placeholder pending accounting vendor confirmation.


== TIMELINE & DELIVERY ==

Weeks 1–3 are "non-negotiable foundation work" — shared infrastructure that all three modules depend on:
- Authentication and security setup
- Workflow engine
- AI orchestration layer
- Integration framework (Outlook, Dynamics CRM connectors)
- Audit logging

After Week 3, client chooses one of two paths:

Option A — Parallel Execution (Faster):
- Week 4+: Module 1 (Inquiry Response) + Module 3 (LOI Draft Assistant) start simultaneously
- Estimated completion: Week 8 from kickoff
- Module 2 starts after accounting vendor is confirmed

Option B — Sequential Execution (More Controlled):
- Weeks 4–10: Module 1 — Inquiry Response
- Weeks 11–18: Module 3 — LOI Draft Assistant
- Module 2: Starts after vendor confirmation

Sprint-based delivery model:
- Focused 2-week development cycles
- Scope defined at start of each sprint → demo at end → 2 business days for client feedback
- Weekly update pre-circulated; client can skip the call if everything is clear
- Weekly syncs capped at 30 minutes; Intuitio Labs never reads slides on a call
- Real-time client-facing project dashboard in Asana


== NEXT STEPS ==

1. Accounting vendor clarity: Karolyn to confirm vendor selection after pending calls — this unblocks Module 2 scoping and architecture
2. NDA execution: Enables more detailed technical discussions about Retail Insite's systems and data
3. Contract signature & kickoff: Foundation work (Weeks 1–3) starts immediately after signing

Modules ready to build now:
- ✅ AI Inquiry Response (Module 1): Ready
- ✅ LOI Draft Assistant (Module 3): Ready
- ⏳ Invoice Automation (Module 2): Pending accounting vendor confirmation


== INTUITIO LABS FRAMEWORK: HOW THEY THINK ABOUT AI ==

Intuitio Labs uses the AI Tolerance Architecture (ATA) framework to evaluate which workflows are suitable for AI automation.

Key principle — the Intelligence Continuum:
- Low-end tasks (search, data transformation, reading files): AI achieves 80–90% accuracy → high confidence, production-ready
- High-end tasks (open-ended reasoning, judgment calls with no clear answer): AI currently at 40–50% accuracy → R&D territory, not production-ready

The three Retail Insite modules (inquiry response, invoicing, LOI drafting) all sit on the favorable low-end of this continuum — they involve structured data retrieval, transformation, and template-based generation, not open-ended reasoning. This is why all three are confirmed feasible.

Human-in-the-loop design is non-negotiable in Phase 1: AI handles the tedious repetitive work; humans retain control of every output before it reaches a client or the accounting system.


== COMMON QUESTIONS ==

Q: Will the AI send emails automatically?
A: No. In the initial phase, the AI drafts the response and the broker reviews, edits, and approves before sending. There is a planned 2–3 month feedback loop to refine draft quality before any auto-send capability is even considered. The sending itself is technically easy — the hard problem is generating a quality draft.

Q: Will invoices be posted automatically to QuickBooks?
A: No. Finance approval is required before anything is posted to the accounting system. A full audit log is maintained throughout the invoice lifecycle. Nothing touches the books without a human sign-off.

Q: Do brokers need to change how they work?
A: No, intentionally. Module 1 (inquiry response) works through Outlook — the tool brokers already use. Module 3 (LOI drafting) supports the existing handwriting workflow — brokers still print and mark up documents; the AI handles the digitization and first draft. The entire solution is designed to minimize behavior change.

Q: What systems does this connect to?
A: Outlook and Dynamics CRM are core integrations. The accounting integration depends on the vendor Retail Insite selects (QuickBooks or an alternative like Ramp). Property data is pulled from the Retail Insite website and CRM.

Q: Why is Module 2 (invoicing) on hold?
A: Retail Insite is in the process of switching accounting service providers. The architecture for the invoicing automation depends on which platform the new vendor uses. Once Karolyn confirms the vendor after her Monday calls, Intuitio Labs can finalize the scope and architecture for Module 2. The $22,508 figure is a placeholder.

Q: Can all three modules be built at the same time?
A: Yes — the shared platform foundation (Weeks 1–3) supports all three. After that, Modules 1 and 3 can start in parallel (Option A) or sequentially (Option B). Module 2 waits on vendor confirmation.

Q: What is the total investment?
A: Approximately $73,000 across all three modules, with Module 2 ($22,508) being a placeholder pending vendor confirmation. Module 1 is $18,292 and Module 3 is $16,660.

Q: How do weekly updates work?
A: Intuitio Labs sends a written update before every weekly sync. If everything is clear, Retail Insite can skip the call entirely. When calls happen, they are capped at 30 minutes. Intuitio Labs never comes in and reads a slide — the update is pre-circulated so call time is used for discussion and decisions only.

Q: What is an "operations console" and do we need one?
A: An operations console is a central dashboard where all AI-generated drafts (inquiry responses, invoice drafts, LOI drafts) can be reviewed and approved in one place. The recommendation is to start without it — integrate directly into Outlook and existing tools — and add the console later once the team has seen the value and adoption is established.

Q: Who do I contact to move forward?
A: Reach out to Deep Kalina at deep.kalina@intuitiolabs.com to discuss next steps, finalize scope, and begin the engagement.
`;

const SUGGESTED_QUESTIONS = [
  "What are the three automation modules?",
  "Will the AI send emails automatically?",
  "How does the LOI Draft Assistant work?",
  "Why is invoice automation on hold?",
  "What's the total investment?",
  "How does the weekly update process work?",
  "What systems does this integrate with?",
  "What are the next steps to get started?",
];

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to the Retail Insite AI Proposal Assistant. I have full details on the three automation modules Intuitio Labs has proposed — AI Inquiry Response, Invoice Automation, and the LOI Draft Assistant. Ask me anything about how the modules work, costs, timelines, or next steps.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: PROJECT_CONTEXT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      const reply =
        data.content?.[0]?.text ||
        "I couldn't process that. Please try again.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
        },
      ]);
    }
    setLoading(false);
  };

  const showSuggestions = messages.length === 1;

  return (
    <div
      style={{
        fontFamily:
          "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#1a1919",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        color: "#e8e4dc",
      }}
    >
      {/* Header */}
      <div
        style={{
          flexShrink: 0,
          borderBottom: "1px solid #2a2820",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          background: "#0d0d0a",
        }}
      >
        <img src="/intuitio_logo_white.svg" height="28px" alt="Intuitio Labs" />
        <div
          style={{
            width: "1px",
            height: "28px",
            background: "#2a2820",
            marginLeft: "4px",
          }}
        />
        <div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: '"Neue Haas Grotesk", Helvetica, Arial, sans-serif',
              letterSpacing: "0.04em",
              color: "#ffffff",
            }}
          >
            Retail Insite Proposal Assistant
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#7a7468",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily:
                "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            }}
          >
            Intuitio Labs · March 2026
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#c9a84c",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "1px solid #3a3420",
              padding: "4px 10px",
              borderRadius: "2px",
            }}
          >
            Confidential
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div
        className="chat-shell"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: "24px 32px 16px",
          maxWidth: "780px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
          background: "#1a1919",
          borderLeft: "1px solid #262626",
          borderRight: "1px solid #262626",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: "28px",
              display: "flex",
              flexDirection: "column",
              alignItems: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {m.role === "assistant" && (
              <div
                style={{
                  fontSize: "10px",
                  color: "#c9a84c",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  paddingLeft: "2px",
                }}
              >
                Retail Insite Proposal Assistant
              </div>
            )}
            <div
              style={{
                maxWidth: "88%",
                padding: m.role === "user" ? "12px 18px" : "20px 24px",
                background:
                  m.role === "user"
                    ? "linear-gradient(135deg, #1e1c14, #2a2618)"
                    : "#111108",
                border:
                  m.role === "user"
                    ? "1px solid #3a3420"
                    : "1px solid #1e1c14",
                borderRadius:
                  m.role === "user"
                    ? "12px 12px 2px 12px"
                    : "2px 12px 12px 12px",
                fontSize: "15px",
                lineHeight: "1.75",
                color: m.role === "user" ? "#d4cfc4" : "#e0dbd0",
                whiteSpace: "pre-wrap",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#7a7468",
              fontSize: "13px",
              paddingLeft: "2px",
            }}
          >
            <div style={{ display: "flex", gap: "4px" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "5px",
                    height: "5px",
                    background: "#c9a84c",
                    borderRadius: "50%",
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
            Composing response...
          </div>
        )}

        {showSuggestions && !loading && (
          <div style={{ marginTop: "8px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#5a5650",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Common questions
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: "transparent",
                    border: "1px solid #2a2820",
                    borderRadius: "20px",
                    padding: "7px 16px",
                    fontSize: "13px",
                    color: "#a09890",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#c9a84c";
                    e.target.style.color = "#c9a84c";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#2a2820";
                    e.target.style.color = "#a09890";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          flexShrink: 0,
          borderTop: "1px solid #1e1c14",
          padding: "20px 32px",
          background: "#0d0d0a",
          maxWidth: "780px",
          width: "100%",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask about the proposal, modules, costs, timelines, or next steps..."
            rows={1}
            style={{
              flex: 1,
              background: "#111108",
              border: "1px solid #2a2820",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "14px",
              color: "#e8e4dc",
              fontFamily: "inherit",
              resize: "none",
              outline: "none",
              lineHeight: "1.5",
              maxHeight: "120px",
              overflow: "auto",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2820")}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              background:
                input.trim() && !loading
                  ? "linear-gradient(135deg, #c9a84c, #a8881c)"
                  : "#1e1c14",
              border: "none",
              borderRadius: "8px",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor:
                input.trim() && !loading ? "pointer" : "not-allowed",
              transition: "all 0.15s ease",
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                input.trim() && !loading ? "#0a0a08" : "#3a3830"
              }
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <div
          style={{
            marginTop: "10px",
            fontSize: "11px",
            color: "#3a3830",
            textAlign: "center",
            letterSpacing: "0.05em",
          }}
        >
          This assistant has access to the full Retail Insite AI Workflow
          Automation proposal prepared by Intuitio Labs | For questions contact
          deep.kalina@intuitiolabs.com
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        textarea::placeholder { color: #3a3830; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2820; border-radius: 2px; }

        @media (max-width: 640px) {
          .chat-shell {
            padding: 20px 16px;
            border-left: none;
            border-right: none;
          }
        }
      `}</style>
    </div>
  );
}
