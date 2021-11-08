import React, { Component } from 'react';

import './random-planet.css';
import {SwapiService} from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false,
  }

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
    })
  }

  onError = (e) => {
    this.setState({
      error: true,
      loading: false,
    })
    console.log('Error: ', e)
  }

  updatePlanet () {
    const id = 4;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch((e) => this.onError(e))

  }

  render() {
    const { planet, loading, error } = this.state;
    const hasData = !(loading || error)
    const spinner = loading ? <Spinner /> : null;
    const errorIndicator = error ? <ErrorIndicator /> : null;
    const planetView = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {errorIndicator}
        {planetView}
      </div>

    );
  }
}

const PlanetView = ({ planet }) => {
  const {
    id, name, diameter, population, rotationPeriod
  } = planet
  return (
    <>
      <img className="planet-image" alt="planet"
           src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </>
  )
}
