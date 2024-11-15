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
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.lat,
      lon: locationData.lon,
    };
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
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    if (!this.cityName) {
      throw new Error("City name is undefined");
    }
    const geocodeQuery = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(geocodeQuery);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<WeatherApiResponse> {
    try {
      const query = this.buildWeatherQuery(coordinates);
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error(`Weather data fetch failed: ${response.statusText}`);
      }
      const weatherData = await response.json();
      console.log('Weather data:', weatherData);
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: WeatherApiResponse): WeatherData {
    const firstEntry = response.list[0];
    return {
      city: response.city.name,
      date: new Date(firstEntry.dt * 1000).toLocaleString(),
      icon: firstEntry.weather[0].icon,
      iconDescription: firstEntry.weather[0].description,
      tempF: firstEntry.main.temp,
      humidity: firstEntry.main.humidity,
      windSpeed: firstEntry.wind.speed,
    };
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: WeatherData, weatherData: any[]): Weather[] {
    console.log('Building forecast array with data:', weatherData);
    return weatherData
      .filter((entry) => entry.dt_txt.endsWith(' 12:00:00'))
      .map((entry) => {
        return new Weather({
          city: currentWeather.city,
          date: entry.dt_txt,
          icon: entry.weather[0].icon,
          iconDescription: entry.weather[0].description,
          tempF: entry.main.temp,
          humidity: entry.main.humidity,
          windSpeed: entry.wind.speed,
        });
      });
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;

    try {
      console.log('City name set to:', this.cityName);
      const coordinates = await this.fetchAndDestructureLocationData();
      console.log('Coordinates fetched:', coordinates);

      const weatherData = await this.fetchWeatherData(coordinates);
      console.log('Weather data fetched:', weatherData);

      const currentWeather = this.parseCurrentWeather(weatherData);
      console.log('Current weather parsed:', currentWeather);

      const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
      console.log('Forecast array built:', forecastArray);

      return [new Weather(currentWeather), ...forecastArray];
    } catch (error) {
      console.error('Error getting weather for city:', error);
      throw error;
    }
  }
}

const weatherService = new WeatherService(baseURL, apiKey);

export { weatherService };
export default WeatherService;
