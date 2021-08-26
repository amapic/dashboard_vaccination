import React, {
  useRef, useState, useEffect
} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Polygon
} from '@react-google-maps/api';
import {
  subjectregion, subjectmapfr, subjectregioncolor
} from './observable/observable'

import Popover from '@material-ui/core/Popover';





const useStyles = makeStyles((theme) => ({
  popovervisible: {
    pointerEvents: 'none',
  },
  popovernotvisible: {
    pointerEvents: 'none',
    display: 'none'
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const clickk = function (i, mapProps, color) {

  let listeRegion = subjectregion.getValue()
  if (listeRegion.includes(i)) {
    var pos = listeRegion.indexOf(i)
    var old_value = subjectregioncolor.getValue()

    if (listeRegion.length > 1) {
      listeRegion = listeRegion.filter(item => item !== i)
      old_value.splice(pos, 1);
    }
  } else {
    listeRegion.push(i)
    var old_value = subjectregioncolor.getValue()

    old_value.push(color)



  }
  subjectregioncolor.next(old_value);
  subjectregion.next(listeRegion)
}

export default function Popoverwrap(props) {

  const myContainer = useRef(null);
  const [visiblePopup, setvisiblePopup] = useState(true)
  const { color, object, paths, mapProps, anchorEl, open, handlePopoverClose, handlePopoverOpen } = props

  const classes = useStyles();
  const mapFr = subjectmapfr.getValue()
  var refMapFr = null
  if (mapFr.current !== null) {
    refMapFr = ReactDOM.findDOMNode(mapFr.current)
  }

  var mapOptionsClicked = {
    strokeColor: "#212527",
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: color,
    fillOpacity: 1,
    polygonKey: 1
  }

  var mapOptionsNotClicked = {
    strokeColor: "#212527",
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: "#212527",
    fillOpacity: 0.35,
    polygonKey: 1
  }
  //on fixe la couleur qd ça sera cliqué
  mapOptionsClicked.fillColor = color

  if (refMapFr===null){
    return null
  }

  return (<>
    <Polygon key={
      object
    }
      onMouseOut={(e) => handlePopoverClose(e, object)}
      onMouseOver={(e) => handlePopoverOpen(e, object)}
      id={"region-poly-" + object}
      ref={myContainer}
      paths={
        paths
      }
      onClick={
        () => clickk(object, mapProps, mapOptionsClicked.fillColor)
      }
      options={
        (mapProps.selectedItems.includes(parseInt(object)) || mapProps.selectedItems.includes(object)) ? mapOptionsClicked : mapOptionsNotClicked
      }

    />

    </>)
}