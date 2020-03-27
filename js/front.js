
var input = null,
    btnAdd = null,
    btnAllDel = null,
    btnDel = null,
    btnSelect = null,
    tbl = null,
    selectSet = null,
    selectNum = 0;

input = document.getElementById('input-txt');
btnAdd = document.getElementById('btn-add');
btnAllDel = document.getElementById('btn-all-del');
btnSelect = document.getElementById('btn-select');
tbl = document.getElementById('tbl');

btnAdd.addEventListener('click', function () {
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
})

btnAllDel.addEventListener('click', function (e) {
    localStorage.clear()
    delAllTbl()
})

tbl.addEventListener('click', function (e) {
    var trIdx = 0,
        trTarget = null;
    if (e.target.classList[0] === 'btn-del') {
        trIdx = e.path[2].rowIndex;
        trTarget = tbl.children[trIdx];
        tbl.removeChild(trTarget);
        localStorage.removeItem(e.target.previousSibling.data)
    }
})
btnSelect.addEventListener('click', function (e) {
    selectPoint()
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

function selectPoint() {
    if (selectNum === 0) {
        selectStart(10, 25)
    } else if (selectNum === 10) {
        selectStart(15, 50)
    } else if (selectNum === 15) {
        selectStart(20, 100)
    } else if (selectNum === 20) {
        selectStart(25, 250)
    } else if (selectNum === 30) {
        selectStart(33, 500)
    } else if (selectNum === 33) {
        selectStart(35, 1000)
    }
}

function selectStart(point, spped) {
    selectSet = setInterval(function () {
        selectNum++;
        if (selectNum === point) {
            clearInterval(selectSet)
            selectPoint()
        }
        console.log(selectNum)
    }, spped)
}



getStorage()





