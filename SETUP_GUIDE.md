# Quick Setup Guide

## ✅ What's Already Done
- Backend server is running on port 5000
- Frontend React app is starting
- MySQL configuration is set up
- Upload folders created

## 🔧 What You Need to Do

### 1. Setup MySQL Database

Open MySQL and run:
```sql
mysql -u root -p
```

Then paste the contents of `server/database.sql` or run:
```sql
source C:/Users/kushw/OneDrive/Desktop/Assesment/server/database.sql
```

### 2. Configure Email (Optional for Testing)

Edit `server/.env` file:
- Add your Gmail and App Password for OTP emails
- Or skip this - OTP will be printed in server console for testing

### 3. Access the Application

Once React finishes compiling:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🎯 Testing Flow

### Register as Agency:
1. Go to http://localhost:3000/register
2. Fill form, select "Agency" as user type
3. Check server console for OTP (if email not configured)
4. Enter OTP
5. Set password
6. Login

### Register as Job Seeker:
1. Register with "Job Seeker" type
2. Upload resume
3. Select an agency from dropdown
4. Complete OTP verification
5. Login

### Test Features:
- Agency can see job seekers and approve/decline
- Job seeker can see agency details
- After approval, both can chat in real-time

## 📝 Current Status

✅ Backend: Running on port 5000
✅ Frontend: Starting...
⚠️ Database: Needs to be created (run database.sql)
⚠️ Email: Optional - OTP shown in console

## 🐛 Troubleshooting

**If backend crashes:**
- Check MySQL is running
- Verify database credentials in server/.env

**If frontend won't start:**
- Wait for compilation to complete
- Check for port 3000 conflicts

**If OTP email fails:**
- Check server console for OTP
- Configure Gmail App Password in .env
