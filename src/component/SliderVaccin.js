import React from 'react';

import Slider from '@material-ui/core/Slider';

import Typography from '@material-ui/core/Typography';

import {subjectvac} from './observable/observable'

export default function SliderVaccin() {
    
    var marks = [
        {
          value: 0,
          label: 'Tous vaccins',
        },
        {
          value: 1,
          label: 'COMIRNATY Pfizer/BioNTech',
        },
        {
          value: 2,
          label: 'Moderna',
        },
        {
          value: 3,
          label: 'AstraZeneka',
        },
        {
          value: 4,
          label: 'Janssen',
        },
      ];

    const handleChange = (event, newValue) => {
        subjectvac.next(newValue.toString());
    };

    return(
        <>

<Slider
  defaultValue={0}
  valueLabelDisplay="off"
  min={0}
  max={4}
  aria-labelledby="discrete-slider-restrict"
  step={null}
  marks={marks}
  onChange={handleChange}
/>
</>)
}