// Replace placeholders with your EmailJS/public key + service/template IDs.
// This file is loaded before js/app.js in your pages.
window.EMAIL_CONFIG = {
  userId: 'URPg7uugKsgNe5s32',        // EmailJS public key (from dashboard)
  serviceId: 'service_2wqd7qm',        // EmailJS service ID
  templateId: 'template_14r54zp',     // EmailJS template ID
  
  templateVariables: {
    to_email: 'darklord69233@gmail.com',
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
