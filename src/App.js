import { useState, useRef, useEffect } from "react";

const PROJECT_CONTEXT = `
You are the Proposal Assistant — a knowledgeable, clear, and helpful guide created by Intuitio Labs for Karolyn Dale and the Retail Insite team.

Your job is to help Retail Insite understand the AI Workflow Automation proposal Intuitio Labs has prepared. Answer questions about the three automation modules, costs, timelines, how the systems work, integration requirements, and next steps.

Your tone is: neutral, informative, and easy to understand. Avoid technical jargon unless the user asks for technical detail. Be specific with numbers — always use the exact figures from the proposal below. If something is not covered in these materials, say so clearly and suggest reaching out to the Intuitio Labs team directly.

CONTACT: For questions not answered here, contact Deep Kalina at deep.kalina@intuitiolabs.com or the Intuitio Labs team directly.


== WHO IS INTUITIO LABS ==

Intuitio Labs is a software development studio specializing in building AI-powered digital products — 32+ products launched across 11 industry verticals, $225M+ in product value created, 95% client retention rate.

Engagement model:
- Weekly 30-minute syncs with pre-circulated written updates — if everything is clear, the call is optional
- Sprint-based development in focused 2-week cycles (scope → build → demo → feedback)
- End-of-sprint demos are live, recorded, and shared; client has 2 business days to submit feedback
- Real-time client-facing project dashboard in Asana (tasks, blockers, timelines, sprint status)
- Intuitio Labs never reads slides on a call — the update is pre-circulated so call time is used for decisions only

Tools used during delivery: Slack (daily comms), Linear (sprint planning), Google Meet (recorded calls), Notion (notes/docs), Figma (design reviews).

Intuitio Labs uses the AI Tolerance Architecture (ATA) framework to evaluate which workflows are suitable for AI automation.

Intelligence Continuum principle:
- Low-end tasks (search, data transformation, reading/processing files): AI achieves 80–90% accuracy → production-ready
- High-end tasks (open-ended reasoning, judgment with no clear answer): AI currently at 40–50% accuracy → R&D territory, not production-ready

All three Retail Insite modules sit on the favorable low end — structured data retrieval, transformation, and template-based generation — not open-ended reasoning. This is why all three are confirmed feasible.


== WHO IS RETAIL INSITE ==

Retail Insite is a 23-person boutique commercial real estate brokerage specializing in retail properties in Southern California (Los Angeles to San Diego). The company has been in business for approximately 30 years, with 13 brokers and 5 principals, serving both landlords and tenant representation — from large-format tenants like Dick's Sporting Goods to boutique concepts like Shake Shack.

Karolyn Dale is the Director of Operations and is leading the modernization initiative at Retail Insite. The company recently launched a new Dynamics CRM (migrating from an older one) and built an internal mapping data platform that houses real estate knowledge to help brokers close deals. Deal data is currently scattered across QuickBooks, Excel vouchers, and incomplete CRM records.

Current systems in use:
- Microsoft Dynamics CRM (property and deal management)
- Microsoft Outlook (broker communications)
- QuickBooks (accounting/invoicing — vendor change pending)
- Retail Insite website (primary property data source)
- LoopNet (external listings platform)
- RingCentral (communications platform)


== THE PROBLEM ==

Manual coordination across disconnected systems is consuming broker and staff time that could be spent closing deals. Three high-priority pain points were identified:

1. INBOUND PROPERTY INQUIRIES: Brokers and assistants manually research property details and draft responses to inbound emails about property availability. Data lives on the website and partially in Dynamics CRM. Repetitive and time-consuming.

2. INVOICE GENERATION: Deal data is entered into Excel, then an outsourced bookkeeper manually re-types every row into QuickBooks. Error-prone and entirely manual. Commission splits are nuanced — broker splits, inside/outside brokers, payment timing, multiple deal variables per transaction.

3. LOI & LEASE DRAFTING: 8–9 of 13 brokers print out LOIs and leases, handwrite changes/markups, then send to word processors (including virtual assistants in the Philippines) to manually retype and produce clean redlines. High-volume, time-sensitive, and cannot be eliminated — brokers will not change this behavior.


== THE SOLUTION: 3 AUTOMATION MODULES ==

All three modules share one core principle: AI drafts or automates the work, but a human approves before anything is sent, posted, or finalized. No autonomous actions are taken without broker or finance review.

The three modules run on a shared automation platform with a shared data normalization layer. The foundation built for all modules is non-negotiable shared infrastructure (Weeks 1–3) that underpins everything.


--- MODULE 1: AI PROPERTY INQUIRY RESPONSE ---
Status: CONFIRMED FEASIBLE — Ready to build

Purpose: Draft accurate, property-specific responses to inbound inquiries, reducing manual research and drafting.

What it does:
- Monitors the Outlook inbox for inbound property inquiry emails
- Identifies the property mentioned in the inquiry
- Retrieves property and deal information from the Retail Insite website and Dynamics CRM
- Generates a draft email response with source-attributed property facts
- Broker reviews, edits if needed, and approves before sending

Key implementation detail:
- Brokers never leave Outlook — the draft appears directly in their inbox via Microsoft 365 Graph API + Outlook add-in

Guardrails and controls:
- Draft-first: no auto-send in the initial phase
- All property facts include source references so brokers can verify before sending
- System escalates to broker when data is incomplete rather than guessing
- 2–3 month human feedback loop planned before considering any auto-send capability

Primary data sources: Retail Insite website (primary) + Dynamics CRM (growing)

Investment: 269 hours | $18,292


--- MODULE 2: INVOICE PROCESSING AUTOMATION ---
Status: PENDING ACCOUNTING VENDOR SELECTION — estimate shown, architecture finalized after vendor confirmed

Purpose: Replace manual CRM → Excel → accounting re-entry workflow with automated drafting and finance approval.

What it does — two input methods supported:
1. Deal data pulled directly from Dynamics CRM, OR
2. Excel file drop — system normalizes the data automatically

Both methods result in:
- A generated invoice draft including reconciliation notes and commission split handling
- Routing of the draft to finance for review and approval
- Posting to the accounting platform only upon sign-off
- A full audit log maintained for the invoice lifecycle

Built to Flex (important):
- The system uses an accounting integration layer — it is not hardwired to QuickBooks
- If Retail Insite moves to Ramp or another platform, only the connector changes; the core logic and effort difference is minimal

Key complexity handled:
- Nuanced commission splits: inside/outside brokers, payment timing, multiple deal details per transaction

Controls:
- Human approval required before any accounting system posting
- Full audit log + error handling
- Excel ingestion validation ensures data completeness before invoice generation
- Reconciliation notes included with every draft

Investment: 331 hours | $22,508


--- MODULE 3: LOI DRAFT ASSISTANT ---
Status: CONFIRMED FEASIBLE — Ready to build

Purpose: Reduce time spent converting broker edits into a usable digital LOI/lease draft.

Two supported input methods:

1) Handwritten OCR:
- Broker uploads a scan or photo of their marked-up LOI/lease document
- System extracts handwritten annotations using OCR, maps changes to relevant clauses
- Generates an updated digital draft for broker review

2) Voice Dictation:
- Broker uploads the LOI/lease document and records voice instructions describing the required changes (e.g. "change lease term to 7 years")
- Speech-to-text converts instructions into structured document updates
- System generates a revised draft incorporating those changes

Output for both methods:
- Broker reviews the generated draft, edits if needed, and exports as PDF or DOCX

Key adoption insight:
- 8–9 of 13 brokers use the handwriting workflow and will not change their behavior
- The solution is designed to "meet brokers where they are" — no behavior change required
- AI handles the tedious initial draft; humans handle the nuance: exhibit placement, complex formatting, clause decisions
- Currently supported by virtual assistants in the Philippines — this module significantly reduces that workload

Note: Retail Insite previously attempted handwriting-to-text with Claude directly and had limited success. The LOI Draft Assistant is purpose-built for their workflow, using their own letterhead and document templates so the AI has structured context — significantly improving accuracy over ad-hoc attempts.

Investment: 432 hours | $29,376


== SHARED ARCHITECTURE ==

The automation platform is shared across all three modules, with a data normalization layer that standardizes property and deal data before AI processing.

Architecture layers (high-level):
1. Integration & external sources: API connectors + webhooks → LoopNet, Outlook, Dynamics CRM, Retail Insite website
2. Automation workflow engine: Inquiry Response Agent · Invoice Automation Engine · LOI Draft Assistant
3. AI processing layer: Intent Detection · Draft Generation (shared LLM infrastructure)
4. Human review layer: Broker Review Interface · Finance Review Interface
5. Output systems: Outlook (emails) · QuickBooks or equivalent (invoices) · LOI/Lease PDFs


== GUARDRAILS, GOVERNANCE & CONTROLS ==

Human-in-the-loop policy (non-negotiable for Phase 1):
- No outbound email is sent without broker approval
- No invoice or accounting entry is posted without finance team approval
- LOI/lease drafts are generated as initial drafts; brokers review, edit, and decide the final output

Draft-first policy (inquiry module): Initial rollout is draft-only with a 2–3 month feedback period before considering any auto-send behavior.

Audit logging (invoice module): Full audit trail maintained for the entire invoice lifecycle, with reconciliation notes on every draft showing what data was pulled and from where. Excel ingestion validation ensures data completeness before invoice generation begins.


== IMPLEMENTATION OPTIONS ==

Option A — Embedded Automation (RECOMMENDED):
Automation integrated directly into existing tools (Outlook + Dynamics CRM). Brokers work in familiar interfaces.
- Pros: Minimal workflow disruption, faster adoption, no new tools to learn, work occurs in familiar environments
- Cons: Limited centralized visibility; analytics distributed across systems

Option B — Operations Console (Future State):
A centralized dashboard to review and manage AI-generated tasks across all three modules (unified task queue).
- Pros: Centralized visibility across modules, consistent approval processes, easier reporting and analytics
- Cons: Requires adopting a new internal tool; change management and onboarding effort

Recommendation: Start with Embedded Automation. Introduce the Operations Console later once adoption is established.


== INVESTMENT SUMMARY ==

Platform Foundation (Weeks 1–3, shared across all modules): $15,980
Module 1 — AI Inquiry Response: 269 hours | $18,292
Module 2 — Invoice Automation: 331 hours | $22,508
Module 3 — LOI Draft Assistant: 432 hours | $29,376
Total Investment: ~$86,000

How the total reconciles:
- Modules subtotal: $18,292 + $22,508 + $29,376 = $70,176
- Platform Foundation: $15,980
- Grand total: $86,156 → shown as ~$86K in the deck


== TIMELINE & DELIVERY ==

Weeks 1–3 — Platform Foundation (non-negotiable, shared across all modules):
- Authentication and access control
- Workflow engine
- AI orchestration layer
- Integration framework (Outlook, Dynamics CRM connectors)
- Audit logging

After Week 3, client chooses one of two delivery paths:

Option A — Parallel Execution (Faster):
- All three modules built simultaneously by dedicated workstreams
- Estimated completion: approximately Week 8 from kickoff
- Invoice Automation timing depends on accounting vendor confirmation

Option B — Sequential Execution (More Controlled):
- Weeks 4–10: Phase 1 — AI Inquiry Response
- Weeks 11–18: Phase 2 — LOI Draft Assistant
- Phase 3 — Invoice Automation: after vendor confirmation

Sprint delivery model:
- Focused 2-week development cycles
- Scope defined at sprint start → build → demo at end → 2 business days for client feedback
- Weekly written update pre-circulated; call is optional if everything is clear
- Weekly syncs capped at 30 minutes


== NEXT STEPS ==

1. Accounting vendor clarity: Karolyn to confirm vendor selection after pending calls — this unblocks Module 2 final scoping and architecture
2. NDA execution: Enables more detailed technical discussions about Retail Insite's systems and data
3. Contract signature & kickoff: Platform foundation work (Weeks 1–3) starts immediately after signing

Build readiness:
- ✅ AI Inquiry Response (Module 1): Ready
- ✅ LOI Draft Assistant (Module 3): Ready
- ⏳ Invoice Automation (Module 2): Pending accounting vendor confirmation


== COMMON QUESTIONS ==

Q: Will the AI send emails automatically?
A: No. Initial rollout is draft-first. Brokers review and approve before sending. Auto-send is only considered after a 2–3 month feedback loop.

Q: Will invoices be posted automatically?
A: No. Finance approves before any posting to the accounting platform. Audit logs and reconciliation notes are maintained throughout.

Q: Do brokers need to change their workflow?
A: No. The system is designed to minimize behavior change. Inquiry responses happen inside Outlook (via an Outlook add-in — brokers never leave their inbox). LOI drafting supports the existing handwriting workflow, plus a new voice dictation option for brokers who prefer it.

Q: What accounting system will be used?
A: QuickBooks or an equivalent platform depending on vendor selection. The system is built to flex — the accounting integration layer means that if Retail Insite moves to Ramp or another platform, only the connector changes. The core logic stays the same.

Q: What are the two LOI input methods?
A: Handwritten OCR (broker uploads a scan of their marked-up document; system extracts annotations and generates a draft) and Voice Dictation (broker records voice instructions alongside the document; speech-to-text converts them into structured updates and generates a revised draft).

Q: What is the total investment?
A: Approximately $86,000. This breaks down as: Platform Foundation $15,980 + Module 1 (Inquiry Response) $18,292 + Module 2 (Invoice Automation) $22,508 + Module 3 (LOI Draft Assistant) $29,376 = $86,156.

Q: Why is Module 2 (invoicing) on hold?
A: Retail Insite is switching accounting service providers. The architecture depends on which platform the new vendor uses. Once Karolyn confirms the vendor, Intuitio Labs can finalize scope and architecture. The current estimate ($22,508) is confirmed; only the connector integration layer is subject to minor adjustment.

Q: Can all three modules be built at the same time?
A: Yes — the shared platform foundation (Weeks 1–3) supports all three. After that, all modules can start in parallel (Option A, faster) or sequentially (Option B, more controlled). Module 2 timing depends on vendor confirmation.

Q: How do weekly updates work?
A: Intuitio Labs sends a written update before every weekly sync. If everything is clear, the call is optional and capped at 30 minutes. Intuitio Labs never reads slides on a call.

Q: What is an operations console and do we need one?
A: A central dashboard where all AI-generated drafts can be reviewed and approved in one place. The recommendation is to start without it and add it later once adoption is established.

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
            AI Automation - Retail Insite
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
              stroke={input.trim() && !loading ? "#0a0a08" : "#3a3830"}
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
