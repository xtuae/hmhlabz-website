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

  const recipients = [
    { email: 'hello@hmhlabz.com', name: 'Haj Akif' },
    { email: 'steve@hmhlabz.com', name: 'Steve' }
  ];

  const sendSmtpEmail = new Brevo.SendSmtpEmail();
  sendSmtpEmail.subject = `Internal Report — Lead Captured: ${data.name}`;
  sendSmtpEmail.to = recipients;
  sendSmtpEmail.sender = { 
    name: "HMH Labz Core", 
    email: process.env.BREVO_SENDER_EMAIL || "reach@hmhlabz.com" 
  };
  
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Helvetica', Arial, sans-serif; background-color: #f5f2e8; color: #1a1a1a; margin: 0; padding: 40px; }
        .container { max-width: 600px; background: #ffffff; border: 1px solid #1a1a1a; padding: 40px; margin: 0 auto; }
        .header { border-bottom: 2px solid #c84b21; padding-bottom: 20px; margin-bottom: 30px; }
        .mono { font-family: 'Courier New', Courier, monospace; text-transform: uppercase; font-size: 11px; letter-spacing: 0.15em; color: #c84b21; font-weight: bold; }
        .title { font-size: 28px; font-weight: bold; margin-top: 10px; letter-spacing: -0.02em; line-height: 1.1; }
        .grid { margin: 30px 0; border-top: 1px solid #eeeeee; }
        .field { padding: 15px 0; border-bottom: 1px solid #eeeeee; }
        .label { font-size: 10px; font-weight: bold; text-transform: uppercase; color: #999; margin-bottom: 4px; }
        .value { font-size: 16px; color: #1a1a1a; }
        .message-box { background: #f9f9f9; padding: 20px; border-left: 3px solid #c84b21; font-style: italic; margin-top: 20px; color: #444; }
        .footer { font-family: 'Courier New', monospace; font-size: 10px; color: #999; margin-top: 40px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="mono">Internal Report — 02 // Lead Captured</div>
          <div class="title">New Fit Call Request</div>
        </div>
        
        <div class="grid">
          <div class="field">
            <div class="label">Name / Representative</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><strong>${data.email}</strong></div>
          </div>
          <div class="field">
            <div class="label">Business / Entity</div>
            <div class="value">${data.company || 'Not Provided'} (${data.employees || 'N/A'} employees)</div>
          </div>
          <div class="field">
            <div class="label">Service Interest</div>
            <div class="value" style="color: #c84b21;">${data.tier || 'Unspecified'}</div>
          </div>
        </div>

        <div class="label">Project Context / Message</div>
        <div class="message-box">
          "${data.message || 'No message provided.'}"
        </div>

        <div class="footer">
          HMH LABZ CORE // AUTO-GENERATED NOTIFICATION<br>
          SYSTEM STATUS: SECURE // LOCATION: ${data.timestamp || new Date().toISOString()}
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`Lead notification sent to ${recipients.length} recipients`);
  } catch (error) {
    console.error("Brevo Notification Error:", error);
  }
};
