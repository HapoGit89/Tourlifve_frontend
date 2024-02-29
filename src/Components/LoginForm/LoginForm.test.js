import {  render , fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';



// Smoke Test
it('renders without crashing', () => {
render(
    <BrowserRouter>
        <LoginForm/>
    </BrowserRouter>  
);
});


// Snapshot Test

it('matches Snapshot', () => {
   const {asFragment} = render(
        <BrowserRouter>
            <LoginForm/>
        </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot()
    });


// Testing if LoginForm works

it('logs in user', async()=>{
    const alertMock = jest.spyOn(window,'alert').mockImplementation(); 
    const { getByLabelText, getByText} = render(
        <BrowserRouter>
            <LoginForm/>
        </BrowserRouter>
    );

    const username = getByLabelText("Username")
    const password = getByLabelText("Password")
    const subbutton = getByText("Submit")
    fireEvent.change(username, {target: {value: "Testuser"}})  
    fireEvent.change(password, {target: {value: "test"}})
     // these credentials are not registered, we just want to test the form, not the login func
    fireEvent.click(subbutton)
    await waitFor(()=>expect(alertMock).toHaveBeenCalled()) // checks if alert was called as result of form submit
  
})

    