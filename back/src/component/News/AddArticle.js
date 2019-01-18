import React, { Component } from 'react';
import axios from "axios";
import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import withAuth from '../withAuth';
import Dropzone from 'react-dropzone';



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
    }
    
});

class AddArticle extends Component {

    state = {
        news : {  
        img_url: "",
        text: "",
        title: "",
        date: "",
        is_active: 1,
        user_id: 1,
      },

        files : []
    }

    handleChange = (e) => {
        const news = { ...this.state.news }
        news[e.target.name] = e.target.value;
        this.setState({ news });
        
    }

    postArticle = async (e) => {
        e.preventDefault();
        await axios
            .post('/news',this.state.news,{headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")} })
            .then(window.history.back() );
        alert("L'article a bien été enregistré")
        
    };
        
    componentWillUnmount() {
        // Make sure to revoke the data uris to avoid memory leaks
        this.state.files.forEach(file => URL.revokeObjectURL(file.preview))
      }
    
      handleUploadImages = images => {
        
        this.setState({
          files: images.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))
        });
        // uploads is an array that would hold all the post methods for each image to be uploaded, then we'd use axios.all()
        const uploads = images.map(image => {
          // our formdata
          const formData = new FormData();
          formData.append("file", image);
          formData.append("secure", true)
          formData.append("tags", 'image article'); // Add tags for the images - {Array}
          formData.append("upload_preset", "wj40wyla"); // Replace the preset name with your own
          formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary API key
          formData.append("timestamp", (Date.now() / 1000) | 0);
    
          // Replace cloudinary upload URL with yours
          return axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_API_SECRET}/image/upload`,
            formData, 
            { headers: { "X-Requested-With": "XMLHttpRequest" }})
            .then(response => this.setState({ news :{ ...this.state.news,img_url : response.data.secure_url} }))
            
        });
    
        // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
        axios.all(uploads).then(() => {
          // ... do anything after successful upload. You can setState() or save the data
          console.log('Images have all being uploaded')
        });
      }
    render() {

    const baseStyle = {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#666',
        borderStyle: 'dashed',
        borderRadius: 5
      };
      const activeStyle = {
        borderStyle: 'solid',
        borderColor: '#6c6',
        backgroundColor: '#eee'
      };
      const rejectStyle = {
        borderStyle: 'solid',
        borderColor: '#c66',
        backgroundColor: '#eee'
      };
      const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
      };
      
      const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
      };
      
      const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
      }
    
      const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
      };
  
  
      const {files} = this.state;
  
      const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img src={file.preview} style={img}  alt="" />
          </div>
        </div>
      ));
  
        const { classes } = this.props;
        const { text, title, date } = this.state.news;
        return (
            <div className='post' >
                <Grid container justify='center'>
                    <Grid item xs={12} className='line'>
                        <h2>Ajouter un nouvel article</h2>
                    </Grid>
                    <form className={classes.container} noValidate autoComplete="off" onSubmit={this.postArticle}>
                        <Grid item xs={12} className='line'>
                        <section>
                            <Dropzone onDrop={this.handleUploadImages} multiple accept="image/*" >
                            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
                            let styles = {...baseStyle}
                                styles = isDragActive ? {...styles, ...activeStyle} : styles
                                styles = isDragReject ? {...styles, ...rejectStyle} : styles
                            
                            return (
                                <div {...getRootProps()} style={styles} >
                                <input {...getInputProps()} />
                                <div>
                                    {isDragAccept ? 'Drop' : 'Drag'} image article here...
                                </div>
                                {isDragReject && <div>Unsupported file type...</div>}
                                </div>
                            )}}
                            
                            </Dropzone>
                            <aside style={thumbsContainer}> {thumbs} </aside>
                        </section>                        
                        </Grid>
                        <Grid item xs={12} className='line'>
                            <TextField type="text" name="title" onChange={this.handleChange} placeholder="titre de l'article" value={title} required />
                        </Grid>

                        <TextField  type="date" value={date} required  name="date" onChange={this.handleChange}/>
                        
                        <Grid item xs={12} className='line'>
                            <TextField id="date" type="text" name="text" multiline rows="10" fullWidth onChange={this.handleChange} placeholder='Ecrivez votre article' value={text} required />
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
export default withAuth(withStyles(styles)(AddArticle));
