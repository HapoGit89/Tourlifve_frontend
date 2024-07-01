import { Form, FormGroup, Label, FormFeedback, Input, Button } from "reactstrap"
import { useState, useContext } from "react";
import { TourApi } from "../../api";
import { useNavigate } from "react-router-dom"
import "./TourCreateForm.css"
import userContext from "../../userContext";

// React controlled Form for TourCreate
function TourCreateForm() {
  const [formData, setFormData] = useState("")
  const [errors, setErrors] = useState({})
  const user = useContext(userContext)
  const navigate = useNavigate()

  const createTour = async () => {
    const data = formData
    data.user_id = user.id
    const res = await TourApi.postTour(data)
    if (res.tour) {
      alert(`Created New Tour ${res.tour.title} with artist ${res.tour.artist}`)
      navigate("../../tours")
      window.location.reload()
    }
    else if (res.response.data.error.message == "Tour in the past") {
      alert(`Sorry, you can only create future or ongoing tours`)
    }
    else if (res.response.data.error.message.slice(0, 9) == "Duplicate") {
      alert(`Sorry, this tour already exists!`)
    }
    else {
      alert("Oops something went wrong. Try again or contact admin.")
    }
  }

  // sets formData and errors when data is put into form
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

  // check if fields are empty and if so push message to error array
  const validateForm = () => {
    const { artist, title, startdate, enddate } = formData
    const newErrors = {}

    if (!artist || artist == "") newErrors.artist = "Please enter artist name"
    if (!title || title == "") newErrors.title = "Please enter tour title"
    if (!startdate) newErrors.startdate = "Please enter startdate"
    if (!enddate) newErrors.enddate = "Please enter enddate"

    return newErrors
  }

  // validate form and create tour
  const handleSubmit = (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    }
    else {
      createTour()
    }
  }

  if (user.token) {
    return (
      <div className="container">
      <div className="TourCreateForm">
        <h1>Create a new tour:</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="userName">
              Artist:
            </Label>
            <Input
              id="artist"
              className={!!errors.artist && 'red-border'}
              name="artist"
              placeholder="Artist name..."
              type="text"
              value={formData.artist || ""}
              onChange={handleChange}
              invalid={!!errors.artist}
            />
            <FormFeedback >
              {errors.artist}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="title" >
              Title:
            </Label>
            <Input
              className={!!errors.title && 'red-border'}
              id="title"
              name="title"
              placeholder="Tour title..."
              type="text"
              value={formData.title || ""}
              onChange={handleChange}
              invalid={!!errors.title}
            />
            <FormFeedback >
              {errors.title}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">
              Startdate:
            </Label>
            <Input
              className={!!errors.startdate && 'red-border'}
              id="startdate"
              name="startdate"
              placeholder="startdate"
              type="date"
              value={formData.startdate || ""}
              onChange={handleChange}
              invalid={!!errors.startdate}
            />
            <FormFeedback >
              {errors.startdate}
            </FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="exampleEmail">
              Enddate:
            </Label>
            <Input
              className={!!errors.enddate && 'red-border'}
              id="enddate"
              name="enddate"
              placeholder="enddate"
              type="date"
              value={formData.enddate || ""}
              onChange={handleChange}
              invalid={!!errors.enddate}
            />
            <FormFeedback >
              {errors.enddate}
            </FormFeedback>
          </FormGroup>
          {' '}

          <Button>
            Create
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

export default TourCreateForm