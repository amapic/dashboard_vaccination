import React, { useState, useEffect } from 'react'
import {
  subjectregion
} from './observable/observable'
import Data_carre from './Data_carre';
import shortid from 'shortid';
import { liste_nom_region } from '../fonction/fonction'

const chercheData = async (url) => {

  const response = await fetch(url,{mode:'cors'});
  const responseData = await response.json();

  if (response.ok) {
    return responseData

  } else {
    alert(JSON.stringify(responseData))
    return false
  }

}

export default function Data_carre_logique() {

  const [data, setData] = useState(null);

  useEffect(() => {
    subjectregion.subscribe(
      v => {
        if (typeof v !== 'undefined') {
          var tt = [];
          var liste_nom_region2 = liste_nom_region;
          let promises = [];
          v.map((object, i) => {
            promises.push(chercheData("http://localhost:8052/bilan_par_region_dose1/" + object.toString()))
          })

          Promise.all(promises).then(function handleData(data) {
            v.map((object,i) => {
              tt.push({
                "name": liste_nom_region2[object],
                "size": (data[i] * 100)
              })
            })
            setData(tt);
          })
          
        }
      })
  }, [])

  if (data !== null && data.length > 0) {
    return <Data_carre key={shortid.generate()} data={data} />
  } else {
    return null
  }

}
