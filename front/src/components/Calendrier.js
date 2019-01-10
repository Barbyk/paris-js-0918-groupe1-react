import React, { PureComponent } from 'react';
import BigCalendar from 'react-big-calendar'
import moment_timezone from 'moment-timezone';
import moment from 'moment';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/fr';
import axios from 'axios'
import './Calendrier.css'

moment_timezone.tz.setDefault('Europe/Paris');
const localizer = BigCalendar.momentLocalizer(moment_timezone)

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
    currentEvent: null,
    location_selected: null,
    locations: []
  }

  convertDate = (date) => {
    return moment.utc(date).toDate()
  }


  componentDidMount() {
    this.getLocations()
    this.getEvents()

  }
  getLocations = () => {

    axios.get('/locations/')
      .then(response => {
        this.setState({
          locations: response.data
        })

      })
      .catch(function (error) {
        alert(error);
      });
  }

  getEvents = (locationid = 0) => {

    axios.get('/events/location/' + locationid)
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

    var startDate = moment(this.state.event_start_on).format("YYYY-MM-DD H:mm:ss");
    var endDate = moment(this.state.event_end_on).format("YYYY-MM-DD H:mm:ss");
    axios.post('events', {
      users_id: 1, locations_id: this.state.location_selected, is_active: 1, title: this.state.event_title,
      begin_date: startDate, end_date: endDate
    })
      .then(response => {

        this.setState({
          isAddModalOpen: !this.state.isAddModalOpen,
        })
        this.getEvents(this.state.location_selected)

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  editEvent = (element) => {

    var startDate = moment(this.state.event_start_on).format("YYYY-MM-DD H:mm:ss");
    var endDate = moment(this.state.event_end_on).format("YYYY-MM-DD H:mm:ss");

    axios.put('/events/' + this.state.currentEvent.id, {
      users_id: 1, locations_id: this.state.location_selected, is_active: 1, title: this.state.event_title,
      begin_date: startDate, end_date: endDate
    })
      .then(response => {

        this.setState({
          isEditModalOpen: !this.state.isEditModalOpen,
        })
        this.getEvents(this.state.location_selected)

      })
      .catch(function (error) {
        console.log(error);
      });

  }

  deleteEvent = (element) => {

    axios.put('/events/' + this.state.currentEvent.id, {
      is_active: 0, users_id: 1, locations_id: this.state.location_selected
    })
      .then(response => {

        this.setState({
          isEditModalOpen: !this.state.isEditModalOpen,
        })
        this.getEvents(this.state.location_selected)

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
    var startDate = moment(event.start).format("YYYY-MM-DDTHH:mm");
    var endDate = moment_timezone.tz(event.end,'Europe/Paris').format("YYYY-MM-DDTHH:mm");
    if (!this.state.isAddModalOpen) {
      this.setState({
        currentEvent: event,
        isEditModalOpen: !this.state.isEditModalOpen,
        event_title: event.title,
        event_start_on: startDate,
        event_end_on: endDate,
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

  handleLocationChange = (e) => {
    this.setState({
      location_selected: e.target.value
    })
    this.getEvents(e.target.value)
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = '#' + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      fontSize: '15px',
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };

  }

  render() {

    const { cal_events, event_title, isEditModalOpen, isAddModalOpen,
      event_start_on, event_end_on, locations, location_selected } = this.state
    const locations_id = parseInt(location_selected)-1
    return (
      <div className="calendrier">
        <div className="dropdown" style={{ fontSize: "14px" }}>
          <label class="control-label">Lieu de la mauraude </label>
          <select name="locations_id" onChange={this.handleLocationChange} value={this.state.location}>
            <option name="locations_id" value="">Sélectionner un lieu</option>
            {locations.map((e, index) => {
              return (<option name="locations_id" value={index + 1}>{e.name}</option>)
            })}
          </select>
        </div>
        <div style={{ height: 700 }}>
          <BigCalendar
            selectable={location_selected ? true : false}
            onSelectEvent={event => this.toggleEditModal(event)}
            onSelectSlot={(slotInfo) => this.toggleAddModal(slotInfo)}
            localizer={localizer}
            messages={{ next: "Suivant", previous: "Précédent", today: "Aujourd'hui", month: "Mois", week: "Semaine", day: "Jour" }}
            events={cal_events}
            step={30}
            timeslots={2}
            scrollToTime={new Date(new Date().setHours(8))}
            defaultView={(window.innerWidth <= 760)?'day':'week'}
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            eventPropGetter={this.eventStyleGetter}

          />



          <Modal isOpen={isEditModalOpen} toggle={this.toggleEditModal}>
            <ModalHeader toggle={this.toggle}>Modifier l'évenement</ModalHeader>
            <ModalBody><form>
              <label>
                Nom de l'évenement :
                    </label>
              <input type="text" name="title" value={event_title} onChange={this.handleInputChange} /><br />
              <label>
                Début :
                    </label>
              <input type="datetime-local" step="1800" name="date_start" value={event_start_on} onChange={this.handleStartChange} required /><br />
              <label>
                Fin :
                    </label>
              <input type="datetime-local" step="1800" min={event_start_on} name="date_end" value={event_end_on} onChange={this.handleEndChange} required />
            </form>
              <Button color="secondary" onClick={this.deleteEvent}>Supprimer du calendrier</Button>

            </ModalBody>
            <ModalFooter>

              <Button color="primary" onClick={this.editEvent}>Enregistrer</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditModal}>Annuler</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={isAddModalOpen} toggle={this.toggleAddModal}>
            <ModalHeader toggle={this.toggle}>Ajouter un nouvel évenement</ModalHeader>
            <ModalBody>
              <p> Lieu : {(locations[locations_id]||"").name}</p>
              <p>de : {event_start_on ? event_start_on.toLocaleString() : ''}</p>
              <p>à : {event_end_on ? event_end_on.toLocaleString() : ''}</p>

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