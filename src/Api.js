const BASE_API = 'http://192.168.3.31:8080';

export default {
  checkToken: async () => {
    // Implementação do checkToken se necessário
  },

  Login: async(email, password) => {
      const response = await fetch(`${BASE_API}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        console.log(response);
      }

      return await response.json();
  }
}
