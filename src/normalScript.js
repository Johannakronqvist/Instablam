// Registrera service worker
async function registerServiceWorker() {
	if( 'serviceWorker' in navigator ) {
		try {
			await navigator.serviceWorker.register('./service-worker.js')
			console.log('Service worker registration success.')
		} catch(error) {
			console.log('Faild to register service worker due to: ' + error.message);
		}
	} else {
		console.log('Service worker does not exist in this browser.');
	}
}

registerServiceWorker()