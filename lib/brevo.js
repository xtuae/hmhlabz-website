import * as Brevo from '@getbrevo/brevo';

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export const sendWelcomeEmail = async (email, name) => {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Welcome to HMH Labz!";
  sendSmtpEmail.to = [{ email, name }];
  sendSmtpEmail.sender = { 
    name: process.env.BREVO_SENDER_NAME || "HMH Labz", 
    email: process.env.BREVO_SENDER_EMAIL || "hello@hmhlabz.com" 
  };
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <h1>Welcome, ${name}!</h1>
        <p>We're excited to have you join HMH Labz. You can now explore our insights and premium services.</p>
      </body>
    </html>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Brevo Error:", error);
  }
};
