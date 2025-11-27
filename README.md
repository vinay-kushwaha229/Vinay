# Job Seeker - Agency Platform

A full-stack web application connecting job seekers with agencies, featuring user registration with OTP verification, approval workflow, and real-time chat functionality.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MySQL
- **Real-time Communication**: Socket.io

## Features

### 1. User Registration (15 marks)
- First name and last name input
- Email validation
- Phone number (numbers only)
- Gender selection (radio buttons)
- User type selection (Job Seeker/Agency)
- Hobbies selection (Sports, Dance, Reading, Singing)
- Profile image upload (PNG/JPEG only)
- Resume upload for job seekers (PDF/DOCX only)
- Agency selection dropdown for job seekers
- OTP email verification
- Password setup after verification

### 2. Agency Dashboard (5 marks)
- View all job seekers who selected the agency
- Display job seeker details and status

### 3. Job Seeker Dashboard (5 marks)
- View selected agency details
- Display approval status

### 4. Approval System (5 marks)
- Agencies can approve or decline job seeker requests
- Status tracking (pending/approved/declined)

### 5. Real-time Chat (20 marks)
- Chat enabled only after approval
- Real-time messaging using Socket.io
- Message history

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Database Setup

1. Create MySQL database and import schema:
```bash
mysql -u root -p < server/database.sql
```

Or manually:
```sql
mysql -u root -p
source server/database.sql;
```

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=job_seeker_agency
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_jwt_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

5. Create upload directories:
```bash
mkdir -p uploads/images uploads/resumes
```

6. Start server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start React app:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage Flow

1. **Register as Agency**:
   - Fill registration form
   - Select "Agency" as user type
   - Verify email with OTP
   - Set password
   - Login

2. **Register as Job Seeker**:
   - Fill registration form
   - Select "Job Seeker" as user type
   - Upload resume
   - Select an agency
   - Verify email with OTP
   - Set password
   - Login

3. **Agency Actions**:
   - View all job seekers who selected your agency
   - Approve or decline requests
   - Chat with approved job seekers

4. **Job Seeker Actions**:
   - View selected agency details
   - Check approval status
   - Chat with agency after approval

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/set-password` - Set password
- `POST /api/auth/login` - Login

### Users
- `GET /api/users/agencies` - Get all agencies
- `GET /api/users/job-seekers` - Get job seekers (Agency only)
- `GET /api/users/my-agency` - Get agency details (Job Seeker only)
- `PATCH /api/users/job-seeker/:id/status` - Update status (Agency only)

### Messages
- `GET /api/messages/:userId` - Get messages with user
- `POST /api/messages` - Send message

## Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate App Password
3. Use App Password in EMAIL_PASSWORD

## Notes

- Make sure MySQL is running before starting the server
- Ensure all environment variables are properly configured
- The OTP expires in 10 minutes
- Chat is only available for approved job seekers
- File uploads are stored in `server/uploads/` directory

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── middleware/       # Auth & upload middleware
│   ├── routes/           # API routes
│   ├── utils/            # Email utility
│   ├── uploads/          # File uploads
│   ├── index.js
│   └── package.json
└── README.md
```
