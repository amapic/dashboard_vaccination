import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import LinearProgress from "@material-ui/core/LinearProgress";

import theme from '../style/theme';
function preventDefault(event) {
  event.preventDefault();
}
import adresse from '../fonction/conf'

const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
    padding:theme.spacing(1)
  },
  LinearProgress: {
    flex: 1,
    paddingLeft:theme.spacing(1),
    paddingRight:theme.spacing(1)
  },
  title: {
    paddingBottom:theme.spacing(4),
    margin:theme.spacing(5)
  },
}));

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

export default function Deposits() {
  const [items, setItems] = useState(false);
  const [items2, setItems2] = useState(false);
  const classes = useStyles();
  
  useEffect(() => {
    chercheData(adresse+":8052/pourcentage_pop_vac_som_1").then((data) => {
      setItems(data);
    })
    chercheData(adresse + ":8052/pourcentage_pop_vac_som_2").then((data) => {
      setItems2(data);
    })

  }, []);

  return (
    <React.Fragment>
      <Title className={classes.title}>Population vacciné</Title>
      
      <LinearProgress variant="determinate" value={items*100} />
      <Typography align="center" color="secondary" className={classes.depositContext}>
        Première dose : {parseFloat(items*100).toFixed(1)} %
      </Typography>
      <br />
      <LinearProgress variant="determinate" value={items2*100} />
      <Typography align="center" color="primary.bar_droite1" className={classes.depositContext}>
        Seconde dose : {parseFloat(items2*100).toFixed(1)} %
      </Typography>

      <div>

      </div>
    </React.Fragment>
  );
}
