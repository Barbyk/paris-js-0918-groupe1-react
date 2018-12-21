import React, { Component } from "react";
import axios from "axios";
import "../assoprofil/ModifyAssoprofil.css"
import Input from '../Input'
import withAuth from '../withAuth';
import Dropzone from 'react-dropzone'
import TextField from '@material-ui/core/TextField';

class ModifArticle extends Component {
    state = {
        modifyInputValue: { is_active: "1" }, files : []
    };

    componentDidMount() {
        this.getAssoprofil();
    }
    handleChange = (e) => {
        this.setState({ modifyInputValue:{...this.state.modifyInputValue,
            [e.target.name] : e.target.value,} });
    };

    getAssoprofil = e => {
        this.setState({ isLoading: true })
        axios
            .get("http://localhost:3002/news/" + this.props.match.params.id)
            .then(response => this.setState({ modifyInputValue: response.data[0], isLoading: false }))
            
        // .then(window.location.reload());

    };


    submitModifyAssoprofil = e => {
        e.preventDefault();

        axios
            .put("http://localhost:3002/news/" + this.props.match.params.id, this.state.modifyInputValue)
            .then(window.history.back() );
        alert("Les modifications sont enregistrées")
        console.log(this.state.modifyInputValue);
        

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
          formData.append("tags", 'image article'); // Add tags for the images - {Array}
          formData.append("upload_preset", "wj40wyla"); // Replace the preset name with your own
          formData.append("api_key", "823679753155951"); // Replace API key with your own Cloudinary API key
          formData.append("timestamp", (Date.now() / 1000) | 0);
    
          // Replace cloudinary upload URL with yours
          return axios.post(
            "https://api.cloudinary.com/v1_1/dna4dgicb/image/upload",
            formData, 
            { headers: { "X-Requested-With": "XMLHttpRequest" }})
            .then(response => this.setState({ modifyInputValue : { ...this.state.modifyInputValue, img_url : response.data.url }}))
            
        });
    
        // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
        axios.all(uploads).then(() => {
          // ... do anything after successful upload. You can setState() or save the data
          console.log('Images have all being uploaded')
          console.log(this.state.modifyInputValue);
          
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
        

        return (
            <div>
                <form onSubmit={this.submitModifyAssoprofil}>

                <fieldset><legend>Modifier l'article {this.state.modifyInputValue.title}</legend></fieldset>
                <Input name="title" label="Titre" value={this.state.modifyInputValue.title} handleChange={this.handleChange} isRequired={"required"}/>
                <div className="form-group">
                    <label className="control-label">Text</label>
                    <textarea
                    rows={"3"} cols={"1"}
                        className="form-control"
                        type="text"
                        name="text"
                        value={this.state.modifyInputValue.text}
                        onChange={this.handleChange}
                        required
                    />
                </div>
               <div className="marg">
               <label className="control-label">Date</label><p></p>
                <TextField  type="date" value={this.state.modifyInputValue.date} name="date" onChange={this.handleChange}/>
                </div>
                <section>
                <label className="control-label">Image pour l'article</label><p></p>
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
                
                    

                    <div><button type="submit">Soumettre</button></div>
                </form>

            </div>
        );
    }
}

export default withAuth(ModifArticle);
