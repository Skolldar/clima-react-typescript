# Weather App 🌦️

A modern, responsive weather application built with React, TypeScript, and TailwindCSS. Integrated with OpenWeatherMap API and Open-Meteo API for comprehensive weather data, featuring Valibot for type safe data validation.

[![weaether-app.png](https://i.postimg.cc/SKsJTMqs/weaether-app.png)](https://postimg.cc/xXwfqqXD)

## Features ✨

- **🌍 Real-time weather data** for cities worldwide  
- **📍 Geolocation support** - automatically fetch weather for your current location
- **🌡️ Temperature unit toggle** - switch between Celsius and Fahrenheit
- **🌗 Dark/Light mode** - automatic theme detection with manual override
- **📊 Comprehensive weather metrics** including:
  - Current, min, and max temperature
  - Feels-like temperature
  - Humidity levels
  - Wind speed (m/s and km/h)
  - Visibility distance
  - UV index with categorization (low/moderate/high)
  - Sunrise/sunset times
  - Weather descriptions with emoji icons
- **⏰ 48-hour forecast** - detailed hourly predictions with:
  - Temperature trends
  - Weather conditions
  - Wind speed
  - Precipitation probability
- **🛡️ Type-safe** implementation with TypeScript
- **✅ Data validation** using Valibot
- **📱 Responsive design** - optimized for all devices
- **⚠️ Error handling** with user-friendly alerts
- **🌍 20 countries** supported (see full list below)

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

- **Frontend Framework**:
  - React 18.3.1
  - TypeScript 5.5.3
  - Vite 5.4.1 (build tool)
  
- **Styling**:
  - TailwindCSS 4.1.18
  - CSS Modules
  
- **Libraries & Dependencies**:
  - Axios 1.7.7 (HTTP client for API calls)
  - Valibot 1.0.0-beta.0 (runtime schema validation)
  - date-fns 4.1.0 (date formatting utilities)
  - react-icons 5.5.0 (icon components)
  - react-toastify 10.0.5 (notifications)
  
- **APIs**:
  - OpenWeatherMap API (current weather & geocoding)
  - Open-Meteo API (hourly forecast & UV index)
  
- **Development Tools**:
  - ESLint (code linting)
  - TypeScript ESLint (TS-specific linting)
  - Vite SWC Plugin (fast React refresh)
    
## Installation & Setup 💻

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd clima-react-typescript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_openweathermap_api_key
   ```
   
   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage 📖

1. **Search by Location**: Enter a city name and select a country from the dropdown
2. **Current Location**: Click the location button to auto-detect your weather
3. **Toggle Units**: Switch between Celsius and Fahrenheit using the temperature toggle
4. **Theme**: Toggle between dark and light modes for comfortable viewing
5. **Hourly Forecast**: Scroll horizontally to view the 48-hour forecast

## Project Structure 📁

```
src/
├── components/
│   ├── Alert/           # Alert notifications
│   ├── Dashboard/       # Header & sidebar navigation
│   ├── Form/            # Search form component
│   ├── Spinner/         # Loading spinner
│   └── WeatherDetails/  # Weather display components
│       ├── WeatherDetail.tsx      # Main weather info
│       ├── WeatherHours.tsx       # 48-hour forecast
│       └── WeatherSunTime.tsx     # Sunrise/sunset times
├── data/
│   └── countries.ts     # Supported countries list
├── hooks/
│   └── useWeather.ts    # Custom weather data hook
├── types/
│   ├── index.d.ts       # Type declarations
│   └── types-index.ts   # Exported types
├── utils/
│   └── index.ts         # Utility functions
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## How to Contribute 🤝

We welcome contributions! Here's how:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/yourusername/weather-app.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**

### Contribution Ideas

- **Report Bugs**: Open an [issue](https://github.com/yourusername/weather-app/issues) with detailed reproduction steps
- **Suggest Features**: Share your ideas for new functionality
- **Add New Countries**: Expand the supported countries list in [countries.ts](src/data/countries.ts)
- **Improve UI/UX**: Enhance the design and user experience
- **Add Tests**: Help improve code quality with unit and integration tests
- **Documentation**: Improve README, add code comments, or create guides

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments 🙏

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Hourly forecasts and UV index from [Open-Meteo](https://open-meteo.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)

---

Made with ❤️ using React and TypeScript
