import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';

import './people-page.css';
import SwapiService from '../../services/swapi-service';

export default class PeoplePage extends Component {

	swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
    hasError: false
  };

  componentDidCatch(error, info) {

    this.setState({
      hasError: true
    });
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

		const itemList = <ItemList
			onItemSelected={this.onPersonSelected}
			getData={this.swapiService.getAllPeople}
			// renderItem={({ name, birthYear }) => `${name} - ${birthYear}`}
		>{(i) => (
				`${i.name} - ${i.birthYear}`
				)}
		</ItemList>

		const personDetails = <PersonDetails personId={this.state.selectedPerson} />

    return (
      <Row leftEl={itemList} rightEl={personDetails} />
    );
  }
}


function Row({ leftEl, rightEl }) {
	return (
		<div className="row mb2">
			<div className="col-md-6">
			{ leftEl }
			</div>
			<div className="col-md-6">
				{ rightEl }
			</div>
		</div>
	);
}