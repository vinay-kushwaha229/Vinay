# 🔐 Admin Panel Guide

## Admin Login Credentials

**Email:** admin@admin.com  
**Password:** admin123

## How to Access Admin Panel

1. Go to: http://localhost:3000/login
2. Login with admin credentials
3. You will be automatically redirected to Admin Panel

## Admin Features

### 📊 Statistics Dashboard
- Total Users count
- Total Agencies count
- Total Job Seekers count
- Pending Approvals count
- Approved Job Seekers count
- Total Messages count

### 👥 All Users
- View all registered users (Agencies, Job Seekers, Admins)
- See user details: Name, Email, Phone, Type, Status, Verification
- Delete users (except Admin users)
- Filter by user type

### 🏢 Agencies
- View all registered agencies
- See agency details and hobbies
- Check verification status
- Delete agencies

### 💼 Job Seekers
- View all job seekers
- See which agency they selected
- Check approval status (Pending/Approved/Declined)
- View and download resumes
- Delete job seekers

### 💬 Messages
- View all chat messages between users
- See sender and receiver details
- Monitor communication
- Last 100 messages displayed

## Admin Capabilities

✅ View all data in the system  
✅ Monitor user registrations  
✅ Track approval status  
✅ Delete users (except admins)  
✅ View all messages  
✅ Access statistics  
❌ Cannot be deleted by other admins  

## Security

- Admin routes are protected
- Only users with "Admin" user type can access
- JWT token authentication required
- Non-admin users get "Access Denied" error

## Creating Additional Admins

If you need to create more admin users:

```bash
cd server
node createAdmin.js
```

Then manually update the email in the database or modify the script.

## Notes

- Admin panel is responsive and works on mobile
- All data is real-time from database
- Deleting a user also deletes their messages
- Admin cannot delete themselves
- Login page shows admin credentials for easy access
