import React, { useState } from 'react'
import './Temp.css';

const Tmp = props => {
    const [k_copy, setNewKey] = useState(props.k);    
    const updateKeys = () => {
        var k_res = [props.k, k_copy];
        if (k_copy === props.k) {
            k_res = null;   
        }
        return [props.stack, k_res];
    }
    
    props.biRef.updateKeys = updateKeys;
    
    const onChangeKey = event => {
        setNewKey(event.target.value);
    };
    
    if (props.simple && props.k) {
        return (
            <div className="container">
            <a className="keyText">{props.k}: </a>
            <input
            name="k_copy"
            type="text"
            value={k_copy}
            onChange={onChangeKey}
            />
            </div>
            );
        } 
        else {
            return (
                <div className="container">
                <a className="keyText">{props.k}: </a>
                <input
                name="k_copy"
                type="text"
                value={k_copy}
                onChange={onChangeKey}
                />
                <br/>
                <a> {props.v} </a>
                </div>
                );
            }
        }
        
        export default Tmp;