import React from 'react';
import Camera from './components/mediaDevices/Camera'
import ImageGallery from './components/gallery/ImageGallery';
import {Link} from 'react-router-dom'

const Header = () => {
	return (
		<div className='header'>
			<h1>Instablam</h1>
		</div>
	)
}

const Navigation = () => {
	return (
		<div className='navigation'>
			<Link to='/'>
				<i class="far fa-images nav-icons"></i>
				<div>Gallery</div>
			</Link>
			<Link to='/camera'>
				<i class="fas fa-camera-retro nav-icons"></i>
				<div>Camera</div>
			</Link>
		</div>
	)
}

const GalleryPage = () => {
	return (
		<div>	
			<Header/>
			<div className='gallery-page'>
				<ImageGallery/>
			</div>
			<Navigation/>
		</div>
	)
}

const CameraPage = () => {
	return (
		<div>	
			<Header/>
			<div className='camera-page'>
				<Camera/>
			</div>
			<Navigation/>
		</div>
	)
}


export {CameraPage, GalleryPage};
