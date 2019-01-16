import React, { Component } from "react";
import axios from "axios";
import "./ModifyAssoprofil.css"
import Input from '../Input'
import Checkbox from '../Checkbox'
import Departements from '../Departements'
import withAuth from '../withAuth';
import Dropzone from 'react-dropzone'


class ModifyNewAssoprofil extends Component {
    state = {
        modifyInputValue: { is_visible: "1",actions:[], name:'', description:'', address:'', logo:'', social_network_url_1:'',
        social_network_url_2:'', social_network_url_3:'', phone_number:'', web_site:'',
        mail:'', departements_id:''  },
        actionsOptions: ["Maraudes mobiles","Tables solidaires","Colis alimentaires","Visites aux isolés","Accompagnement administratif",
    "Cultures et loisirs","Soutien scolaire","Actions de l'étranger","Aide aux migrants"], files : []
    };

    componentDidMount() {
        this.getAssoprofil();
    }
    handleChange = (e) => {
        this.setState({ modifyInputValue:{...this.state.modifyInputValue,
            [e.target.name] : e.target.value,} });
    };
    handleActionsCheckBox=(e)=> {
    
        const newSelection = parseInt(e.target.name);
        let newSelectionArray;

        // if pour les cas de déselection de la checkbox, on enleve la valeur du tableau
        if ((this.state.modifyInputValue.actions||[]).indexOf(newSelection) > -1) {
          newSelectionArray = this.state.modifyInputValue.actions.filter(s => s !== newSelection)
        } else {
          newSelectionArray = [...this.state.modifyInputValue.actions||[],  newSelection ];
        }
    
        this.setState({
          modifyInputValue:
            { ...this.state.modifyInputValue, actions: newSelectionArray }
        })
    
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
      formData.append("api_key", process.env.CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary API key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Replace cloudinary upload URL with yours
      return axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_API_SECRET}/image/upload`,
        formData, 
        { headers: { "X-Requested-With": "XMLHttpRequest" }})
        .then(response => this.setState({ modifyInputValue : { ...this.state.modifyInputValue, logo : response.data.url }}))
        
    });

    // We would use axios `.all()` method to perform concurrent image upload to cloudinary.
    axios.all(uploads).then(() => {
      // ... do anything after successful upload. You can setState() or save the data
      console.log('Images have all being uploaded')
    });
  }
    
    getAssoprofil = e => {
        this.setState({ isLoading: true })
        axios
            .get("/assoprofil/" + this.props.match.params.id,{headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
            .then(response => {
                this.setState({ modifyInputValue: response.data[0], isLoading: false })})
            
        // .then(window.location.reload());

    };


    submitModifyAssoprofil = e => {
        e.preventDefault();

        axios
            .put("/assoprofil/" + this.props.match.params.id, this.state.modifyInputValue,{headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
            .then(window.history.back() );
        alert("Les modifications sont enregistrées")

    };
    
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

                <fieldset><legend>Modifier l'association {this.state.modifyInputValue.name}</legend></fieldset>
                <Input name="name" label="Nom*" value={this.state.modifyInputValue.name} handleChange={this.handleChange} isRequired={"required"}/>
                <div className="form-group">
                    <label class="control-label">Description*</label>
                    <textarea
                    rows={"5"} cols={"1"}
                        className="form-control"
                        type="text"
                        name="description"
                        value={this.state.modifyInputValue.description}
                        onChange={this.handleChange}
                        
                    />
                </div>
                <Input name="address" label="Adresse" value={this.state.modifyInputValue.address} handleChange={this.handleChange} isRequired={false}/>
                <Input name="social_network_url_1" label="Social 1" value={this.state.modifyInputValue.social_network_url_1} handleChange={this.handleChange} isRequired={false}/>
                <Input name="social_network_url_2" label="Social 2" value={this.state.modifyInputValue.social_network_url_2} handleChange={this.handleChange} isRequired={false}/>
                <Input name="social_network_url_3" label="Social 3" value={this.state.modifyInputValue.social_network_url_3} handleChange={this.handleChange} isRequired={false}/>
                <Input name="phone_number" label="Téléphone" value={this.state.modifyInputValue.phone_number} handleChange={this.handleChange} isRequired={false}/>
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
                <Input name="logo" label="Logo" value={this.state.modifyInputValue.logo} handleChange={this.handleChange} isRequired={false}/>
                <Input name="web_site" label="Site Internet" value={this.state.modifyInputValue.web_site} handleChange={this.handleChange} isRequired={false}/>
                <Input name="mail" label="Adresse mail" value={this.state.modifyInputValue.mail} handleChange={this.handleChange} isRequired={false}/>
               <Departements value={this.state.modifyInputValue.departements_id} handleChange={this.handleChange}/>
               <Checkbox name="actions" title="Actions" options={this.state.actionsOptions} selectedOptions={this.state.modifyInputValue.actions} handleChange={this.handleActionsCheckBox} isRequired={false} />


                    <div><button type="submit">Soumettre</button></div>
                </form>

            </div>
        );
    }
}

export default withAuth(ModifyNewAssoprofil);
