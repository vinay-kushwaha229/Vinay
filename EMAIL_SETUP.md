# 📧 Email Configuration (Optional)

## Current Behavior:
- OTP is printed in the **server console** (backend terminal)
- Look for: `OTP for testing: XXXXXX`
- This works fine for development/testing

## To Enable Real Email Sending:

### For Gmail:

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "Job Seeker App"
   - Copy the 16-character password

3. **Update server/.env file:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_actual_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password
```

4. **Restart the server**
   - Stop server (Ctrl+C)
   - Run: `npm run dev`

### For Other Email Services:

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASSWORD=your_password
```

**Yahoo:**
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your_email@yahoo.com
EMAIL_PASSWORD=your_app_password
```

## Testing:

After configuration:
1. Register a new user with a real email
2. Check your inbox for OTP
3. If it doesn't arrive, check spam folder
4. OTP will still be printed in console as backup

## For Now:

**Just use the OTP from the server console!** It's easier for testing and works perfectly.

Your latest OTP was: **427458**
