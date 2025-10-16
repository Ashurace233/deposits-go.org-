// Email Configuration for FDIC Grant Form
// Update these values with your actual EmailJS settings

const EMAIL_CONFIG = {
    // EmailJS Service Configuration
    serviceId: 'service_ow95wvc',        // Replace with your EmailJS service ID
    templateId: 'template_sexs1xj',      // Replace with your EmailJS template ID
    publicKey: 'hfSIPIPaR9OnWEcW-',        // Replace with your EmailJS public key
    
    // Office Email Settings
    officeEmail: 'mknown314@gmail.com',      // Replace with actual office email address
    
    // Email Template Variables
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

// Make configuration available globally
window.EMAIL_CONFIG = EMAIL_CONFIG;

console.log('Email configuration loaded:', EMAIL_CONFIG);
