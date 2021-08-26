import React, { useEffect, useState } from 'react';

import {
    useTheme
}
    from '@material-ui/core/styles';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
}
    from 'recharts';
import Title from './Title';
import adresse from '../fonction/conf'
import { subjectvac, subjectrange, subjectregion } from './observable/observable'

import { liste_nom_region } from '../fonction/fonction'


const chercheData = async (url) => {

    const response = await fetch(url,{mode:'cors'});
    const responseData = await response.json();

    if (response.ok) {
        var data = [];
        var dictOfResponseData = {}
        var miniDict = {}
        for (const [key, value] of Object.entries(responseData)) {
            dictOfResponseData[key] = value
        }

        var keylist = Object.keys(dictOfResponseData);
        var indexDatetime = Object.keys(dictOfResponseData[keylist[0]]);


        for (let i = 0; i < indexDatetime.length; i++) {
            for (const [key, value] of Object.entries(dictOfResponseData)) {
                miniDict['time'] = indexDatetime[i].slice(-12, -2)
                miniDict[key] = value[indexDatetime[i]]

            }
            data.push(miniDict);
            miniDict = {}
        }

        return data

    } else {
        alert(JSON.stringify(responseData))
        return false
    }

}

const format = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1 ')

    ;

export default function Chart(props) {
    //chart est sensé être rerender qd la valeur range de date est remodifié depuis le composant Slider
    var liste_region = liste_nom_region
    const theme = useTheme();
    const [items, setItems] = useState([0]);

    const labelFormatter = function (x) {
        return x
    }

    const valueFormatter = function (x, y, z) {
        return [format(x), liste_region[z.dataKey],]
    }

    const legendFormatter = function (value, entry, index) {
        return [liste_region[entry.dataKey]]
    }


    useEffect(() => {
        subjectvac.subscribe(
            (v) => {

                let re = subjectregion.getValue()
                re = re.join('_')
                let rr = subjectrange.getValue()

                if (typeof rr === "object") {
                    var date1 =new Date(rr[0] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var date2 =new Date(rr[1] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    let url = adresse+":8052/detail3/" + re + "/" + v + "/" + date1 +"/"+ date2
                    chercheData(url).then((tt) =>
                        setItems(tt));
                }


            }
        );
    }, [])

    useEffect(() => {
        subjectregion.subscribe(
            v => {
                let re = subjectvac.getValue()
                v = v.join('_')
                let rr = subjectrange.getValue()

                if (typeof rr === "object") {
                    var date1 =new Date(rr[0] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var date2 =new Date(rr[1] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    let url = adresse+":8052/detail3/"  + v + "/" + re + "/" + date1 + "/" + date2
                    chercheData(url).then((tt) =>
                        setItems(tt));
                }


            }
        );

    }, [])

    useEffect(() => {
        subjectrange.subscribe(
            (v) => {
                let re = subjectvac.getValue()
                let rr = subjectregion.getValue()
                rr = rr.join('_')
                if (typeof v==='object') {
                    // var date1=v[0]
                    // var date2=v[1]
                    var date1 =new Date(v[0] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var date2 =new Date(v[1] * 1000).toISOString().slice(0, 10).replace('T', ' ');
                    var url = adresse+":8052/detail3/" + rr + "/" + re + "/" + date1 + "/" + date2

                    // if (typeof re === "string" && typeof rr === "string" && rr !== '') {
                        chercheData(url).then((tt) => {
                            setItems(tt)
                        });
                    // }
                }


            
        });
    }, [])

    return (
        <  >
            < Title >  <  / Title >
                < ResponsiveContainer height={200} width={'100%'}>
                    < LineChart
                        data={
                            items
                        }
                        margin={{
                            top: 16,
                            right: 16,
                            bottom: 0,
                            left: 24,
                        }
                        }
                    >

                        <Legend formatter={legendFormatter} />

                        <Tooltip wrapperStyle={{backgroundcolor:'#F00'}} contentStyle={{color:'#000'}} itemStyle={{color:'#000'}} labelFormatter={labelFormatter} formatter={valueFormatter} />
                        <CartesianGrid strokeDasharray="3 3" />
                        {

                            Object.keys(items[0]).map((object, i) =>

                                object !== 'time' ? <Line key={i} type="monotone" dataKey={object} stroke={theme.palette.primary.main} dot={false} /> : null

                            )

                        }


                        < XAxis tickLine={false} dataKey="time" stroke={
                            theme.palette.text.secondary
                        }

                    stroke={theme.palette.text.secondary.main}
                        />
                        <YAxis stroke={theme.palette.text.secondary.main} >
                            
                            <Label
                                angle={270}
                                position="left"
                                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                            >
                            </Label >
                            <  / YAxis >

                            dot = {
                                false
                            }
        
                        </LineChart >
                        <  / ResponsiveContainer >
                        <  /> );
    
}
