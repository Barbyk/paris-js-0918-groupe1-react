import React, { PureComponent } from 'react';
import BigCalendar from 'react-big-calendar'
import CalendarToolbar from './CalendarToolbar'
import moment_timezone from 'moment-timezone';
import moment from 'moment';
// import Checkbox from './Checkbox'
import {AvForm, AvField} from 'availity-reactstrap-validation'
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/fr';
import axios from 'axios'
import withAuth from './withAuth'
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
    isFiltreModalOpen: false,
    event_start_on: undefined,
    event_end_on: undefined,
    event_title: undefined,
    description: undefined,
    asso_name:undefined,
    currentEvent: null,
    location_selected: null,
    locations: [],
    actions: [],
    popoverOpen:false
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

  getMultipleEvents = async (locationid = 0) => {

    await axios.post('/events/multiplelocations/', {id:locationid})
      .then(response => {
        if (response.data){
        let appointments = response.data;
        if (appointments)
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start)
          appointments[i].end = this.convertDate(appointments[i].end)
        }
        if (appointments)
        this.setState({
          cal_events: appointments
        })
      }
      })
      .catch(function (error) {
        alert(error);
      });

    
  }

  createEvent = (element) => {

    var startDate = moment(this.state.event_start_on).format("YYYY-MM-DD H:mm:ss");
    var endDate = moment(this.state.event_end_on).format("YYYY-MM-DD H:mm:ss");
    axios.post('events', {
      users_id: 1, locations_id: this.state.location_selected, is_active: 1, title: "["+this.state.asso_name+"] "+this.state.event_title, description: this.state.description,
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
      users_id: 1, is_active: 1, locations_id: this.state.location_selected, title: this.state.event_title, description:this.state.description,
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
  togglePopover=() => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
  toggleAddModal = slotInfo => {

    if (!this.state.isEditModalOpen) {

      this.setState({
        event_start_on : slotInfo ? moment(slotInfo.start).format("YYYY-MM-DDTHH:mm") : undefined,
        event_end_on : slotInfo ? moment(slotInfo.end).format("YYYY-MM-DDTHH:mm") : undefined,
        isAddModalOpen: !this.state.isAddModalOpen,
      });
    }
  };
  toggleFiltreModal = slotInfo => {

    if (!this.state.isEditModalOpen && !this.state.isAddModalOpen) {

      this.setState({
  
        isFiltreModalOpen: !this.state.isFiltreModalOpen,
      });
    }
  };

  toggleEditModal = event => {
    var startDate = moment(event.start).format("YYYY-MM-DDTHH:mm");
    var endDate = moment(event.end).format("YYYY-MM-DDTHH:mm");
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
      [e.target.name]: e.target.value,

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
   /*  const newSelection = parseInt(e.target.value);
    let newSelectionArray;

    newSelectionArray = [...this.state.actions||[],  newSelection ];
    

    this.setState({
       actions: newSelectionArray,
       location_selected : e.target.value
    })
    if (newSelectionArray.length > 0) { 
   
      this.getMultipleEvents(newSelectionArray) } else {
       
      this.getEvents(0)
    } */
    this.setState({
      actions: e.target.value,
      location_selected: e.target.value
    })
    this.getEvents(e.target.value)
  }

  handleActionsCheckBox = (e) => {
    
    const newSelection = parseInt(e.target.name);
    let newSelectionArray;

    // if pour les cas de déselection de la checkbox, on enleve la valeur du tableau
    if ((this.state.actions||[]).indexOf(newSelection) > -1) {
      newSelectionArray = this.state.actions.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.actions||[],  newSelection ];
    }

    this.setState({
       actions: newSelectionArray 
    })
    if (newSelectionArray.length > 0) { 
   
      this.getMultipleEvents(newSelectionArray) } else {
       
      this.getMultipleEvents([0])
    }

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
  // extension du composent Event pour afficher le titre et la description
  Event({ event }) {
    return (
      <span>
        <strong>{event.title}</strong>
        {event.description && ':  ' + event.description}
      </span>
    )
  }

  render() {
    const { cal_events, asso_name, isEditModalOpen, isAddModalOpen,
      event_start_on, event_end_on, locations, currentEvent } = this.state;
    
    return (
      <div className="calendrier">
        <div className="dropdown" style={{ fontSize: "2vh" }}>
                   
          <label class="control-label">Lieu de la mauraude</label>{" "}
          <select name="locations_id" onChange={this.handleLocationChange} value={this.state.location_selected}  >

            <option name="locations_id" value="">Sélectionner un lieu</option>

            <optgroup label="Paris Nord">
              {locations.filter(x => x.departements_id === 2).map((e, index) => {
                return (<option name="locations_id" value={e.id}>{e.name}</option>)
              })}
            </optgroup>
            <optgroup label="Paris Est">
              {locations.filter(x => x.departements_id === 3).map((e, index) => {
                return (<option name="locations_id" value={e.id}>{e.name}</option>)
              })}
            </optgroup>
            <optgroup label="Paris Centre">
              {locations.filter(x => x.departements_id === 1).map((e, index) => {
                return (<option name="locations_id" value={e.id}>{e.name}</option>)
              })}
            </optgroup>
            <optgroup label="Paris Ouest">
              {locations.filter(x => x.departements_id === 5).map((e, index) => {
                return (<option name="locations_id" value={e.id}>{e.name}</option>)
              })}
            </optgroup>
            <optgroup label="Paris Sud">
              {locations.filter(x => x.departements_id === 4).map((e, index) => {
                return (<option name="locations_id" value={e.id}>{e.name}</option>)
              })}
            </optgroup>
            <optgroup label="Banlieue">
              {locations.filter(x => x.departements_id === 6).map((e, index) => {
                return (<option name="locations_id" value={e.id}>{e.name}</option>)
              })}
            </optgroup>
          </select>
        </div>

        {/*  <div className="dropdown" style={{ fontSize: "2vh" }}>
          <label class="control-label">Lieu de la mauraude </label>
          <select name="locations_id" onChange={this.handleLocationChange} value={this.state.location}>
            <option name="locations_id" value="">Sélectionner un lieu</option>
            {locations.map((e, index) => {
              return (<option name="locations_id" value={e.id}>{e.name}</option>)
            })}
          </select>
        </div> */}
        <div style={{ height: "70vh" }}>
          <BigCalendar
            selectable={true}
            onSelectEvent={event => this.toggleEditModal(event)}
            onSelectSlot={(slotInfo) => this.toggleAddModal(slotInfo)}
            localizer={localizer}
            messages={{ next: "Suivant", previous: "Précédent", today: "Aujourd'hui", month: "Mois", week: "Semaine", day: "Jour" }}
            events={cal_events}
            step={30}
            timeslots={1}
            scrollToTime={new Date(new Date().setHours(8))}
            defaultView={(window.innerWidth <= 760)?'month':'month'}
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            eventPropGetter={this.eventStyleGetter}
            components={{
              event: this.Event,
              toolbar: CalendarToolbar(this.toggleFiltreModal, this.toggleAddModal)
              
        }}
          />

          {/* <Modal isOpen={isFiltreModalOpen} toggle={this.toggleFiltreModal}>
            <ModalHeader toggle={this.toggleFiltreModal}>Choisir un lieu</ModalHeader>
            <ModalBody><form>
              <Checkbox options={this.state.locations} handleChange={this.handleActionsCheckBox} selectedOptions={this.state.actions} name="actions" />
            </form>
            </ModalBody>
           
          </Modal> */}

          <Modal isOpen={isEditModalOpen} toggle={this.toggleEditModal}>
            <ModalHeader toggle={this.toggle}>Modifier l'évenement</ModalHeader>
            <ModalBody><AvForm onValidSubmit={this.editEvent}>
            <p> Lieu : {(locations.find(x=>x.id===(currentEvent||"").locations_id)||"").name}</p>
              <label>
                Nom de l'évenement :
                    </label>
              <AvField type="text" name="event_title" value={(currentEvent||"").title} onChange={this.handleInputChange} required />
              <label>
                Description :
                    </label>
              <AvField type="text" name="description" value={(currentEvent||"").description} onChange={this.handleInputChange}/>
              <label>
                Début :
                    </label>
              <div className="form-group"><input type="datetime-local" className="form-control" step="1800" name="date_start" value={event_start_on} onChange={this.handleStartChange} required /></div>
              <label>
                Fin :
                    </label>
              <div className="form-group"><input type="datetime-local" className="form-control" step="1800" min={event_start_on} name="date_end" value={event_end_on} onChange={this.handleEndChange} required /></div>
            
              <Button color="secondary" onClick={this.deleteEvent}>Supprimer du calendrier</Button>{' '}
              <Button className="btn-asso" color="primary">Enregistrer</Button>{' '}
              </AvForm>
            </ModalBody>
            
          </Modal>

          <Modal isOpen={isAddModalOpen} toggle={this.toggleAddModal}>
            <ModalHeader toggle={this.toggleAddModal}>Ajouter un nouvel évenement</ModalHeader>
            <ModalBody>
              <AvForm onValidSubmit={this.createEvent}>
              <p> Lieu : 
                
              <div className="dropdown" style={{ fontSize: "2vh" }}>
                   

                    <AvField type="select" name="locations_id" onChange={this.handleLocationChange} value={this.state.location_selected} required validate={{
                      required: { value: true, errorMessage: "Veuillez séléctionner un lieu" }
                    }}>

                      <option name="locations_id" value="">Sélectionner un lieu</option>
                      <optgroup label="Paris Nord">
                        {locations.filter(x => x.departements_id === 2).map((e, index) => {
                          return (<option name="locations_id" value={e.id}>{e.name}</option>)
                        })}
                      </optgroup>
                      <optgroup label="Paris Est">
                        {locations.filter(x => x.departements_id === 3).map((e, index) => {
                          return (<option name="locations_id" value={e.id}>{e.name}</option>)
                        })}
                      </optgroup>
                      <optgroup label="Paris Centre">
                        {locations.filter(x => x.departements_id === 1).map((e, index) => {
                          return (<option name="locations_id" value={e.id}>{e.name}</option>)
                        })}
                      </optgroup>
                      <optgroup label="Paris Ouest">
                        {locations.filter(x => x.departements_id === 5).map((e, index) => {
                          return (<option name="locations_id" value={e.id}>{e.name}</option>)
                        })}
                      </optgroup>
                      <optgroup label="Paris Sud">
                        {locations.filter(x => x.departements_id === 4).map((e, index) => {
                          return (<option name="locations_id" value={e.id}>{e.name}</option>)
                        })}
                      </optgroup>
                      <optgroup label="Banlieue">
                        {locations.filter(x => x.departements_id === 6).map((e, index) => {
                          return (<option name="locations_id" value={e.id}>{e.name}</option>)
                        })}
                      </optgroup>
                    </AvField>
                  </div></p>
                <label>
                  Nom de l'évenement :
                    </label>
                <AvField type="text" name="event_title" onChange={this.handleInputChange} required validate={{
              required: {value: true, errorMessage: "Veuillez saisir une valeur"}}}/>
                <label>
                  Nom de l'association :
                    </label>
                <AvField type="text" name="asso_name" value={asso_name} onChange={this.handleInputChange} required validate={{
              required: {value: true, errorMessage: "Veuillez saisir une valeur"}}}/>
                <label>
                  Description :
                    </label>
                <AvField type="text" name="description" onChange={this.handleInputChange} />
                <label>
                  Début :
                    </label>
                <div className="form-group"><input type="datetime-local" step="1800" className="form-control" name="event_start_on" value={event_start_on} onChange={this.handleStartChange} required/></div>
                <label>
                  Fin :
                    </label>
                <div className="form-group"><input type="datetime-local" className="form-control" step="1800" min={event_start_on} name="event_end_on" value={event_end_on} onChange={this.handleEndChange} required /></div>
                <Button className="btn-asso" >Enregistrer</Button>

              </AvForm>
            </ModalBody>

          </Modal>

        </div>
      </div>
    );
  }
}
export default withAuth(Calendrier);