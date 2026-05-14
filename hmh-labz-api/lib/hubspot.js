import { Client } from '@hubspot/api-client';

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

export const syncUserToHubSpot = async (email, name) => {
  const [firstName, ...lastNameParts] = (name || "").split(" ");
  const lastName = lastNameParts.join(" ");

  const properties = {
    email,
    firstname: firstName || "User",
    lastname: lastName || "",
    company: "HMH Labz Lead",
  };

  try {
    await hubspotClient.crm.contacts.basicApi.create({ properties });
    console.log(`User ${email} synced to HubSpot`);
  } catch (error) {
    if (error.body?.category === "CONFLICT") {
      console.log(`User ${email} already exists in HubSpot`);
    } else {
      console.error("HubSpot Error:", error);
    }
  }
};
