import dotenv from 'dotenv';
dotenv.config();


// TODO: Define an interface for the Coordinates object

const baseURL: string = process.env.API_BASE_URL || '';
const apiKey: string = process.env.API_KEY || '';

interface Coordinates {
  lat: number;
  lon: number;
}



// TODO: Define a class for the Weather object

interface WeatherData {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  humidity: number;
  windSpeed: number;
}

class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  humidity: number;
  windSpeed: number;

  constructor(weatherData: WeatherData) {
    this.city = weatherData.city;
    this.date = new Date(weatherData.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    this.icon = weatherData.icon;
    this.iconDescription = weatherData.iconDescription;
    this.tempF = parseFloat(((weatherData.tempF - 273.15) * 9 / 5 + 32).toFixed(2)); // Adjusted the temperature calculation
    this.humidity = weatherData.humidity;
    this.windSpeed = weatherData.windSpeed;
  }
}

interface WeatherApiResponse {
  city: {
    name: string;
  };
  list: Array<{
    dt: number;
    dt_txt: string;
    weather: Array<{
      icon: string;
      description: string;
    }>;
    main: {
      temp: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
  }>;
}
  



// TODO: Complete the WeatherService class

class WeatherService {
  private baseURL: string;
  private apiKey: string;
  private cityName: string | null = null;

  constructor(baseURL: string, apiKey: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;

    console.log('WeatherService initialized with:');
    console.log('API_BASE_URL:', this.baseURL);
    console.log('API_KEY:', this.apiKey);
  }

// TODO: Define the baseURL// API key// and city name properties



  // TODO: Create fetchLocationData method

  private async fetchLocationData(query: string): Promise<Coordinates> {
    try {
      console.log('Fetching location data with query:', query);
      const response = await fetch(`${this.baseURL}/geo/1.0/direct?q=${query}&appid=${this.apiKey}`);
      if (!response.ok) {
        throw new Error(`Location data fetch failed: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Location data:', data);

      if (!data || data.length === 0) {
        throw new Error('Location not found');
      }

      const locationData = data[0];
      return {
        lat: locationData.lat,
        lon: locationData.lon,
      };
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  }

  // TODO: Create destructureLocationData method
  //private destructureLocationData()
}

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    if (!this.cityName) {
      throw new Error('City name not set');
    }
    const query = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
    console.log('Geocode query:', query);
    return query;
  }
  
    // TODO: Create buildWeatherQuery method
  private buildWeatherQuery()

  // TODO: Create fetchAndDestructureLocationData method
  //private async fetchAndDestructureLocationData()

  // TODO: Create fetchWeatherData method
  //private async fetchWeatherData(coordinates: Coordinates) { }

  // TODO: Build parseCurrentWeather method
  //private parseCurrentWeather() { }

  // TODO: Complete buildForecastArray method
  //private buildForecastArray() 

  // TODO: Complete getWeatherForCity method
  //async getWeatherForCity() 

//export default new WeatherService();
