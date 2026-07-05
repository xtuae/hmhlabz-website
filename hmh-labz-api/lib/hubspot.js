import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

export const createLead = async (data) => {
  const [firstName, ...lastNameParts] = (data.name || "").split(" ");
  const lastName = lastNameParts.join(" ");

  const properties = {
    email: data.email,
    firstname: firstName || "Lead",
    lastname: lastName || "",
    phone: data.phone || "",
    company: data.company || "Not Provided",
    message: data.message || "",
    lifecyclestage: "opportunity"
  };

  try {
    const response = await hubspotClient.crm.contacts.basicApi.create({ properties });
    console.log(`Lead ${data.email} created in HubSpot`);
    return response;
  } catch (error) {
    if (error.body?.category === "CONFLICT") {
      console.log(`Lead ${data.email} already exists in HubSpot, updating...`);
      // Optional: Update contact if needed
      return { status: 'already_exists' };
    }
    console.error("HubSpot Error:", error);
    throw error;
  }
};

export const syncUserToHubSpot = async (email, name) => {
  // Keeping legacy function for compatibility
  return createLead({ email, name });
};
