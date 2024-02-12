import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useState,useContext } from "react";
import { TourApi } from "../../api";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import {useNavigate} from "react-router-dom"
import "./TourstopCreateForm.css"
import userContext from "../../userContext";


function TourstopCreateForm (){
  // React controlled Form for User Login
  const [formData, setFormData] = useState("")
  const user = useContext(userContext)
  const navigate=useNavigate()


     
      
  
    if(user.token){
    return(
        <APIProvider apiKey={process.env.REACT_APP_API_KEY}>
            <div className="map">
                <Map
                defaultCenter={{lat: 53.54992, lng: 10}}
                defaultZoom={5}
                gestureHandling={'greedy'}
                disableDefaultUI={true}>
                </Map>
            </div>
        </APIProvider>
   

        
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