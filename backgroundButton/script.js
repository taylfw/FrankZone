function numbGen(n){
   
    const numArr = [];
    for(let i = 0; i < n; i++){
        let x = Math.round(Math.random() * 255)
        numArr.push(x);
    }
    
    return numArr.join('');
}

function rgbGen(){
    let r = numbGen(1);
    let g = numbGen(1);
    let b = numbGen(1);
    return `rgb(${r}, ${g}, ${b})`

}

$('button').click(function(){
    let first = rgbGen();
    let second = rgbGen();
    let deg = numbGen(1);
    
   

    $('body').css('background', `linear-gradient(${deg}deg, ${first}, ${second}`)

    $('code').text(`background: linear-gradient(${deg}deg, ${first}, ${second})`)
    $('title').text('Not So boring!')
    $('h2').text('If you like the background, copy and paste the above into your css file! Else if (keep clicking)')

   


})