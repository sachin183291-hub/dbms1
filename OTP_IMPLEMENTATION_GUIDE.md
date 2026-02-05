# OTP Implementation Guide

## Overview
This document explains the OTP (One-Time Password) implementation for the Digital Krishi Officer system. The OTP system is used for password recovery for both Farmers and Officers.

## Current Issue Fixed
**Previous Issue:** The OTP was not being sent to the required phone number. The system was opening the SMS app but not actually sending the OTP.

**Solution:** Implemented a proper OTP delivery system using Twilio SMS API with fallback support for development mode.

## Architecture

### Components

#### 1. OTP Service (`services/otpService.ts`)
The core service that handles all OTP operations:

- **sendOTP(phoneNumber, otp)**: Sends OTP via SMS
  - Validates phone number format
  - Sends via Twilio if credentials are configured
  - Falls back to console logging for development
  
- **verifyOTP(phoneNumber, enteredOtp)**: Validates entered OTP
  - Checks if OTP matches
  - Enforces 10-minute expiration
  - Limits to 3 failed attempts
  
- **resendOTP(phoneNumber)**: Regenerates and resends OTP
  
- **clearOTP(phoneNumber)**: Clears OTP after successful verification

#### 2. Updated Login Component (`pages/Login.tsx`)
Enhanced password recovery flow:

- Phone number validation
- OTP sending with status feedback
- Resend countdown (60 seconds)
- Attempt limiting (3 attempts)
- Success/error messaging
- Recovery display

## Setup Instructions

### For Development (Using Console Logging)

1. **No configuration needed** - OTPs will appear in the browser console
2. The console will show a warning message with the OTP in development mode
3. Copy the OTP from console and paste into the verification field
4. This allows full testing without Twilio setup

### For Production (Using Twilio)

#### Step 1: Create Twilio Account
1. Go to https://www.twilio.com/
2. Sign up for a free account
3. Verify your phone number
4. Complete identity verification

#### Step 2: Get Credentials
1. Visit https://www.twilio.com/console
2. Copy your **Account SID**
3. Copy your **Auth Token** (keep this secret!)
4. Purchase a phone number (free trial includes $15 credit)
   - Go to "Phone Numbers" section
   - Click "Get a Number"
   - Choose your country
   - Verify the number
   - Copy the phone number with country code (e.g., +1 for USA, +91 for India)

#### Step 3: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_TWILIO_ACCOUNT_SID=your_account_sid_here
VITE_TWILIO_AUTH_TOKEN=your_auth_token_here
VITE_TWILIO_PHONE_NUMBER=+1234567890
```

Or edit `.env` if your project uses that:

```env
VITE_TWILIO_ACCOUNT_SID=AC1234567890abcdef1234567890abcd
VITE_TWILIO_AUTH_TOKEN=your_token_here
VITE_TWILIO_PHONE_NUMBER=+1234567890
```

#### Step 4: Install Dependencies
```bash
npm install
```

The package.json already includes `twilio` as a dependency.

## User Flow

### For Farmers

1. **Forgot Password**
   - Click "Forgot Access Code?" on login page
   - Enter registered phone number
   - Click "Dispatch Code"
   - OTP is sent via SMS
   - Enter received 6-digit OTP
   - Password is recovered and displayed

2. **OTP Features**
   - 10-minute expiration
   - 3 failed attempt limit
   - Resend available after 60 seconds
   - Clear error messages with attempt count

### For Officers

- Same flow as farmers
- Recovery data stored separately
- Same OTP validation and security rules

## Security Features

1. **OTP Expiration**: 10 minutes (600,000ms)
2. **Attempt Limiting**: Maximum 3 failed attempts
3. **Rate Limiting**: 60-second cooldown between resends
4. **Phone Validation**: Minimum 10 digits required
5. **Secure Storage**: OTPs stored in memory (not persisted)
6. **Sensitive Data**: Auth tokens never exposed to frontend

## Error Handling

The system provides clear error messages:

- "Mobile ID not found in Registry" - Phone not registered
- "Invalid phone number" - Wrong format
- "OTP has expired" - Took too long to enter
- "Incorrect OTP. X attempts remaining" - Wrong OTP
- "Too many failed attempts" - Exceeded attempt limit
- "Please wait before requesting another OTP" - Resend cooldown active

## Testing Scenarios

### Test 1: Development Mode
1. Do NOT set Twilio credentials
2. Click "Forgot Access Code?"
3. Enter a phone number
4. Click "Dispatch Code"
5. Check browser console for OTP
6. Paste OTP and verify

### Test 2: OTP Expiration
1. Request OTP
2. Wait 10+ minutes without entering it
3. Try to verify
4. Should get "OTP has expired" error

### Test 3: Failed Attempts
1. Request OTP
2. Enter wrong OTP 3 times
3. Should be locked out
4. Must request new OTP

### Test 4: Resend Functionality
1. Request OTP
2. Immediately click resend
3. Should show "Resend OTP in 60s"
4. After 60s, can request new OTP

## Monitoring and Debugging

### Browser Console Logs
- Development mode: OTP shown in console
- Twilio errors: Displayed in console with full error details
- OTP service operations: Logged for debugging

### Error Messages
- All errors displayed to user in red banner
- Technical details available in console
- Clear guidance on how to recover

## File Structure

```
digital-krishi-officer/
├── services/
│   └── otpService.ts          # OTP handling logic
├── pages/
│   └── Login.tsx              # Updated login with OTP flow
├── .env.example               # Environment template
├── .env.local                 # Your credentials (create this)
└── package.json               # Updated with dependencies
```

## Deployment Checklist

- [ ] Set Twilio credentials in environment variables
- [ ] Ensure .env.local is in .gitignore (don't commit credentials!)
- [ ] Test OTP sending with real phone number
- [ ] Verify SMS delivery to different carriers
- [ ] Check Twilio account balance
- [ ] Monitor failed OTP attempts
- [ ] Setup error logging for production

## FAQ

**Q: Will my credentials be exposed?**
A: No. Environment variables are only accessible on the server/build process, never sent to the client.

**Q: What if I don't set Twilio credentials?**
A: The system falls back to development mode and logs OTPs to console.

**Q: Can I test without Twilio?**
A: Yes, use development mode. OTPs appear in browser console.

**Q: How long is the OTP valid?**
A: 10 minutes from when it's sent.

**Q: What's the maximum attempts?**
A: 3 failed attempts, then you must request a new OTP.

**Q: Can I customize OTP message?**
A: Yes, edit the message in `sendViaTwilio()` function in otpService.ts

## Support and Troubleshooting

If OTP is not sending:
1. Check browser console for error messages
2. Verify Twilio credentials in .env
3. Ensure phone number format is correct (with country code)
4. Check Twilio account balance
5. Verify phone number ownership in Twilio dashboard
6. Check that .env variables are properly loaded

For more help:
- Twilio Documentation: https://www.twilio.com/docs/sms
- Twilio Console: https://www.twilio.com/console
