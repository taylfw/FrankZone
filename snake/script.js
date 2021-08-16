
let column = 0;
let row = 0;
let score = 0;

function makeGrid(){
    const arr = [];
    for (let i = 0; i < 256; i++) {
      if(i % 16 === 0){
        row++;
        column = 1;
        arr[1] = row;
        arr[0] = column;  
      } else {
        column++
        arr[1] = row;
        arr[0] = column;
      }
      $(".grid").append(`<div class="cell" id="${[column, row]}"></div>`);
    }
  }
  
  let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [0, 0]
  };

  let gameState = {
    apple: [10, 11],
    snake: snake 
  };

  function makeSnake(obj){
    let x = obj['body'];
    for (let i = 0; i < x.length; i++){
      let bodyPart = x[i].join(',');
      let s = document.getElementById(`${bodyPart}`);

      if(s){
        s.style.background = 'green';
      }
      
    };
  };

  function makeApple(obj){
    let x = obj['apple'].join(',')
    let a = document.getElementById(`${x}`);
    a.style.background = 'radial-gradient( rgb(195, 18, 13), rgb(150, 5, 39), rgb(81, 136, 143))'
  }

  // function backgroundInit(){
  //   let x = obj['body'];
    
  // }

  let go
  
  
  

document.addEventListener('keydown', function(e){
  if(e.key === 's'){
    snake['nextDirection'] = [0, 1]
    myStopFunction() 
    go =  setInterval(move, 100)
  }
})
document.addEventListener('keydown', function(e){
  if(e.key === 'w'){
    snake['nextDirection'] = [0, -1]
    myStopFunction() 
    go =  setInterval(move, 100)
  }
})
document.addEventListener('keydown', function(e){
  if(e.key === 'd'){ 
    snake['nextDirection'] = [1, 0]
    myStopFunction() 
    go =  setInterval(move, 100)
  }
})
document.addEventListener('keydown', function(e){
  if(e.key === 'a'){
    snake['nextDirection'] = [-1, 0]
    myStopFunction() 
    go =  setInterval(move, 100)
  }
})


//secret pause button for troubleshooting. 
document.addEventListener('keydown', function(e){
  if(e.key === 't'){
    myStopFunction()
  }
})

function myStopFunction() {
  clearInterval(go)
  
}

  
    function move(){
      const bodArr = [];
      let apple = gameState['apple'];
      let nD = snake['nextDirection'];
      let x = snake['body'];
      let tail = x[0];
      let head = x[x.length - 1];
      let a = document.getElementById(`${tail}`)
      
      if(apple.join('') === head.join('')){
        gameState['apple'] = numbGen(2);

        //checking to see if new apple generated on snakes body.
        for (let i = 0; i < x.length +1; i++){
          if (gameState['apple'] !== x[i] || gameState['apple'] !== tail){
          
            makeApple(gameState);
          } else {
            gameState['apple'] = numbGen(2);
            
            makeApple(gameState);
          }
        }
        
        
        
        x.push([head[0]+ nD[0], head[1] + nD[1]]) 
        makeSnake(snake)
        score++
        $('.points').text(`Score: ${score}`)
      } else{
        x.shift(tail)
        a.style.background = 'rgb(81, 136, 143)'
        x.push([head[0]+ nD[0], head[1] + nD[1]]) 
        
        makeSnake(snake)
        
      }

      //check if the snake runs off the board.
      for (let i = 0; i < x.length +1; i++){
       
        if(head[0] < 1 || head[0] > 16 || head[1] < 1 || head[1] > 16 ){
          myStopFunction()
          
          $('.gameEnd').text(`Your score is ${score}!  Press F5 to try again...`)
        }
      }
      //check for snake running into itself.
      for(let i = 0; i < x.length; i++){
        bodArr.push(x[i])
        bodArr.sort();
               
      }
      
      for(let i = 0; i < bodArr.length; i++){
        let tempIndex = bodArr[i].join(',')
        let tempIndex2 = bodArr[i + 1].join(',')
        
        if(tempIndex === tempIndex2){
          myStopFunction();
          $('.gameEnd').text(`Your score is ${score}!  Press F5 to try again...`)
        }
               
      }
      
  }
   


function numbGen(n){
  const numArr = [];
  for(let i = 0; i < n; i++){
      let x = Math.round(Math.random() * 15 + 1) 
      
        numArr.push(x);
      
      
  }
  
  return numArr;
}
   
      
 
  
    
  
  makeGrid();
  makeSnake(snake);
  makeApple(gameState);