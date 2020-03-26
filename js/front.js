





var inputTxt = null,
    btn = null,
    tbl;
    
    inputTxt = document.getElementById('input-txt');
    btn = document.getElementById('btn');
    tbl = document.getElementById('tbl');

btn.addEventListener('click', function(){
    var val = inputTxt.value;

    if (val === '') {
        alert('입력 X')
        return;
    }

    
    
    localStorage.setItem(val, val)

    

    
    
    
    
    for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.key(i));

    }





    // addTbl(val)

})

function addTbl(val) {
    var tr = document.createElement('tr'),
        td = document.createElement('td'),
        txt = document.createTextNode(val);

        td.appendChild(txt)
        tr.appendChild(td)
        tbl.appendChild(tr)
    
}







