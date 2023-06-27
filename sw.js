if ("serviceWorker" in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        console.log("Service worker registration succeeded:", registration);
      },
      (error) => {
        console.error(`Service worker registration failed: ${error}`);
      }
    );
  } else {
    console.error("Service workers are not supported.");
  }

  async function cacheThenNetwork(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log("Found response in cache:", cachedResponse);
      return cachedResponse;
    }
    console.log("Falling back to network");
    return fetch(request);
  }
  
  self.addEventListener("fetch", (event) => {
    console.log(`Handling fetch event for ${event.request.url}`);
    event.respondWith(cacheThenNetwork(event.request));
  });