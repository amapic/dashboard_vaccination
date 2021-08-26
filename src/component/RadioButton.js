import { liste_vaccin } from "../data/liste_vaccin";
import { ButtonGroup,ToggleButton } from 'react-bootstrap';
import React,{useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { subjectvac } from "./observable/observable";

export function ToggleButtonPerso (){ 
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');
  
    const radios = liste_vaccin
    
    const handleChange = (newValue) => {
        subjectvac.next(newValue);
    };

    return (
      <>
        <br />
        <ButtonGroup className="mb-2">
          {radios.map((radio, idx) => {
              
              return (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) =>{ setRadioValue(e.currentTarget.value);handleChange(e.currentTarget.value)}}
            >
              {radio.name}
            </ToggleButton>
          )})}
        </ButtonGroup>
       
      </>
    );
  }
  