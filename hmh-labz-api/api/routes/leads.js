import express from 'express';
const router = express.Router();

router.post('/fit-call', async (req, res) => {
  try {
    const { getPrisma } = await import('../../lib/db.js');
    const { syncUserToHubSpot } = await import('../../lib/hubspot.js');
    
    const { name, email, businessName, phone, employees, tier, message } = req.body;
    
    const prisma = getPrisma();
    const lead = await prisma.lead.create({
      data: { name, email, businessName, phone, employees, tier, message }
    });

    // Sync to CRM
    try {
      await syncUserToHubSpot(email, name, { businessName, phone, tier });
    } catch (crmError) {
      console.error('CRM Sync Error:', crmError);
    }

    res.status(201).json({ message: 'Lead captured successfully', id: lead.id });
  } catch (error) {
    console.error('Lead Error:', error);
    res.status(500).json({ message: 'Error capturing lead' });
  }
});

export default router;
