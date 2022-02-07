import React, {useState, useEffect} from "react"
import './imageGallery.css'
import Girl from './img/girl-with-umbrella.jpg'
import Landscape from './img/land-scape.jpg'

function ImageGallery() {
	const defaultGallery = [
		{
			url: Girl, 
			desc: 'Photo of a girl with an umbrella',
			adress: {
				country: 'Denmark', 
				city: 'Copenhagen'
			},
			date: '2021-12-01 13:40:10'
		}, 
		{
			url: Landscape, 
			desc: 'photo of a mountain landscape',
			adress: {
				country: 'Canada', 
				city: 'missing'
			}, 
			date: '2021-11-20 10:30:54'
		}
	]
	
	let [instablamGallery, setInstablamGallery] = useState(defaultGallery)

	useEffect( () => {
		let currentStorage = localStorage.getItem('instablam-gallery')
		let data = JSON.parse(currentStorage)
		console.log('currentstorage data', data)

		if (data !== null || undefined) {
			setInstablamGallery(data)
		} else {
			localStorage.setItem('instablam-gallery', JSON.stringify(defaultGallery))
		} 
	
	}, [])

	useEffect(() => {
		localStorage.setItem('instablam-gallery', JSON.stringify(instablamGallery))
	}, [instablamGallery])

	function deleteImage(imageIndex) {
		console.log('remove image')
	
		let array = [...instablamGallery]// make a separate copy of the array
		let index = imageIndex
		console.log('index', index)
		array.splice(index, 1)
		console.log('array', array)
		setInstablamGallery(array)
	}

	return (
		<div>
			<div className='image-container'>
		
				{instablamGallery.map((image, index) => {
					return <div>
						<img className='images' src={image.url} alt={image.desc} key={index}/>
						<p className='image-location'>Country: {image.adress.country}, City: {image.adress.city}</p>
						<p className='image-date'>Date: {image.date}</p>
						<div className='handleImageButtons'>
						<button onClick={() => deleteImage(index)}><i class="fas fa-trash-alt"></i></button>
						<a href={image.url} download><button><i class="fas fa-download"></i></button></a>	
						</div>
					</div>
				})}
			</div>
			
		</div>
	)	
}


export default ImageGallery