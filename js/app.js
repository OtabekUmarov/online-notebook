let array = []
let dataLink = 'chiqim'
let c = ''
let items = document.querySelector(`.${dataLink} .items`)

// navigator
let btns = document.querySelectorAll('.nav button')
let pages = document.querySelectorAll('.pages')
let titl = document.querySelector('.info .title')
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    dataLink = btn.getAttribute('data-link')
    document.querySelector('.nav button.active').classList.remove('active')
    btn.classList.add('active')
    titl.innerHTML  = dataLink
    document.querySelector('.pages.active').classList.remove('active')
    document.querySelector('.'+dataLink).classList.add('active')
    if (dataLink !== 'harajat') {
      items = document.querySelector(`.${dataLink} .items`)
      document.querySelector(`.nav button.${dataLink}_btn svg`).classList.remove('active')
      filtratsiya(dataLink)
      kirimSumma()
      chiqimSumma()
      load()
    }
  })  
});

if (localStorage.getItem('harajat')) {
  try {
    array = JSON.parse(localStorage.getItem('harajat'))
    filtratsiya(dataLink)
  } catch (error) {
    localStorage.removeItem('harajat')
  }
}

let obj = { 
  summa: '',
  kun: '',
  soat: '',
  eslatma: '',
  category: '',
  color: ''
}
let summa = 0
let eslatma = []
let color = ['red', 'blue', 'green','white']
let colorIndex = 0
let addInput = document.querySelector('.btn_input')
let box = document.querySelector('.pages.harajat .box')
let count = 1


addInput.addEventListener('click', () => {
  count ++
  let divInput  = document.createElement('div')
  divInput.classList.add('input')

  let divTitle  = document.createElement('div')
  divTitle.classList.add('title')
  divTitle.innerHTML = `${count} - summani kiriting` 

  divInput.appendChild(divTitle)

  let input = document.createElement('input')
  input.classList.add()
  input.setAttribute('type', 'text')
  input.setAttribute('onfocus', 'hide()')
  input.setAttribute('placeholder', `Summa ${count}`)
  divInput.appendChild(input)

  let textarea = document.createElement('textarea')
  textarea.setAttribute('placeholder', 'Ushbu pulingiz uchun eslatma')

  divInput.appendChild(textarea)

  box.appendChild(divInput)
})

// saqlash

let addBtn = document.querySelector('.add_btn')
let eslatmaText = document.querySelectorAll('.input textarea')
let sumInp = document.querySelectorAll('.input input')
addBtn.addEventListener('click', () => {
  let sumInp = document.querySelectorAll('.input input')
  let eslatmaText = document.querySelectorAll('.input textarea')
  let summa = 0
  sumInp.forEach(s => {
    if (s.value == '') {
      return false
    }
    summa += parseInt(s.value)
  })
  if (summa == 0 ) {
    document.querySelector('.danger2').classList.add('active')
    return false
  }
  eslatmaText.forEach(s => {
    eslatma.push(s.value)
  })
  let date = new Date()
  obj.summa = summa
  obj.kun = number(date.getDate()) + '.' + number(date.getMonth() + 1) + '.' + date.getFullYear()
  obj.eslatma = eslatma
  obj.soat = date.getHours() + ":" + number(date.getMinutes())
  let cat = document.querySelector('.cat_btn .btn.active').innerHTML.toLocaleLowerCase()
  obj.category =  cat
  obj.color = color[rand()]
  array.push(obj)
  localStorage.setItem('harajat',JSON.stringify(array))
  document.querySelector('.success').classList.add('active')
  document.body.classList.add('active')
  setTimeout(function(){
    sumInp.forEach(s => {
        s.value = ''
    })
    eslatmaText.forEach(s => {
      s.value = ''
    })
    obj = {
      summa: '',
      kun: '',
      soat: '',
      eslatma: '',
      category: '',
      color: ''
    }
    document.body.classList.remove('active')
    document.querySelector('.success').classList.remove('active')
    eslatma = []
    document.querySelector(`.nav button.${cat}_btn svg`).classList.add('active')
    document.querySelector('nav').classList.remove('hide')
  },400)
})
// show function
function show(arr){
  let counter = 0
  document.querySelector('.chiqim span').innerHTML = new Intl.NumberFormat().format(chiqimSumma()) + ' UZS' 
  document.querySelector('.kirim span').innerHTML = new Intl.NumberFormat().format(kirimSumma()) + ' UZS' 
  document.querySelector('#chiqimSumInfo span').innerHTML = new Intl.NumberFormat().format(chiqimSumma()) + ' UZS' 
  document.querySelector('#kirimSumInfo span').innerHTML = new Intl.NumberFormat().format(kirimSumma()) + ' UZS' 
  items.innerHTML = " "
  arr.forEach(item => {
    items.innerHTML += `
      <div class="item ${item.color}">
        <div class="item__sum">
        ${new Intl.NumberFormat().format(item.summa)} UZS
        </div>
        <div class="eslatma">Eslatma : ${item.eslatma.join(' ')}</div>
        <div class="date">
          <div class="kun">${item.kun}</div>
          <div class="soat">${item.soat}</div>
        </div>
      </div>  
    `
    counter ++
  })
}
// function del(index){
//   filtratsiya(dataLink).splice(index,1)
//   console.log(index);
// }

//textarea focus bolganda nav ni hide qilish
function hide(){
  document.querySelector('nav').classList.add('hide')
}
eslatmaText.forEach(s => {
  s.addEventListener('focus', ()=> {
    document.querySelector('nav').classList.add('hide')
  })
})
eslatmaText.forEach(s => {
  s.addEventListener('focusout', ()=> {
    document.querySelector('nav').classList.remove('hide')
  })
})
//input focus bolganda nav ni hide qilish
sumInp.forEach(s => {
  s.addEventListener('focus', ()=> {
    document.querySelector('nav').classList.add('hide')
  })
})
sumInp.forEach(s => {
  s.addEventListener('focusout', ()=> {
    document.querySelector('nav').classList.remove('hide')
  })
})

function number(n){
  let num = ''
  if(n < 10 ) num = '0' + n
  else num = n
  return num
}

function filter(arr) {
  arr.forEach(item => {
    if (item.category == 'kirim')
      kirimArray.push(item)
    else chiqimArray.push(item)
  })
}

// modal oyna
let modalBtn = document.querySelector('.open-modal')
let modal = document.querySelector('.modal')
modalBtn.addEventListener('click', () => {
  modalBtn.classList.toggle('active')
  modal.classList.toggle('active')
  document.body.classList.toggle('active')
})
//random function
function rand(){
  return parseInt(Math.random()*4)
}

// category btn
let catBtns = document.querySelectorAll('.cat_btn button')
catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.cat_btn .btn.active').classList.remove('active')
    btn.classList.add('active')
  })
})


function filtratsiya(dataLink) {
  let filterArray = array.filter(item => {
      return item.category == dataLink
  })
  show(filterArray)

  return filterArray
}
function kirimSumma(){
  let sum = 0
  array.filter(item => {
    if (item.category == 'kirim'){
      sum += item.summa
    }
  })
  return sum
}
function kirimLength(){
  let sum = 0
  array.filter(item => {
    if (item.category == 'kirim'){
      sum ++
    }
  })
  return sum
}
function chiqimLength(){
  let sum = 0
  array.filter(item => {
    if (item.category == 'chiqim'){
      sum ++
    }
  })
  return sum
}

function chiqimSumma(){
  let sum1 = 0
  array.filter(item => {
    if (item.category == 'chiqim'){
      sum1 += item.summa
    }
  })
  return sum1
}


// registratsiya 


let registr= []
let regBtn = document.querySelector('.reg_btn')
let regName = document.querySelector('.reg .name')
let regSurname = document.querySelector('.reg .surname')
let regParol = document.querySelector('.reg .parol')
let reg = document.querySelector('.reg')
let danger = document.querySelector('.danger')
let danger1 = document.querySelector('.danger1')
let check = document.querySelector('input[type=checkbox]')
let parolInp = document.querySelector('input[type=password]')
let code = document.querySelector('.code')

if(localStorage.getItem('registr')){
  try {
      code.classList.add('active')
      reg.classList.add('hide')
    registr = JSON.parse(localStorage.getItem('registr'))
  } catch (error) {
    localStorage.removeItem('registr')
  }
}

let saveName = ''
let saveSurname = ''
regBtn.addEventListener('click', ()=> {
  if(regName.value == '' || regSurname.value == '') {
    if(regName.value == '') {
      danger.classList.add('active')
    }
    if(regSurname.value == '') {
      danger1.classList.add('active')
    }
    return false
  }
  code.classList.add('active')

  saveName = regName.value
  savgSurname = regSurname.value
  registr.push(regName.value)
  registr.push(regSurname.value)
  registr.push(parolInp.value)
  localStorage.setItem('registr',JSON.stringify(registr))
  reg.classList.add('hide')
  registr = JSON.parse(localStorage.getItem('registr'))
  author()
})

check.addEventListener('focus', ()=>{
checkFunction()

})
function checkFunction(){
  if(check.checked == true) {
    parolInp.setAttribute('type', 'password')
  } 
  if(check.checked == false) {
    parolInp.setAttribute('type', 'text')
  } 
}

//code function

let codes = document.querySelectorAll('.code .btns button.codeBtn')
let codeView = document.querySelector('.code__view')
let codeHide = document.getElementById('codeHide')
let codeClear = document.getElementById('codeClear')
let codeNumber = ''

codes.forEach(code => {
  code.addEventListener('click', ()=> {
    codeView.classList.remove('error')
    if(document.querySelectorAll('.code__view span').length > 3) {
      return false
    }
    if (codeNumber.length < 4){
      codeNumber += code.innerHTML
    }
    c += code.innerHTML
    let span = document.createElement('span')
    span.innerHTML = code.innerHTML
    codeView.appendChild(span)
    
  })
})

let eye = 2
codeHide.addEventListener('click', ()=>{
  codeView.classList.toggle('active')
  if (eye % 2 == 0) {
    document.querySelector('.eye1.active').classList.remove('active')
    document.querySelector('.eye2').classList.add('active')
  }
  else {
    document.querySelector('.eye2.active').classList.remove('active')
    document.querySelector('.eye1').classList.add('active')
  }
  eye ++
})


codeClear.addEventListener('click', ()=>{
  codeView.innerHTML = ''
  c = ''
})

let ok = document.getElementById('ok')
ok.addEventListener('click',()=>{
  filtratsiya('chiqim')
  if(c == codeNumber) {
    code.classList.remove('active')
  }
  else {
    codeView.classList.add('error')
  }
  localStorage.setItem('password',JSON.stringify(codeNumber))
})
if(localStorage.getItem('password')){
  try {
    codeNumber = JSON.parse(localStorage.getItem('password'))
  } catch (error) {
    localStorage.removeItem('password')
  }
} 

 
if (codeNumber == ' ') {
  code.style.display = 'none'
}

let skip = document.querySelector('.skip')
skip.addEventListener('click',()=> {
  codeNumber = ' '
  localStorage.setItem('password',JSON.stringify(codeNumber))
  code.style.display = 'none'
  skip.style.display = 'none'
})

function author(){
  if(registr.length !== 0 ) {
    document.querySelector('.author').innerHTML = registr[0].split('')[0]
    document.querySelector('.modalAuthor').innerHTML = registr[0] + ' '+ registr[1]
    document.querySelector('.modalAuthor2').innerHTML = registr[0] + ' '+ registr[1]
  }
}
author()


let night = document.querySelector('.night')
night.addEventListener('click', ()=> {
  night.classList.toggle('active')
  document.body.classList.toggle('dark')
})

let lengthChiqim = document.querySelector('.lengthChiqim span')
let lengthKirim = document.querySelector('.lengthKirim span')
function load(){
  lengthKirim.innerHTML = kirimLength()
  lengthChiqim.innerHTML = chiqimLength()
}
load()


let closeInformation = document.querySelector('.close_information')
let information = document.querySelector('.information')
closeInformation.addEventListener('click', ()=>{
  information.classList.remove('active')
})

let authorBtn = document.querySelector('.info .author')
authorBtn.addEventListener('click', ()=>{
  information.classList.add('active')
})

let closeSozlama = document.querySelector('.closeSozlama')
let sozlama = document.querySelector('.sozlama')
let sozlamaOpen = document.querySelector('.sozlamaOpen')
sozlamaOpen.addEventListener('click', ()=>{
  sozlama.classList.add('active')
  modal.classList.remove('active')
  modalBtn.classList.remove('active')
  document.body.classList.remove('active')
})
closeSozlama.addEventListener('click', ()=>{
  sozlama.classList.remove('active')
  reg.classList.add('hide')
})


let changeInfo = document.querySelector('.changeInfo')

changeInfo.addEventListener('click', ()=> {
  reg.classList.remove('hide')
  document.querySelector('.reg .btitle').innerHTML = "Ma'lumotlar o'zgartirish"
  registr = []
})

let exit = document.querySelector('.exit')
exit.addEventListener('click', ()=>{
  localStorage.removeItem('registr')
  localStorage.removeItem('password')
  localStorage.removeItem('harajat')
  window.location.reload()
})


document.getElementById('start').addEventListener('click', ()=>{
  localStorage.removeItem('harajat')
  window.location.reload()
  filtratsiya(dataLink)
})