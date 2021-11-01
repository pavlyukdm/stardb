export class SwapiService {
  _baseUrl = 'https://swapi.dev/api';

  async getResource  (url) {
    const response = await fetch(`${this._baseUrl}${url}`)
    if (!response.ok) {
      throw new Error('Could not receive data')
    }
    return await response.json()
  }

  async getPeople () {
    const response = await this.getResource(`/people/`);
    return response.results.map(this._transformPerson)
  }

  async getPerson (id = 1) {
    const person = await this.getResource(`/people/${id}`);
    return this._transformPerson(person)
  }

  async getPlanets () {
    const response = await this.getResource(`/planets/`)
    return response.results.map(this._transformPlanet);
  }

  async getPlanet (id = 1) {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet)
  }

  async getStarships () {
    const response = await this.getResource(`/starships/`)
    return response.results.map(this._transformStarship);
  }

  async getStarship (id = 1) {
    const starship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(starship)
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    const id = item.url.match(idRegExp)[1];
  }

  _transformPlanet (planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    }
  }

  _transformPerson (person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    }
  }

  _transformStarship (starship) {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costIn_Credits: starship.diameter,
      length: starship.length,
      crew: starship.crew,
      cargoCapacity: starship.cargo_capacity,
    }
  }
}




