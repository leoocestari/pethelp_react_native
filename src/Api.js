const BASE_API = 'https://localhost:7222';

export default {
  checkToken: async () => {

  },
  Login: async(email, password) => {
    

    const req = await fetch(`https://services.odata.org/V4/(S(kj11dkyzupxp2d4vukitnpfd))/TripPinServiceRW/`, {
      method : 'GET',
      headers : {
        Accept:'application/json',
        'Content-Type': 'application/json'
      },
      
    }).then(function(response){
      return response.json();
    })
    .then(function(json){
        console.log(json)
    })
    .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
  }

}