# 🔒 Forgot Password Feature

## How to Use

### Step 1: Access Forgot Password
1. Go to login page: http://localhost:3000/login
2. Click on **"Forgot Password?"** link

### Step 2: Enter Email
1. Enter your registered email address
2. Click **"Send OTP"**
3. OTP will be sent to your email (also visible in server console)

### Step 3: Verify OTP
1. Check your email for the 6-digit OTP
2. Enter the OTP
3. Click **"Verify OTP"**

### Step 4: Reset Password
1. Enter your new password
2. Confirm the new password
3. Click **"Reset Password"**
4. You'll be redirected to login page

### Step 5: Login
1. Login with your email and new password

## Features

✅ **Email Verification** - OTP sent to registered email  
✅ **OTP Expiry** - OTP expires in 10 minutes  
✅ **Secure** - Password is hashed before storing  
✅ **User-Friendly** - 3-step process with clear instructions  
✅ **Error Handling** - Clear error messages  
✅ **Success Messages** - Confirmation at each step  

## API Endpoints

### 1. Send OTP
```
POST /api/auth/forgot-password
Body: { email: "user@example.com" }
Response: { message: "OTP sent to your email", userId: 123 }
```

### 2. Verify OTP
```
POST /api/auth/verify-reset-otp
Body: { userId: 123, otp: "123456" }
Response: { message: "OTP verified successfully" }
```

### 3. Reset Password
```
POST /api/auth/reset-password
Body: { userId: 123, otp: "123456", newPassword: "newpass123" }
Response: { message: "Password reset successfully" }
```

## Security Features

1. **OTP Expiration** - OTP expires after 10 minutes
2. **Email Verification** - Only registered emails can reset password
3. **Password Hashing** - Passwords are hashed with bcrypt
4. **OTP Cleanup** - OTP is cleared after successful reset
5. **Verified Users Only** - Only verified users can reset password

## Testing

### Test with existing user:
1. Register a user first (if not already registered)
2. Complete email verification
3. Go to login page
4. Click "Forgot Password?"
5. Enter registered email
6. Check server console for OTP (if email not configured)
7. Complete the reset process

### Test with Admin:
- Email: admin@admin.com
- You can reset admin password too!

## Error Messages

- **"Email not found"** - Email is not registered
- **"Please complete registration first"** - User hasn't verified email
- **"Invalid or expired OTP"** - OTP is wrong or expired (>10 minutes)
- **"Passwords do not match"** - New password and confirm password don't match
- **"Password must be at least 6 characters"** - Password too short

## Notes

- OTP is valid for 10 minutes only
- You can resend OTP by going back to step 1
- OTP is also printed in server console for testing
- After successful reset, you can login immediately
- Old password is completely replaced with new one

## UI Flow

```
Login Page
    ↓
[Forgot Password?]
    ↓
Enter Email → Send OTP
    ↓
Enter OTP → Verify
    ↓
New Password → Reset
    ↓
Success → Redirect to Login
```

## Styling

The forgot password page uses the same styling as other auth pages:
- Clean white container
- Purple gradient background
- Responsive design
- Clear error/success messages
- Loading states on buttons

## Integration

The feature is fully integrated with:
- ✅ Existing authentication system
- ✅ Email service (Nodemailer)
- ✅ Database (MySQL)
- ✅ React Router
- ✅ Existing UI/UX design
