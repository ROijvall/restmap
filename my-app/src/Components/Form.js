import Tmp from './Temp';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  add,
  changeKey,
  changeValue,
  selectTops
} from '../topSlice'

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

  /*toTmp (stack) {
    var result = [];
    if (this.values) {
      if (!this.simpleValue) {
        stack.push(this.key);
        this.values.forEach(element => {
          result.push(element.toTmp(stack));
        });
        return <Tmp key={id++} k={this.key} v={result} stack={stack} simple={false}/>;
      } else {
        stack.push(this.key);
        return <Tmp key={id++} k={this.key} v={this.values} stack={stack} simple={true}/>;
      }
    }
  }*/

}

const Form = props => {
  
  //const tops = useSelector(selectTops);
  const dispatch = useDispatch();
  const [json, setJson] = useState('{ "name": "debug" }');
  const [tops, setTops] = useState([]);
  const [output, setOutput] = useState(null);
  const [showComponent, setShowComponent] = useState(false);

  const onChangeHandler = event => {
    setJson(event.target.value);
    event.preventDefault();
 };

  const handleSave = (event) => {
    console.log("hej");
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
      result.push((new top(entry[0], entry[1])));
    })
    setTops(result);

    var tmpResult = []
    result.forEach(entry => {;
      tmpResult.push(toTmp(entry, []));
    })
    dispatch(add(jsonObj));
    setOutput(tmpResult);
    setShowComponent(true);
    event.preventDefault();
  };

  const toTmp = (top, stack) => {
    console.log(top);
    var result = [];
    if (top) {
      if (!top.simpleValue) {
        stack.push(top.key);
        top.values.forEach(element => {
            result.push(toTmp(element, stack));
          });
          return <Tmp key={id++} k={top.key} v={result} stack={stack} simple={false} />;
        } else {
          stack.push(top.key);
          return <Tmp key={id++} k={top.key} v={top.values} stack={stack} simple={true} />;
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
      </div>              
    );
}

export default Form;


/*
<div>
              <form onSubmit={handleSave}>
                            {tops}
                <input type="button" onClick={handleSave} value="Save"></input>
              </form>
            </div>
*/

/*
        <div className="flexContainer">
          {showComponent ? {tops} : null}
        </div>*/