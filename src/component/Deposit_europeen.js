import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Checkbox from '@material-ui/core/Checkbox';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { mean } from 'mathjs'

import adresse from '../fonction/conf';
import theme from '../style/theme';

import { ResponsiveContainer, Bar, BarChart, XAxis, Cell, YAxis } from 'recharts'


const useStyles = makeStyles((theme) => ({
  depositContext: {
    flex: 1,
    padding: theme.spacing(1)
    // paddingLeft:theme.spacing(1),
    // paddingRight:theme.spacing(1)
  },
  LinearProgress: {
    flex: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  title: {
    paddingBottom: theme.spacing(4),
    margin: theme.spacing(5)
  },
}));

const chercheData = async (url) => {

  const response = await fetch(url,{mode:'cors'});
  const responseData = await response.json();
  // var liste_nom_region2 = liste_nom_region
  // var liste_selected_str = []
  // liste_selected.forEach(element => liste_selected_str.push(parseInt(element)));
  if (response.ok) {
    var data = [];
    var dictOfResponseData = {}
    var miniDict = {}
    for (const [key, value] of Object.entries(responseData)) {
      // dictOfResponseData[key] = value
      miniDict = {}
      miniDict['name'] = key
      miniDict['1ere dose'] = value * 100
      data.push(miniDict);

    }

    console.log(mean(Object.values(responseData)));
    return [data, Object.keys(responseData), mean(Object.values(responseData))]

  } else {
    alert(JSON.stringify(responseData))
    return false
  }

}

export default function Deposits3() {
  const [data, setData] = useState(null);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    chercheData(adresse+":8052/data_europeenne").then((tt) => {
      setData(tt);
    })

  }, []);

  function tickFormatter(value) {
    return value.toString() + "%"
  }

  if (data === null) {
    return null
  }
  var items = data[0].slice(0, 15)
  var listePays = data[1]
  return (
    <>
      <Title className={classes.title}>Europe </Title>
      {/* <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        
        <Tab label="Graphique" />
        <Tab label="Choix des pays" />
      </Tabs> */}
      {/* {value === 0 && (
        <>
        {listePays.map((entry, index) =>
          <FormControlLabel
          value={entry}
          control={<Checkbox color="primary" />}
          label={entry}
          labelPlacement="right"
        />
        )}
        </>
        
      )}
      {value === 1 && ( */}
      <React.Fragment>


        <ResponsiveContainer>

          <BarChart barCategoryGap={10} data={items} margin={{ top: 5, right: 0, left: 5, bottom: 30 }}>
            <XAxis dataKey="name" angle={20} textAnchor="begin" interval={0} />
            <YAxis tickFormatter={tickFormatter} domain={[0, 100]} tickMargin={0} padding={{ right: 0 }} />
            <Bar dataKey="1ere dose"

            >
              {items.map((entry, index) => {
                if (entry !== 'FR') {
                  return (
                    <Cell stroke={theme.palette.secondary.fifth} fill={'rgb(33,37,39)'} strokeWidth={3} />
                  )
                } else {
                  return (
                    <Cell stroke={theme.palette.secondary.fifth} fill={'rgb(33,37,39)'} strokeWidth={5} />
                  )
                }
              })}
            </Bar >
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    </>
  );
}
