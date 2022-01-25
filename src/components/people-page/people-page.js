import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';

import './people-page.css';
import SwapiService from '../../services/swapi-service';
import { Row } from '../row/Row';
import { ErrorBoundary } from '../app/errorBoundary/ErrorBoundary';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

		const itemList = <ItemList
			onItemSelected={this.onPersonSelected}
			getData={this.swapiService.getAllPeople}
		>
			{(i) => `${i.name} - ${i.birthYear}`}
		</ItemList>

		const personDetails = <PersonDetails personId={this.state.selectedPerson} />

    return (
			<ErrorBoundary>
      	<Row leftEl={itemList} rightEl={personDetails} />
			</ErrorBoundary>
    );
  }
}