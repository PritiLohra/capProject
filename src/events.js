import { useState, useEffect } from "react";

const MyEvents=()=>{
    const[eventTypes,setEventTypes]=useState(['Sports','Music','dance']);
    const[eventType,setEventType]=useState('Sports');
    const[eventName,setEventName]=useState('Cricket Match');
    const[eventDesc,setEventDesc]=useState('Test');
    const handleEventTypeChange=()=>{
        setEventType('Conference');
    }
    useEffect(()=>{
        console.log('Triggered useEffect')
    },[eventType, eventName]); //componentDidMount equivalent
    return(
        <div className="container">
            <h1>My Events</h1>
            <hr/>
            <div className="row">
            <div className="col-md-5">
                <form>
                    
                </form>
            </div>
            <div className="col-md-7"></div>
            </div>
            <h3>{eventType}</h3>
            <h3>{eventName}</h3>
            <h3>{eventDesc}</h3>
            <button onClick={handleEventTypeChange}>Change Event Type</button>
        </div>
    );
}
 export default MyEvents;