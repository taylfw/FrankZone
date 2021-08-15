'use strict'

function numbGen(n){
   
    const numArr = [];
    for(let i = 0; i < n; i++){
        let x = Math.round(Math.random() * 9)
        console.log(x);
        numArr.push(x);
    }
    console.log(numArr);
    console.log(numArr.join(''));
    return numArr.join('');
}

//This next function makes a random phone number if n is 10;
function phoneGen(n){
    
    const numArr = [];
    for(let i = 0; i < n; i++){
        let x = Math.round(Math.random() * 9)
        console.log(x);
        numArr.push(x);
    }
    numArr.splice(0, 0, '(')
    numArr.splice(4, 0, ')')
    numArr.splice(5, 0, ' ')
    numArr.splice(9, 0, '-')
    console.log(numArr);
    return numArr.join('');
}

//This is my comment
let n = prompt('Please enter the length of your desired random number. Less than 15, please. :)');

if (n > 14){
    document.querySelector('h1').textContent = `That's too long, sorry!`;
} else if (n == 10){
    document.querySelector('h1').textContent = phoneGen(n);
} else{
    document.querySelector('h1').textContent = numbGen(n);
}