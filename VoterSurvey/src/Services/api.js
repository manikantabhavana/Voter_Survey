const API_BASE_URL='https://api.stepnext.com'
const apiService={
  get:async(endpoint)=>{
    const url=`${API_BASE_URL}/${endpoint}`
    const response=await fetch(url).then((response)=>response.json())
    return response
  },
  post: async (endpoint, data) => {
    const url = `${API_BASE_URL}/${endpoint}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           
        },
        body: JSON.stringify(data)
    }).then((response) => response.json());

    return response;
}

  
}

export default apiService