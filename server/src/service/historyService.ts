import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
export class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<string> {
    return await fs.readFile('db/searchHistory.json', {
      flag: 'a+',
      encoding: 'utf-8',
    });
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile('db/searchHistory.json', JSON.stringify(cities, null, '\t'));
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const data = await this.read();
    let parsedCities: City[];

    try {
      parsedCities = JSON.parse(data) || [];
    } catch (error) {
      parsedCities = [];
    }

    return parsedCities;
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<City> {
    if (!city) {
      throw new Error('City name is required');
    }

    const newCity = new City(uuidv4(), city);

    const cities = await this.getCities();
    if (cities.find((existingCity) => existingCity.name === city)) {
      return newCity;
    }

    const updatedCities = [...cities, newCity];
    await this.write(updatedCities);
    return newCity;
  }
}

 // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  //async removeCity()


export default HistoryService;


