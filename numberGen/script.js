'use strict'

//Takes user input and generates random number.
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
//Prompt user
const n = prompt('Please enter the length of your desired random number.');


//The input can't be greater than 14 characters long. 
if (n > 14){
    document.querySelector('h1').textContent = `That's too long, sorry!`
} else {
    document.querySelector('h1').textContent = numbGen(n);

}

