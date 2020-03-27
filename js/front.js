
var input = null,
    btnAdd = null,
    btnAllDel = null,
    btnDel = null,
    btnSelect = null,
    tbl = null,
    selectSet = null,
    selectNum = 0,
    randomNum = 0,
    eventState = false;
    moveNumNext = 0,
    moveNumPrev = 0;

input = document.getElementById('input-txt');
btnAdd = document.getElementById('btn-add');
btnAllDel = document.getElementById('btn-all-del');
btnSelect = document.getElementById('btn-select');
tbl = document.getElementById('tbl');

btnAdd.addEventListener('click', function () {
    if (!eventState) {
        var val = input.value;
        if (val === '') {
            alert('입력 X')
            return;
        }
        for (var i = 0; i < localStorage.length; i++) {
            if (localStorage.getItem(val)) {
                alert('중복')
                return;
            }
        }
        localStorage.setItem(val, val)
        addTbl(val)
        input.value = '';
    }
})

btnAllDel.addEventListener('click', function (e) {
    if (!eventState) {
        localStorage.clear()
        delAllTbl()
    }
})

tbl.addEventListener('click', function (e) {
    if (!eventState) {
        var trIdx = 0,
            trTarget = null;


        if (e.target.classList[0] === 'btn-del') {
            trIdx = e.path[2].rowIndex;
            trTarget = tbl.children[trIdx];
            tbl.removeChild(trTarget);
            localStorage.removeItem(e.target.previousSibling.data)
        }
    }
})

btnSelect.addEventListener('click', function (e) {
    if (!eventState) {
        moveInit()
        randomSelect()
    }
})

function addTbl(val) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + val + '<button type="button" class="btn-del">delete</button></td>';
    tbl.appendChild(tr)
    btnDel = document.getElementsByClassName('btn-del');
}

function delAllTbl() {
    var len = tbl.children.length;
    for (var i = 0; i < len; i++) {
        tbl.removeChild(tbl.children[0])
    }
}

function getStorage() {
    for (var i = 0; i < localStorage.length; i++) {
        addTbl(localStorage.key(i))
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
    selectPoint()
    setDisabled(true)
    console.log('result index : ' + (randomNum + 30) % localStorage.length)
}

function selectPoint() {
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
        setTimeout(function(){
            eventState = false;
            setDisabled(false)
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
        tbl.children[moveNumNext].children[0].style.backgroundColor = '#ccc'
        tbl.children[moveNumPrev].children[0].style.backgroundColor = '#fff'
        moveNumPrev = moveNumNext;
}

function moveInit() {
    tbl.children[moveNumNext].children[0].style.backgroundColor = '#fff'
    moveNumNext = 0,
    moveNumPrev = 0;

}

function setDisabled(bool) {
    var len = tbl.children.length;
    btnAdd.disabled = bool;
    btnAllDel.disabled = bool;
    btnSelect.disabled = bool;
    for (var i = 0; i < len; i++) {
        tbl.children[i].children[0].children[0].disabled = bool
    }
}

getStorage()
