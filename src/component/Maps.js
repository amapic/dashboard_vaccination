import { useEffect, useState } from 'react';
import Map_google from './MapGoogle';
import list_poly from "../fonction/region_load"
import Image from 'next/image'
import logo from '../img/ezgif.com-gif-maker2.gif'
const Maps = () => {
    const [style, setStyle] = useState({ display: "none" });
    useEffect(() => {
        let timer1 = setTimeout(() => { setStyle({ visibility: "visible" }); }, 1000);
        return () => {
            clearTimeout(timer1)
        }
    }, [])

    var list_poly2 = list_poly
    var style_image = (Object.keys(style)[0] === 'display') ? { visibility: "visible",display:'block' } : { display: "none" }
    return (
        <div style={{ height: 'auto', maxWidth: '100%', maxHeight: '100%',display:'block' }}>
            <div id="wrap_map1" style={style}>

                <Map_google
                    idreact="map_fr"
                    key="a"
                    region_excluded={["1", "2", "3", "4"]}
                    center={{ lat: 46.7833, lng: 3.0833 }}
                    zoom={4} list_poly2={list_poly2}
                    aria-owns="mouse-over-popover"
                    aria-haspopup="true"
                />
                <div id="wrap_map2">
                    <Map_google key="b" idreact ="gua" region_included={["1", "2", "3", "4"]} center={{ lat: 16.2, lng: -61.5 }} zoom={6.45} list_poly2={list_poly2} />
                    <Map_google key="c" idreact ="mar"region_included={["1", "2", "3", "4"]} center={{ lat: 14.6, lng: -61 }} zoom={6.45} list_poly2={list_poly2} />
                    <Map_google key="d" idreact ="guy" region_included={["1", "2", "3", "4"]} center={{ lat: 3.59, lng: -53 }} zoom={4} list_poly2={list_poly2} />
                    <Map_google key="e" idreact ="reu"  region_included={["1", "2", "3", "4"]} center={{ lat: -21.1, lng: 55.5 }} zoom={6.4} list_poly2={list_poly2} />

                </div>

            </div>
            <div style={style_image}>
                <Image src={logo} alt="Logo" />
            </div>
            


        </div >
    )
}
export default Maps;