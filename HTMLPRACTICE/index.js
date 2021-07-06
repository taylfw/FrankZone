
//problem 1

  // function oddCouple(numberList) {
  //   let arr = [];
  //   for(let i = 0; i < numberList.length; i++){
  //     if(numberList[i] % 2 === 1){
  //       console.log(numberList[i]);
  //       let n = numberList[i]
  //       if (arr.length === 2){
  //         break
  //       } else{
  //         arr.push(n)
  //       }
  //     } 
  //   }
  //   console.log(arr);
  //   return arr
  // }


  // oddCouple([5, 2, 3, 1])

  //Problem 2

//   function myIncludes(arr, p){

//     let check;

//     for(let i = 0; i < arr.length; i++){
//       if(arr[i] === p){
//         check = true
//       }
//     }

//     if (check){
//       console.log(true);
//       return true
//     } else {
//       console.log(false);
//       return false
//     }
//   }
//   myIncludes([5, 2, 'a', 1], 2)
//   myIncludes(['f', 8, 2, 'blue'], 'z')

// //Problem 3

// function myLastIndexOf(arr, s) {
//   let check;
//   for (i = arr.length;  i >= 0; i--){
//     if(arr[i] === s){
//       console.log(arr.indexOf(arr[i]));
//       check = arr.indexOf(arr[i]);
//     }
//   }
//   if(check){
//     console.log(check);
//     return check;
//   } else {
//     console.log(-1);
//     return -1
//   }
// }

// myLastIndexOf([6, 55, 3, 7], 7)

//Problem 4

// function myReverse(arr) {
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++){
//   newArr.unshift(arr[i])
//   }
//   console.log(newArr);
//   return newArr;
// }
// myReverse([5, 2, 3, 1])
// myReverse([]);

//Problem 5

// function myUnshift(arr, add) {
//   newArr = [];
//   newArr.push(add)
//   for(i = 0; i < arr.length; i++){
//     newArr.push(arr[i])
//   }
//   console.log(newArr);
// }

// myUnshift([7, 2, 8, 1], 9)

// function oddFactorial(stoppingPoint) {
//   let arr = [];
//   let int;
//   if(stoppingPoint === 0){
//     return 1
//   }
//   for (let i = 0; i <= stoppingPoint; i++){
//     if(i % 2 === 1){
//       arr.push(i)
//     }
//   }
//   console.log(arr)
//   for(let i = 0; i < arr.length; i++){
//     let n = arr[i];
//     if(i !== 0){
//       console.log(int)
//       int = n * int;
//     } else {
//       int = n;
//     }
//   }
//   if (Math.sign(int) === -1){
//     console.log(null);
//     return null
//   } else{
//     console.log(int);
//     return int
//   }

  
  
// }

// oddFactorial(5)
// oddFactorial(Math.PI)

// oddFactorial(0)

// oddFactorial(-5)


function distinct(str){
  arr = str.split('')
  newArr = [];
  console.log(arr);
  for(let i = 0; i < arr.length; i++){
    if (arr[i] !== arr[i - 1]){
      newArr.push(arr[i])
    }
  }
  let word = newArr.join('')
  console.log(word.length);
}

distinct('foobaar')
console.log('-----');
console.log("distinct('foobaar')", distinct('foobaar'));//5