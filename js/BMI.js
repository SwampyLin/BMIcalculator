//DOM
let cm = document.querySelector('.cm')
let kg = document.querySelector('.kg')
let list = document.querySelector('.list')
let send = document.querySelector('.send')
let report = document.querySelector('.report')
let total = [] //儲存資料用的陣列

//btn是由JS渲染出的，必須在渲染出現後才能對其進行監聽
window.onload = function () {
  let btn = document.querySelector('.send')
  btn.addEventListener('click', sendData, false)
}

//時間
let time = new Date()
//console.log(time.getDate())
//console.log(time.getMonth() + '-' + time.getDate() + '-' + time.getFullYear())

function sendData() {
  //檢查是否為空白
  if (cm.value === '' || kg.value === '') {
    alert('身高體重不得為空白')
    return
  }
  //console.log(typeof cm.value) //抓到的是字串
  //將字串數字化、取整
  let status = ''
  let statusC = ''
  let cmNumber = parseInt(cm.value).toFixed(0)
  let kgNumber = parseInt(kg.value).toFixed(0)
  let BMI = (kgNumber / [(cmNumber / 100) * (cmNumber / 100)]).toFixed(2)
  //console.log(BMI)
  if (BMI < 18.5) {
    status = 'Underweight'
    statusC = '過輕'
  } else if (BMI >= 18.5 && BMI < 24) {
    status = 'Normal'
    statusC = '理想'
  } else if (BMI >= 24 && BMI < 27) {
    status = 'Overweight'
    statusC = '過重'
  } else if (BMI >= 27 && BMI < 30) {
    status = 'MildObesity'
    statusC = '輕度肥胖'
  } else if (BMI >= 30 && BMI < 35) {
    status = 'ModerateObesity'
    statusC = '中度肥胖'
  } else if (BMI >= 35) {
    status = 'SevereObesity'
    statusC = '重度肥胖'
  } else {
    alert('請輸入數字')
    return
  }
  //先判斷結果
  switch (status) {
    case 'Underweight':
      changeButton(BMI, status, statusC)
      break
    case 'Normal':
      changeButton(BMI, status, statusC)
      break
    case 'Overweight':
      changeButton(BMI, status, statusC)
      break
    case 'MildObesity':
      changeButton(BMI, status, statusC)
      break
    case 'ModerateObesity':
      changeButton(BMI, status, statusC)
      break
    case 'SevereObesity':
      changeButton(BMI, status, statusC)
      break
  }

  //再將結果存入localStorage
  let data = {}
  data.bmi = BMI
  data.kg = kgNumber
  data.cm = cmNumber
  data.status = status
  data.statusC = statusC
  //時間的格式月-日-年
  data.time = time.getMonth() + '-' + time.getDate() + '-' + time.getFullYear()
  total.push(data) //將物件新增到空陣列中
  //把陣列放入localStorage中，需要字串化
  localStorage.setItem('BMI', JSON.stringify(total))
  updateList()
}
//將送出按鈕切換為BMI結果
function changeButton(BMI, status, statusC) {
  send.innerHTML = ''
  report.innerHTML = `<div class="report-pic pic${status}"><input type="button" value="${BMI}" class="btn">
  <p class="report-BMI BMI${status}">BMI</p>
  <div class="loop loop${status}"><img src="img/bmi/icons_loop.png" alt="icon-loop"></div>
</div>
<div class="report-text report${status}">
  <p>${statusC}</p>
</div>`
  let loop = document.querySelector('.loop')
  loop.addEventListener('click', updateButton, false)
}

//渲染出有紀錄過的BMI
function updateList() {
  let array = JSON.parse(localStorage.getItem('BMI'))
  //console.log(array[0].kg)//array是陣列
  let str = ''
  for (let i = 0; i < array.length; i++) {
    str += `<div class="record"><div class="record-comment">
    <div class="bar bar${array[i].status}" data-num="${i}"></div>
    <div class="comment">
      <p>${array[i].statusC}</p>
    </div>
  </div>
  <div class="record-BMI">
    <p><span>BMI</span>${array[i].bmi}</p>
  </div>
  <div class="record-kg">
    <p><span>weight</span>${array[i].kg}</p>
  </div>
  <div class="record-cm">
    <p><span>height</span>${array[i].cm}</p>
  </div>
  <div class="record-time">
    <p><span>${array[i].time}</span></p>
  </div>
  <div class="eliminate"><a href="">刪除</a></div></div>`
  }
  list.innerHTML = str
  let content = document.querySelector('.content')
  content.addEventListener('click', eliminate, false)
}

function updateButton() {
  report.innerHTML = ''
  send.innerHTML = `<input type="button" value="看結果" class="btn">`
}
function eliminate(e) {
  e.preventDefault
  if (e.target.nodeName !== 'A') {
    return
  }
  let array = JSON.parse(localStorage.getItem('BMI'))
  //console.log(array)//確認取出為陣列
  array.splice(e.target.dataset.num, 1)
  localStorage.setItem('BMI', JSON.stringify(array))
  updateList()
}

updateButton()
updateList()
