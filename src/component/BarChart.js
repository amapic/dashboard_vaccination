import React, { useEffect, useState } from 'react';
import {
    useTheme
}
    from '@material-ui/core/styles';
import {
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Label,
    Text
}
    from 'recharts';
import adresse from '../fonction/conf'
import { subjectregion, subjectrange, subjectregioncolor } from './observable/observable'
import Title from './Title';
import { liste_nom_region } from '../fonction/fonction'
import theme from '../style/theme';


const chercheData = async (url, liste_selected) => {

    const response = await fetch(url,{mode:'cors'});
    const responseData = await response.json();
    var liste_nom_region2 = liste_nom_region
    var liste_selected_str = []
    liste_selected.forEach(element => liste_selected_str.push(parseInt(element)));
    if (response.ok) {
        var data = [];
        var dictOfResponseData = {}
        var miniDict = {}

        for (let i = 0; i < liste_selected_str.length; i++) {
            miniDict['name'] = liste_nom_region2[liste_selected[i]]
            miniDict['1ere_dose'] = responseData.n_cum_dose1[i]
            miniDict['2eme_dose'] = responseData.n_cum_dose2[i]
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

export default function BarChartWrap(props) {
    const theme = useTheme();
    const [items, setItems] = useState(null);
    var listeRegionCouleur = []
    const barColors = [theme.palette.secondary.first, theme.palette.secondary.second, theme.palette.secondary.third, theme.palette.secondary.first];
    listeRegionCouleur = subjectregioncolor.getValue()
    useEffect(() => {
        subjectregion.subscribe(
            v => {

                let url = adresse+":8052/req_bar_chart"

                chercheData(url, v).then((tt) =>

                    setItems(tt));


            }
        );

    }, [])



    function tickFormatter(value){
        return value.toString() + "%"

    }

    const labelLegendFormatter = function (x) {
        return null
    }

    const valueLegendFormatter = function (x, y, z) {
        return [x.toFixed(2) + " %", y,]
    }

    

    if (!items || listeRegionCouleur === null) {
        return null
    }
    return (
        <>
            <div id='contient_responsive'>
            < ResponsiveContainer id="responsive_cont_barcharts" height={190} width="80%" >
                <BarChart width={1000} barGap="5" data={items} margin={{ top: 5, right: 0, left: 5, bottom: 30  }}>
                    <XAxis dataKey="name" angle={10} textAnchor="begin" interval={0} dy={2} />
                    <YAxis interval={0} tickFormatter={tickFormatter} domain={[0, 100]} tickMargin={15} padding={{ right: 20 }} />
                    
                    <Bar dataKey="1ere_dose"
                    >
                        {
                            listeRegionCouleur.map((entry, index) =>
                                <Cell key={`cell-${index}`}  stroke={entry} fill={'rgb(33,37,39)'} strokeWidth={3}/>
                            )
                        }
                    </Bar >

                    <Bar dataKey="2eme_dose"
                    
                    >
                        {
                            listeRegionCouleur.map((entry, index) =>
                                <Cell key={`cell-${index}`} stroke={entry} fill={'rgb(33,37,39)'} strokeWidth={3}/>

                            )
                        }
                    </Bar >
                </BarChart>
            </ResponsiveContainer>
            </div>           
        </>
    )

}