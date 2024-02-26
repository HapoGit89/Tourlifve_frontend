import {  render , fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TourCard from './TourCard';



// Smoke Test
it('renders without crashing', () => {
render(
    <BrowserRouter>
        <TourCard tour={{title: "test", artist: "test", startdate: "2024-10-12", enddate: "2024-10-13"}}/>
    </BrowserRouter>  
);
});


// Snapshot Test

it('matches Snapshot', () => {
   const {asFragment} = render(
        <BrowserRouter>
            <TourCard tour={{title: "test", artist: "test", startdate: "2024-10-12", enddate: "2024-10-13"}}/>
        </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot()
    });


    