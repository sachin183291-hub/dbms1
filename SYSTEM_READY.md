# 🎉 Database Integration Complete!

## Current Status

✅ **Backend Server**: Running on `http://localhost:5000`
✅ **Frontend Server**: Running on `http://localhost:3000`  
✅ **Database Ready**: MongoDB configuration complete

## What's Been Set Up

### 1. Backend API (Node.js + Express)
- RESTful API endpoints for all operations
- JWT authentication
- Password hashing with bcryptjs
- OTP generation and verification
- Email & SMS support

### 2. MongoDB Database Schemas

#### Farmer Collection
```javascript
{
  phone: String (unique, optional),
  email: String (unique, optional),
  password: String (hashed),
  profile: {
    id: String,
    name: String,
    age: Number,
    address: String,
    primaryCrop: String,
    landSize: String,
    soilType: String,
    // ... more fields
  },
  status: String, // 'Verified', 'Active', etc.
  otp: {
    code: String,
    expiresAt: Date,
    attempts: Number
  },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Admin Collection
```javascript
{
  adminId: String (unique),
  email: String (unique),
  password: String (hashed),
  name: String,
  designation: String, // 'Officer', 'Manager', 'SuperAdmin'
  department: String,
  district: String,
  permissions: {
    canManageFarmers: Boolean,
    canViewReports: Boolean,
    canApproveTransactions: Boolean,
    // ... more permissions
  },
  status: String, // 'Active', 'Inactive', 'Suspended'
  lastLogin: Date
}
```

## API Endpoints Overview

### Authentication & User Management

**Farmer Registration**
```
POST /api/farmers/register
Body: { phone/email, password, name, age, address }
Response: { token, farmer }
```

**Farmer Login**
```
POST /api/farmers/login
Body: { identifier (phone/email), password }
Response: { token, farmer }
```

**Get Farmer Profile**
```
GET /api/farmers/profile/:farmerId
Headers: Authorization: Bearer {token}
Response: { farmer document }
```

**Update Farmer Profile**
```
PUT /api/farmers/profile/:farmerId
Body: { profile data }
Response: { updated farmer }
```

### Admin Management

**Admin Registration**
```
POST /api/admins/register
Body: { adminId, email, password, name, designation, district }
Response: { token, admin }
```

**Admin Login**
```
POST /api/admins/login
Body: { adminId, password }
Response: { token, admin }
```

**Get All Farmers (Admin Only)**
```
GET /api/admins/farmers
Headers: Authorization: Bearer {token}
Response: [ farmer documents ]
```

### OTP & Password Recovery

**Send OTP**
```
POST /api/otp/send-otp
Body: { identifier (phone/email), type ('farmer' or 'admin') }
Response: { message, channel (sms/email/console) }
```

**Verify OTP**
```
POST /api/otp/verify-otp
Body: { identifier, otp, type }
Response: { message, userId }
```

**Reset Password**
```
POST /api/otp/reset-password
Body: { userId, newPassword, type }
Response: { message, success }
```

## How to Use the System

### Frontend to Backend Data Flow

**Example: User Registration**
```typescript
import { registerFarmer } from './services/apiService';

const formData = {
  phone: '9876543210',
  email: 'farmer@example.com',
  password: 'SecurePass123',
  name: 'Ravi Kumar',
  age: 35,
  address: 'Village, District'
};

// Sends to backend → Validates → Hashes password → Stores in MongoDB → Returns JWT
const result = await registerFarmer(formData);

// Token stored locally for future requests
localStorage.setItem('authToken', result.token);
```

**Example: User Login**
```typescript
import { loginFarmer } from './services/apiService';

// Works with both phone and email
const result = await loginFarmer('9876543210', 'password');
// or
const result = await loginFarmer('farmer@example.com', 'password');
```

**Example: Password Recovery**
```typescript
import { sendOTPForRecovery, verifyOTPCode, resetPassword } from './services/apiService';

// Step 1: Send OTP
await sendOTPForRecovery('9876543210', 'farmer');
// OTP sent via SMS (Twilio) or console in development

// Step 2: User receives OTP and enters it
const verified = await verifyOTPCode('9876543210', '123456', 'farmer');
const userId = verified.userId;

// Step 3: Reset password
await resetPassword(userId, 'newPassword123', 'farmer');
```

## Running the System

### Terminal 1: Start Backend
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

### Terminal 2: Start Frontend
```bash
npm run dev
# Frontend runs on http://localhost:3000
```

### Verify Everything is Working

1. **Check Backend Health**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Check MongoDB Connection**
   - Look for log message in backend: "✓ Connected to MongoDB"

3. **Test Frontend**
   - Open http://localhost:3000
   - Try registering a new user
   - Check backend logs for API calls

## Database Configuration

### Using Local MongoDB

**Install MongoDB Community Edition**
- Windows: https://www.mongodb.com/try/download/community
- After installation, MongoDB runs on `mongodb://localhost:27017`
- Default database name: `digital-krishi-officer`

**Connection String in `.env`**
```
MONGODB_URI=mongodb://localhost:27017/digital-krishi-officer
```

### Using MongoDB Atlas (Cloud)

1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/digital-krishi-officer`
4. Update `.env`:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/digital-krishi-officer
   ```

## Important Files

```
/server
  ├── server.js                 # Main server file
  ├── package.json              # Backend dependencies
  ├── .env                       # Configuration (edit with your details)
  ├── models/
  │   ├── Farmer.js            # Farmer schema
  │   └── Admin.js             # Admin schema
  ├── routes/
  │   ├── farmerRoutes.js      # Farmer API endpoints
  │   ├── adminRoutes.js       # Admin API endpoints
  │   └── otpRoutes.js         # OTP endpoints
  └── services/
      └── otpService.js        # Email & SMS OTP service

/src
  ├── pages/
  │   └── Login.tsx            # Updated with API integration
  └── services/
      └── apiService.ts        # Frontend API client
```

## Troubleshooting

### Issue: MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
1. Ensure MongoDB is running (check Services on Windows)
2. Or use MongoDB Atlas with valid connection string
3. Check MONGODB_URI in `.env`

### Issue: Backend Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
1. Kill process using port 5000: `netstat -ano | findstr :5000`
2. Or change PORT in `.env` to different number (5001, 5002, etc.)

### Issue: CORS Error in Frontend
```
Access-Control-Allow-Origin error
```
**Solution:**
- CORS is already enabled in backend
- Ensure frontend is on `http://localhost:3000`
- Ensure backend API_URL in `apiService.ts` is `http://localhost:5000/api`

### Issue: OTP Not Sending via Email
```
Error: Failed to send OTP
```
**Solution:**
- In development mode, OTP logs to browser console
- For Gmail: Use app-specific password (not regular password)
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`

## Security Notes

⚠️ **Before Production:**
1. Change JWT_SECRET in `.env`
2. Use strong admin passwords
3. Enable MongoDB authentication
4. Configure HTTPS
5. Set up rate limiting
6. Enable CORS for your domain only
7. Use environment variables for all secrets
8. Never commit `.env` file to git

## Next Features to Add

- [ ] Email verification during signup
- [ ] Two-factor authentication
- [ ] User activity logging
- [ ] Farmer query management
- [ ] Admin dashboard
- [ ] Weather integration
- [ ] Farmer advisory notifications
- [ ] Transaction history

## Database Queries

### View All Farmers
```javascript
db.farmers.find()
```

### View Specific Farmer
```javascript
db.farmers.findOne({ email: "farmer@example.com" })
```

### Update Farmer Status
```javascript
db.farmers.updateOne(
  { _id: ObjectId("...") },
  { $set: { status: "Active" } }
)
```

### View Admin Login History
```javascript
db.admins.find({ lastLogin: { $exists: true } })
```

## Support & Documentation

For detailed information, check:
- `DATABASE_SETUP.md` - Complete setup guide
- Backend logs in terminal
- Browser console for frontend logs
- MongoDB Compass for visual database management

---

**System is ready for use!** 🚀

Backend: http://localhost:5000
Frontend: http://localhost:3000
