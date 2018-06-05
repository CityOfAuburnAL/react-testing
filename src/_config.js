import axios from 'axios';

// Useful server list
const servers = {
  // serverAPI: 'http://localhost:21695',
  serverAPI: 'https://api.auburnalabama.org',
  // serverAPI2: 'https://localhost:44300',
  serverAPI2: 'https://api2.auburnalabama.org',
  serverGIS: 'https://gis.auburnalabama.org'
}

// Handles redirecting to URL after reauthorization
if (window.localStorage.getItem('redirect')) {
  window.location.hash = `#${window.localStorage.getItem('redirect')}`;
  window.localStorage.removeItem('redirect');
}

// Handles failure to authorize, saving url, and redirecting to authorization server
// TODO - This only saves URL state, so if a user fills out a form and submits data but needs to reauthorize, the form data is lost!!!
// BUG  - This only saves URL state, so if a user fills out a form and submits data but needs to reauthorize, the form data is lost!!!
axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  // So the crux of the issue is that the API redirects to auth instead of returning 401
  // This cannot be detected, instead we get a very non-descript error
  if (error.response) {
    return Promise.reject(error.response)
  } else if (error.request) {
    if (error.message === 'Network Error') {
      // No response and 'Network Error' is a sign it's been redirected to our auth server
      if (navigator.onLine) {
        // Don't try to redirect to auth server while offline, else user will have a bad time
        let redirect = window.location.href
        window.localStorage.setItem('redirect', window.location.hash.substring(1))
        window.location.href = `${servers.serverAPI2}/login?redirect=${redirect}`
      }
    }
    return Promise.reject(error.request)
  } else {
    console.error(error.message)
    console.error(error.config)
  }
})

export default servers
