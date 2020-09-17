import { 
    FETCH_REPORT
} from './types';
import {backend} from './backend'
export const fetchReport = () => dispatch => {
    console.log("actionnnnn")
    fetch(backend+"api/reports", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
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