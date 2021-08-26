import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

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

export default function Deposits2() {
  const [items, setItems] = useState(false);
  const classes = useStyles();
  
  useEffect(() => {
    chercheData(adresse+":8052/doses_administrees").then((data) => {
      setItems(data[0]);
    })

  }, []);

  return (
    <React.Fragment>
      <Title className={classes.title}>Doses administrées </Title>
      
      <Typography align="center" color="secondary" className={classes.depositContext}>
        <div id="dose">
        {parseFloat(items/1000000).toFixed(1)} M
        </div>
      </Typography>

    </React.Fragment>
  );
}
