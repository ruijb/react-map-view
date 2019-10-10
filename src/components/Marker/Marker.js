import React from "react";

import classes from './Marker.module.css'

const marker = ({color, name, selected, setSelected}) => {
  const markerClasses = [classes.Pin]
  selected && markerClasses.push(classes.Jump)
  return (
    <div onClick={setSelected} onMouseEnter={setSelected}>
      <div
        className={markerClasses.join(' ')}
        style={{ backgroundColor: color, cursor: 'pointer' }}
        title={name}
        />
      <div className={selected ? classes.Pulse : ""} />
    </div>
  );
};

export default marker