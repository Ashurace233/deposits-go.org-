// Replace placeholders with your EmailJS/public key + service/template IDs.
// This file is loaded before js/app.js in your pages.
window.EMAIL_CONFIG = {
  userId: 'hfSIPIPaR9OnWEcW-',        // EmailJS public key (from dashboard)
  serviceId: 'service_kw3itb9',        // EmailJS service ID
  templateId: 'template_1ehgp9s',     // EmailJS template ID
  officeEmail: 'mknown314@gmail.com', // Office email address
  
  templateVariables: {
    to_email: 'mknown314@gmail.com',
    subject_prefix: 'New Grant Application',
    from_name: '{{fullName}}',
    from_email: '{{email}}',
    application_id: '{{id}}',
    submitted_at: '{{submittedAt}}',
    message: '{{message}}'
  }
};

console.log('Email configuration loaded:', EMAIL_CONFIG);

// emailjs.init will be attempted by js/app.js if available

