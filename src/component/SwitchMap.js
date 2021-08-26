
import React, { useState, useEffect } from 'react'
import { liste_id_region } from '../fonction/fonction';
import { subjectregionswitch } from "./observable/observable";
import { Switch } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import shortid from 'shortid';

export function SwitchMap() {
    const [checked, setChecked] = useState(false)

    const toggleChecked = (event) => {
        if (event.target.checked) {
            var rreturn = []
            var liste_id_region2 = liste_id_region
            Object.keys(liste_id_region2).map((object, i) => rreturn.push(liste_id_region2[object]))
            subjectregionswitch.next(rreturn);
        } else {
            subjectregionswitch.next([11]);
        }
        setChecked(!checked);
    };

    return (
        <FormControlLabel
            value="top"
            control={<Switch
                key={shortid.generate()}
                checked={checked}
                onChange={toggleChecked}
                name="checkedA"
                label="Start"
                labelPlacement="start"
                inputProps={{ 'aria-label': 'secondary checkbox' }}/>}
            label="Top"
            labelPlacement="top"
            
        />
    )
}