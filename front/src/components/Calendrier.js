import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'

import './Calendrier.css'

const localizer = BigCalendar.momentLocalizer(moment)
/*Agenda Rendering*/
//Outside the class
function Event({ event }) {
  return (
    <span>
      <strong>
        {event.title}
      </strong>
      {event.desc && (':  ' + event.desc)}
    </span>
  )
}

function EventAgenda({ event }) {
  return <span>
    <em style={{ color: 'magenta' }}>{event.title}</em>   <p>{event.desc}</p>
  </span>
}


class Calendrier extends Component {
  state = {
    cal_events: [
      //State is updated via componentDidMount
    ],
    isAddModalOpen: false,
    isEditModalOpen: false,
    event_start_on: null,
    event_end_on: null,
    event_title: null
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
        console.log(error);
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
    if (!this.state.isAddModalOpen) {
      this.setState({
        currentEvent: event,
        isEditModalOpen: !this.state.isEditModalOpen,
      });
    }
  };

  handleInputChange = (e) => {
    this.setState({
      event_title: e.target.value
    })
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
            events={cal_events}
            step={30}
            defaultView='week'
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            components={{
              event: Event,
              agenda: {
                event: EventAgenda
              }
            }}
          />

          <Modal isOpen={this.state.isEditModalOpen} toggle={this.toggleEditModal}>
            <ModalHeader toggle={this.toggle}>Modifier l'évenement</ModalHeader>
            <ModalBody><form>
              <label>
                Nom de l'évenement :
                    </label>
              <input type="text" name="title" onChange={this.handleInputChange} />
            </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Enregistrer</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Annuler</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.isAddModalOpen} toggle={this.toggleAddModal}>
            <ModalHeader toggle={this.toggle}>Modifier l'évenement</ModalHeader>
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
              <Button color="secondary" onClick={this.toggle}>Annuler</Button>
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
export default Calendrier;