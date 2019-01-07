import React, { Component } from 'react';
import "./DisplayAssociations.css"
import colis from "../assets/colis.png"
import mauraudes from "../assets/mauraudes.png"
import tables from "../assets/tables.png"
import soutien from "../assets/soutien.png"
import visite from "../assets/visites.png"
import administratif from "../assets/administratif.png"
import culture from "../assets/culture.png"
import etranger from "../assets/etranger.png"
import migrants from "../assets/migrants.png"
import impots from "../assets/impots.png"
import recolte from "../assets/recolte.png"
import sante from "../assets/sante.png"
import vestimentaires from "../assets/vestimentaires.png"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
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

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);



export default class DisplayAssociations extends Component {

  state = {
    open: false,
  };

  // à faire: recuperer toutes les autres icones d'actions et les importer ici
  tab = [
    migrants, mauraudes, tables, colis, visite, administratif, culture, soutien, etranger
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

      <tr>

        <td><div className="name">
          <Button variant="outlined" onClick={this.handleClickOpen}>
            <p className="information">{this.props.name}</p>
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
            </Typography>
          </DialogContent>
        </Dialog>
        </div></td>
        <td><div className="logo"><img src={this.props.logo} alt="" /></div></td>
        <td><div className="city"><p>{this.props.address}</p></div></td>
        <td><div className="icon"><p>{this.props.icon ? this.props.icon.map((e) =>
          <img src={this.tab[e - 1]} alt="" />) : null} </p>
        </div></td>
        <td><div className="coordonnees">
          <div><p>{this.props.social_1}</p></div>
          <div><p>{this.props.social_2}</p></div>
          <div><p>{this.props.social_3}</p></div>
          <div><p>{this.props.mail}</p></div>
          <div><p>{this.props.web_site}</p></div>
          <div><p>{this.props.phone}</p></div>
        </div></td>

      </tr>




    )
  }
}
