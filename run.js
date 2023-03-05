let inputdir={x:0,y:0};
const foodsound= new Audio('food.mp3');
const gameover= new Audio('gameover.mp3');
const movesound= new Audio('move.mp3');
const musicsound =new Audio('music.mp3');
let score=0;
let speed=5;
let lastPageTime=0;
let snakearr=[
    {x :13,y:15
    }
    
]
food={x:6,y:7};
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime -lastPageTime)/1000 < 1/speed)
    {
        return;
    }
    lastPageTime=ctime;
    gameEngine();
    

}
function isCollide(sarr)
{
  //if u bump in your self
  for (let i = 1; i < snakearr.length; i++) {
    if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y)
    {
      return true;
    }
}
   //hit the border
    if(sarr[0].x >=18 || sarr[0].x <=0 || sarr[0].y >=18 || sarr[0].y <=0)
    {
        return true;
    }

}
function gameEngine(){
    //part 1: updating snak variable array and food
    if(isCollide(snakearr))
    {
        gameover.play();
        musicsound.pause();
        inputdir={x:0,y:0};
        alert("Game over press any key to play again");
        snakearr=[
            {x :13,y:15
            }
        ];
        musicsound.play();
        score=0;

    }
    //if yu hv the eaten then food inc score regarente food
    if(snakearr[0].y === food.y && snakearr[0].x === food.x)
    {   foodsound.play();
        score=score +1;
        if(score > highscoreval)
        {   highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highscore1.innerHTML ="Highscore :" + highscoreval;
        }
        score1.innerHTML="Score : " +score;
        snakearr.unshift({x: snakearr[0].x +inputdir.x ,y: snakearr[0].y +inputdir.y})
        let a=2;
        let b=16;
        food ={x:2 +Math.round(a+(b-a) * Math.random()) ,y:2 +Math.round(a+(b-a) * Math.random())}
    }
    //moving the snake
    for (let i = snakearr.length-2 ;i>=0;i--) {
       snakearr[i+1] = {...snakearr[i]};

        
        
    }
    snakearr[0].x +=inputdir.x;
    snakearr[0].y +=inputdir.y;

    // part 2: display the snake

    board.innerHTML="";
    snakearr.forEach((e,index)=>
    {
      snakeelem=document.createElement('div');
      snakeelem.style.gridRowStart= e.y;
      snakeelem.style.gridColumnStart= e.x;
      if(index === 0)
      {
        snakeelem.classList.add('snakehead');
      }
      else{
        snakeelem.classList.add('snakebody');
      }
      board.appendChild(snakeelem);

    });
        // part 2: display the food
        snakearr.forEach((e,index)=>
        {
          foodelem=document.createElement('div');
          foodelem.style.gridRowStart= food.y;
          foodelem.style.gridColumnStart= food.x;
          foodelem.classList.add('snakefood')
          board.appendChild(foodelem);
    
        })

}














//main logic
musicsound.play();
let highscore=localStorage.getItem("highscore");
if(highscore === null)

{   highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    highscore1.innerHTML ="Highscore :" +highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>
{
    inputdir={x:0,y:1} //start the game 
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x= 0;
            inputdir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x=0;
            inputdir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x= -1;
            inputdir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x=1;
            inputdir.y=0;
            break;
    
        default:
            break;
    }
})








