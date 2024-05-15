
let menuBtn = document.querySelector('.menu') 
function menu() {
  menuBtn.classList.toggle('visible')
}

document.addEventListener('click', function (event) {
  if(event.target.localName == 'aside') {
    menuBtn.classList.toggle('visible')
  }
})