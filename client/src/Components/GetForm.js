import React, { useState } from 'react'

const GetForm = props => {
  const [rule, setRule] = useState("1");
  const [json, setJson] = useState('{ "name": "debug" }');
  const [result, setResult] = useState("");
  const [showComponent, setShowComponent] = useState(false);
  
  const handleInput = event => {
    event.preventDefault()
    if (json === "" || rule === "") {
      alert('Rule or json is empty. Please try again')
    }
    try {
      var jsonObj = JSON.parse(json);
    } catch (e) {
      alert('Invalid json: ' + json);
      return;
    }
    getRule(rule, jsonObj)
  } 
  
  function replaceKeys(obj, oldKey, newKey) {
    for (let key in obj) {
      if (key === oldKey) {
        obj[newKey] = obj[key];
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        replaceKeys(obj[key], oldKey, newKey);
      }
    }
  }
  
  async function getRule(rule, jsonObj) {
    const response = await fetch(`http://localhost:5000/rule/get/${rule}`, {  
    method: "GET",
  })
  .catch(error => {
    window.alert(error);
    return;
  });  
  const res = await response.json();
  if (res.success && res.result != null) {
    res.result.data.forEach(element => {
      var oldKey = element[1][0], newKey = element[1][1];
      replaceKeys(jsonObj, oldKey, newKey)
    });
    setResult(JSON.stringify(jsonObj))
    setShowComponent(true);
  }
  else {
    alert("Something went wrong: " + res.error)  
    setShowComponent(false);
  }
}

return (
  <div>
  <form onSubmit={handleInput}>
  <label/>
  Input rule:
  <br/>
  <input
  type="text"
  value={rule}
  onChange={event => setRule(event.target.value)}
  />
  <br/>
  <label/>
  Input json:
  <br/>
  <input
  type="text"
  value={json}
  onChange={event => setJson(event.target.value)}
  />
  <input type="submit" value="Submit" />
  </form>
  {showComponent 
    ? <textarea>
    {result}
    </textarea> 
    : null }
    </div>              
    );
  }
  
  export default GetForm;