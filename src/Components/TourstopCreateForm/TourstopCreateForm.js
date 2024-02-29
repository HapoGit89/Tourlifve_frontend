
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, FormFeedback, Label, Input, Button } from "reactstrap"
import SearchMap from "../SearchMap/SearchMap";
import { TourApi } from "../../api";
import "./TourstopCreateForm.css"
import userContext from "../../userContext";


// React controlled Form for Tourstop creation
function TourstopCreateForm(data) {
  const user = useContext(userContext)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const { tour_id } = useParams()
  const navigate = useNavigate()


  const createTourstop = async (data) => {
    let location = {}
    // post location or get existing location from db
    const res = await TourApi.postLocation({
      name: data.name,
      housenumber: data.housenumber,
      city: data.city,
      street: data.street,
      postal_code: data.postal_code,
      googleplaces_id: data.googleplaces_id,
      country: data.country,
      lat: data.lat,
      lng: data.lng
    })

    if (res.location) {
      location = res.location
    }

    else if (res.response.data.error.message.slice(0, 18) === "Duplicate location") {
      const res2 = await TourApi.getAllLocations()
      location = res2.locations.filter((el) => el.googleplaces_id == data.googleplaces_id)[0]
    }

    // post tourstop or handle error
    const res3 = await TourApi.postTourstop({ date: data.date, location_id: location.id, tour_id: Number(tour_id) })

    if (res3.tourstop) {
      alert(`Created Tourstop at ${data.name} on ${data.date}`)
      navigate("./../..")
    }
    else if (res3.response.data.error.message.slice(0, 18) === "Duplicate tourstop") {
      alert("Sorry that tourstop already exists!")
    }

    else if (res3.response.data.error.message == "Please select new date withing tour timeframe") {
      alert(res3.response.data.error.message)
    }
    else {
      alert("oops something went wrong")
    }
  }

  //handle Form submit and errors/empty fields
  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    }
    else {
      createTourstop(formData)
    }
  }

  // handle form input/change
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
    if (!!errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }
  // check for empty fields on submit and if so add message to error array
  const validateForm = () => {
    const { name, country, city, street, date } = formData
    const newErrors = {}

    if (!name || name == "") newErrors.name = "Please chose a location by using the searchfield above the map"
    if (!country || country == "") newErrors.country = "Please chose a location by using the searchfield above the map"
    if (!date) newErrors.date = "Please enter date for tourstop"
    if (!city || city == "") newErrors.city = "Please chose a location by using the searchfield above the map"

    return newErrors
  }


const handleMapOut = (data) => {
    setFormData(fData => ({
      ...data,
      date: fData.date
    }));
  }



  if (user.token) {
    return (<div className="TourstopCreateForm">

      <SearchMap handleMapOut={handleMapOut}></SearchMap>

      <div className="resultForm">
        <Form onSubmit={handleSubmit}>
          <h1>  Your Selected Location:</h1>
          <FormGroup>
            <Label for="userName">
              Location Name:
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Location name..."
              type="text"
              value={formData.name || ""}
              invalid={!!errors.name}
            />
            <FormFeedback >
              {errors.name}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="firstName" >
              Country:
            </Label>
            <Input
              className="Country"
              id="country"
              name="country"
              placeholder="Country.."
              type="text"
              value={formData.country || ""}
              invalid={!!errors.country}
            />
            <FormFeedback >
              {errors.country}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">
              City:
            </Label>
            <Input
              id="city"
              name="city"
              placeholder="city"
              type="text"
              value={formData.city || ""}
              invalid={!!errors.city}
            />
            <FormFeedback >
              {errors.city}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">
              Street
            </Label>
            <Input
              id="street"
              name="street"
              placeholder="street"
              type="text"
              value={formData.street || ""}
              invalid={!!errors.street}
            />
            <FormFeedback >
              {errors.street}
            </FormFeedback>
          </FormGroup>
          {' '}
          <FormGroup>
            <Label for="exampleEmail">
              Housenumber
            </Label>
            <Input
              id="housenumber"
              name="housenumber"
              placeholder="number"
              type="text"
              value={formData.housenumber || ""}
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label for="exampleEmail">
              Date
            </Label>
            <Input
              id="date"
              name="date"
              placeholder="date"
              type="date"
              value={formData.date || ""}
              onChange={handleChange}
              invalid={!!errors.date}
            />
            <FormFeedback >
              {errors.date}
            </FormFeedback>
          </FormGroup>
          {' '}
          <Button>
            Create Tourstop
          </Button>
        </Form>
      </div>
    </div>
    )
  }

  else {
    return (
      <div>
        <h1>Sorry this only available for logged in users</h1>
      </div>
    )
  }
}


export default TourstopCreateForm