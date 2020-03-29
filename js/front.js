/*
 * @object name: 추후 객체 지정 예정
 * @info: 점심시간 식당 랜덤 선택 스크립트
 * @date: 2020-03-29
 * @author: 기록맨
 */

var input = null,
    btnAdd = null,
    btnAllDel = null,
    btnDel = null,
    btnMix = null,
    btnSelect = null,
    listFood = null,
    selectSet = null,
    selectNum = 0,
    randomNum = 0,
    resuleNum = 0,
    moveNumNext = 0,
    moveNumPrev = 0;

input = document.getElementById('input-txt');
btnAdd = document.getElementById('btn-add');
btnAllDel = document.getElementById('btn-all-del');
btnMix = document.getElementById('btn-mix');
btnSelect = document.getElementById('btn-select');
listFood = document.getElementById('list-food');

btnAdd.addEventListener('click', function () {
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
})

btnAllDel.addEventListener('click', function (e) {
    localStorage.clear()
    delAllList()
})

listFood.addEventListener('click', function (e) {
    var idx = 0,
        target = null;
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
})

btnMix.addEventListener('click', function (e) {
    listMix(listFood.children.length)
})

btnSelect.addEventListener('click', function (e) {
    moveInit()
    randomSelect()
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

function listMix(len) {
    var arr = [],
        newArr = [],
        ranIdx = 0,
        ran = 0,
        target = 0;
    listFood.children[moveNumPrev].classList.remove('on')
    for (var i = 0; i < len; i++) {
        arr.push(i)
    }
    console.log(arr)
    for (var j = 0; j < len; j++) {
        ranIdx = Math.floor((Math.random() * arr.length))
        ran = arr[ranIdx]
        if (arr.indexOf(ran) !== -1) {
            target = arr.indexOf(ran)
            arr.splice(target, 1)
            newArr.push(ran)
        }
        listFood.appendChild(listFood.children[newArr[j]])
    }
    console.log(newArr)
    // // 랜덤 섞기
    // var arr = [1, 2, 3, 4, 5],
    //     newArr = [],
    //     len = arr.length,
    //     ranIdx = 0,
    //     ran = 0,
    //     target = 0;

    // console.log(arr)
    // for (var i = 0; i < len; i++) {
    //     ranIdx = Math.floor((Math.random() * arr.length))
    //     ran = arr[ranIdx]
    //     if (arr.indexOf(ran) !== -1) {
    //         target = arr.indexOf(ran);
    //         arr.splice(target, 1)
    //         newArr.push(ran)
    //     }
    // }
    // console.log(newArr)
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
            setDisabled(false)
            alert(result + ' 가시죠!')
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
    moveNumNext = 0;
    moveNumPrev = 0;
}

function setDisabled(bool) {
    var len = listFood.children.length;
    btnAdd.disabled = bool;
    btnAllDel.disabled = bool;
    btnMix.disabled = bool;
    btnSelect.disabled = bool;
    for (var i = 0; i < len; i++) {
        listFood.children[i].children[0].disabled = bool;
    }
}

getStorage()
