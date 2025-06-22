#  Warisan Malaysia - Digital Heritage Platform

**A comprehensive web application showcasing Malaysia's rich cultural heritage through interactive digital experiences, supporting Visit Malaysia 2026 campaign.**

##  Project Description

### Problem Statement
Malaysia's vibrant cultural heritage—spanning ancient traditions, historic sites, indigenous crafts, languages, and folklore—is a national treasure. Yet, in the digital era, much of this legacy risks being overlooked or forgotten. As global tourism trends shift and attention spans shorten, it's crucial to find innovative ways to preserve and share our unique identity.

### Why This Matters
With Visit Malaysia 2026 approaching, we have a unique opportunity to both attract visitors and celebrate our cultural richness. The solution lies in digital innovation: harnessing technology to protect, promote, and modernize our heritage, while creating engaging, sustainable tourism experiences for all.

### Challenge Selection
**Challenge 1: Digital Heritage & Tourism – Reimagining Malaysia's Cultural Legacy**

Our project directly addresses this challenge by building digital solutions that preserve, promote, and modernize Malaysian culture and tourism through interactive experiences, digital archiving, and immersive storytelling.

##  Team Members

**Group 24**
- **Hazem Algharem** 
- **Abdulaziz Almuntaser** 
- **Ashraf Algunaid** 
- **Abdulrahman Algharem** 
- **Emadeldin Yousef** 

##  Technologies Used

### Frontend Technologies
- **React 18.3.1** - Modern JavaScript library for building user interfaces
- **TypeScript 5.5.3** - Type-safe JavaScript for better development experience
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid UI development

### Development Tools
- **ESLint 9.9.1** - Code linting and quality assurance
- **PostCSS 8.4.35** - CSS processing and optimization

### Mobile App Conversion
- **Capacitor** - Cross-platform runtime for wrapping web apps as native mobile applications
- **Android Studio** - Native Android development environment for building APK files

## Mobile App Development

(the file of the Mobile app for androids only)
<img width="132" alt="{2D01E2D8-94E0-4F99-9827-60517982BC8C}" src="https://github.com/user-attachments/assets/f867b38f-6b7d-4764-9cf5-133607307501" />


### Cross-Platform Conversion
Our web application has been successfully converted into a native Android mobile app using **Capacitor**, a modern cross-platform runtime that wraps web applications in native containers.

### Conversion Process
1. **Web App Foundation**: Built with React, TypeScript, and Tailwind CSS
2. **Capacitor Integration**: Used Capacitor to create native Android project structure
3. **Native Build**: Generated APK using Android Studio build tools
4. **Device Testing**: Deployed and tested on Android devices

### Key Commands Used
```bash
npx cap init
npx cap add android
npx cap copy
```

### Benefits
- **Native Performance**: Full access to device capabilities
- **Cross-Platform**: Same codebase works on web and mobile
- **Offline Capability**: Works without internet connection
- **App Store Ready**: Can be distributed through Google Play Store

## Core Features / Functionality

### 1. Interactive Heritage Site Explorer
- **Comprehensive Site Database**: 13+ cultural sites across Malaysia including UNESCO World Heritage Sites
- **Advanced Filtering System**: Filter by category (Architecture, Religious, Historical, Modern, Colonial) and location
- **Search Functionality**: Real-time search across site names, descriptions, and locations
- **Detailed Site Information**: Each site includes high-quality images, heritage details, visit information, opening hours, pricing, and direct links to maps and official websites
- **Virtual Tour Integration**: "Explore Virtually" feature for immersive site experiences

### 2. User Authentication & Personalization System
- **Secure User Registration/Login**: Complete authentication system with local storage
- **Personalized Favorites**: Users can save and manage their favorite heritage sites
- **Interactive Comments**: Community-driven commenting system where users can share experiences and insights
- **User Profile Management**: Persistent user sessions with personalized content

### 3. Cultural Stories & Digital Storytelling
- **Rich Content Library**: Curated stories about Malaysian folklore, traditions, and arts
- **Interactive Story Reader**: Modal-based story viewing with formatted content
- **Categorized Content**: Stories organized by themes (Folklore, Culture, Arts)
- **Reading Time Indicators**: User-friendly reading time estimates

### 4. Modern UI/UX Features
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode Toggle**: User preference for comfortable viewing
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Accessibility Features**: Proper semantic HTML and keyboard navigation support

## Challenges and Development Approach

### Technical Challenges Faced
1. **Complex State Management**: Managing multiple interconnected states (user authentication, favorites, comments, site filtering)
2. **Responsive Design Implementation**: Ensuring seamless experience across all device sizes
3. **Data Structure Optimization**: Organizing large amounts of cultural site data efficiently
4. **Local Storage Integration**: Implementing persistent user data without backend dependencies
5. **Mobile App Conversion**: Adapting web interface for native mobile experience

### Development Approach
- **Component-Based Architecture**: Modular React components for maintainable code
- **TypeScript Integration**: Type safety throughout the application for better development experience
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features
- **User-Centered Design**: Focus on intuitive navigation and engaging user experience
- **Cross-Platform Strategy**: Single codebase supporting both web and mobile platforms

### Problem-Solving Strategy
- **Iterative Development**: Built core features first, then enhanced with advanced functionality
- **Mobile-First Design**: Ensured mobile compatibility from the start
- **Performance Optimization**: Optimized images and code for fast loading times
- **Accessibility Considerations**: Implemented proper semantic structure and keyboard navigation
- **Capacitor Integration**: Leveraged modern cross-platform tools for mobile deployment

## Usage Instructions / Demo

### Live Demo
Your application is running locally at: `http://localhost:5173`

### Web Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/0xhazemsan/Warisan.Malaysia.git
   cd Warisan.Malaysia/project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: Navigate to `http://localhost:5173`

### Mobile App Setup
1. **Install Capacitor**:
   ```bash
   npm install @capacitor/core @capacitor/cli
   ```

2. **Initialize Capacitor**:
   ```bash
   npx cap init
   npx cap add android
   ```

3. **Build and sync**:
   ```bash
   npm run build
   npx cap copy
   ```

4. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```

### Key Features Demo
- **Home Page**: Hero section with call-to-action buttons
- **Heritage Sites**: Browse and filter cultural sites
- **User Registration**: Create account to access personalized features
- **Favorites**: Save and manage favorite sites
- **Comments**: Share experiences on site pages
- **Stories**: Read cultural narratives and folklore
- **Dark Mode**: Toggle between light and dark themes
- **Mobile App**: Native Android application with full functionality

## AI Tools Used

### Development Assistance
- **ChatGPT**: Utilized to help draft and refine the README.md documentation, ensuring clear and professional presentation of the project.
- **Cursor (AI-Powered IDE)**: Assisted in implementing core features such as user sign-up and login, and provided real-time code suggestions and improvements for building components in React.
- **Mobile Conversion**: AI guidance for Capacitor integration and native app development

##  Impact & Future Enhancements

### Current Impact
- **Digital Preservation**: 13+ cultural sites digitally documented and accessible
- **Educational Value**: Rich content about Malaysian heritage and traditions
- **Tourism Support**: Direct support for Visit Malaysia 2026 campaign
- **Community Engagement**: Interactive features fostering cultural appreciation
- **Mobile Accessibility**: Native Android app for on-the-go access

### Future Roadmap
- **iOS App**: Extend mobile support to Apple devices
- **AR/VR Integration**: Immersive virtual reality experiences for heritage sites
- **Multilingual Support**: Content in multiple languages for international visitors
- **Backend Integration**: Database and user management system
- **Analytics Dashboard**: Track user engagement and popular content
- **Offline Mode**: Enhanced offline capabilities for mobile users


**Built with ❤️ for Malaysia's Cultural Heritage**
