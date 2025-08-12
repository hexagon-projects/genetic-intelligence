import axios from 'axios';
import { useRouter } from 'vue-router'

// const useAPI = async(method, endpoint, data) => {
//     const baseUrl = 'http://gim.app.api.hexagon.co.id/api/'+endpoint
//     // console.log(baseUrl)
//     let config = {
//         method: method,
//         maxBodyLength: Infinity,
//         url: baseUrl,
//         headers: data != null ? {'Content-Type': 'application/json'} : null,
//         withCredentials: true,
//         data : data != null ? data : null
//       }

//     const response = await axios.request(config)
//     return response
// }
// const baseUrl = 'http://gim.app.api.hexagon.co.id/api/'
// const useAxioss = async(method, endpoint) => {
//     const accessToken = JSON.parse(localStorage.getItem('token'))
//     let config = {
//         method: method,
//         maxBodyLength: Infinity,
//         url: baseUrl+endpoint,
//         headers: { 
//           'Authorization': `Bearer ${accessToken}`
//         }
//     };

//     const response = await axios.request(config)
//     return response
// }


// const useAPI = async(method, endpoint, data) => {
//     const accessToken = JSON.parse(localStorage.getItem('token'))
//     const response = await fetch('http://gim.app.api.hexagon.co.id/api/'+endpoint, {
//         method: method,
//         headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${accessToken}` 
//         },
//         body: data !== null ? data : null
//     })

//     return response
// }

const initAPI = async (method, endpoint, data, token) => {
  const router = useRouter()
  // const baseUrl = import.meta.env.VITE_API_BASE_URL
  // const baseUrl = 'http://192.168.38.226:8001/api/'
  // const baseUrl = 'http://gim.app.api.hexagon.co.id/api/'
  // const baseUrl = 'https://jatidiri.app/api/'
  // const baseUrl = 'https://v2.api.jatidiri.app/api/'
  // const baseUrl = 'http://127.0.0.1:8000/api/'
  const baseUrl = 'https://api.jatidiri.app/api/'
  // const baseUrl = 'https://api-staging.jatidiri.app/api/'
  // const baseUrl = 'https://staging.jatidiri.app/api/'
  let check = endpoint.includes('upload-test') ||
            endpoint.includes('customers') ||
            endpoint.includes('consultants') ||
            endpoint.includes('interview-documentation') ||
            endpoint.includes('bk/upload-profile') ||
            endpoint.includes('bk/upload-hero') ||
            endpoint.includes('placement/set-report') ||
            endpoint.includes('placement');
  // console.log(check)
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: endpoint.includes('http') ? endpoint : baseUrl + endpoint,
    headers: {
      'Content-Type': check ? 'multipart/form-data' : 'application/json',
      'Authorization': token !== null ? `Bearer ${token}` : null,
    },
    data: data !== null ? data : null
  };

  try {
    const response = await axios.request(config)
    // if(response.status == '401' && localStorage.getItem('userData')){
    //   localStorage.clear()
    //   router.go()
    // }
    return response
  } catch (error) {
    if (error.response && error.response.status === 401 && localStorage.getItem('userData')) {
      // console.log(`rugi dong`)
      localStorage.clear()
      router.go()
    } else {
      throw error;
    }
  }
  // try {
  //   const response = await axios.request(config)
  //   return response
  // } catch (error) {
  //   console.log(error)
  //   if(error && error.response && error.response.status === 401 && localStorage.getItem('userData')){
  //     localStorage.clear()
  //     router.go()
  //   }
  //   return error
  // }
}

export default initAPI