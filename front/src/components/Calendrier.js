import React, { PureComponent } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/fr';
import axios from 'axios'
import './Calendrier.css'

const localizer = BigCalendar.momentLocalizer(moment)

class Calendrier extends PureComponent {
  state = {
    cal_events: [
      //State is updated via componentDidMount
    ],
    isAddModalOpen: false,
    isEditModalOpen: false,
    event_start_on: null,
    event_end_on: null,
    event_title: null,
    currentEvent: null
  }

  convertDate = (date) => {
    return moment.utc(date).toDate()
  }


  componentDidMount() {

    this.getEvents()

  }

  getEvents = () => {

    axios.get('http://localhost:3002/events')
      .then(response => {
        let appointments = response.data;

        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start)
          appointments[i].end = this.convertDate(appointments[i].end)
        }

        this.setState({
          cal_events: appointments
        })

      })
      .catch(function (error) {
        alert(error);
      });
  }
  createEvent = (element) => {

    var startDate = moment(this.state.event_start_on).format("YYYY-MM-DD hh:mm:ss");
    var endDate = moment(this.state.event_end_on).format("YYYY-MM-DD hh:mm:ss");

    axios.post('http://localhost:3002/events', {
      users_id: 1, locations_id: 1, title: this.state.event_title,
      begin_date: startDate, end_date: endDate
    })
      .then(response => {

        this.setState({
          isAddModalOpen: !this.state.isAddModalOpen,
        })
        this.getEvents()

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  editEvent = (element) => {

    var startDate = moment(this.state.event_start_on).format("YYYY-MM-DD hh:mm:ss");
    var endDate = moment(this.state.event_end_on).format("YYYY-MM-DD hh:mm:ss");

    axios.put('http://localhost:3002/events/' + this.state.currentEvent.id, {
      users_id: 1, locations_id: 1, title: this.state.event_title,
      begin_date: startDate, end_date: endDate
    })
      .then(response => {

        this.setState({
          isEditModalOpen: !this.state.isEditModalOpen,
        })
        this.getEvents()

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  toggleAddModal = slotInfo => {
    if (!this.state.isEditModalOpen) {

      this.setState({
        event_start_on: slotInfo.start,
        event_end_on: slotInfo.end,
        isAddModalOpen: !this.state.isAddModalOpen,
      });
    }
  };

  toggleEditModal = event => {
    var startDate = moment(event.start).format("YYYY-MM-DDThh:mm");
    var endDate = moment(event.end).format("YYYY-MM-DDThh:mm");

    if (!this.state.isAddModalOpen) {
      this.setState({
        currentEvent: event,
        isEditModalOpen: !this.state.isEditModalOpen,
        event_title: event.title,
        event_start_on: startDate,
        event_end_on: endDate
      });
    }
  };

  handleInputChange = (e) => {
    this.setState({
      event_title: e.target.value
    })
  }
  handleStartChange = (e) => {
    this.setState({
      event_start_on: e.target.value
    })
  }
  handleEndChange = (e) => {
    this.setState({
      event_end_on: e.target.value
    })
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = '#' + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };

  }

  render() {

    const { cal_events } = this.state

    const { classes, toolbarVisible, defaultView } = this.props;

    return (
      <div className="App">

        <div style={{ height: 700 }}>
          <BigCalendar
            selectable
            onSelectEvent={event => this.toggleEditModal(event)}
            onSelectSlot={(slotInfo) => this.toggleAddModal(slotInfo)}
            localizer={localizer}
            messages={{ next: "Suivant", previous: "Précédent", today: "Aujourd'hui", month: "Mois", week: "Semaine", day: "Jour" }}
            events={cal_events}
            step={30}
            defaultView='week'
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            eventPropGetter={this.eventStyleGetter}

          />

          <Modal isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal}>
            <ModalHeader toggle={this.toggle}>Modifier l'évenement</ModalHeader>
            <ModalBody><form>
              <label>
                Nom de l'évenement :
                    </label>
              <input type="text" name="title" value={this.state.event_title} onChange={this.handleInputChange} /><br />
              <label>
                Début :
                    </label>
              <input type="datetime-local" name="date_start" value={this.state.event_start_on} onChange={this.handleStartChange} required /><br />
              <label>
                Fin :
                    </label>
              <input type="datetime-local" name="date_end" value={this.state.event_end_on} onChange={this.handleEndChange} required />
            </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.editEvent}>Enregistrer</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditModal}>Annuler</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.isAddModalOpen} toggle={this.toggleAddModal}>
            <ModalHeader toggle={this.toggle}>Ajouter un nouvel évenement</ModalHeader>
            <ModalBody>
              <p>de : {this.state.event_start_on ? this.state.event_start_on.toLocaleString() : ''}</p>
              <p>à : {this.state.event_end_on ? this.state.event_end_on.toLocaleString() : ''}</p>

              <form>
                <label>
                  Nom de l'évenement :
                    </label>
                <input type="text" name="title" onChange={this.handleInputChange} />
              </form>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.createEvent}>Enregistrer</Button>{' '}
              <Button color="secondary" onClick={this.toggleAddModal}>Annuler</Button>
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
export default Calendrier;