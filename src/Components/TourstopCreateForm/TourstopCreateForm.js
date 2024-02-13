import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useState,useContext } from "react";
import { TourApi } from "../../api";
import SearchMap from "../SearchMap/SearchMap";
import { Combobox,  ComboboxInput, ComboboxOption} from "@reach/combobox";
import usePlacesAutocomplete from "use-places-autocomplete";
import {useNavigate} from "react-router-dom"
import "./TourstopCreateForm.css"
import userContext from "../../userContext";


function TourstopCreateForm (){
  // React controlled Form for User Login
  const [formData, setFormData] = useState("")
  const user = useContext(userContext)
  const navigate=useNavigate()

 const position = {lat: 52, lng: 10}

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }


  const handleSubmit = (e)=>{
    e.preventDefault()


  }
     
      
  
    if(user.token){
    return(<div>
       
      <SearchMap></SearchMap>
       
       </div>
        
      
   

        
    )}

    else {
      return(
        <div>
          <h1>Sorry this only available for logged in users</h1>
        </div>
      )
    }
}


export default TourstopCreateForm