import Image from "next/image"
import { useState, useEffect } from "react"
import Map, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Geocode from 'react-geocode'

const EventMap = ({evt}) => {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(null)
  const [viewState, setViewState] = useState({
    longitude: 106.82869835382519, 
    latitude: -6.174904073666767,
    zoom: 12
  })

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

  useEffect(() => {
    // Get latitude & longitude from address.
    // console.log('get map useeffect')
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log('success', lat, lng);
        setLat(lat)
        setLng(lng)
        setViewState({ ...viewState, latitude: lat, longitude: lng})
        setLoading(false)
      },
      (error) => {
        console.error(error);
      }
    );
  }, [])

  if (loading) return false
  console.log(lat,lng, viewState)

  return (
    <Map
      initialViewState={{
        ...viewState
      }}
      style={{width: '100%', height: 500}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onMove={el => setViewState(el.viewState)}
    >
      <Marker longitude={lng} latitude={lat} anchor="center" >
        ,<Image src="/images/pin.svg" width={30} height={30}/>
      </Marker>
    </Map>
    
  )
}

export default EventMap