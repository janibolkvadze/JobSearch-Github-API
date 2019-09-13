import React, { Component } from 'react';


export default class UserInput extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        fields: {},
        errors: {}
      }
    }
  
    handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;
  
      //Description
      if(!fields["description"]){
        formIsValid = false;
        errors["description"] = "Cannot be empty";
      }
  
      if(typeof fields["description"] !== "undefined"){
        if(!fields["description"].match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["description"] = "Only letters";
        }      	
      }
  
  
  
      this.setState({errors: errors});
      return formIsValid;
    }
  
    searchSubmit(e){
      e.preventDefault();
      if(this.handleValidation()){
        alert("Form submitted");
      }else{
        alert("Form has errors.")
      }
  
    }
  
    handleChange(field, e){    		
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }
  
    render(){
      return (
        <div>        	
          <form name="contactform" className="contactform">

<input ref="description" type="text" size="30" placeholder="Description" onChange={this.handleChange.bind(this, "description")} value={this.state.fields["description"]}/>
<span className="error">{this.state.errors["description"]}</span>
<br />


<input refs="location" type="text" size="30" placeholder="Location" onChange={this.handleChange.bind(this, "location")} value={this.state.fields["location"]}/>
<span className="error">{this.state.errors["location"]}</span>



<button className="btn btn-lg pro" id="submit" value="Submit"  onClick= {() => this.searchSubmit.bind(this)}>Send Message</button>
          </form>
        </div>
    )
  }
}

    