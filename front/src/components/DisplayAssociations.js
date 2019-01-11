import React, { Component } from 'react';
import "./DisplayAssociations.css"
import colis from './imgActions/colis.png';
import accompagnement from './imgActions/accompagnement.png';
import culture from './imgActions/culture.png';
import etranger from './imgActions/etranger.png';
import maraude from './imgActions/maraude.png';
import table from './imgActions/table-solidaire.png';
import visite from './imgActions/visite.png';
import soutient from './imgActions/soutient.png';
import migrant from './imgActions/migrant.png';
import fb from './imgActions/fb.png';
import tweet from'./imgActions/tweet.png'
import insta from'./imgActions/insta.png'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';



const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
 
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);





export default class DisplayAssociations extends Component {

  state = {
    open: false,
  };

  // à faire: recuperer toutes les autres icones d'actions et les importer ici
  tab = [
   colis,accompagnement,culture,etranger, maraude ,table ,visite ,soutient,migrant 
  ]


  handleClickOpen = () => {
    this.setState({
      open: true,
    });

  };

  handleClose = () => {
    this.setState({ open: false });
  };



  render() {
    return (
<div className="actioncard">
      <div class="container-fluid assocontain">
          <div class=" top row">
            <div col-xs-12 col-lg-4 class="entete">
              {this.props.logo?<img src={this.props.logo} alt="" class="logoasso" />:<p></p>}
              <h3>{this.props.name}</h3>
            </div>
            <div  col-xs-12 offset-lg-8 class="reseaux">
              {this.props.social_1?<a href={this.props.social_1}><img src={tweet} class="icon " /></a>:null}
              {this.props.social_2?<a href={this.props.social_2}><img src={fb} class="icon " /></a>:null}
              {this.props.social_3?<a href={this.props.social_3}><img src={insta} class="icon " /></a>:null}
            </div>
          </div>

          <div class="bottom row">
            <div class="info offset-sm-12 ">
              <p>adresse: {this.props.address} </p>
              <p>mail: {this.props.mail}</p>
              <p>site: <a href={this.props.web_site}>{this.props.web_site}</a></p>
              <p>tel: {this.props.phone}</p>
            </div>
            <div class="col-sm-12">
               <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                Informations
              </Button>
              <Dialog
                onClose={this.handleClose}
                aria-labelledby="customized-dialog-title"
                open={this.state.open}
              >
                <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                  {this.props.name}
                </DialogTitle>
                <DialogContent>
                  <Typography gutterBottom>
                    {this.props.description ? this.props.description : "Description à venir."}
                      <p>{this.props.address}</p>
                      <p>{this.props.mail}</p>
                      <a href={this.props.web_site}><p>site web</p></a>
                      <p>{this.props.phone}</p>
                      <p>{this.props.icon ? this.props.icon.map((e) =>
                      <img src={this.tab[e - 1]} alt="" class="icon" />) : null} </p>
                  </Typography>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      








    )
  }
}
