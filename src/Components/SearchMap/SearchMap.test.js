import {  render , fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchMap from './SearchMap';



// Smoke Test
it('renders without crashing', () => {
render(
    <BrowserRouter>
        <SearchMap/>
    </BrowserRouter>  
);
});


// Snapshot Test

it('matches Snapshot', () => {
   const {asFragment} = render(
        <BrowserRouter>
            <SearchMap/>
        </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot()
    });




    