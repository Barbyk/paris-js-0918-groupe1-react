import React, { Component } from 'react';
//import des modules
import axios from "axios";
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';




const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});
class AddArticle extends Component {

    state = {
        img_url: "",
        text: "",
        title: "",
        date: "",
        is_active: 1,
        user_id: 1,
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    postArticle = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3002/news', this.state)
            .then(window.history.back() );
        alert("L'article a bien été enregistré")
    };
        

    render() {
        const { classes } = this.props;
        const { text, img_url, title, date } = this.state;
        return (
            <div className='post' >
                <Grid container justify='center'>
                    <Grid item xs={12} className='line'>
                        <h2>Ajouter un nouvel article</h2>
                    </Grid>
                    <form className={classes.container} noValidate autoComplete="off" onSubmit={this.postArticle}>
                        <Grid item xs={12} className='line'>
                            <TextField type="text" name="img_url" onChange={this.handleChange} placeholder=" url de l'image" value={img_url} required />
                        </Grid>
                        <Grid item xs={12} className='line'>
                            <TextField type="text" name="title" onChange={this.handleChange} placeholder="titre de l'article" value={title} required />
                        </Grid>
                        <TextField  type="date" value={date} required  name="date" onChange={this.handleChange}/>
                        <Grid item xs={12} className='line'>
                            <TextField type="text" name="text" multiline rows="10" fullWidth onChange={this.handleChange} placeholder='Ecrivez votre article' value={text} required />
                        </Grid>
                        <Grid item xs={12} className='line'>
                            <Button variant="contained" color="primary" className={classes.button} type="submit">Envoyer</Button>
                        </Grid>
                    </form>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(AddArticle);