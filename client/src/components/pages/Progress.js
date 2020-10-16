import React, { useState } from 'react';
import '../styles/Progress.css';
import NoData from '../common/NoData';
import ProgressData from '../common/ProgressData';
import Disclaimer from '../common/Disclaimer';
import Loading from '../common/Loading';

const Progress = () => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState({});

    const changeHandler = (event) => {
        setUsername(event.target.value);
    };

    const findExactCount = () => {
        let items = apiData.items;
        let valid_count = 0;
        console.log(items.length);
        for(let i=0;i<items.length;i++){
            let labels = items[i].labels;
            
        }
    }

    const clickAPIHandler = () => {
        setIsLoading(true);
        setApiData({});

        fetch(`/api/v1/search?username=${username}`)
        .then(res => res.json())
        .then(res => {
            setApiData(res);
            setUsername('');
            // findExactCount();
            setIsLoading(false);
        })
        .catch(err => {
            setUsername('');
            setIsLoading(false);
            console.log(err);
        });
    }
    
    const handleUserData = () => {
        if(apiData.status===200){
            return (<ProgressData apiData={apiData}/>);
        }else{
            return (<NoData apiData={apiData}/>);
        }
    }

    return (
        <React.Fragment>
            {isLoading && <Loading />}
            <div className="sectionPage" id="checkProgress">
                <h1>Check your Progress for HacktoberFEST 20</h1>
                <div className="progressInputDiv">
                    <input type="text" value={username} onChange={changeHandler} placeholder="Github Username"/>
                    <button onClick={clickAPIHandler}>Check</button>
                </div>
                {handleUserData()}
                <Disclaimer topValue={apiData.status===200 ? '10vh' : '46vh' }/>
            </div>
        </React.Fragment>
    );
};

export default Progress;
