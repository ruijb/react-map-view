import React from 'react';

import classes from './House.module.css'

const house = ({house, selected, setSelected}) => {
  const houseClasses = [classes.House]
  selected && houseClasses.push(classes.SelectedHouse)
  return (
    <div className={houseClasses.join(' ')} onClick={() => setSelected(house.id, true)} onMouseEnter={() => setSelected(house.id)}>
      <div className={classes.ImageContainer}>
        <img className={classes.Image} src={process.env.REACT_APP_PUBLIC_URL + "/" + house.image} alt={house.name}/>
      </div>
      <div className={classes.ContentContainer} style={{borderLeft: `solid 5px ${house.color}`}}>
        <h3 className={classes.Title}>{house.name}</h3>
      </div>
    </div>
  )
}

export default house