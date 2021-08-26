import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  GoogleMap,
  LoadScript
} from '@react-google-maps/api';


import PopoverwrapLogic from './PopoverwrapLogic';
import { subjectmapfr } from './observable/observable'

const mapStyles2 = [

  {
    featureType: "administrative.country",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [{
      visibility: "on",
      color: "#ff0000"
    }]
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [{
      visibility: "off"
    }]
  },

  {
    featureType: "landscape.natural",
    elementType: "all",
    stylers: [{
      visibility: "off"
    }],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{
      visibility: "off"
    }],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{
      visibility: "off"
    }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{
      color: "#31373E"
    }],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [{
      visibility: "off"
    }],
  },

];
const containerStyle = {
  width: '200px',
  height: '200px'
};

const containerStyle_petit = {
  width: '50px',
  height: '50px'
};


const options_style = {
  draggable: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  draggableCursor: 'default',
  zoomControl: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  styles: mapStyles2
}

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));



export default function MapGoogle({ region_excluded = [], region_included = [], zoom = 5, center = {}, list_poly2,idreact }) {

  const mapFr = useRef(null);

  useEffect(() => {
    if (zoom < 5.2) {
      subjectmapfr.next(mapFr)
    }
  }, [mapFr]);


  const [mapProps, setmapProps] = useState({
    etat: "init",
    selectedItems: ["11"],
    selectedItem: 0
  });


  var keys = Object.keys(list_poly2);
  if (region_excluded.length > 0) {
    keys = keys.filter(item => {
      let jj = !region_excluded.includes(item)
      return jj
    })

  } else {
    keys = keys.filter(item => region_included.includes(item))
  }


  return (<
    LoadScript googleMapsApiKey="AIzaSyBHNfjuxMNcHVdkLgHctexkayh5tAMOWjA" >

    <
      GoogleMap mapContainerStyle={
        (idreact !=="map_fr" ? containerStyle_petit : containerStyle)
      }

      ref={mapFr}
      center={center
      }
      zoom={
        zoom
      }
      options={
        options_style
      }

    >

      {
        keys.map((object) => {
        return (
            <PopoverwrapLogic key={object} object={object} paths={list_poly2[object]} />
          )
        })
      }

    </GoogleMap >

  </LoadScript>)
  // }
}