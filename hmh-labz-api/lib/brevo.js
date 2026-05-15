import * as Brevo from '@getbrevo/brevo';

const getBrevoApi = () => {
  try {
    const TargetApi = Brevo.TransactionalEmailsApi || (Brevo.default && Brevo.default.TransactionalEmailsApi);
    if (!TargetApi) return null;
    const apiInstance = new TargetApi();
    const apiKey = process.env.BREVO_API_KEY;
    const ApiKeyAuth = Brevo.TransactionalEmailsApiApiKeys?.apiKey || 'api-key';
    apiInstance.setApiKey(ApiKeyAuth, apiKey);
    return apiInstance;
  } catch (error) {
    console.error("Failed to initialize Brevo SDK:", error);
    return null;
  }
};

export const sendLeadNotification = async (data) => {
  const apiInstance = getBrevoApi();
  if (!apiInstance) return;

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.subject = `NEW LEAD: ${data.name} from ${data.company || 'Unknown'}`;
  sendSmtpEmail.to = [{ email: 'hello@hmhlabz.com', name: 'HMH Labz Leads' }];
  sendSmtpEmail.sender = { 
    name: "HMH Labz System", 
    email: process.env.BREVO_SENDER_EMAIL || "hello@hmhlabz.com" 
  };
  
  sendSmtpEmail.htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 40px; border-radius: 10px;">
      <h2 style="color: #c84b21; border-bottom: 2px solid #c84b21; padding-bottom: 10px;">New Fit-Call Request</h2>
      <p style="font-size: 16px; color: #333;">A new lead has submitted the Fit-Call form:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.email}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company || 'N/A'}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Message:</td><td style="padding: 10px; border-bottom: 1px solid #eee;">${data.message || 'N/A'}</td></tr>
      </table>
      
      <p style="margin-top: 30px; font-size: 12px; color: #999;">This is an automated notification from hmhlabz.com</p>
    </div>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Lead notification sent to hello@hmhlabz.com`);
  } catch (error) {
    console.error("Brevo Notification Error:", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  // Existing welcome email logic...
};
