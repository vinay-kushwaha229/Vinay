# ✅ Project is Ready to Test!

## Current Status:
- ✅ MySQL Database: Connected and tables created
- ✅ Backend Server: Running on http://localhost:5000
- ✅ Frontend App: Running on http://localhost:3000
- ✅ Upload Folders: Created

## 🎯 How to Test:

### 1. Open the Application
Go to: **http://localhost:3000**

### 2. Register as Agency First

1. Click on the registration page
2. Fill in the form:
   - First Name: John
   - Last Name: Agency
   - Email: agency@test.com
   - Phone: 1234567890
   - Gender: Male
   - User Type: **Agency**
   - Hobbies: Select any
   - Profile Image: Upload any PNG/JPEG

3. Click Register
4. **Check the backend terminal** for the OTP (it will be printed in console)
5. Enter the OTP
6. Set password: test123
7. Login with agency@test.com / test123

### 3. Register as Job Seeker

1. Logout and go to register again
2. Fill in the form:
   - First Name: Jane
   - Last Name: Seeker
   - Email: seeker@test.com
   - Phone: 9876543210
   - Gender: Female
   - User Type: **Job Seeker**
   - Hobbies: Select any
   - Profile Image: Upload any PNG/JPEG
   - **Resume**: Upload a PDF or DOCX file
   - **Select Agency**: Choose "John Agency" from dropdown

3. Click Register
4. Check backend terminal for OTP
5. Enter OTP
6. Set password: test123
7. Login with seeker@test.com / test123

### 4. Test Agency Features

Login as Agency (agency@test.com):
- You should see Jane Seeker in the list
- Status will be "PENDING"
- Click **Approve** button
- Now you can click **Chat** button

### 5. Test Job Seeker Features

Login as Job Seeker (seeker@test.com):
- You should see "John Agency" details
- Status will show "APPROVED"
- Click **Chat with Agency** button

### 6. Test Real-time Chat

1. Open two browser windows:
   - Window 1: Login as Agency
   - Window 2: Login as Job Seeker

2. Both click on Chat
3. Send messages from both sides
4. Messages should appear in real-time!

## 🐛 If You See Errors:

**500 Error on Register:**
- Check backend terminal for OTP
- Make sure MySQL is running
- Verify upload folders exist

**OTP Not Working:**
- OTP is printed in the backend terminal (server console)
- Copy it from there

**Can't Upload Files:**
- Make sure files are PNG/JPEG for images
- Make sure resume is PDF or DOCX

**Chat Not Working:**
- Make sure job seeker is approved first
- Check both users are logged in

## 📝 Notes:

- OTP expires in 10 minutes
- Email is not configured, so OTP appears in console
- Chat only works after approval
- You can view uploaded resumes by clicking the link in agency dashboard

## 🎉 All Features Working:

✅ Registration with all fields
✅ Conditional fields (resume for job seeker)
✅ Agency dropdown for job seekers
✅ OTP verification
✅ Password setup
✅ Login system
✅ Agency dashboard with job seeker list
✅ Job seeker dashboard with agency details
✅ Approve/Decline functionality
✅ Real-time chat after approval
