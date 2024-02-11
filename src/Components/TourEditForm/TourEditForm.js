import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useState,useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TourApi } from "../../api";
import {useNavigate} from "react-router-dom"
import "./TourEditForm.css"
import userContext from "../../userContext";


function TourEditForm (){
  // React controlled Form for User Login
  const [formData, setFormData] = useState({})
  const user = useContext(userContext)
  const navigate=useNavigate()
  const {id} = useParams()

 




  useEffect(()=>{
    const getTourData= async()=>{
        const res = await TourApi.getTourDetails(id) 
        res.tour.startdate = res.tour.startdate.slice(0,10)
        res.tour.enddate = res.tour.enddate.slice(0,10)
        setFormData(res.tour)
        localStorage.setItem("tourdetails", res.tour)
        }
        getTourData()

},[])

  const editTour = async()=>{
    let data = formData
    data.user_id= user.id
    // build right schema for PATCH
    data = {artist: data.artist, title: data.title, startdate: data.startdate, enddate: data.enddate, user_id: data.user_id}
    const res = await TourApi.patchTour(id,data)
    if(res.tour){
      alert(`Updated Tour ${res.tour.title}`)
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
    editTour()
     
      
  }
    if(user.token){
    return(
      <div className="TourCreateForm">
        <h1>Edit Tour:</h1>
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
    <Label for="firstName" >
      Start:
    </Label>
    <Input
    className="Start"
      id="start"
      name="startdate"
      placeholder="Startdate"
      type="date"
      value={formData.startdate || ""}
      onChange={handleChange}

    
    />
  </FormGroup>


  <FormGroup>
    <Label for="firstName" >
      End:
    </Label>
    <Input
    className="SEnd"
      id="end"
      name="enddate"
      placeholder="Enddate"
      type="date"
      value={formData.enddate || ""}
      onChange={handleChange}
     
      
    />
  </FormGroup>


  <Button>
    Edit
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

export default TourEditForm