import 'dotenv/config';
import prisma from '../api/lib/prisma.js';

async function main() {
  // 1. Seed Contact Data
  await prisma.page.upsert({
    where: { slug: 'contact' },
    update: {
      content: {
        header: { 
          title: "Start a", 
          highlight: "conversation.", 
          description: "Have an engagement in mind? Skip the pitch deck. Send us the details and we'll tell you immediately if we're the right fit to build it." 
        },
        locations: [
          { 
            city: "CHENNAI", 
            address: "W-32/117, Plot No. C-10,\n2nd Floor, 3rd Avenue,\nAnna Nagar, Chennai,\nTamil Nadu, India 600040.", 
            phone: "+91 90805 50655", 
            email: "hello@hmhlabz.com" 
          },
          { 
            city: "DUBAI", 
            address: "Al Quasis 2,\nDubai, United Arab Emirates", 
            phone: "+971 (0) 50 123 4567", 
            email: "hello@hmhlabz.com" 
          }
        ]
      }
    },
    create: {
      slug: 'contact',
      title: 'Contact — HMH Labz',
      metaDescription: 'Start a conversation with HMH Labz.',
      content: {
        header: { 
          title: "Start a", 
          highlight: "conversation.", 
          description: "Have an engagement in mind? Skip the pitch deck. Send us the details and we'll tell you immediately if we're the right fit to build it." 
        },
        locations: [
          { 
            city: "CHENNAI", 
            address: "W-32/117, Plot No. C-10,\n2nd Floor, 3rd Avenue,\nAnna Nagar, Chennai,\nTamil Nadu, India 600040.", 
            phone: "+91 90805 50655", 
            email: "hello@hmhlabz.com" 
          },
          { 
            city: "DUBAI", 
            address: "Al Quasis 2,\nDubai, United Arab Emirates", 
            phone: "+971 (0) 50 123 4567", 
            email: "hello@hmhlabz.com" 
          }
        ]
      }
    }
  });

  // 2. Seed Legal Data
  const legalContent = {
    lastUpdated: "May 18, 2026",
    title: "Privacy",
    highlight: "Policy.",
    intro: "HMH Labz is dedicated to maintaining the trust and confidence of our clients. Here is exactly how we handle your data, without the dense legal jargon.",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        content: "<p>At HMH Labz, we value your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) or engage our services, and tell you about your privacy rights and how the law protects you.</p><p>It is important that you read this privacy policy together with any other privacy notice or fair processing notice we may provide on specific occasions when we are collecting or processing personal data about you so that you are fully aware of how and why we are using your data.</p>"
      },
      {
        id: "data-collection",
        title: "Information We Collect",
        content: "<p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p><ul><li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, and your business title.</li><li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li><li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li><li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li></ul>"
      },
      {
        id: "usage",
        title: "Usage of Data",
        content: "<p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p><div class=\"grid sm:grid-cols-2 gap-6 my-10\"><div class=\"p-8 bg-cream rounded-[2rem] border border-ink/5\"><h4 class=\"mono-label text-terra mb-3\">Service Delivery</h4><p class=\"text-sm text-ink/70 m-0 leading-relaxed font-light\">To provide the professional strategy and engineering builds you have requested from the HMH Labz team.</p></div><div class=\"p-8 bg-cream rounded-[2rem] border border-ink/5\"><h4 class=\"mono-label text-terra mb-3\">Optimization</h4><p class=\"text-sm text-ink/70 m-0 leading-relaxed font-light\">To improve our platform performance, test new features, and personalize your digital experience.</p></div></div>"
      },
      {
        id: "cookies",
        title: "Cookie Policy",
        content: "<p>Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site architecture.</p><p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>"
      },
      {
        id: "sharing",
        title: "Third Party Sharing",
        content: "<p>We do not sell your data. We may share your personal data with the parties set out below strictly for the purposes set out in this policy:</p><ul><li>Internal Third Parties within the HMH Labz Global Network (Dubai and Chennai).</li><li>External CRM and cloud infrastructure providers (e.g., Google Cloud, AWS) necessary for service delivery.</li><li>Professional advisers including lawyers, bankers, and auditors acting as joint controllers or processors.</li></ul>"
      },
      {
        id: "rights",
        title: "Your Rights",
        content: "<p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>"
      },
      {
        id: "contact",
        title: "Contact Us",
        content: "<p>To exercise any of the rights set out above, or if you have any questions about this privacy policy, please contact our compliance team using the details below:</p>"
      }
    ]
  };

  const pages = [
    { slug: 'privacy-policy', title: 'Privacy Policy — HMH Labz', highlight: 'Policy.', prefix: 'Privacy' },
    { slug: 'terms-of-service', title: 'Terms of Service — HMH Labz', highlight: 'Service.', prefix: 'Terms of' },
    { slug: 'cookie-policy', title: 'Cookie Policy — HMH Labz', highlight: 'Policy.', prefix: 'Cookie' }
  ];
  
  for (const page of pages) {
    const content = { ...legalContent, title: page.prefix, highlight: page.highlight };
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: { content },
      create: {
        slug: page.slug,
        title: page.title,
        metaDescription: `Read our ${page.title} to understand how we operate.`,
        content: content
      }
    });
  }

  console.log("✅ Legal and Contact page data successfully seeded into the database.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
