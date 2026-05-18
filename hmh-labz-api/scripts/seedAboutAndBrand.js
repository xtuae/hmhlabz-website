import 'dotenv/config';
import prisma from '../api/lib/prisma.js';

async function main() {
  console.log('Seeding About Page and Global Brand Settings...');

  // Upsert the About Page to prevent 404s
  await prisma.page.upsert({
    where: { slug: 'about' },
    update: {}, // Don't overwrite if it exists
    create: {
      slug: 'about',
      title: 'About | HMH Labz',
      metaDescription: 'Learn about HMH Labz.',
      content: {
        about: {
          hero: {
            title: 'About',
            highlight: 'HMH Labz',
            description: 'Strategy + build, in one team.'
          },
          story: {
            heading: 'Our Origins',
            text: 'We started with a simple observation: most service businesses are drowning in manual work.'
          },
          team: {
            heading: 'The Operators',
            members: [
              {
                name: 'Haj Akif',
                role: 'Strategy',
                bio: 'Ex-consultant turned builder.'
              }
            ]
          }
        }
      }
    }
  });

  // Upsert the Global Brand Settings
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: {}, // Don't overwrite existing branding
    create: {
      id: 'global',
      logoUrl: 'https://www.hmhlabz.com/wp-content/uploads/hmh-labz-black.png',
      faviconUrl: 'https://www.hmhlabz.com/wp-content/uploads/hmh-icon.webp'
    }
  });

  console.log('✅ About Page and Brand Settings seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    // pool disconnect handled by process exit or prisma disconnect
  });
