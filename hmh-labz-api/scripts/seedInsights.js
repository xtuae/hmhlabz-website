import 'dotenv/config';
import prisma from '../api/lib/prisma.js';

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

const insights = [
  {
    title: "Why most legal-tech AI pilots stall before month three.",
    tag: "Field Notes",
    readTime: "8 min read",
    category: "Field Notes",
    excerpt: "Three patterns we keep seeing — overscoped pilots, no clear owner on the firm side, and unclear \"done.\" A field-tested anatomy of where AI rollouts quietly die.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">Three patterns we keep seeing — overscoped pilots, no clear owner on the firm side, and unclear "done." A field-tested anatomy of where AI rollouts quietly die.</p>
<p><span class="font-bold text-black font-sans">E</span>very quarter, we sit with practice group leaders who are frustrated by their firm’s AI initiatives. They have paid for enterprise licenses, formed "innovation committees," and identified high-impact use cases. Yet twelve weeks later, the pilot is effectively dead.</p>
<p>The software works. The underlying models are capable. But adoption hovers near zero, and the billable hours spent managing the pilot have far outweighed any efficiency gains.</p>
<p>When we audit these stalled deployments, we almost never find a technology failure. Instead, we find one of three structural missteps in how the pilot was framed.</p>

<h3 id="pattern-1">1. Overscoping the Initial Workflow</h3>
<p>The most common trap is attempting to automate an entire end-to-end legal process. A firm will look at "M&A Due Diligence" or "Commercial Lease Review" and try to build a single prompt chain that takes raw documents and outputs a finished, partner-ready schedule.</p>
<p>This fails because complex legal workflows are not linear pipelines; they are recursive loops of judgment, exception handling, and client-specific context. When a model gets 85% of a massive workflow right, the remaining 15% of hallucinations or subtle errors destroys trust. Associates find it takes longer to verify the AI’s output than to draft from scratch.</p>

<div class="my-12 p-8 bg-gray-50 rounded-2xl border border-black/5 font-mono text-sm">
  <div class="text-[#c84b21] font-bold mb-2">FIELD PRINCIPLE 01</div>
  <div class="text-black font-bold">Never automate an end-to-end process in phase one. Isolate a single, high-friction, low-context sub-task—like extracting change-of-control clauses into a structured table—and automate that to 99% reliability.</div>
</div>

<h3 id="pattern-2">2. The "Orphaned Pilot" Syndrome</h3>
<p>Pilots bought by IT but deployed to practice groups without a dedicated, billable workflow owner always fail. Lawyers are measured in six-minute increments; they do not have the economic incentive to debug prompt templates, log edge cases, or redesign their personal filing habits to accommodate a new tool.</p>
<p>If the firm does not compensate a senior associate or practice support lawyer to actively manage the bridge between the software and the practice group’s daily reality, the tool becomes an orphan. It sits on the desktop, unused after the second training webinar.</p>

<h3 id="pattern-3">3. Unclear Definitions of "Done"</h3>
<p>Ask an innovation committee what success looks like for an AI pilot, and you will hear vague aspirations: "increased efficiency," "better associate realization," or "modernized workflows."</p>
<p>Without a quantifiable, binary success metric agreed upon at day zero, pilots drift into a state of perpetual evaluation. The vendor asks for a renewal; the firm asks for another six-month trial because "we need more data."</p>

<p class="font-bold text-black font-sans">To break this cycle, firms must treat AI pilots not as software installations, but as operational interventions. Define the exact metric (e.g., "reduce first-pass lease abstraction from 4 hours to 45 minutes"), assign a compensated workflow owner, and keep the scope ruthlessly narrow.</p>`,
    seoTitle: "Why Most Legal-Tech AI Pilots Stall Before Month Three | HMH Labz",
    seoDescription: "An in-depth analysis of why law firm AI rollouts fail and how to structure successful legal tech pilots with clear operational metrics.",
    publishedAt: new Date("2026-03-14T10:00:00Z"),
  },
  {
    title: "Mapping a recruitment workflow before automating it.",
    tag: "Playbook",
    readTime: "11 min read",
    category: "Playbook",
    excerpt: "The cost of automating the wrong step is higher than not automating at all. A walkthrough of how we map before we touch any code.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">The cost of automating the wrong step is higher than not automating at all. A walkthrough of how we map before we touch any code.</p><p>Before writing a single line of integration logic or configuring an LLM prompt, we spend two weeks shadowing the recruitment coordinators. We map every manual touchpoint, email thread, and spreadsheet copy-paste.</p><h3 id="step-1">1. Identifying the Silent Bottlenecks</h3><p>Most teams think their bottleneck is candidate sourcing. When we look at the data, it's almost always interview scheduling and feedback collection. Automating sourcing without fixing scheduling just creates a larger backlog.</p><h3 id="step-2">2. Standardizing the Data Schema</h3><p>We establish a rigid candidate data schema before letting any AI tool parse resumes. Consistency across ATS fields ensures downstream automations don't fail on missing metadata.</p>`,
    seoTitle: "Mapping Recruitment Workflows Before Automating | HMH Labz",
    seoDescription: "Learn how HMH Labz maps recruitment and HR workflows before deploying AI automations to ensure maximum ROI and reliability.",
    publishedAt: new Date("2026-02-10T10:00:00Z"),
  },
  {
    title: "What \"documented hand-off\" actually means in practice.",
    tag: "Case Note",
    readTime: "7 min read",
    category: "Case Note",
    excerpt: "A six-month-old hand-off should still let a new ops hire pick up the system. Here's the checklist we leave behind.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">A six-month-old hand-off should still let a new ops hire pick up the system. Here's the checklist we leave behind.</p><p>Documentation is often treated as an afterthought. At HMH Labz, the documentation is the deliverable. If the client's internal team cannot maintain and extend the automation after we depart, the project has failed.</p><h3 id="checklist">The Non-Negotiable Assets</h3><p>Every hand-off includes an Architecture Schema, a Loom walkthrough of the codebase, a Troubleshooting Matrix for common API timeouts, and an Escalation Protocol.</p>`,
    seoTitle: "What Documented Hand-Off Actually Means | HMH Labz",
    seoDescription: "Explore the HMH Labz checklist for delivering robust, maintainable AI automation hand-offs to internal operations teams.",
    publishedAt: new Date("2026-01-15T10:00:00Z"),
  },
  {
    title: "Three duct-taped tools we replaced this quarter.",
    tag: "Field Notes",
    readTime: "5 min read",
    category: "Field Notes",
    excerpt: "Excel, a Slack channel, and a shared inbox. Quiet wins that compounded faster than we expected.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">Excel, a Slack channel, and a shared inbox. Quiet wins that compounded faster than we expected.</p><p>Enterprise operations run on duct tape. While massive ERP transformations take years, replacing small, fragile manual bridges yields immediate compounding returns.</p><h3 id="tool-1">1. The Shared Inbox Parser</h3><p>We replaced a team of three manually categorizing customer support emails with a lightweight classification webhook. Accuracy increased from 82% to 96%.</p>`,
    seoTitle: "Replacing Duct-Taped Internal Tools | HMH Labz",
    seoDescription: "How replacing fragile manual workflows with lightweight AI micro-automations delivers immediate compounding returns.",
    publishedAt: new Date("2025-12-05T10:00:00Z"),
  },
  {
    title: "Scoring AI opportunities: the rubric we actually use.",
    tag: "Playbook",
    readTime: "9 min read",
    category: "Playbook",
    excerpt: "Impact, feasibility, cost, time. Four numbers, one ranked list, zero theatre.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">Impact, feasibility, cost, time. Four numbers, one ranked list, zero theatre.</p><p>When evaluating potential AI projects, teams often fall victim to hype. We use a ruthless 4-factor rubric to score every proposed automation before committing engineering resources.</p><h3 id="rubric">The Four Factors</h3><p>We evaluate Operational Impact (1-5), Technical Feasibility (1-5), Maintenance Overhead (1-5), and Time-to-Value. Anything scoring below a 14 is discarded.</p>`,
    seoTitle: "Scoring AI Opportunities Rubric | HMH Labz",
    seoDescription: "The exact 4-factor rubric HMH Labz uses to evaluate and prioritize enterprise AI automation opportunities.",
    publishedAt: new Date("2025-11-20T10:00:00Z"),
  },
  {
    title: "Why we said no to a flagship engagement — and what we built instead.",
    tag: "Case Note",
    readTime: "6 min read",
    category: "Case Note",
    excerpt: "Sometimes the most useful answer is a 6-week sprint and a hiring change. The client agreed; revenue followed.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">Sometimes the most useful answer is a 6-week sprint and a hiring change. The client agreed; revenue followed.</p><p>A major logistics provider asked us to build a custom LLM orchestration platform. After auditing their data infrastructure, we realized they didn't need AI—they needed clean data pipelines.</p><h3 id="outcome">The Pivot</h3><p>We declined the $500k custom build and instead executed a $75k data standardization sprint. The client saved hundreds of thousands in unnecessary software licenses.</p>`,
    seoTitle: "Why We Said No to a Flagship AI Build | HMH Labz",
    seoDescription: "A case study on turning down lucrative custom AI builds in favor of foundational data engineering sprints.",
    publishedAt: new Date("2025-10-18T10:00:00Z"),
  },
  {
    title: "The first question we ask in every diagnostic.",
    tag: "Field Notes",
    readTime: "4 min read",
    category: "Field Notes",
    excerpt: "It's not about AI. It's about which sentence in the business is the most expensive one.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">It's not about AI. It's about which sentence in the business is the most expensive one.</p><p>When we begin an operational diagnostic, we don't ask about tech stacks or cloud budgets. We ask: 'What is the single most expensive recurring sentence spoken in your company?'</p><h3 id="finding-friction">Locating Friction</h3><p>Often, the answer is 'Let me check with the partner' or 'I need to pull those numbers from the portal.' That sentence is where we focus our automation efforts.</p>`,
    seoTitle: "The First Question in Every Diagnostic | HMH Labz",
    seoDescription: "Discover the foundational operational question HMH Labz asks to uncover hidden enterprise bottlenecks and automation ROI.",
    publishedAt: new Date("2025-09-12T10:00:00Z"),
  },
  {
    title: "Hand-off checklists for client-portal builds.",
    tag: "Playbook",
    readTime: "8 min read",
    category: "Playbook",
    excerpt: "Documentation, training, escalation paths. The unsexy work that decides whether anything we built actually sticks.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">Documentation, training, escalation paths. The unsexy work that decides whether anything we built actually sticks.</p><p>Client portals are notorious for low adoption. Building the interface is 20% of the challenge; onboarding the client's stakeholders is the other 80%.</p><h3 id="protocol">The Onboarding Protocol</h3><p>We deploy mandatory 15-minute interactive Loom onboarding sessions, automated email drip tips, and a dedicated Slack escalation channel during the first 30 days of launch.</p>`,
    seoTitle: "Client Portal Hand-Off Checklists | HMH Labz",
    seoDescription: "HMH Labz's proven onboarding and hand-off checklist for driving high adoption in custom client portals.",
    publishedAt: new Date("2025-08-25T10:00:00Z"),
  },
  {
    title: "Don't trust the workflow diagram. Sit with the ops manager.",
    tag: "Field Notes",
    readTime: "3 min read",
    category: "Field Notes",
    excerpt: "The 30-minute ride-along has paid for itself on every engagement.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">The 30-minute ride-along has paid for itself on every engagement.</p><p>Official SOPs and executive workflow diagrams represent how management wishes the company worked. The ops manager's browser bookmarks and sticky notes represent how it actually works.</p><h3 id="shadowing">The Power of Shadowing</h3><p>We spend our first week sitting next to the people doing the work. Seeing where they hesitate, where they sigh, and where they open Notepad reveals the true automation opportunities.</p>`,
    seoTitle: "Don't Trust Workflow Diagrams | HMH Labz",
    seoDescription: "Why shadowing operations managers reveals the true automation opportunities that executive workflow diagrams miss.",
    publishedAt: new Date("2025-07-14T10:00:00Z"),
  },
  {
    title: "Migrating a 12-year-old case-intake spreadsheet.",
    tag: "Case Note",
    readTime: "10 min read",
    category: "Case Note",
    excerpt: "Eight hundred rows, four logins, two interns. What we kept, what we threw out, and what surprised us.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">Eight hundred rows, four logins, two interns. What we kept, what we threw out, and what surprised us.</p><p>Legacy spreadsheets are the structural load-bearing pillars of many firms. Replacing them requires surgical precision to ensure historical data integrity is preserved.</p><h3 id="migration">The Migration Strategy</h3><p>We built a shadow database running in parallel with the spreadsheet for 30 days, catching edge-case validation errors before fully cutting over to the automated intake engine.</p>`,
    seoTitle: "Migrating Legacy Intake Spreadsheets | HMH Labz",
    seoDescription: "A surgical case study on migrating complex legacy spreadsheets to automated database engines without downtime.",
    publishedAt: new Date("2025-06-30T10:00:00Z"),
  },
  {
    title: "RAG that doesn't hallucinate: our retrieval defaults.",
    tag: "Playbook",
    readTime: "12 min read",
    category: "Playbook",
    excerpt: "Chunking, embedding, reranking, evaluation. The recipe we reach for first in regulated-industry defaults.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">Chunking, embedding, reranking, evaluation. The recipe we reach for first in regulated-industry defaults.</p><p>In legal and financial applications, a 95% accurate RAG pipeline is a liability. We employ a strict multi-stage retrieval architecture to guarantee deterministic accuracy.</p><h3 id="architecture">The Retrieval Stack</h3><p>We utilize semantic chunking with 20% overlap, hybrid search combining BM25 and dense embeddings, Cohere reranking, and an LLM-as-a-judge verification loop before outputting to the user.</p>`,
    seoTitle: "RAG That Doesn't Hallucinate | HMH Labz",
    seoDescription: "HMH Labz's enterprise retrieval-augmented generation (RAG) architecture for regulated industries requiring zero hallucinations.",
    publishedAt: new Date("2025-05-15T10:00:00Z"),
  },
  {
    title: "Why \"AI strategy\" decks make us nervous.",
    tag: "Field Notes",
    readTime: "5 min read",
    category: "Field Notes",
    excerpt: "If the deck doesn't end with a system we'd ship next month, it's not a strategy. It's a wishlist.",
    content: `<p class="text-xl font-bold text-gray-400 font-sans tracking-tight mb-8">If the deck doesn't end with a system we'd ship next month, it's not a strategy. It's a wishlist.</p><p>Consultancies sell 50-slide AI strategy decks that sit in Google Drive. We believe strategy is inseparable from implementation. If you cannot build a functional prototype within 30 days, the strategy is flawed.</p><h3 id="shipping">Focus on Shipping</h3><p>Our strategic roadmaps consist of 6-week implementation sprints. Every milestone delivers a functional, deployed operational intervention.</p>`,
    seoTitle: "Why AI Strategy Decks Make Us Nervous | HMH Labz",
    seoDescription: "Why HMH Labz favors 6-week operational implementation sprints over theoretical 50-slide AI strategy decks.",
    publishedAt: new Date("2025-04-10T10:00:00Z"),
  }
];

async function main() {
  console.log("Seeding insights...");
  for (const item of insights) {
    const slug = slugify(item.title);
    const existing = await prisma.insight.findUnique({ where: { slug } });
    if (existing) {
      await prisma.insight.update({
        where: { slug },
        data: {
          title: item.title,
          tag: item.tag,
          readTime: item.readTime,
          category: item.category,
          excerpt: item.excerpt,
          content: item.content,
          seoTitle: item.seoTitle,
          seoDescription: item.seoDescription,
          status: "PUBLISHED",
          publishedAt: item.publishedAt,
        }
      });
      console.log("Updated: " + item.title);
    } else {
      await prisma.insight.create({
        data: {
          title: item.title,
          slug,
          tag: item.tag,
          readTime: item.readTime,
          category: item.category,
          excerpt: item.excerpt,
          content: item.content,
          seoTitle: item.seoTitle,
          seoDescription: item.seoDescription,
          status: "PUBLISHED",
          publishedAt: item.publishedAt,
        }
      });
      console.log("Created: " + item.title);
    }
  }
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
