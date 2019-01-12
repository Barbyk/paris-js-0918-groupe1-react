import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';

export default class CalendarToolbar extends Toolbar {
	constructor (props) {
		super(props)
	}
	componentDidMount() {
		const view = this.props.view;
	}

	render() {
		return (
			<span className="rbc-toolbar">
				{/* <span className="rbc-btn-group">
				<button type="button" onClick={this.props.handleFilter}>Aujourd'hui</button>
        </span> */}
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
			</span>
		);
	}
}