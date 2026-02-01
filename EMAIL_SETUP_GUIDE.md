# Email Notification Setup Guide

## ✅ What's Been Done
- ✅ Installed flask-mail package
- ✅ Created email service with professional HTML templates
- ✅ Integrated email notifications with appointment booking
- ✅ Sends confirmation to patient after booking
- ✅ Sends notification to doctor about new appointment
- ✅ Configured for Gmail SMTP (default)

## 📧 What You Need to Complete Setup

### Step 1: Get Your Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification** (if not already enabled):
   - Go to Security → 2-Step Verification
   - Follow the steps to enable it

3. **Create App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Click "Generate"
   - **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

### Step 2: Update .env File

Open `backend\.env` and update these lines:

```env
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-16-character-app-password
```

**Example:**
```env
MAIL_USERNAME=healthapp2026@gmail.com
MAIL_PASSWORD=abcd efgh ijkl mnop
```

### Step 3: Restart Server

After updating .env, restart the backend server (it will automatically pick up the new configuration).

## 🎯 How It Works

When a patient books an appointment:

1. **Patient receives email** with:
   - ✅ Appointment confirmation
   - 📅 Date and time
   - 👨‍⚕️ Doctor name
   - 📝 Symptoms submitted
   - ⏰ Status (Pending)
   - 📋 Important instructions

2. **Doctor receives email** with:
   - 🔔 New appointment notification
   - 👤 Patient name
   - 📅 Date and time
   - 📝 Patient symptoms
   - 🔗 Reminder to review in portal

## 🔧 Alternative Email Services

### Using SendGrid (Recommended for Production)

1. Sign up at: https://sendgrid.com/
2. Get your API key
3. Update `.env`:
```env
MAIL_SERVER=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key
```

### Using Other SMTP Services

Update `.env` with your provider's settings:
```env
MAIL_SERVER=smtp.yourprovider.com
MAIL_PORT=587
MAIL_USERNAME=your-email@domain.com
MAIL_PASSWORD=your-password
```

## 🧪 Testing Email Notifications

1. Update `.env` with your email credentials
2. Restart the backend server
3. Login as a patient
4. Book an appointment
5. Check both patient and doctor email inboxes

## 🚨 Troubleshooting

### Email not sending?

1. **Check console output**: Look for error messages like:
   - "Email not configured - MAIL_USERNAME missing"
   - "Failed to send email: [error details]"

2. **Verify credentials**: 
   - Make sure you're using App Password, not regular password
   - Check email address is correct

3. **Check spam folder**: Sometimes emails land in spam initially

4. **Enable/Disable notifications**:
   ```env
   ENABLE_EMAIL_NOTIFICATIONS=True  # Set to False to disable
   ```

### Gmail blocking access?

- Make sure 2-Step Verification is enabled
- Use App Password (not regular password)
- Check "Less secure app access" is OFF (use App Password instead)

## 📝 Email Features

✅ **Professional HTML templates** with responsive design
✅ **Plain text fallback** for email clients without HTML support
✅ **Patient confirmation** with all appointment details
✅ **Doctor notification** about new appointments
✅ **Error handling** - appointment booking succeeds even if email fails
✅ **Configurable** - can enable/disable via environment variable

## 🎨 Customization

To customize email templates, edit:
`backend/app/services/email_service.py`

- Modify `html_body` for HTML version
- Modify `text_body` for plain text version
- Change colors, styling, or content as needed

## 📊 Current Status

- **Backend**: ✅ Running with email support
- **Email Service**: ✅ Configured (needs credentials)
- **Templates**: ✅ Ready (patient + doctor)
- **Integration**: ✅ Complete
- **Credentials**: ⚠️ Need to be added to `.env`

---

**Next Step**: Update `.env` file with your Gmail credentials and restart server!
