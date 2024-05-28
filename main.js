let UUID = '7b0bb360-7357-4f27-8c13-474005eccd8e'
let destinatario = 'todos'

//---------- Entrada de participante ----------
let usuario = {}

function nomeUsuario() {
    let nome = prompt('Digite seu nome:')
    usuario = {name: nome}
    entrarSala()
}

function entrarSala() {
  axios
    .post("https://mock-api.driven.com.br/api/v6/uol/participants/" + UUID, usuario)
    .then(response => {
      console.log('conectado')
      buscarMensagens()
      buscarParticipantes()
    })
    .catch(error => {
      alert('Nome de usuário existente, escolha outro!')
      nomeUsuario()
    })
}

setInterval(() => {
  axios
    .post('https://mock-api.driven.com.br/api/v6/uol/status/' + UUID, usuario)
    .then(response => console.log('mantendo conectado'))
    .catch(function (error) {
      console.error('Erro ao obter os dados:', error)
    })
}, 5000);


// ---------- Lista de Participantes ----------
let renderParticipantes = document.querySelector('.listaDeUsuarios')
let listaDeParticipantes = ["todos"]

function buscarParticipantes() {
  axios
    .get('https://mock-api.driven.com.br/api/v6/uol/participants/' + UUID)
    .then(response => {
      arrayDeParticipantes(response.data)
    })
    .catch(error => console.log('erro', error))
}

function arrayDeParticipantes(res) {
  res.forEach(element => {
    listaDeParticipantes.push(element.name)
  })
  renderListaDeParticipantes()
}

function renderListaDeParticipantes() {
  let participantes = ''
  for (let i = 0; i < listaDeParticipantes.length; i++) {
    if (listaDeParticipantes[i].toLowerCase() === 'todos') {
      participantes += `
        <li onclick="selecionarParticipante(this)">
        <ion-icon name="people"></ion-icon>
          <p>${listaDeParticipantes[i]}</p>
          <ion-icon name="checkmark-sharp" class="checkmark" id="${listaDeParticipantes[i]}"></ion-icon>
        </li>
      `
    } else {
      participantes += `
        <li onclick="selecionarParticipante(this)">
          <ion-icon name="person-circle"></ion-icon>
          <p>${listaDeParticipantes[i]}</p>
          <ion-icon name="checkmark-sharp" class="checkmark" id="${listaDeParticipantes[i]}"></ion-icon>
        </li>
      `
    }
  }

  renderParticipantes.innerHTML = participantes

  if (listaDeParticipantes.includes(destinatario)) {
    definirSelecionando(destinatario)
  } else {
    definirSelecionando('todos')
  }

  listaDeParticipantes = ["todos"]
}

function definirSelecionando(i) {
  let selecionado = document.querySelector(`#${i}`)
  console.log(selecionado)
  if (selecionado) {
    selecionado.classList.toggle('visible')
  }
}

setInterval(() => {
  buscarParticipantes()
}, 10000)

// ---------- Lista de Mensagens  ----------
let mensagemRenderizada = document.querySelector('.conteudo')
let mensagens = ''

function buscarMensagens() {
  axios
    .get('https://mock-api.driven.com.br/api/v6/uol/messages/' + UUID)
    .then(response => renderMensagens(response.data))
    .catch(error => console.log(error))
}

function renderMensagens(res) {
  res.forEach(element => {
    if (element.type === 'status') {
      mensagens += `
        <div class="divMensagem entrada">
          <p class="mensagem"><span class="data">(${element.time})</span> <span>${element.from}</span> ${element.text}</p>
        </div>
      `
    } else if (element.type === 'message'){
      mensagens += `
        <div class="divMensagem">
          <p class="mensagem"><span class="data">(${element.time})</span> <span>${element.from}</span> para <span>${element.to}</span>: ${element.text}</p>
        </div>
      `
    } else {
      mensagens += `
        <div class="divMensagem reservado">
          <p class="mensagem"><span class="data">(${element.time})</span> <span>${element.from}</span> reservadamente para <span>${element.to}</span>: ${element.text}</p>
        </div>
      `
    }
  });
   
  mensagemRenderizada.innerHTML = mensagens

  let scrollUltimaMensagem = mensagemRenderizada.lastElementChild;
  scrollUltimaMensagem.scrollIntoView();
}

setInterval(() => {
  buscarMensagens()
}, 3000)








//---------------------






function selecionarParticipante(participante) {
  let selecionado = document.querySelector('.checkmark.visible')
  let btnCheck = participante.querySelector('.checkmark')

  btnCheck.classList.toggle('visible')
  selecionado.classList.toggle('visible')

  destinatario = participante.querySelector('p').textContent
  
  console.log(participante)
  console.log(destinatario)
}

//Enviar mensagem


function enviarMensagem() {
  let mensagem = {
    from: usuario.name,
    to: destinatario,
    text: "mensagem teste 5",
    type: "private_message"
  }

  axios
    .post('https://mock-api.driven.com.br/api/v6/uol/messages/' + UUID, mensagem)
    .then(response => {
      buscarMensagens()
      console.log('mensagem enviada')
    })
    .catch(error => console.log('mensagem nao enviada'))
}

// setInterval(() => {
//   enviarMensagem()
// }, 6000);




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


//---------- Funções de inicialização ----------
nomeUsuario()