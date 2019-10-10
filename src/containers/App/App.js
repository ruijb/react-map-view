import React, {useEffect, useState} from 'react';
import GoogleMapReact from "google-map-react";
import House from '../../components/House/House'
import Marker from '../../components/Marker/Marker'
import {ReactComponent as IconMap} from '../../assets/map.svg'
import {ReactComponent as IconList} from '../../assets/list.svg'

import classes from './App.module.css'

const mapOptions = {
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: true,
    styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
};

const App = () => {
  const [houses, setHouses] = useState([])
  const [center, setCenter] = useState({lat: 38.7253552, lng: -9.124636})
  const [view, setView] = useState('list')

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/houses.json`).then(res => res.json()).then(res => {
      setHouses(res)
    })
  }, [])

  const setSelected = (house_id, recenter) => {
    setHouses(prevHouses => prevHouses.map(house => ({...house, selected: house.id === house_id})))
    const house = houses.find(house => house.id === house_id)
    recenter && setCenter({lat: house.lat, lng: house.lng})
  }

  const appClasses = [classes.App]
  view === 'map' ? appClasses.push(classes.MapView) : appClasses.push(classes.ListView)
  return (
    <div className={appClasses.join(' ')}>
      {view === 'map' && <span className={classes.IconMap} onClick={() => setView('list')}><IconMap /></span>}
      {view === 'list' && <span className={classes.IconList} onClick={() => setView('map')}><IconList /></span>}

      <div className={classes.Houses}>
        {houses.map((house, i) => (
          <House 
            key={i} 
            house={house} 
            selected={house.selected}
            setSelected={setSelected}
            />
        ))}
      </div>
      <div className={classes.Map}>
        <GoogleMapReact 
          bootstrapURLKeys={{ key: '' }}
          center={center} 
          defaultZoom={13}
          options={mapOptions}
        >
          {houses.map(house => (
            <Marker
              key={house.id}
              lat={house.lat}
              lng={house.lng}
              name={house.name}
              color={house.color}
              selected={house.selected}
              setSelected={() => setSelected(house.id)}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default App;