import React from 'react';
import './Rule.css';

const Rule = props => {
  
  async function deleteRule() {
    const response = await fetch(`http://localhost:5000/rule/delete/${props.id}`, {
    method: "GET",
  })
  .catch(error => {
    window.alert(error);
    return;
  }); 
  response.json().then(data => {
    if (data.success && data.result !== 0) {
      props.onDelete()
    }
  }).catch(error => {
    window.alert(error);
    return;
  });
}

return (
  <div className="rule">
  <div className="number">{props.id}</div>
  <textarea value={props.data} readOnly />
  <button type="button" className="button1" onClick={deleteRule}>
  Delete
  </button>
  </div>
  );
}

export default Rule;
