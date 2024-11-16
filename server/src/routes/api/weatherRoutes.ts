import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const baseURL = process.env.API_BASE_URL || ''; 
const apiKey = process.env.API_KEY || '';

// Create instances of each service class
const historyService = new HistoryService();
const weatherService = new WeatherService(baseURL, apiKey);

// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    console.log(`City name received: ${cityName}`);
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    console.log(`Fetching weather data for city: ${cityName}`);

    // Get weather data from city name
    const weatherData = await weatherService.getWeatherForCity(cityName);
    console.log('Weather data retrieved:', weatherData);

    // Save city to search history
    await historyService.addCity(cityName);
    console.log(`${cityName} added to search history`);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// GET search history
router.get('/history', async (_req, res) => {
  try {
    console.log('Fetching search history');
    const searchHistory = await historyService.getCities();
    return res.json(searchHistory);
  } catch (error) {
    console.error('Error fetching search history:', error);
    return res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

export default router;

// * BONUS TODO: DELETE city from search history


