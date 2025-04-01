# Weather App 🌦️

A responsive weather application built with TypeScript, JavaScript, HTML, and CSS, connected to the OpenWeatherMap API and using Valibot for data validation.
[![weaether-app.png](https://i.postimg.cc/SKsJTMqs/weaether-app.png)](https://postimg.cc/xXwfqqXD)

## Features ✨

- **Real-time weather data** for cities worldwide  
- **Available in 20 countries** (see full list below)
- **Multiple weather metrics** including:
  - Current temperature
  - Feels-like temperature
  - Humidity
  - Wind speed
  - Sunrise/sunset times
- **Type-safe** implementation with TypeScript
- **Data validation** using Valibot
- **Responsive design** works on all devices
- **Error handling** for invalid city/country inputs

## Available Countries 🌍

The app supports weather data for these countries (and their cities):

| Code | Country            |
|------|--------------------|
| US   | United States      |
| GB   | United Kingdom     |
| CA   | Canada             |
| AU   | Australia          |
| DE   | Germany            |
| FR   | France             |
| IT   | Italy              |
| ES   | Spain              |
| JP   | Japan              |
| CN   | China              |
| IN   | India              |
| BR   | Brazil             |
| MX   | Mexico             |
| ZA   | South Africa       |
| AE   | United Arab Emirates |
| SG   | Singapore          |
| KR   | South Korea        |
| RU   | Russia             |
| TR   | Turkey             |
| SA   | Saudi Arabia       |

## Technologies Used 🛠️

- **Frontend**:
  - TypeScript
  - JavaScript
  - HTML5
  - CSS3
  - React
  
- **Libraries**:
  - Axios (for API calls)
  - Valibot (for data validation)
  
- **API**:
  - OpenWeatherMap API
    
## Installation & Setup 💻

    ```bash
      git clone https://github.com/yourusername/weather-app.git
    ```
      cd weather-app
    ```
      npm install

## How to Contribute 🤝

We welcome contributions! Here's how:

1. **Report Bugs**  
   Open an [issue](https://github.com/yourusername/weather-app/issues) with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

2. **Suggest Features**  
   Propose new ideas via:
   - 💡 Pull Requests

3. **Add New Countries**  
   To expand coverage:
   ```typescript
   // In src/data/countries.ts
   { code: 'NZ', name: 'New Zealand' } // Example addition
