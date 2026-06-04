export const servicesData = {
  audit: {
    slug: "audit",
    tierLabel: "Tier 01 · Wedge",
    title: "AI Opportunity Audit",
    tagline: "Clarity, before commitment.",
    lede: "Most businesses don't have an AI problem — they have a prioritisation problem. There are dozens of things you could automate, and no clear way to tell which ones are worth the money. The Audit is a short, structured engagement that replaces that guesswork with a ranked, evidence-based plan.",
    meta: [
      { label: "Timeline", value: "1–2 weeks" },
      { label: "Investment", value: "Fixed fee" },
      { label: "Your time", value: "~3–4 hours total" },
      { label: "Format", value: "Remote or on-site" }
    ],
    fit: {
      yes: [
        "You sense automation could help but can't name the highest-value use case",
        "You've had vendors pitch you tools and want a second opinion",
        "You need an internal business case to take to leadership or a board",
        "A previous AI pilot stalled and you want to understand why"
      ],
      no: [
        "You already know exactly what to build — go straight to a Sprint",
        "You need a system live in the next two weeks",
        "The problem is strategy or product, not operations"
      ]
    },
    process: [
      {
        number: "01",
        title: "Discovery & framing",
        timeframe: "Days 1–2 · 1 workshop",
        description: "We run a focused session with you and the relevant team leads to understand how your business actually runs — where time goes, where errors creep in, and where the friction lives. We agree on what \"high impact\" means for you specifically: revenue, cost, capacity, or risk."
      },
      {
        number: "02",
        title: "Workflow mapping",
        timeframe: "Days 3–6 · Mostly our time",
        description: "We document the workflows that matter as they really are — not the org-chart version. Each one is broken into steps, with volume, time cost, and pain points attached. This is where hidden opportunities (and hidden complexity) surface."
      },
      {
        number: "03",
        title: "Opportunity scoring",
        timeframe: "Days 7–9 · Our analysis",
        description: "Every candidate opportunity is scored on impact, feasibility, and cost to build. We pressure-test each one against your data, tools, and team — discarding the ones that sound good but won't pay back, and ranking what's left."
      },
      {
        number: "04",
        title: "Roadmap & readout",
        timeframe: "Day 10 · 1 readout session",
        description: "We present the findings in a working session — a ranked roadmap with a clear recommended first move, estimated effort and return for each item, and a plain-English explanation of the reasoning. You leave able to make the next decision yourself."
      }
    ],
    deliverables: [
      {
        tag: "Document",
        title: "Workflow map",
        description: "A visual map of your core operational workflows, annotated with time cost, volume, and friction points."
      },
      {
        tag: "Document",
        title: "Ranked opportunity register",
        description: "Every viable AI/automation opportunity, scored on impact, feasibility, and cost — sorted so the priorities are obvious."
      },
      {
        tag: "Document",
        title: "Phased roadmap",
        description: "A sequenced plan showing what to do first, next, and later, with effort and expected return for each phase."
      },
      {
        tag: "Session",
        title: "Readout & Q&A",
        description: "A live walkthrough of the findings with your team, plus the recording and slides for anyone who couldn't attend."
      }
    ],
    outcomes: {
      beforeAfter: [
        {
          before: "A vague sense that \"we should be doing something with AI.\"",
          after: "A ranked, costed list of specific moves and a clear first step."
        },
        {
          before: "Vendor pitches you can't objectively compare.",
          after: "A neutral benchmark to judge every proposal against."
        },
        {
          before: "Budget at risk on the wrong first project.",
          after: "Confidence that your first build is the highest-return one."
        }
      ],
      impact: [
        {
          title: "De-risked spend",
          desc: "you commit budget only to opportunities that have been pressure-tested."
        },
        {
          title: "Internal alignment",
          desc: "leadership and operations work from one shared, evidence-based plan."
        },
        {
          title: "Faster decisions",
          desc: "the \"what should we do first\" debate is settled in two weeks, not two quarters."
        }
      ]
    }
  },
  sprint: {
    slug: "sprint",
    tierLabel: "Tier 02 · Build",
    title: "Implementation Sprint",
    tagline: "One system. Shipped.",
    lede: "The graveyard of corporate AI is full of pilots that never reached production. The Sprint exists to avoid that outcome entirely: we take a single, well-defined opportunity and build it into a system that is live, used, and owned by you — within weeks, for a fixed fee.",
    meta: [
      { label: "Timeline", value: "3–6 weeks" },
      { label: "Investment", value: "Fixed fee" },
      { label: "Your time", value: "~2 hrs / week" },
      { label: "Output", value: "One production system" }
    ],
    fit: {
      yes: [
        "You have one specific, repetitive process that's costing real time or money",
        "You've completed an Audit and want to action the top recommendation",
        "You need a working result, not a slide deck or a proof of concept",
        "You want to test what an external partner can deliver before a larger commitment"
      ],
      no: [
        "The problem spans many connected workflows — consider Transformation",
        "You can't yet articulate the single use case to focus on — start with an Audit",
        "Requirements are still actively shifting week to week"
      ]
    },
    process: [
      {
        number: "01",
        title: "Scope lock",
        timeframe: "Week 1 · Definition",
        description: "We turn the chosen opportunity into a precise specification: exactly what the system will do, what it explicitly won't, what \"done\" looks like, and how success will be measured. This is the contract for the build — agreed before any code is written."
      },
      {
        number: "02",
        title: "Build & integrate",
        timeframe: "Weeks 2–4 · Core delivery",
        description: "We build the system and integrate it with the tools you already use — your CRM, inbox, data sources, or internal apps. You see progress in regular check-ins, with working previews rather than status reports, so there are no surprises at the end."
      },
      {
        number: "03",
        title: "Test & refine",
        timeframe: "Week 4–5 · Validation",
        description: "The system is tested against real data and real cases. We run it alongside your current process, catch the edge cases, and tune it until the output is something you'd trust without checking — then we get your formal sign-off."
      },
      {
        number: "04",
        title: "Launch & handover",
        timeframe: "Week 5–6 · Ownership transfer",
        description: "We deploy to production, train the people who'll use it, and hand over clear documentation. You finish the sprint owning the system outright — able to run it, explain it, and extend it without depending on us."
      }
    ],
    deliverables: [
      {
        tag: "System",
        title: "A live production system",
        description: "The working system itself — deployed, integrated with your tools, and in active use by your team."
      },
      {
        tag: "Document",
        title: "Scope & success spec",
        description: "The agreed definition of what was built and the measurable outcome it was designed to deliver."
      },
      {
        tag: "Document",
        title: "Operating documentation",
        description: "Plain-language guides for running, maintaining, and troubleshooting the system day to day."
      },
      {
        tag: "Session",
        title: "Team training & handover",
        description: "A live training session for the people who'll use it, plus a recording for future onboarding."
      }
    ],
    outcomes: {
      beforeAfter: [
        {
          before: "A known bottleneck quietly draining hours every week.",
          after: "That work handled by a system, freeing the team for higher-value tasks."
        },
        {
          before: "AI as an idea you've talked about but never shipped.",
          after: "A real, working proof point your whole organisation can see."
        },
        {
          before: "Dependence on a vendor to keep the lights on.",
          after: "Full ownership — the system is yours to run and extend."
        }
      ],
      impact: [
        {
          title: "Reclaimed capacity",
          desc: "repetitive work is absorbed by the system, returning hours to your team."
        },
        {
          title: "Momentum",
          desc: "one shipped system builds the internal confidence to invest further."
        },
        {
          title: "Fixed-fee certainty",
          desc: "you know the cost and the scope before the work begins."
        }
      ]
    }
  },
  transform: {
    slug: "transform",
    tierLabel: "Tier 03 · Flagship",
    title: "Digital Transformation",
    tagline: "Operations, end to end.",
    lede: "When the friction isn't in one process but in how everything connects, a single system won't fix it. Transformation is our most comprehensive engagement: we rebuild how your operations run as a connected whole — multiple systems, automation, and AI, designed around your business and delivered alongside your team.",
    meta: [
      { label: "Timeline", value: "3–6 months" },
      { label: "Investment", value: "Fixed fee, phased" },
      { label: "Engagement", value: "Embedded with your team" },
      { label: "Output", value: "Connected operating system" }
    ],
    fit: {
      yes: [
        "Growth is being held back by manual, disconnected operations",
        "You're running on a patchwork of tools that don't talk to each other",
        "You've shipped point solutions and now need them to work as one system",
        "Leadership is committed to operational change, not just a tool purchase"
      ],
      no: [
        "You have one clear problem to solve — a Sprint will be faster and cheaper",
        "There's no sponsor with authority to drive change internally",
        "You want to test the partnership first — start smaller, then scale up"
      ]
    },
    process: [
      {
        number: "01",
        title: "Operating model design",
        timeframe: "Month 1 · Blueprint",
        description: "We map your operations as a whole and design the target state — how systems, data, and people should fit together. The output is a blueprint and a phased delivery plan, sequenced so the highest-value changes land first."
      },
      {
        number: "02",
        title: "Phased build",
        timeframe: "Months 2–4 · Core delivery",
        description: "We build the systems in priority order, each one shipped to production as it's ready rather than held back to a single launch. Every phase is integrated into the connected whole, so value compounds as the programme progresses."
      },
      {
        number: "03",
        title: "Integration & automation",
        timeframe: "Months 3–5 · Connecting the system",
        description: "We connect the systems into a single operating layer — data flows automatically, hand-offs that used to be manual become seamless, and your team works from one coherent picture instead of scattered tools."
      },
      {
        number: "04",
        title: "Enablement & handover",
        timeframe: "Month 5–6 · Building independence",
        description: "We train your team, document everything, and progressively hand over ownership. The goal is independence: by the end you can run, maintain, and evolve the system without us — with a clear roadmap for what comes next."
      }
    ],
    deliverables: [
      {
        tag: "Document",
        title: "Operating model blueprint",
        description: "The full design of your future-state operations and the phased plan to get there."
      },
      {
        tag: "System",
        title: "A connected system suite",
        description: "Multiple production systems, integrated into a single operating layer with automated data flow."
      },
      {
        tag: "Document",
        title: "Technical & operating documentation",
        description: "Complete documentation of every system — how it works, how it connects, and how to maintain it."
      },
      {
        tag: "Programme",
        title: "Team enablement & growth roadmap",
        description: "Hands-on training across your team, plus a forward roadmap for evolving the system after handover."
      }
    ],
    outcomes: {
      beforeAfter: [
        {
          before: "Disconnected tools and manual hand-offs between every step.",
          after: "One connected operating system where work flows automatically."
        },
        {
          before: "Operations that strain and break as the business grows.",
          after: "An operating model built to absorb growth without adding headcount."
        },
        {
          before: "Decisions made on fragmented, lagging data.",
          after: "A single, current view of the business to lead from."
        }
      ],
      impact: [
        {
          title: "Scalable capacity",
          desc: "operations grow with revenue instead of pulling against it."
        },
        {
          title: "Lower operating cost",
          desc: "automation removes manual effort across the whole workflow, not one slice."
        },
        {
          title: "Strategic independence",
          desc: "your team owns and evolves the system, with us as optional support, not a dependency."
        }
      ]
    }
  }
};
