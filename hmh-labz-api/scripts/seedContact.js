import 'dotenv/config';
import prisma from '../api/lib/prisma.js';

async function main() {
  await prisma.page.upsert({
    where: { slug: 'contact' },
    update: {},
    create: {
      slug: 'contact',
      title: 'Initiate Contact | HMH Labz',
      metaDescription: 'Reach out to HMH Labz operations in Chennai and Dubai.',
      content: {
        header: { 
          title: "Initiate", 
          highlight: "contact.", 
          description: "Connect with our strategy and build teams." 
        },
        locations: [
          { 
            city: "CHENNAI", 
            address: "Senate Space, Anna Nagar, Chennai", 
            phone: "+91 90805 50655", 
            email: "hello@hmhlabz.com" 
          },
          { 
            city: "DUBAI", 
            address: "Dubai Operations Hub", 
            phone: "TBD", 
            email: "hello@hmhlabz.com" 
          }
        ]
      }
    }
  });
  console.log("✅ Contact page data successfully seeded into the database.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
