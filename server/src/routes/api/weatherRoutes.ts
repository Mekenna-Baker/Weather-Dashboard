import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService';
import WeatherService from '../../service/weatherService';


// TODO: POST Request with city name to retrieve weather data

router.post('/', async (req, res) => {
  const cityName = req.body.cityName;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    console.log(`Fetching weather data for city: ${cityName}`);

    // TODO: GET weather data from city name

    const weatherData = await WeatherService.getWeatherforCity(cityName);
    console.log('Weather data retrieved', weatherData);

    // TODO: Save city to search history

    await HistoryService.addCity(cityName);
    console.log(`${cityName} added to search history`);

    return res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data', error);
    return res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// TODO: GET search history

router.get('/history', async (_req, res) => {
  try {
    console.log('Fetching search history');
    const searchHistory = await HistoryService.getCities();
    return res.json(searchHistory);

  } catch (error) {
    console.error('Error fetching search history', error);
    return res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

export default router;


// * BONUS TODO: DELETE city from search history


