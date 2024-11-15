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

// TODO: Complete the HistoryService class

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
    return this.read().then((cities) => {
      let parsedCities: City[];

      try {
        parsedCities = JSON.parse(cities) || [];
      } catch (error) {
        parsedCities = [];
      }

      return parsedCities;
    });
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  
  async addCity(city: string): Promise<City> {
    if (!city) {
      throw new Error('City name is required');
    }

    const newCity = new City(uuidv4(), city);

    return this.getCities()
      .then((cities) => {
        if (cities.find((existingCity) => existingCity.name === city)) {
          return cities;
        }
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }
}

 // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  //async removeCity()


export default HistoryService;


