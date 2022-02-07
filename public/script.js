if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.js')
			console.log('Service worker registration success.')
}