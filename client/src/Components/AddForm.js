import TextComponent from './TextComponent';
import React, { useState } from 'react'
let id = 0;

class key {
  constructor(key, values) {
    this.key = key;
    this.k_copy = key;
    this.v_copy = values; 
    var result = [];
    this.simpleValue = false;
    if (typeof(values) !== 'string' && !Array.isArray(values)) {
      var keys = Object.keys(values)
      keys.forEach(element => {
        result.push(new key(element, values[element]));
      });
      this.values = result;
    } else {
      this.values = null;
      this.simpleValue = true;
    }
  }
}

const AddForm = props => {
  const [json, setJson] = useState('{ "name": "debug" }');
  const [output, setOutput] = useState(null);
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
      window.location.reload(false);
    } 
    else if (data.error === null) {
      alert("Rule already exists, use rule: " + data.result)
    } 
    else {
      alert("Failed to add rule: " + data.error)
    }
  }).catch(e => {
    alert("Something went wrong: " + e)
  });
}

const unwind = (input, changedEntries) => {
  input.forEach(element => {
    var resArray = element.props.biRef.updateKeys();
    if (!element.props.simple) {
      unwind(element.props.v, changedEntries);
    }  
    if (resArray[1]) {
      changedEntries.push([resArray[0], resArray[1]]);
    }
  });
  return changedEntries;
}

const handleSave = (event) => {
  var changedEntries = []
  unwind(output, changedEntries);
  if (changedEntries.length === 0) {
    alert("No changes detected")
    return;
  }
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
  var asArray = Object.entries(jsonObj);
  var result = []
  asArray.forEach(entry => {;
    result.push(toKey(new key(entry[0], entry[1]), []));
  })
  
  setOutput(result);
  setShowComponent(true);
  event.preventDefault();
};

const toKey = (key, stack) => {
  var biRef = {
    parentfunction: null
  };
  var result = [];
  if (key) {
    if (!key.simpleValue && key.values) {
      key.values.forEach(element => {
        const stackCopy = [...stack];
        stackCopy.push(key.key)
        result.push(toKey(element, stackCopy));
      });
      return <TextComponent key={id++} k={key.key} v={result} stack={stack} simple={false} biRef={biRef} />;
    } else {
      return <TextComponent key={id++} k={key.key} stack={stack} simple={true} biRef={biRef} />;
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