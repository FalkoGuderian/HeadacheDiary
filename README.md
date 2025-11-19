# 🐻 Headache Diary

> **Disclaimer:** This application is designed for personal use and educational purposes. For medical advice, please consult qualified healthcare professionals.

**Live Demo:** https://headachediary-ybla.onrender.com/

A comprehensive web application for tracking and analyzing headache patterns, designed to help identify triggers and improve headache management through detailed data collection and AI-powered analysis. Features a modern tabbed interface inspired by professional distance measurement tools, with intuitive icons, moderate color usage, and streamlined navigation.

## 🎨 Design Updates

### Professional Tab Interface
- **Inspired by OGC Distance Tool**: Clean, professional tab design with intuitive navigation
- **Three Main Sections**:
  - **Record** (📋 icon): Data entry and quick fill assistant
  - **Analysis** (📊 icon): Charts, AI analysis, and data visualization
  - **Config & Data** (⚙️ icon): API setup and data management

### Modern Form Design
- **Consistent Iconography**: Each form section has distinct, intuitive icons (calendar, exclamation triangle, clock, shopping cart, fire)
- **Color-Coded Sections**: Purple for timing, red for symptoms, green for sleep, orange for diet, indigo for health
- **Professional Cards**: Clean, rounded sections with proper spacing and borders
- **Grid Layouts**: Responsive grids that adapt to screen size

### Enhanced Details Modal
- **Modern Card-Based Design**: Professional header with gradient background and key info badges
- **Consistent Categories**: Uses the same categories and icons as form sections
- **Improved Typography**: Clear labels, structured data presentation, and uniform styling
- **Responsive Layout**: Adapts beautifully to different screen sizes

### Intuitive Action Buttons & Help
- **🔮 Help Button**: Blue help button with question mark icon in header opens comprehensive feature guide
- **👁️ View Details**: Modern modal with complete entry information organized by categories
- **✏️ Edit Entry**: Modify existing entries, auto-switches to Record tab (orange pencil icon)
- **✅ Apply as New Entry**: Copy existing entry data to create new ones (uses copy icon for clarity), automatically switches to Record tab
- **🗑️ Delete**: Remove entries with safety prompt (red trash icon)
- **💾 Save Progress**: Maintain state in chatbot assistant (moderate save icon)
- **🔄 Restart/Resume/Cancel**: Control assistant sessions and form entry (moderate restart icon)

### Color Scheme & Visual Design
- **Help Button**: Professional darker purple text and border for better visibility
- **Statistics Display**: Total Entries in light grey for subtle appearance, Severe Headaches in dark purple for emphasis
- **Medical-Disclaimer Integration**: Professional styling for medical disclaimers throughout application
- **Optimized Charts**: Clean y-axis labels with proper intensity scaling (Mild/Moderate/Severe)
- **Moderate Color Language**: Subtle color usage that maintains accessibility while keeping a clean design
- **Responsive Layout**: Modern spacing and visual hierarchy across all screen sizes

## Screenshots

### Quick Fill Entry
<img width="1116" height="655" alt="image" src="https://github.com/user-attachments/assets/57322b19-856a-4595-a773-742f80d84ff7" />

### Headache History Chart
<img width="1116" height="383" alt="image" src="https://github.com/user-attachments/assets/72ec24f5-f3fc-4672-a5a3-25d2cfd99636" />

### Headache Log
<img width="1082" height="346" alt="image" src="https://github.com/user-attachments/assets/c45ab7ab-a1c2-4a4b-8991-ab124add80d3" />

### AI Analysis
<img width="1082" height="396" alt="image" src="https://github.com/user-attachments/assets/49328cfa-7b5e-409f-838a-0f86520284d1" />

## ✨ Features

### 📊 Data Tracking
- **Comprehensive Entry Form**: Track 22 different headache-related factors including:
  - Date, time, and duration
  - Pain intensity (Mild/Moderate/Severe)
  - Accompanying symptoms
  - Stress situations and family interactions
  - Sleep patterns and quality
  - Dietary factors (chocolate, cheese, water intake)
  - Screen time and environmental changes

### ✨ AI-Powered Analysis & Help
- **Help Dialog**: Comprehensive feature guide accessible via blue help button with question mark icon in header
- **Quick Fill Assistant**: Interactive AI assistant that guides users through data entry with contextual questions - supports both text typing and voice recording (button located left of "Record" header with microphone and pencil icons)
- **Smart Data Parsing**: Handles both natural language and structured input (e.g., "Date 12.11.2025 Time 14:00 Duration 10 Intensity Mild")
- **Progress Persistence**: Save and resume form assistant sessions at any time
- **✨ Magic Pattern Analysis**: OpenRouter-powered analysis with sparkle emoji to identify potential headache triggers and causes
- **Personalized Recommendations**: AI-generated insights and prevention strategies
- **Markdown Rendering**: Analysis results are displayed with formatted headings, lists, and bold text for better readability

### 📈 Visual Analytics
- **Interactive Charts**: Time-series visualization of headache intensity patterns
- **Detailed Tooltips**: Hover over data points for comprehensive entry information
- **Export Capabilities**: Download analysis reports and CSV data

### 💾 Data Management
- **Local Storage**: All data stored locally in your browser
- **CSV Import/Export**: Backup and restore your headache diary data
- **Data Privacy**: No data sent to external servers (except for AI analysis)

## 🚀 Quick Start

### Option 1: Direct Browser Access
1. Download `index.html`
2. Open the file directly in your web browser
3. Start tracking your headaches immediately!

### Option 2: Local Development Server
```bash
# If you have Python installed
python -m http.server 8000

# Or with Node.js
npx http-server

# Then open http://localhost:8000/index.html
```

## 📖 Usage

### Adding Entries
1. **Manual Entry**: Fill out the comprehensive form with headache details
2. **Quick Fill Assistant**: Click "Quick Fill" (button with microphone and pencil icons left of "Record" header) for guided AI-powered data entry
   - **Text Input**: Type your responses to the assistant's questions
   - **Voice Input**: Click the microphone button in the chat to speak your answers (requires Chrome/Safari/Firefox browsers and microphone access)
3. **Import CSV**: Upload existing headache data from CSV files

### Analyzing Patterns
1. **View Charts**: See intensity patterns over time with interactive tooltips
2. **AI Analysis**: Get AI-powered insights about potential triggers
3. **Export Data**: Download your data for external analysis

### Data Fields Tracked
- **Basic Info**: Date, time, duration, intensity
- **Symptoms**: Accompanying symptoms, stress indicators
- **Lifestyle**: Sleep hours/quality, daily activities, screen time
- **Diet**: Chocolate/cheese consumption, water intake, meal routines
- **Medical**: Allergies, medical tests, environmental changes

## 🚀 Deployment to Render.com

This application is configured for easy deployment as a static site on Render.com.

### Setup Steps:
1. Ensure the repository contains the `render.yaml` configuration file in the root directory.
2. In the Render.com dashboard, create a new Static Site.
3. Connect your GitHub repository (`https://github.com/FalkoGuderian/HeadacheDiary`).
4. Select the main branch and deploy.
5. Render will automatically use the `render.yaml` settings to serve the static files.

### Configuration Details:
- **Runtime**: Static
- **Build Command**: None (no build step required)
- **Publish Directory**: Root directory (`.`)

### Live Deployment:
- **URL**: https://headachediary-ybla.onrender.com/

## 🛠️ Technologies Used

- **Frontend**: React 18, Babel, Tailwind CSS
- **Voice Recognition**: Web Speech API (Browser native)
- **Charts**: Chart.js with date-fns adapter
- **AI Integration**: OpenRouter API (Grok-4 model)
- **Storage**: Browser Local Storage
- **Styling**: Tailwind CSS for responsive design

## 🔧 Configuration

### AI Setup (Optional)
To enable AI features:
1. Get an API key from [OpenRouter.ai](https://openrouter.ai/)
2. Enter your API key in the application (Config & Data tab)
3. Enable Quick Fill assistant and analysis features

### Data Backup
- **Automatic**: Data saved locally in browser storage
- **Manual**: Export to CSV for backup
- **Import**: Restore data from CSV files

## 📱 Browser Compatibility

Works in all modern browsers:
- Chrome 90+ (recommended for voice recording)
- Firefox 88+
- Safari 14+
- Edge 90+
- **Voice Recording**: Requires Chrome or Chromium-based browsers for best experience (Web Speech API)

## 🤝 Contributing

Contributions welcome! Please feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with React and modern web technologies
- AI analysis powered by xAI's Grok model via OpenRouter
- Chart visualization using Chart.js
- Responsive design with Tailwind CSS

## 🔒 Privacy & Security

- **Local Storage**: All headache data stored locally in your browser
- **No Tracking**: No analytics or tracking scripts
- **AI Privacy**: Only sends data to OpenRouter during analysis (optional feature)
- **Data Control**: Full control over your personal health data
