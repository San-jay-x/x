# DXZ Data Manager

A professional, futuristic web application for managing user-specific data with a stunning **Neumorphic UI** design. Built with React.js, Node.js, and MongoDB, featuring dual shadows, soft extruded elements, and a tactile feel that appears to push through the surface.

![DXZ Data Manager](https://img.shields.io/badge/DXZ-Data%20Manager-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

## ✨ Features

### 🎨 Neumorphic UI Design
- **Soft Light Gray Background** (#e0e0e0) with monochromatic color palette
- **Dual Shadow System** - Light and dark shadows for realistic depth
- **Soft Extruded Elements** that appear to push through the surface
- **No Hard Borders** - Seamless, tactile design
- **Pressed Button Effects** - Interactive feedback on user interaction
- **Professional Futuristic Aesthetics** with smooth animations

### 🔐 Authentication System
- **User Registration** with email verification
- **Secure Login** with JWT tokens
- **Password Reset** functionality
- **Account Lockout** protection against brute force attacks
- **Email Verification** required for account activation

### 🎲 Random Name Generator
- **500 Unique Indian Male Names** with distinct surnames
- **500 Unique Indian Female Names** with distinct surnames
- **No Duplicates** - Each name combination is unique
- **Password Format Generation**: `Username+FirstName+@+Tomorrow'sDate`
- **Copy Functionality** for first name, surname, and generated password

### 📊 Data Manager
- **Password Storage** - Secure user-specific password management
- **Facebook UID Extractor** - Extract UIDs from URLs or direct input
- **2FA Key Management** - Generate TOTP codes every 30 seconds
- **Email Management** - Store and organize email addresses
- **Date-based Organization** - Group data by date for easy management
- **Export Options** - Download as .txt or .xlsx files

### 🔗 Social Media Integration
- **WhatsApp Channel**: [Join Now](https://chat.whatsapp.com/IECS5uR40MNHEBcAEJGMVN?mode=r_t)
- **Telegram Channel**: [Join Now](https://t.me/DXZWorkzone)

## 🚀 Technology Stack

### Frontend
- **React.js** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API calls
- **Google Fonts** - Orbitron & Exo 2 for futuristic typography

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **express-validator** - Input validation

### Security
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent abuse
- **Input Sanitization** - XSS protection
- **Password Hashing** - bcrypt with salt rounds

## 📦 Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/dxz-data-manager.git
cd dxz-data-manager
```

### 2. Backend Setup
```bash
cd server
npm install
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```

### 4. Environment Configuration

#### Server Environment (.env)
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/dxz-data-manager

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Client Environment (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 5. Database Setup
```bash
# Start MongoDB (if not running)
mongod

# Seed the database with Indian names
cd server
npm run seed
```

### 6. Start the Application
```bash
# Terminal 1 - Start Backend
cd server
npm run dev

# Terminal 2 - Start Frontend
cd client
npm start
```

Visit `http://localhost:3000` to access the application.

## 🌐 Deployment Options

### 1. Vercel (Recommended for Frontend)

#### Frontend Deployment
```bash
cd client
npm install -g vercel
vercel
```

#### Backend API Routes
Create `vercel.json` in server directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "./index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ]
}
```

### 2. Netlify (Alternative Frontend)
```bash
cd client
npm run build

# Upload dist folder to Netlify
# Or connect GitHub repository for auto-deployment
```

### 3. Railway (Full-Stack)

#### Deploy Backend
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway new
railway add
railway up
```

#### Environment Variables on Railway
- Set all environment variables from `.env` file
- Add `MONGODB_URI` from Railway's MongoDB add-on
- Update `FRONTEND_URL` to your domain

### 4. Heroku (Full-Stack)

#### Backend Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Create Heroku app
heroku create dxz-data-manager-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set SMTP_USER=your-email
heroku config:set SMTP_PASS=your-password

# Deploy
git push heroku main
```

#### Frontend Deployment on Heroku
```bash
# Create separate app for frontend
heroku create dxz-data-manager-app

# Set build pack
heroku buildpacks:set heroku/nodejs

# Deploy
git push heroku main
```

### 5. DigitalOcean App Platform

#### Deployment Steps
1. Connect your GitHub repository
2. Choose Node.js runtime
3. Set environment variables
4. Configure build commands:
   - **Frontend**: `npm run build`
   - **Backend**: `npm install`
5. Set run commands:
   - **Frontend**: `npm start`
   - **Backend**: `npm start`

### 6. AWS (Advanced)

#### Using AWS Amplify (Frontend)
```bash
npm install -g @aws-amplify/cli
amplify init
amplify add hosting
amplify publish
```

#### Using AWS Lambda + API Gateway (Backend)
- Deploy as serverless functions
- Use AWS DocumentDB for MongoDB
- Configure IAM roles and policies

### 7. Google Cloud Platform

#### Frontend on Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

#### Backend on Cloud Run
```bash
# Build Docker image
docker build -t dxz-api .

# Deploy to Cloud Run
gcloud run deploy dxz-api --image dxz-api --platform managed
```

## 🏆 Best Deployment Platform Recommendations

### 🥇 **Railway** (Highly Recommended)
- **Pros**: 
  - Easy full-stack deployment
  - Built-in MongoDB
  - Automatic HTTPS
  - GitHub integration
  - Environment variable management
- **Perfect for**: Complete application deployment
- **Cost**: Free tier available, pay-as-you-scale

### 🥈 **Vercel + Render**
- **Frontend**: Vercel (excellent React.js support)
- **Backend**: Render (reliable Node.js hosting)
- **Database**: MongoDB Atlas
- **Pros**: Industry-standard, reliable, fast
- **Cost**: Free tiers available

### 🥉 **Netlify + Heroku**
- **Frontend**: Netlify
- **Backend**: Heroku
- **Database**: MongoDB Atlas
- **Pros**: Proven platforms, extensive documentation
- **Cost**: Free tiers with paid scaling

## 📱 Mobile Responsiveness

The application is fully responsive with breakpoints:
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

### Mobile Optimizations
- Touch-friendly button sizes (44px minimum)
- Simplified animations for performance
- Reduced particle effects on mobile
- Optimized image loading
- Gesture-friendly navigation

## 🛡️ Security Features

### Authentication
- **JWT Tokens** with expiration
- **Password Hashing** with bcrypt (12 rounds)
- **Account Lockout** after failed attempts
- **Email Verification** required

### API Security
- **Rate Limiting** (100 requests/15 minutes)
- **CORS Configuration**
- **Helmet** security headers
- **Input Validation** and sanitization
- **XSS Protection**

### Data Protection
- **User-specific Data Isolation**
- **Encrypted Password Storage**
- **Secure TOTP Generation**
- **Safe File Downloads**

## 🎨 Design System

### Color Palette
```css
/* Neumorphic Base */
--neu-base: #e0e0e0;
--neu-light: #ffffff;
--neu-dark: #a8a8a8;

/* Professional Accents */
--accent-primary: #667eea;
--accent-secondary: #764ba2;
--accent-success: #10b981;
--accent-warning: #f59e0b;
--accent-danger: #ef4444;
```

### Typography
- **Headings**: Orbitron (futuristic)
- **Body**: Exo 2 (readable)
- **Code**: Source Code Pro

### Shadows
```css
/* Neumorphic Shadows */
--neu-raised: 4px 4px 8px rgba(190,190,190,0.7), -4px -4px 8px rgba(255,255,255,0.9);
--neu-pressed: inset 2px 2px 4px rgba(190,190,190,0.7), inset -2px -2px 4px rgba(255,255,255,0.9);
--neu-hover: 6px 6px 12px rgba(190,190,190,0.8), -6px -6px 12px rgba(255,255,255,1);
```

## 📊 Database Schema

### Users Collection
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  isVerified: Boolean,
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date
}
```

### UserData Collection
```javascript
{
  userId: ObjectId,
  uid: String,
  password: String,
  twoFaKey: String,
  email: String,
  date: String (YYYY-MM-DD)
}
```

### Names Collection
```javascript
{
  firstName: String,
  surname: String,
  gender: String (male/female),
  isActive: Boolean
}
```

## 🔧 Development

### Available Scripts

#### Frontend (client)
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

#### Backend (server)
```bash
npm start          # Production server
npm run dev        # Development with nodemon
npm run seed       # Seed database with names
```

### Development Workflow
1. **Start MongoDB** locally or use MongoDB Atlas
2. **Configure environment** variables
3. **Seed database** with Indian names
4. **Start backend** server (port 5000)
5. **Start frontend** development server (port 3000)
6. **Open browser** to `http://localhost:3000`

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
brew services start mongodb-community
# or
sudo systemctl start mongod
```

#### Port Conflicts
```bash
# Check if port is in use
lsof -i :5000
lsof -i :3000

# Kill process on port
kill -9 <PID>
```

#### Email Configuration
- Enable 2FA on Gmail
- Generate App Password
- Use App Password in `SMTP_PASS`

#### Build Errors
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Neumorphism Design** - Inspired by modern soft UI trends
- **Indian Names Dataset** - Curated collection of authentic names
- **React Community** - For excellent documentation and tools
- **MongoDB** - For flexible document database
- **Tailwind CSS** - For utility-first styling approach

## 📞 Support

For support, email support@dxzworkzone.com or join our community:
- **WhatsApp**: [DXZ Community](https://chat.whatsapp.com/IECS5uR40MNHEBcAEJGMVN?mode=r_t)
- **Telegram**: [DXZ Workzone](https://t.me/DXZWorkzone)

---

**Built with ❤️ by the DXZ Team**

*Experience the future of data management with our neumorphic design.*