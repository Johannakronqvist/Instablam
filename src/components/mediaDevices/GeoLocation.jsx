import React, {useState} from "react";

function Geolocation() {
const [country, setCountry] = useState('')
const [city, setCity] = useState('')

	if( 'geolocation' in navigator ) {
		console.log('location exist')

		navigator.geolocation.getCurrentPosition(pos => {
		console.log('current position', pos)
		 onSuccess(pos, setCountry, setCity, country, city)
		}, error => {
			console.log(error.message) 
			localStorage.setItem('adress', JSON.stringify({country: 'missing', city: 'missing'}))
		})
	} else {
		console.log('could not get position')
		
	}


return (
	<div className='image-location'>

	</div>
)}

async function onSuccess(pos, setCountry, setCity, country, city) {
	const adress = await getPosition(pos.coords.latitude, pos.coords.longitude)
	
		if( adress ) {
			console.log('adress: hej ', adress)
			setCountry(adress.country)
			setCity(adress.city)

			localStorage.setItem('adress', JSON.stringify({country: country, city: city}))
		} else {
			console.log('adress missing')
			setCountry('location missing')
			setCity('city missing')
			
		}
}

async function getPosition(lat, long) {
	try{
		const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=45e7e4a19c20475eaf163157be54b5aa`)
		const data = await response.json()

		console.log('data', data)

		if( data.error ){
			console.log('We could not get your position.', data.error.message)
			return null
		} else {
			const locationData = data.features[0].properties
			return locationData
		}
	} catch(error){
		console.log('Could not get position because; ', error.message)
		return null
	}
}

export default Geolocation