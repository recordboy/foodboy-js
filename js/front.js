





var inputTxt = null,
    btnAdd = null,
    btnAllDel = null,
    btnDel = null,
    tbl = null;

inputTxt = document.getElementById('input-txt');
btnAdd = document.getElementById('btn-add');
btnAllDel = document.getElementById('btn-all-del');
tbl = document.getElementById('tbl');


getStorage()


btnAdd.addEventListener('click', function () {
    var val = inputTxt.value;

    if (val === '') {
        alert('입력 X')
        return;
    }

    localStorage.setItem(val, val)
    addTbl(val)

})

btnAllDel.addEventListener('click', function(){
    localStorage.clear()
    delAllTbl()
})

btnAllDel.addEventListener('click', function(){
    localStorage.clear()
    delAllTbl()
})



function addTbl(val) {

    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + val + '<button type="button" id="btn-del">delete</button></td>';
    tbl.appendChild(tr)


    // var tr = document.createElement('tr'),
    //     td = document.createElement('td'),
    //     txt = document.createTextNode(val),
    //     btnDel = document.createElement('button');
    //     btnDelTxt = document.createTextNode('delete');

    //     btnDel.type = 'button';
    //     btnDel.classList = 'btn-del';

    // td.appendChild(txt)
    // td.appendChild(btnDel)
    // btnDel.appendChild(btnDelTxt)
    // tr.appendChild(td)
    // tbl.appendChild(tr)

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






