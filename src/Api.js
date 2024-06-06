const BASE_API = 'http://192.168.3.31:8080';

export default {
  checkToken: async () => {
    // Implementação do checkToken se necessário
  },

  Login: async(email, password) => {
    try {
      const response = await fetch(`${BASE_API}/odata/animal`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //   email: email,
        //   password: password
        // })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();
      console.log(json);
      return json;

    } catch (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    }
  }
}
