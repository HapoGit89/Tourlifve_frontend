import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { useState } from "react";
import { TourApi} from "../../api"
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"

function LoginForm({ logIn }) {
  // React controlled Form for Userlogin
  const [formData, setFormData] = useState("")
  const navigate = useNavigate()

  // Login in db an login in app via login()
  const Login = async () => {
    let res = await TourApi.Login(formData)
    if (res && res.token) {
      alert(`Logged in as ${formData.username}`)
      logIn({ username: formData.username, token: res.token })
      navigate("/")
    }
    else {
      alert(`Sorry, wrong credentials`)
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    Login()
    setFormData("")
  }

  return (
    <div className="LogInForm">
      <h1>Login:</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="userName">
            Username
          </Label>
          <Input
            id="userName"
            name="username"
            placeholder="Username"
            type="text"
            value={formData.username || ""}
            onChange={handleChange}
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <Label for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password || ""}
            onChange={handleChange}
          />
        </FormGroup>
        {' '}
        <Button>
          Submit
        </Button>
      </Form>
    </div>

  )
}

export default LoginForm