# Database Integration Guide - Digital Krishi Officer

## Overview
This guide explains how to set up the complete database system for storing all user and admin data in a proper DBMS format using MongoDB.

## Architecture

### Backend Stack
- **Server**: Node.js with Express.js
- **Database**: MongoDB (or any MongoDB-compatible database)
- **Authentication**: JWT tokens
- **Password Security**: bcryptjs hashing
- **OTP Service**: Email & SMS support

### Database Schema

#### Farmer Collection
Stores all farmer user data:
- Login credentials (phone, email, password)
- Profile information (name, age, address, crops, land size, etc.)
- Account status
- OTP data for recovery
- Last login timestamp
- Auto timestamps (createdAt, updatedAt)

#### Admin Collection
Stores all admin/officer data:
- Login credentials (adminId, email, password)
- Profile information (name, designation, department, district)
- Permissions (manage farmers, view reports, approve transactions, etc.)
- Account status
- Last login timestamp
- Auto timestamps

## Setup Instructions

### 1. Install MongoDB

#### Option A: Local MongoDB (Recommended for Development)
```bash
# Windows - Download MongoDB Community from:
https://www.mongodb.com/try/download/community

# After installation, MongoDB runs on port 27017
```

#### Option B: MongoDB Atlas (Cloud - Recommended for Production)
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a new cluster
4. Get connection string
5. Add to .env file
```

#### Option C: Docker (if installed)
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 2. Set Up Backend Server

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your configuration
# For local MongoDB, use: MONGODB_URI=mongodb://localhost:27017/digital-krishi-officer
```

### 3. Environment Variables (.env)

```env
# Database
MONGODB_URI=mongodb://localhost:27017/digital-krishi-officer

# Server
PORT=5000
JWT_SECRET=your_very_secure_secret_key_change_this_in_production

# Email OTP (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# SMS OTP (Twilio)
VITE_TWILIO_ACCOUNT_SID=your_sid
VITE_TWILIO_AUTH_TOKEN=your_token
VITE_TWILIO_PHONE_NUMBER=+1234567890
```

### 4. Start Backend Server

```bash
# Development (with auto-reload)
npm run dev

# Or Production
npm start

# Server runs on http://localhost:5000
# Check health: http://localhost:5000/api/health
```

### 5. Start Frontend Application

In a new terminal:
```bash
# From project root
npm run dev

# Frontend runs on http://localhost:3000
```

## API Endpoints

### Farmer Endpoints
```
POST   /api/farmers/register      - Register new farmer
POST   /api/farmers/login         - Login farmer
GET    /api/farmers/profile/:id   - Get farmer profile
PUT    /api/farmers/profile/:id   - Update farmer profile
```

### Admin Endpoints
```
POST   /api/admins/register       - Register new admin
POST   /api/admins/login          - Login admin
GET    /api/admins/profile/:id    - Get admin profile
GET    /api/admins/farmers        - Get all farmers (admin only)
```

### OTP Endpoints
```
POST   /api/otp/send-otp          - Send OTP for recovery
POST   /api/otp/verify-otp        - Verify OTP code
POST   /api/otp/reset-password    - Reset password after OTP verification
```

## Data Flow

### User Registration
```
Frontend Form → API Request → Server → Hash Password → Store in MongoDB → Return JWT Token → Store Token Locally
```

### User Login
```
Login Credentials → API Request → Server → Verify Password → Generate JWT → Return Token → Store Locally
```

### Password Recovery
```
Request OTP → Send via Email/SMS → Store OTP in DB → Verify OTP → Reset Password → Update DB
```

## Frontend Integration

The frontend now uses `apiService.ts` instead of localStorage:

```typescript
// Old way (localStorage):
// localStorage.setItem('farmers_db', JSON.stringify(data))

// New way (API):
import { registerFarmer, loginFarmer } from './services/apiService';
const result = await registerFarmer(formData);
```

## Features

✅ **Secure Authentication**
- Password hashing with bcryptjs
- JWT token-based sessions
- 7-day token expiration

✅ **Multi-Factor Login**
- Phone number login
- Email login
- Unique identifiers

✅ **Password Recovery**
- OTP via SMS (Twilio)
- OTP via Email
- Secure reset process

✅ **Admin Management**
- Role-based access control
- Permissions system
- Farmer management dashboard
- Activity tracking (lastLogin timestamps)

✅ **Data Persistence**
- All data stored in MongoDB
- Automatic timestamps
- Audit trail ready

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is running
2. Check MONGODB_URI in .env
3. For MongoDB Atlas, verify IP whitelist
```

### API Not Responding
```
Error: Connection refused on localhost:5000

Solution:
1. Ensure backend server is running: npm run dev
2. Check PORT in .env (default: 5000)
3. Check for error messages in server terminal
```

### Login/Registration Fails
```
Error: Invalid credentials or user already exists

Solution:
1. Check API logs for detailed error
2. Verify correct email/phone format
3. Ensure password meets requirements
4. Check database connection
```

## Database Backup (MongoDB Atlas)

```bash
# Backup local MongoDB
mongodump --uri="mongodb://localhost:27017/digital-krishi-officer"

# Restore from backup
mongorestore --uri="mongodb://localhost:27017/digital-krishi-officer" dump/
```

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use strong passwords for admin accounts
- [ ] Enable MongoDB authentication
- [ ] Use MongoDB Atlas IP whitelist
- [ ] Use HTTPS in production
- [ ] Enable CORS only for your domain
- [ ] Regularly backup database
- [ ] Monitor failed login attempts
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets

## Next Steps

1. **Install & Run Backend**: Follow setup instructions above
2. **Test API Endpoints**: Use Postman or curl
3. **Verify Database**: Check MongoDB collections
4. **Test Frontend**: Register and login through UI
5. **Monitor Logs**: Check both frontend and backend logs

## Support

For issues or questions about the implementation, refer to the API logs and browser console for detailed error messages.

---

**Backend Server Status**: http://localhost:5000/api/health
**Frontend Application**: http://localhost:3000
