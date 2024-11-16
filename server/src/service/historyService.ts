import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
export class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}

class HistoryService {
  private filePath = 'db/searchHistory.json';

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<string> {
    return await fs.readFile(this.filePath, { encoding: 'utf-8' });
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, '\t'));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    try {
      const data = await this.read();
      return JSON.parse(data) || [];
    } catch {
      return [];
    }
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: string): Promise<void> {
    const cities = await this.getCities();
    if (!cities.some(city => city.name === name)) {
      cities.push(new City(name));
      await this.write(cities);
    }
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.getCities();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default HistoryService;


