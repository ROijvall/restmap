import Tmp from './Temp';
import React, { useState } from 'react'
let id = 0;

class top {
  constructor(key, values) {
    this.key = key;
    this.k_copy = key;
    this.v_copy = values; 
    var result = [];
    this.simpleValue = false;
    if (typeof(values) === 'string') {
      this.values = values;
      this.simpleValue = true;
    } else if (Array.isArray(values)) {
      values.forEach(element => {
        result.push(new top(null, element));
      })
      this.values = result;
    } else {
      var keys = Object.keys(values)
      keys.forEach(element => {
        result.push(new top(element, values[element]));
      });
      this.values = result;
    }
  }
}

const Form = props => {
  const [json, setJson] = useState('{ "name": "debug" }');
  const [output, setOutput] = useState(null);
  const [remppaing, setRemapped] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [showComponent2, setShowComponent2] = useState(false);

  async function addRule(e) {
    e.preventDefault();
    await fetch("http://localhost:5000/rule/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(remppaing),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
  }
  
  const onChangeHandler = event => {
    setJson(event.target.value);
    event.preventDefault();
  };
  
  const unTmp = (input, changedEntries) => {
    input.forEach(element => {
      var resArray = element.props.biRef.updateKeyValues();
      if (!element.props.simple) {
        unTmp(element.props.v, changedEntries);
      }  
      if (resArray[1]) {
        changedEntries.push([resArray[0], resArray[1], null]);
      }
    });
    return changedEntries;
  }
  
  const handleSave = (event) => {
    var changedEntries = []
    unTmp(output, changedEntries);
    setRemapped(changedEntries);
    setShowComponent2(true);    
    addRule();
    event.preventDefault();
  }
  
  const handleConvert = event => {
    console.log(json);
    try {
      var jsonObj = JSON.parse(json);
    } catch (e) {
      alert('Invalid json: ' + json);
      setShowComponent(false);
      return;
    }
    
    remppaing.forEach(element => {
      var obj = null;
      if (element[0].length === 0 ) {
        obj = jsonObj;
      } else {
        obj = jsonObj[element[0]];
      }
      
      for (var i = 1; i < element[0].length; ++i) {
        obj = obj[element[0][i]];
      }
      console.log("before");
      console.log(obj);
      var oldKey = element[1][0], newKey = element[1][1];
      if (element[1]) {
        delete Object.assign(obj, {[newKey]: obj[oldKey] })[oldKey];
      }
    });
    console.log(jsonObj); 
    var res = JSON.stringify(jsonObj);
    console.log(res);
  }
  
  const handleInput = event => {
    setShowComponent2(false);    
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
      result.push((new top(entry[0], entry[1])));
    })
    
    var tmpResult = []
    result.forEach(entry => {;
      tmpResult.push(toTmp(entry, []));
    })
    setOutput(tmpResult);
    setShowComponent(true);
    event.preventDefault();
  };
  
  const toTmp = (top, stack) => {
    var biRef = {
      parentfunction: null
    };
    var result = [];
    if (top) {
      if (!top.simpleValue) {
        top.values.forEach(element => {
          const stackCopy = [...stack];
          stackCopy.push(top.key)
          result.push(toTmp(element, stackCopy));
        });
        return <Tmp key={id++} k={top.key} v={result} stack={stack} simple={false} biRef={biRef} />;
      } else {
        return <Tmp key={id++} k={top.key} v={top.values} stack={stack} simple={true} biRef={biRef} />;
      }
    }
  };
  
  
  return (
    <div>
    <form onSubmit={handleInput}>
    <label>
    Input json:
    <input
    type="text"
    value={json}
    onChange={onChangeHandler}
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
      {showComponent2 ?
        <button onClick={handleConvert}>Convert</button>
        : null}
        </div>              
        );
      }
      
      export default Form;