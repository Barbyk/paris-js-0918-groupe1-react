import React, { Component } from "react";
import axios from "axios";
import Input from '../Input'
import Checkbox from '../Checkbox'
import Departements from '../Departements'
import withAuth from '../withAuth';
import Dropzone from 'react-dropzone'



class AddNewAssoprofil extends Component {
  state = {
    addInputValue: { is_visible: "1",actions:[] },
    actionsOptions: ["Maraudes mobiles","Tables solidaires","Colis alimentaires","Visites aux isolés","Accompagnement administratif",
    "Cultures et loisirs","Soutien scolaire","Actions de l'étranger","Aide aux migrants"], files : []
  };

  handleChange = e => {
    const addInputValue = { ...this.state.addInputValue }
    addInputValue[e.target.name] = e.target.value;
    this.setState({ addInputValue });
  };

  handleActionsCheckBox=(e)=> {
    
    const newSelection = parseInt(e.target.name);
    let newSelectionArray;
    // if pour les cas de déselection de la checkbox, on enleve la valeur du tableau
    if ((this.state.addInputValue.actions||[]).indexOf(newSelection) > -1) {
      newSelectionArray = this.state.addInputValue.actions.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.state.addInputValue.actions||[],  newSelection ];
    }

    this.setState({
      addInputValue:
        { ...this.state.addInputValue, actions: newSelectionArray }
    })

}

  submitNewAssoprofil = e => {
    e.preventDefault();

    axios
      .post("http://localhost:3002/assoprofil", this.state.addInputValue,{headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
        
      .then(this.setState({}))
     .then(window.history.back() );
    alert("Association ajoutée !")
  };

  // onDrop(files) {
    
  // }

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
      formData.append("tags", 'LOGO'); // Add tags for the images - {Array}
      formData.append("upload_preset", "wj40wyla"); // Replace the preset name with your own
      formData.append("api_key", "823679753155951"); // Replace API key with your own Cloudinary API key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Replace cloudinary upload URL with yours
      return axios.post(
        "https://api.cloudinary.com/v1_1/dna4dgicb/image/upload",
        formData, 
        { headers: { "X-Requested-With": "XMLHttpRequest" }})
        .then(response => this.setState({ addInputValue : { ...this.state.addInputValue, logo : response.data.url }}))
        
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

    return (
      <div>
        <form onSubmit={this.submitNewAssoprofil}>

          <fieldset><legend>Ajouter une association</legend></fieldset>
          <Input name="name" label="Nom*" value={this.state.addInputValue.name} handleChange={this.handleChange} isRequired={"required"} />
          <div className="form-group">
            <label class="control-label">Description*</label>
            <textarea
              rows={5} cols={1}
              className="form-control"
              type="text"
              name="description"
              value={this.state.addInputValue.description}
              onChange={this.handleChange}
              required
            />
          </div>
          <Input name="address" label="Adresse" value={this.state.addInputValue.address} handleChange={this.handleChange} isRequired={false} />
          <Input name="social_network_url_1" label="Social 1" value={this.state.addInputValue.social_network_url_1} handleChange={this.handleChange} isRequired={false} />
          <Input name="social_network_url_2" label="Social 2" value={this.state.addInputValue.social_network_url_2} handleChange={this.handleChange} isRequired={false} />
          <Input name="social_network_url_3" label="Social 3" value={this.state.addInputValue.social_network_url_3} handleChange={this.handleChange} isRequired={false} />
          <Input name="phone_number" label="Téléphone" value={this.state.addInputValue.phone_number} handleChange={this.handleChange} isRequired={false} />
          {/* <Input name="logo" label="Logo" value={this.state.addInputValue.logo} handleChange={this.handleChange} isRequired={false} /> */}
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
                {isDragAccept ? 'Drop' : 'Drag'} logo here...
              </div>
              {isDragReject && <div>Unsupported file type...</div>}
            </div>
          )}}
         
          </Dropzone>
          <aside style={thumbsContainer}> {thumbs} </aside>
          </section>
          <Input name="web_site" label="Site Internet" value={this.state.addInputValue.web_site} handleChange={this.handleChange} isRequired={false} />
          <Input name="mail" label="Adresse mail" value={this.state.addInputValue.mail} handleChange={this.handleChange} isRequired={false} />
          <Departements value={this.state.addInputValue.departements_id} handleChange={this.handleChange}/>

          <Checkbox name="actions" title="Actions" options={this.state.actionsOptions} selectedOptions={this.state.addInputValue.actions} handleChange={this.handleActionsCheckBox} isRequired={false} />
          <div><button type="submit">Submit</button></div>
        </form>
      </div>
    );
  }
}

export default withAuth(AddNewAssoprofil);
