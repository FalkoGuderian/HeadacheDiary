# 🐻 Headache Diary

A comprehensive web application for tracking and analyzing headache patterns, designed to help identify triggers and improve headache management through detailed data collection and AI-powered analysis.

## Fill form via Form Assistant
<img width="750" height="634" alt="image" src="https://github.com/user-attachments/assets/e537155c-be70-4a13-a769-ef8d7d916e73" />

## Headache History Chart
<img width="763" height="219" alt="image" src="https://github.com/user-attachments/assets/f1e79eb3-4636-46ce-8b96-39b2f149f98c" />

## Headache Log
<img width="758" height="175" alt="image" src="https://github.com/user-attachments/assets/eedad995-d0a5-4a41-965f-9a2358dc278a" />

## AI Analysis
This AI analysis is for informational purposes only and does not constitute medical advice. Please consult a healthcare professional for medical concerns.

<img width="758" height="263" alt="image" src="https://github.com/user-attachments/assets/76fb2747-9a3b-4f82-926d-3fd7a4b140bc" />


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

### 🤖 AI-Powered Analysis
- **Intelligent Chatbot**: Interactive AI assistant that guides users through data entry with contextual questions
- **Medical Analysis**: OpenRouter-powered analysis to identify potential headache triggers and causes
- **Personalized Recommendations**: AI-generated insights and prevention strategies

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
2. **AI Chatbot**: Click "Create entry with chatbot" for guided data entry
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

## 🛠️ Technologies Used

- **Frontend**: React 18, Babel, Tailwind CSS
- **Charts**: Chart.js with date-fns adapter
- **AI Integration**: OpenRouter API (Grok-4 model)
- **Storage**: Browser Local Storage
- **Styling**: Tailwind CSS for responsive design

## 🔧 Configuration

### AI Setup (Optional)
To enable AI features:
1. Get an API key from [OpenRouter.ai](https://openrouter.ai/)
2. Enter your API key in the application
3. Enable chatbot and analysis features

### Data Backup
- **Automatic**: Data saved locally in browser storage
- **Manual**: Export to CSV for backup
- **Import**: Restore data from CSV files

## 📱 Browser Compatibility

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

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

---

**Note**: This application is designed for personal use and educational purposes. For medical advice, please consult qualified healthcare professionals.
