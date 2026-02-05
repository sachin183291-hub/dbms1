# Git Setup Instructions for Windows

## Issue
Git is not recognized in PowerShell. You need to install Git for Windows.

## Solution

### Option 1: Install Git for Windows (Recommended)

1. **Download Git Installer**
   - Go to: https://git-scm.com/download/win
   - Download the latest version (usually 64-bit)

2. **Run Installer**
   - Double-click the downloaded `.exe` file
   - Click "Install"
   - Use default settings (recommended for beginners)
   - Make sure to check "Add Git Bash Here" option
   - Complete the installation

3. **Restart PowerShell**
   - Close your current PowerShell window
   - Open a new PowerShell window
   - Git commands should now work

### Option 2: Use Git Bash Instead

After installing Git, you can:
1. Right-click in your project folder
2. Select "Git Bash Here"
3. Run git commands in Git Bash terminal

### Option 3: Use GitHub Desktop

1. Download from: https://desktop.github.com/
2. Install and sign in with GitHub account
3. No manual git commands needed - use the UI

---

## After Installation: Commit Your Changes

Once Git is installed, run these commands in PowerShell:

```powershell
cd "c:\Users\sachi\Downloads\digital-krishi-officer---ai-farmer-advisory-system (3)"

# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Optimize: Split bundles, fix CSS reference, verify entry points"

# Push to GitHub
git push origin main
```

---

## Verify Installation

After installing, run in PowerShell:
```powershell
git --version
```

Should show something like: `git version 2.x.x.windows.x`

---

## Troubleshooting

If git still doesn't work after installation:
1. Restart your computer
2. Make sure PowerShell is running as Administrator
3. Or use Git Bash instead

**Your project is ready to deploy! Just commit and push after installing Git.**
