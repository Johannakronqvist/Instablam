import {useRef, useEffect, useState} from 'react'
import './mediaDevices.css'
import Geolocation from './GeoLocation'

const Camera = () => { 
	const [useMediaDevices, setUseMediaDevices] = useState(false)
	const [photoExist, setPhotoExist ] = useState(false)
	const cameraRef = useRef(null)
	const photoRef = useRef(null)
	const [facing, setFacing] = useState('user')
	let [constraint, setConstraint] = useState({video: {facingMode: facing}})
	const [currentLocation, setCurrentLocation] = useState({country: 'missing', city: 'missing'})
	const [imageObject, setImageObject] = useState('') 
	const [instablamGallery, setInstablamGallery] = useState()
	const [toggleCameraButton, setToggleCameraButton] = useState('Turn On Camera')

	console.log('image object top', imageObject)

	useEffect(() => {
		let getLocation = localStorage.getItem('adress')
		let locationData = JSON.parse(getLocation)
		setCurrentLocation(locationData)
		console.log('locationdata Useeffect: ', locationData)

		let getStorage = localStorage.getItem('instablam-gallery')
		let galleryData = JSON.parse(getStorage)
		if(galleryData) {
			setInstablamGallery(galleryData)
		} else {
			console.log('gallery data missing')
		}

		if('mediaDevices' in navigator) {
			setUseMediaDevices('mediaDevices' in navigator)
		} else { console.log('We can not access your camera.')}
	
	}, [])

	useEffect(() => {
		console.log('instablamGallery from useEffect: ', instablamGallery)
		localStorage.setItem('instablam-gallery', JSON.stringify(instablamGallery))
	  }, [instablamGallery])

	const turnOnCamera = () => {
		const constraints = constraint
		getCamera(constraints, cameraRef.current)

		setToggleCameraButton('Turn Off Camera') 
	}

	const takePhoto = () => {
		let width = 400
		let height = 300

		let camera = cameraRef.current
		let photo = photoRef.current

		photo.width = width
		photo.height = height

		setTimeout(() => {
			let context = photo.getContext('2d')
			context.drawImage(camera, 0, 0, width, height)
			setPhotoExist(true)

			let createImageUrl = photo.toDataURL('image/png', 1.0);

			if(createImageUrl) {
				JSON.parse(localStorage.getItem('adress'))
				let currentDate = new Date().toLocaleString('sv-SE')
				setImageObject({url: createImageUrl, adress: currentLocation, date: currentDate, desc: 'photo'})
			} else { 
				console.log('no image url created')
			} 
		}, 1000)

	}
	
	function savePhoto() {
		let currentImage = imageObject
		console.log('from function, imageObject', currentImage)
		setInstablamGallery([...instablamGallery, imageObject])
	}

	const closePhoto = () => {
		let photo = photoRef.current
		let context = photo.getContext('2d')

		context.clearRect(0, 0, photo.width, photo.height)

		setPhotoExist(false)
	}

	function changeFacing() {
		if(facing === 'user'){
			setFacing('environment')
			setConstraint( {facingMode: facing} )
		} else {
			setFacing('user')
			setConstraint({facingMode: facing} )
		}
	}

	async function getCamera(constraints, cameraElement) {
		let stream = null

		try {
			stream = await navigator.mediaDevices.getUserMedia(constraints)
			cameraElement.srcObject = stream
			cameraElement.addEventListener('loadedmetadata', () => {
				cameraElement.play()
			})
		} catch(error) {
		console.log('Could not start camera because:', error.message)
		}	 
		
	}

	function turnOffCamera () {
		let tracks = cameraRef.current.srcObject.getTracks()
		console.log(tracks)
		tracks.forEach(track => track.stop())

		cameraRef.current.srcObject = null

		setToggleCameraButton('Turn On Camera')

	}

	return (
		<div className='component-container'>
			<section className={'camera' + (photoExist ? '-bottom':'-top')}>
				<video ref={cameraRef}></video>
				<div className='camera-buttons'>
					{/* <button onClick={turnOnCamera}>{toggleCameraButton}</button> */}
					<button onClick={toggleCameraButton === 'Turn On Camera' ? turnOnCamera : turnOffCamera}>{toggleCameraButton}</button>
					{/* //if camera is on >turn off camera<
					//else if camera is off >turn on camera< */}
					<button onClick={changeFacing}>{facing}</button>
					<button onClick={takePhoto}>Take photo</button>
				</div>
			</section>
			<section className={'result' + (photoExist ? '-photo':'')}>
				<canvas className='photo-container' ref={photoRef}></canvas>
				<Geolocation/>
				<button onClick={closePhoto}>Close photo</button>
				<button onClick={savePhoto}>Save photo to gallery</button>
			</section>
		</div>
	)
}


export default Camera