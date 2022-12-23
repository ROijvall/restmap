import Tmp from './Temp';
import React, { useState } from 'react'
let id = 0;

class top {
  constructor(key, values) {
    console.log(key)
    console.log(values)
    this.key = key;
    this.k_copy = key;
    this.v_copy = values; 
    var result = [];
    this.simpleValue = false;
    if (typeof(values) !== 'string' && !Array.isArray(values)) {
      var keys = Object.keys(values)
      keys.forEach(element => {
        result.push(new top(element, values[element]));
      });
      this.values = result;
    } else {
      this.values = null;
      this.simpleValue = true;
    }
    console.log(this);
  }
}

const AddForm = props => {
  const [json, setJson] = useState('{ "name": "debug" }');
  const [output, setOutput] = useState(null);
  //const [remppaing, setRemapped] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  
  async function addRule(data) {
    const response = await fetch("http://localhost:5000/rule/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .catch(error => {
    window.alert(error);
    return;
  }); 
  response.json().then(data => {
    if (data.success) {
      alert("Added rule: " + data.result)
    } 
    else {
      alert("Failed to add rule: " + data.error)
    }
  }).catch(e => {
    alert("Something went wrong: " + e)
  });
}

const unTmp = (input, changedEntries) => {
  input.forEach(element => {
    var resArray = element.props.biRef.updateKeys();
    if (!element.props.simple) {
      unTmp(element.props.v, changedEntries);
    }  
    if (resArray[1]) {
      changedEntries.push([resArray[0], resArray[1]]);
    }
  });
  return changedEntries;
}

const handleSave = (event) => {
  var changedEntries = []
  //console.log(output)
  unTmp(output, changedEntries);
  //console.log(changedEntries)
  //setRemapped(changedEntries);
  console.log(changedEntries)
  addRule(changedEntries);
  event.preventDefault();
}

const handleInput = event => {
  try {
    var jsonObj = JSON.parse(json);
  } catch (e) {
    alert('Invalid json: ' + json);
    setShowComponent(false);
    return;
  }
  console.log(jsonObj)
  var asArray = Object.entries(jsonObj);
  var result = []
  console.log(asArray)
  asArray.forEach(entry => {;
    result.push(toTmp(new top(entry[0], entry[1]), []));
  })
  
  setOutput(result);
  setShowComponent(true);
  event.preventDefault();
};

const toTmp = (top, stack) => {
  var biRef = {
    parentfunction: null
  };
  var result = [];
  if (top) {
    console.log(top)
    if (!top.simpleValue && top.values) {
      top.values.forEach(element => {
        const stackCopy = [...stack];
        stackCopy.push(top.key)
        result.push(toTmp(element, stackCopy));
      });
      return <Tmp key={id++} k={top.key} v={result} stack={stack} simple={false} biRef={biRef} />;
    } else {
      return <Tmp key={id++} k={top.key} stack={stack} simple={true} biRef={biRef} />;
    }
  }
};


return (
  <div>
  <form onSubmit={handleInput}>
  <label>
  Input json:
  <br/>
  <input
  type="text"
  value={json}
  onChange={event => setJson(event.target.value)}
  />
  </label>
  <input type="submit" value="Submit" />
  </form>
  <div className="flexContainer">
  {showComponent ? 
    <div>
    <form onSubmit={handleSave}>
    {output}
    <input type="button" onClick={handleSave} value="Save"></input>
    </form>
    </div> 
    : null}
    </div>
    </div>   
    );
  }

  export default AddForm;