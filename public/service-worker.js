const cacheName = 'photos'

self.addEventListener('install', event => {
	console.log('Service worker installed at:', new Date().toLocaleTimeString());

	// event.waitUntil(caches.open(cacheName).then(cache => {
	// 	return cache.addAll(defaultFiles)
	// }))
})
 

self.addEventListener('activate', event => {
	console.log('Service worker activated at: ', new Date().toLocaleTimeString());
})


self.addEventListener('fetch', event => {
	console.log('Fångade ett request: ', event.request.url);
 
	if( navigator.onLine ) {
		event.respondWith(fetch(event.request).then(response => {
			let clone = response.clone()
			caches.open(cacheName).then(cache => {
				cache.put(event.request, clone)
			})
			return response
		 }))
		 
	 } else {
		event.respondWith(caches.match(event.request).then(response => {
			if( response ) {
				return response
			}
			return null 
		 }))
	 }
})

