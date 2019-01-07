import React, { Component } from 'react'
import axios from 'axios';
import DisplayAssociations from './DisplayAssociations'

const numberAssoPerPage = 10


export default class AssoByAction extends Component {
  
  state = { asso : [],
    actions: [],
    currentNumberPage: 1,
    assoPerPage: [],
    numberResultStart: 0,
    numberResultEnd: 0,
    isDisplayNext: false,
    isDisplayPrevious: false
  }

  componentDidMount() {
    this.getAssoByAction()
    this.getActions()
}


getAssoByAction() {
  
    axios.get('/assoprofil/filterbyaction/'+ Number(this.props.match.params.id))
    .then(res => {this.setState({ asso : res.data })
    this.getAssoPerPage();
  })

   
}

getActions() {
  axios.get('/actions')
      .then(res => this.setState({ actions: res.data }))

}

getAssoPerPage() {
  const { currentNumberPage } = this.state;
  const { asso } = this.state;
  let numberResultStart  = (
      currentNumberPage - 1) * numberAssoPerPage;
  let numberResultEnd = currentNumberPage * numberAssoPerPage;
  if (numberResultEnd > asso.length) {
      numberResultEnd = asso.length
  }
  const pageArray = asso.slice(numberResultStart, numberResultEnd);
  this.setState({
      assoPerPage: pageArray,
      numberResultStart: numberResultStart,
      numberResultEnd: numberResultEnd,
      isDisplayPrevious: currentNumberPage === 1 ? false : true,
      isDisplayNext: numberResultEnd === asso.length ? false : true
  })

}

handleButtonPrevious = () => {
  const { currentNumberPage } = this.state;
  if (currentNumberPage > 1) {
      this.setState({
          currentNumberPage: currentNumberPage - 1,
          assoPerPage: []
      },
          this.getAssoPerPage
      );

  }
}

handleButtonNext = () => {
  const { currentNumberPage } = this.state;
  if (this.state.asso.length / numberAssoPerPage > currentNumberPage) {
      this.setState({
          currentNumberPage: currentNumberPage + 1,
          assoPerPage: []
      },
          this.getAssoPerPage
      );

  }
}
render() {
  const shouldParse = (el) => {
    if (!Array.isArray(el)){
      return JSON.parse(el)
    }else{
      return el
    }
  }


if (this.state.asso.length === 0) {
    return "Loading..."
}
else {
    return (
        <div>
            <table class="table table-striped">
                <thead>
                <tr>
                <th>Nom de l'association</th>
                <th>Logo</th>
                <th>Ville</th>
                <th>Actions</th>
                <th>Contacts</th>
                </tr>
                </thead>
            <tbody>
                {this.state.assoPerPage.map(e => {

                    // const icon_urls = {
                    // }
                    return (
                            <DisplayAssociations
                                name={e.name}
                                logo={e.logo}
                                address={e.address}
                                social_1={e.social_network_url_1}
                                social_2={e.social_network_url_2}
                                social_3={e.social_network_url_3}
                                phone={e.phone_number}
                                web_site={e.web_site}
                                mail={e.mail}
                                icon={e.actions ? shouldParse(e.actions) : null}
                                key={e.id}
                            />
                        )


                })}
            </tbody>
            </table>
            <div className="nobuttons">

                <div className="twins"><button type="button" class="btn btn-dark" onClick={this.handleButtonPrevious}>Précédent</button></div>
                <div className="twins"><p className="number_page">{this.state.currentNumberPage}</p></div>
                <div className="twins"><button type="button" class="btn btn-dark" onClick={this.handleButtonNext}>Suivant</button></div>

            </div>
        </div>

    )
}
}
}
    
 