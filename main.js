let usuario = {}

function nomeUsuario() {
  let nome = prompt('Digite seu nome:')
  usuario = {name: nome}
  entrarSala()
}

nomeUsuario()

function entrarSala() {
  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/participants/7b0bb360-7357-4f27-8c13-474005eccd8e", usuario)
    .then(response => {
      console.log('conectado')
      buscarMensagens()
    })
    .catch(error => {
      alert('Nome de usuário existente, escolha outro!')
      nomeUsuario()
    })
}

//Manter conectado
setInterval(() => {
  axios
    .post('https://mock-api.driven.com.br/api/v6/uol/status/7b0bb360-7357-4f27-8c13-474005eccd8e', usuario)
    .then(response => console.log('mantendo conectado'))
    .catch(function (error) {
      console.error('Erro ao obter os dados:', error)
    })
}, 5000);



// menu de navegação
let menuBtn = document.querySelector('.menu') 
function menu() {
  menuBtn.classList.toggle('visible')
}
menuBtn.addEventListener('click', function (event) {
  if(event.target.localName === 'aside') {
    menuBtn.classList.toggle('visible')
  }
})



