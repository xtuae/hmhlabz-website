import express from 'express';
import prisma from '../lib/prisma.js';
import { syncUserToHubSpot } from '../lib/hubspot.js';
import { sendLeadNotification } from '../lib/brevo.js';

const router = express.Router();

router.post('/fit-call', async (req, res) => {
  try {
    const { name, email, businessName, phone, employees, tier, message } = req.body;
    
    // 1. Save Lead to Database
    const lead = await prisma.lead.create({
      data: { 
        name, 
        email, 
        businessName, 
        phone, 
        employees: employees?.toString(), 
        tier, 
        message 
      }
    });

    // 2. Sync to HubSpot CRM
    try {
      await syncUserToHubSpot(email, name, { businessName, phone, tier });
    } catch (crmError) {
      console.error('CRM Sync Error:', crmError);
    }

    // 3. Send Cyber-Lab Email Notification
    try {
      await sendLeadNotification({
        name,
        email,
        phone,
        company: businessName,
        message,
        tier,
        employees,
        timestamp: new Date().toISOString()
      });
    } catch (mailError) {
      console.error('Email Notification Error:', mailError);
    }

    res.status(201).json({ message: 'Lead captured successfully', id: lead.id });
  } catch (error) {
    console.error('Lead Pipeline Error:', error);
    res.status(500).json({ message: 'Error capturing lead' });
  }
});

export default router;
