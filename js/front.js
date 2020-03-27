
var input = null,
    btnAdd = null,
    btnAllDel = null,
    btnDel = null,
    tbl = null;

input = document.getElementById('input-txt');
btnAdd = document.getElementById('btn-add');
btnAllDel = document.getElementById('btn-all-del');
tbl = document.getElementById('tbl');

btnAdd.addEventListener('click', function () {
    var val = input.value;
    if (val === '') {
        alert('입력 X')
        return;
    }
    for (var i = 0;i < localStorage.length; i++) {
        if (localStorage.getItem(val)) {
            alert('중복')
            return;
        }
    }
    localStorage.setItem(val, val)
    addTbl(val)
    input.value = '';
})

btnAllDel.addEventListener('click', function(e){
    localStorage.clear()
    delAllTbl()
})

tbl.addEventListener('click', function(e){
    var trIdx = 0,
        trTarget = null;
    if (e.target.classList[0] === 'btn-del') {
        trIdx = e.path[2].rowIndex;
        trTarget = tbl.children[trIdx];
        tbl.removeChild(trTarget);
        localStorage.removeItem(e.target.previousSibling.data)
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

function getStorage(){
    for (var i = 0; i < localStorage.length; i++) {
        addTbl(localStorage.key(i))
    }
}

getStorage()





