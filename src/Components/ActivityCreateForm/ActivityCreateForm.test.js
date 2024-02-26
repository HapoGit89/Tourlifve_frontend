import { render } from '@testing-library/react';
import ActivityCreateForm from './ActivityCreateForm';
import userContext from '../../userContext';
import { BrowserRouter } from 'react-router-dom';



// Smoke Test

it('renders without crashing', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs"}
    render(<BrowserRouter>
            <userContext.Provider value={user}>
          <ActivityCreateForm></ActivityCreateForm>
            </userContext.Provider>
           </BrowserRouter>
      )
});


// Snapshot Test

it('matches Snapshot', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs"}
    const {asFragement} = render(<BrowserRouter>
            <userContext.Provider value={user}>
            <ActivityCreateForm></ActivityCreateForm>
            </userContext.Provider>
           </BrowserRouter>
      )
      expect(asFragement).toMatchSnapshot()
});