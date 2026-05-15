import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Homepage
  const homePage = await prisma.page.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      slug: 'home',
      title: 'Strategy + build, in one team. | HMH Labz',
      metaDescription: 'We help service businesses scale by building custom AI workflows and operations systems.',
      content: {
        hero: { 
          title: "Strategy + build,", 
          highlight: "in one team.", 
          description: "We tell you what to do, then we ship it. For service businesses where operations have broken under growth — too much manual work, too many duct-taped tools, too much depending on people remembering things.", 
          stats: [
            { prefix: "", number: "84", suffix: "%", desc: "average reduction in manual workflow time after a sprint." },
            { prefix: "$", number: "2.4", suffix: "M", desc: "unlocked across client engagements, cumulative." },
            { prefix: "", number: "2-12", suffix: "weeks", desc: "from first diagnostic to shipped systems." }
          ] 
        },
        approach: { 
          title: "Most studios talk. Most consultants", 
          highlight: "vanish.", 
          description: "One linear process. The same team carries every step — so nothing gets lost between strategy and shipping.",
          steps: [
            { title: "Find what's actually broken.", desc: "We map your workflows, interview your team, and isolate the bottlenecks worth fixing first. Not a generic audit — a real one." },
            { title: "Score the highest-ROI fix.", desc: "Every opportunity gets a clear number — impact, feasibility, cost, time. You walk away knowing what to do first, and why." },
            { title: "Build the system that solves it.", desc: "Custom platforms, client portals, AI workflows, document automation. The same team that diagnosed it ships it." }
          ]
        },
        howWeWork: {
          title: "Three ways we work", 
          highlight: "with you.", 
          description: "Each engagement stands alone. No long-term lock-ins. We ship value, then you decide what's next.",
          tiers: [
            { title: "AI Opportunity Audit", desc: "Clarity, before commitment. We identify the high-ROI leverage points in your business.", timeline: "2-12 wks", shape: "Fixed fee", walkAway: "A prioritised list of buildable opportunities." },
            { title: "Implementation Sprint", desc: "Shipping the roadmap. One sprint, one specific system or automation launched.", timeline: "4-12 wks", shape: "Fixed fee", walkAway: "A live, fully operational system." },
            { title: "Embedded Studio", desc: "Your dedicated build team. We become your fractional product and engineering arm.", timeline: "Ongoing", shape: "Monthly", walkAway: "Continuous operational transformation." }
          ]
        },
        whyHmhLabz: {
          title: "Strategy and build", 
          highlight: "in the same team.", 
          description: "Four principles we hold to, even when it's commercially inconvenient.",
          principles: [
            { title: "We don't pitch from a template.", desc: "Every engagement starts with diagnosis. If we can't articulate the problem clearly, we don't propose a solution." },
            { title: "Strategy and build live in the same team.", desc: "The person who recommends the system is responsible for shipping it. No handoffs to a separate delivery team." },
            { title: "We tell you when AI is the wrong answer.", desc: "Often the highest-ROI move is a process fix or a hiring change. We'll say so, even when it's not in our interest." },
            { title: "Built for the long term.", desc: "We document, we hand over, and we leave you with a system your team can actually own — not a black box." }
          ]
        },
        costOfWaiting: {
          title: "Every hour you spend doing it", 
          highlight: "doesn't grow.", 
          manualLabel: "manually",
          middleText: "is an hour your business",
          quote: "It's all in someone's head is the most expensive sentence in your business."
        },
        cta: {
          title: "Ready to", 
          highlight: "stop waiting?", 
          description: "Let's build the system your team actually needs.",
          buttonText: "Book a 20-min Fit Call →"
        }
      }
    }
  });

  // 2. Seed About Page
  const aboutPage = await prisma.page.upsert({
    where: { slug: 'about' },
    update: {},
    create: {
      slug: 'about',
      title: 'About HMH Labz | The Operations Hub',
      metaDescription: 'Strategy + build in the same team. Meet the operators behind HMH Labz.',
      content: {
        hero: { 
          title: "About", 
          highlight: "HMH Labz", 
          description: "We are an operational hub designed to diagnose bottlenecks and ship systems. We founded HMH Labz to kill the traditional agency hand-off." 
        },
        story: { 
          heading: "Our Origins", 
          text: "Founded on the principle that handoffs kill momentum. We saw too many consultants leave behind slide decks, and too many dev shops build tools that operators didn't actually need. We decided to do both — properly." 
        },
        team: { 
          heading: "The Operators", 
          members: [
            { name: "Haja Mohideen", role: "Founder & Lead Architect", bio: "Full-stack developer and systems strategist specializing in workflow automation and operations scaling." }
          ]
        }
      }
    }
  });

  console.log('✅ Seeding complete!');
  console.log(`- Seeded page: ${homePage.slug}`);
  console.log(`- Seeded page: ${aboutPage.slug}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
