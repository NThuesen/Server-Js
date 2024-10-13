const axios = require("axios");
// axios
//   .get("https://catfact.ninja/fact")
//   .then((response) => console.log(response.data.fact));

async function submeterResposta(slug, resposta,accessToken) {
  try {
    const url = `https://tecweb-js.insper-comp.com.br/exercicio/${slug}`;

    const response = await axios({
      method: 'post',
      url: url,
      data: {
        resposta: resposta
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log(`Resposta para o exercício ${slug} submetida com sucesso!`);
    console.log('Resposta do servidor:', response.data);

  } catch (error) {
    console.error(`Erro ao submeter a resposta do exercício ${slug}:`, error);
  }
}


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
  const accessToken = response.data.accessToken;

  // Faz a requisição para obter os exercícios
  axios({
    method: 'get',
    url: 'https://tecweb-js.insper-comp.com.br/exercicio',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    const lista_exercicios = response.data;
    console.log('Exercícios:', lista_exercicios);
    // exercicio 1
    const resposta_soma = lista_exercicios.soma.entrada.a + lista_exercicios.soma.entrada.b
    submeterResposta('soma', resposta_soma, accessToken);
    // exercicio 2
    const string = lista_exercicios['tamanho-string'].entrada.string;
    const tamanho_string = string.length;
    submeterResposta('tamanho-string', tamanho_string, accessToken)
    // exercicio 3
    const email = lista_exercicios['nome-do-usuario'].entrada.email;
    const nome_do_usuario = email.split('@')[0];
    submeterResposta('nome-do-usuario', nome_do_usuario, accessToken);
    // exercicio 4
    const v = lista_exercicios['jaca-wars'].entrada.v;
    const theta = lista_exercicios['jaca-wars'].entrada.theta;
    const g = 9.8;
    const radianos = (theta * Math.PI) / 180;
    const distancia = (v ** 2 * Math.sin(2 * radianos)) / g;
    let resultado_jaca_wars;
    if (distancia < 98) {
      resultado_jaca_wars = -1; 
    } else if (distancia > 102) {
      resultado_jaca_wars = 1;   
    } else {
      resultado_jaca_wars = 0;  
    }
    submeterResposta('jaca-wars', resultado_jaca_wars, accessToken);

    // exercicio 5
    const ano = lista_exercicios['ano-bissexto'].entrada.ano;

    let resposta_bissexto;
    if ((ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0)) {
      resposta_bissexto = true;  // Ano bissexto
    } else {
      resposta_bissexto = false;  // Não é ano bissexto
    }
    submeterResposta('ano-bissexto', resposta_bissexto, accessToken);

    //exercicio 6
    const z = lista_exercicios['volume-da-pizza'].entrada.z;
    const a = lista_exercicios['volume-da-pizza'].entrada.a;
    const volume = Math.PI * z ** 2 * a;
    const volume_arredondado = Math.round(volume);
    submeterResposta('volume-da-pizza', volume_arredondado, accessToken);

    //exercicio 7
    const s0 = lista_exercicios.mru.entrada.s0; 
    const velocidade = lista_exercicios.mru.entrada.v;    
    const t = lista_exercicios.mru.entrada.t;    
    const posicao_final = s0 + velocidade * t;
    submeterResposta('mru', posicao_final, accessToken);

    //exercicio 8
    const stringEntrada = lista_exercicios['inverte-string'].entrada.string;
    const string_invertida = stringEntrada.split('').reverse().join('');
    submeterResposta('inverte-string', string_invertida, accessToken);

    //exercicio 9
    const objeto = lista_exercicios['soma-valores'].entrada.objeto;
    const soma_valores = Object.values(objeto).reduce((acc, valor) => acc + valor, 0);
    submeterResposta('soma-valores', soma_valores, accessToken);

    // exercicio 10
    function ehPrimo(num) {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    }

    const n = lista_exercicios['n-esimo-primo'].entrada.n;
    let count = 0;
    let num = 1;
    let nesimoPrimo;

    while (count < n) {
      num++;
      if (ehPrimo(num)) {
        count++;
      }
    }

    nesimoPrimo = num;
    submeterResposta('n-esimo-primo', nesimoPrimo, accessToken);

    // exercicio 11
    const strings_ex11 = lista_exercicios['maior-prefixo-comum'].entrada.strings;

    function encontrarMaiorPrefixoComum(strings_ex11) {
      const counts = {};

      // Gerar todos os prefixos de todas as strings e contar suas ocorrências
      for (const s of strings_ex11) {
        for (let i = 1; i <= s.length; i++) {
          const prefixo = s.slice(0, i);
          counts[prefixo] = (counts[prefixo] || 0) + 1;
        }
      }

      let maiorPrefixo = '';

      // Encontrar o prefixo de maior comprimento que ocorre em pelo menos duas strings
      for (const prefixo in counts) {
        if (counts[prefixo] >= 2) {
          if (prefixo.length > maiorPrefixo.length) {
            maiorPrefixo = prefixo;
          } else if (prefixo.length === maiorPrefixo.length && prefixo < maiorPrefixo) {
            // Em caso de empate, escolher o prefixo lexicograficamente menor
            maiorPrefixo = prefixo;
          }
        }
      }

      return maiorPrefixo;
    }

    const maiorPrefixoComum = encontrarMaiorPrefixoComum(strings_ex11);
    submeterResposta('maior-prefixo-comum', maiorPrefixoComum, accessToken);



    // exercicio 12
    const numeros = lista_exercicios['soma-segundo-maior-e-menor-numeros'].entrada.numeros;
    const numerosOrdenados = [...numeros].sort((a, b) => a - b);
    const segundoMenor = numerosOrdenados[1];
    const segundoMaior = numerosOrdenados[numerosOrdenados.length - 2];
    const soma = segundoMenor + segundoMaior;
    submeterResposta('soma-segundo-maior-e-menor-numeros', soma, accessToken);

    // exercicio 13
    const palavras = lista_exercicios['conta-palindromos'].entrada.palavras;
    function ehPalindromo(palavra) {
      return palavra === palavra.split('').reverse().join('');
    }

    let contaPalindromos = 0;
    for (const palavra of palavras) {
      if (ehPalindromo(palavra)) {
        contaPalindromos++;
      }
    }
    submeterResposta('conta-palindromos', contaPalindromos, accessToken);

    // exercicio 14
    const strings_ex14 = lista_exercicios['soma-de-strings-de-ints'].entrada.strings;
    const soma_ex14 = strings_ex14.map(Number).reduce((acc, valor) => acc + valor, 0);
    submeterResposta('soma-de-strings-de-ints', soma_ex14, accessToken);

    // exercicio 15
    const endpoints = lista_exercicios['soma-com-requisicoes'].entrada.endpoints;
    async function calcularSomaComRequisicoes(endpoints, accessToken) {
      let soma_ex15 = 0;
      for (let i = 0; i < endpoints.length; i++) {
        const response = await axios.get(endpoints[i], {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        soma_ex15 += response.data;  
      }
      submeterResposta('soma-com-requisicoes', soma_ex15, accessToken);
    }

    calcularSomaComRequisicoes(endpoints, accessToken);

    // exercicio 16
    const urlInicial = lista_exercicios['caca-ao-tesouro'].entrada.inicio;

    async function encontrarTesouro(url, accessToken) {
      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}` 
          }
        });

        const data = response.data;

        if (typeof data === 'string' && data.startsWith('http')) {
          // Se a resposta for uma URL, seguimos para a próxima
          console.log(`Seguindo para: ${data}`);
          await encontrarTesouro(data, accessToken);
        } else {
          // Se a resposta for um número, encontramos o tesouro
          console.log(`Tesouro encontrado: ${data}`);
          submeterResposta('caca-ao-tesouro', data, accessToken);
        }
      } catch (error) {
        console.error('Erro ao buscar o tesouro:', error);
      }
    }

    encontrarTesouro(urlInicial, accessToken);

  });
});


