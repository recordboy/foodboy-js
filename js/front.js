
var input = null,
    btnAdd = null,
    btnAllDel = null,
    btnDel = null,
    btnSelect = null,
    listFood = null,
    selectSet = null,
    selectNum = 0,
    randomNum = 0,
    resuleNum = 0,
    eventState = false,
    moveNumNext = 0,
    moveNumPrev = 0;

input = document.getElementById('input-txt');
btnAdd = document.getElementById('btn-add');
btnAllDel = document.getElementById('btn-all-del');
btnSelect = document.getElementById('btn-select');
listFood = document.getElementById('list-food');

btnAdd.addEventListener('click', function () {
    if (!eventState) {
        var val = input.value;
        if (val === '') {
            alert('값을 입력해주세요.')
            return;
        }
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(val)) {
                alert('중복된 값입니다.')
                return;
            }
        }
        localStorage.setItem(val, val)
        addList(val)
        input.value = '';
    }
})

btnAllDel.addEventListener('click', function (e) {
    if (!eventState) {
        localStorage.clear()
        delAllList()
    }
})

listFood.addEventListener('click', function (e) {
    var idx = 0,
        target = null;
    if (!eventState) {
        if (e.target.classList[0] === 'btnDel') {
            for (var i = 0; i < listFood.children.length; i++) {
                if (listFood.children[i] == e.path[1]) {
                    target = listFood.children[idx];
                    listFood.removeChild(target)
                    localStorage.removeItem(e.target.previousSibling.data)
                }
                idx++;
            }
        }
    }
})

btnSelect.addEventListener('click', function (e) {
    if (!eventState) {
        moveInit()
        randomSelect()
    }
})

function addList(val) {
    var li = document.createElement('li');
    li.innerHTML = val + '<button type="button" class="btnDel">delete</button>';
    listFood.appendChild(li)
    btnDel = document.getElementsByClassName('btnDel');
}

function delAllList() {
    var len = listFood.children.length;
    for (var i = 0; i < len; i++) {
        listFood.removeChild(listFood.children[0])
    }
}

function getStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        addList(localStorage.key(i))
    }
}

function randomSelect() {
    if (localStorage.length <= 1) {
        alert('2개 이상 입력하세요.')
        return;
    }
    eventState = true;
    randomNum = Math.floor(Math.random() * localStorage.length) + 1;
    selectNum = randomNum;
    resuleNum = (randomNum + 30) % localStorage.length;
    selectPoint()
    setDisabled(true)
    console.log('result index : ' + resuleNum)
}

function selectPoint() {
    var reslutLen = listFood.children[resuleNum].textContent.length,
        result = listFood.children[resuleNum].textContent.substr(0, reslutLen - 6);
    if (selectNum === randomNum) {
        selectStart(10 + randomNum, 30)
    } else if (selectNum === 10 + randomNum) {
        selectStart(15 + randomNum, 60)
    } else if (selectNum === 15 + randomNum) {
        selectStart(20 + randomNum, 120)
    } else if (selectNum === 20 + randomNum) {
        selectStart(25 + randomNum, 240)
    } else if (selectNum === 25 + randomNum) {
        selectStart(30 + randomNum, 400)
    } else if (selectNum === 30 + randomNum) {
        setTimeout(function () {
            eventState = false;
            setDisabled(false)
            alert('야호 ~ ! ' + result + ' 당첨이다!')
            console.log('end')
        }, 400)
    }
}

function selectStart(point, spped) {
    selectSet = setInterval(function () {
        selectNum++;
        if (selectNum === point) {
            clearInterval(selectSet)
            selectPoint()
        }
        selectMove()
    }, spped)
}

function selectMove() {
    moveNumNext = selectNum % localStorage.length;
    if (moveNumNext === 0) {
        prev = localStorage.length - 1;
    }
    listFood.children[moveNumNext].classList.add('on')
    listFood.children[moveNumPrev].classList.remove('on')
    moveNumPrev = moveNumNext;
}

function moveInit() {
    listFood.children[moveNumNext].classList.remove('on')
    moveNumNext = 0;
    moveNumPrev = 0;
}

function setDisabled(bool) {
    var len = listFood.children.length;
    btnAdd.disabled = bool;
    btnAllDel.disabled = bool;
    btnSelect.disabled = bool;
    for (var i = 0; i < len; i++) {
        listFood.children[i].children[0].disabled = bool;
    }
}

getStorage()
