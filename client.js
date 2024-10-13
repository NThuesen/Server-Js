const axios = require("axios");
// axios
//   .get("https://catfact.ninja/fact")
//   .then((response) => console.log(response.data.fact));

// send a POST request
// Função para obter o token de acesso
axios({
  method: 'post',
  url: 'https://tecweb-js.insper-comp.com.br/token',
  data: { username: "nicholasnt" },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
.then(response => {
  console.log('Token de acesso:', response.data.accessToken);
})
.catch(error => {
  console.error('Erro ao obter o token:', error);
});