import React, { useState } from 'react'
import Rule from './Rule';

const BrowsePage = props => {
    const [limit, setLimit] = useState(0);
    const [rules, setRules] = useState([]);
    
    async function getRules(event) {
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/rules/get/${limit}`, {  
        method: "GET",
    })
    .catch(error => {
        window.alert(error);
        return;
    });  
    response.json().then(data => { 
        const jsonObj = JSON.parse(data.result);
        const array = []
        jsonObj.forEach(element => {
            array.push(<Rule key={element._id} id={element._id} data={JSON.stringify(element.data)} onDelete={() => deleteRule(element._id.toString())}/>)
        });
        setRules(array)
    }).catch(e => { 
        alert("Something went wrong: " + e)
    });
}

const deleteRule = (key) => {
    setRules(prevRules => {
        const newRules = [...prevRules];
        for (let i = 0; i < newRules.length; ++i) {
            if (newRules[i].key === key) { 
                newRules.splice(i, 1)
                break
            }
        }
        return newRules;
    });
};

return (
    <div>
    <form onSubmit={getRules}>
    <label/>
    Input limit on number of entries:
    <br/>
    <input
    type="text"
    value={limit}
    onChange={event => setLimit(event.target.value)}
    />
    <input type="submit" value="Submit" />
    </form>
    {rules}
    </div>
    );
}   

export default BrowsePage;