import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';

const CalendarToolbar = (filtre, add ) => {
	return class BaseToolbar extends Toolbar {
		
	render() {
		return (
			<span className="rbc-toolbar">
				<span className="rbc-btn-group">
				<button variant="contained" className='btn-asso' onClick={filtre}>Choisir un lieu</button>
				<button type="button" onClick={add}>Ajouter</button>

        </span> 
				<span className="rbc-btn-group">
					<button type="button" onClick={() => this.navigate('PREV')}>Précédent</button>
					<span className="rbc-toolbar-label"><label>{this.props.label}</label></span>

					<button type="button" onClick={() => this.navigate('NEXT')}>Suivant</button>
				</span>

				<span className="rbc-btn-group">
					<button type="button" onClick={this.view.bind(null, 'month')}>Mois</button>
					<button type="button" onClick={this.view.bind(null, 'week')}>Semaine</button>
					<button type="button" onClick={this.view.bind(null, 'day')}>Jour</button>
					
				</span>
			</span>);
	}
	}}

export default CalendarToolbar;