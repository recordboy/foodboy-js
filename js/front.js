





var inputTxt = null,
    btn = null,
    tbl;
    
    inputTxt = document.getElementById('input-txt');
    btn = document.getElementById('btn');
    btn = document.getElementById('btn');

btn.addEventListener('click', function(){
    var val = inputTxt.value;

    if (val === '') {
        alert('입력하세요')
        return;
    }

    
    
    localStorage.setItem(val, val)


    addTbl(val)

})

function addTbl(val) {
    document.createElement()
}







