import { 
    FETCH_REPORT
} from './types';
export const fetchReport = () => dispatch => {
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        
    })
    .then((res) => res.json())
    .then((reports) => 
    {
        dispatch({
            type: FETCH_REPORT,
            payload: reports
        })
    }       
    )
}