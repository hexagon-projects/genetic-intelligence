import axios from 'axios';

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
  let check = endpoint.includes('upload-test') || endpoint.includes('customers/')
  console.log(check)
    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: 'http://gim.app.api.hexagon.co.id/api/' + endpoint,
        headers: { 
          'Content-Type': check ? 'multipart/form-data' : 'application/json',
          'Authorization': token !== null ? `Bearer ${token}` : null
        },
        data : data !== null ? data : null
      };
    const response = await axios.request(config)
    return response
}

export default initAPI