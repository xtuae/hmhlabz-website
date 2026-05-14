import * as Brevo from '@getbrevo/brevo';

/**
 * Lazy loads the Brevo API instance only when needed to prevent
 * module-level crashes during the Vercel boot process.
 */
const getBrevoApi = () => {
  try {
    // Handling potential ESM interop differences
    const TargetApi = Brevo.TransactionalEmailsApi || (Brevo.default && Brevo.default.TransactionalEmailsApi);
    
    if (!TargetApi) {
      throw new Error("Could not find TransactionalEmailsApi in Brevo SDK");
    }

    const apiInstance = new TargetApi();
    const apiKey = process.env.BREVO_API_KEY;
    
    // Setting API Key
    const ApiKeyAuth = Brevo.TransactionalEmailsApiApiKeys?.apiKey || 'api-key';
    apiInstance.setApiKey(ApiKeyAuth, apiKey);
    
    return apiInstance;
  } catch (error) {
    console.error("Failed to initialize Brevo SDK:", error);
    return null;
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const apiInstance = getBrevoApi();
  if (!apiInstance) return;

  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Welcome to HMH Labz!";
  sendSmtpEmail.to = [{ email, name }];
  sendSmtpEmail.sender = { 
    name: process.env.BREVO_SENDER_NAME || "HMH Labz", 
    email: process.env.BREVO_SENDER_EMAIL || "hello@hmhlabz.com" 
  };
  sendSmtpEmail.htmlContent = `
    <html>
      <body style="font-family: sans-serif; padding: 20px;">
        <h1>Welcome, ${name}!</h1>
        <p>We're excited to have you join HMH Labz. You can now explore our insights and premium services.</p>
      </body>
    </html>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Brevo Send Error:", error);
  }
};
