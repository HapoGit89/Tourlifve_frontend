import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useState,useContext } from "react";
import { TourApi } from "../../api";
import {useNavigate} from "react-router-dom"
import "./TourCreateForm.css"
import userContext from "../../userContext";


function TourCreateForm (){
  // React controlled Form for User Login
  const [formData, setFormData] = useState("")
  const user = useContext(userContext)
  const navigate=useNavigate()

  const createTour = async()=>{
    const data = formData
    data.user_id= user.id
    const res = await TourApi.postTour(data)
    if(res.tour){
      alert(`Created New Tour ${res.tour.title} with artist ${res.tour.artist}`)
      navigate("../../tours")
      window.location.reload()
    }
    else{
      console.log(res)
      alert(`${res}`)
    }
  }


  const handleChange = e => {
      const { name, value } = e.target;
      setFormData(fData => ({
        ...fData,
        [name]: value
      }));
    }

  

  const handleSubmit = (e)=>{
    e.preventDefault()
    createTour()
     
      
  }
    if(user.token){
    return(
      <div className="TourCreateForm">
        <h1>Create a new tour:</h1>
        <Form  onSubmit={handleSubmit}>
           <FormGroup>
    <Label for="userName">
      Artist:
    </Label>
    <Input
      id="artist"
      name="artist"
      placeholder="Artist name..."
      type="text"
      value={formData.artist || ""}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="firstName" >
      Title:
    </Label>
    <Input
    className="Title"
      id="title"
      name="title"
      placeholder="Tour title..."
      type="text"
      value={formData.title || ""}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="lastName">
      Startdate:
    </Label>
    <Input
      id="startdate"
      name="startdate"
      placeholder="startdate"
      type="date"
      value={formData.startdate || ""}
      onChange={handleChange}
    />
  </FormGroup>
  <FormGroup>
    <Label for="exampleEmail">
      Enddate:
    </Label>
    <Input
      id="enddate"
      name="enddate"
      placeholder="enddate"
      type="date"
      value={formData.enddate || ""}
      onChange={handleChange}
    />
  </FormGroup>
  {' '}

  <Button>
    Create
  </Button>
</Form>
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

export default TourCreateForm