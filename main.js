"use strict";

`


You Lose


`
let options={
    paper :{optionClass:'pentagon-paper',src:"./images/icon-paper.svg"},
    scissors:{optionClass:'pentagon-scissors',src:"./images/icon-scissors.svg"},
    rock:{optionClass:'pentagon-rock',src:"./images/icon-rock.svg"},
    lizard:{optionClass:'pentagon-lizard',src:"./images/icon-lizard.svg"},
    spock:{optionClass:'pentagon-spock',src:"./images/icon-spock.svg"},
}
// --------result of comparision with person row and home column
// ------------positive +1 means person win and negative -1 means home win or person loss
// --------------0 is for draw

let resultTable=[[0,-1,1,-1,1],
                 [1,0,-1,1,-1],
                 [-1,1,0,1,-1],
                 [1,-1,-1,0,1],
                 [-1,1,1,-1,0]];

// ----------result have been arranged in this order both by row and column 
// -------------where each cell compares two options eg (paper/paper,paper/rock, rock/scissors)

const possibleOption =['paper','scissors','rock','lizard','spock'];

let isbonus =localStorage.getItem('isbonus');


const pickOptionElement= document.getElementById('pickOption');
const personPickElement= document.getElementById('personPick');
const pickResultElement= document.getElementById('pickResult');
const switchToBonus =document.getElementById('switchToBonus');
const rulesBtn=document.getElementById("rulesBtn");
const closeBtn=document.getElementById("closeBtn");
const rules=document.getElementById("rules");
const pickTriangle =document.getElementById('pickTriangle');  
const pickPentagon =document.getElementById('pickPentagon');
const scoreValue =document.getElementById('scoreValue');

rulesBtn.addEventListener('click',()=>{
    rules.classList.add('show-rules');

})
closeBtn.addEventListener('click',()=>{
    rules.classList.remove('show-rules');
})



function noBonusGame(){
    let gameScore= localStorage.getItem('gameScore') ;  
    const imageTitle =document.getElementById('imageTitle')
    switchToBonus.children[0].innerHTML='To'
    imageTitle.src="./images/logo.svg";
    rules.children[1].children[0].src="./images/image-rules.svg";
    pickTriangle.classList.remove( "show-bonus");    
    pickPentagon.classList.add( "show-bonus");  

    if(gameScore){
        scoreValue.innerHTML = gameScore;
    }else{
        scoreValue.innerHTML =0;
    }

    
}


function BonusGame(){
    let bonusGameScore= localStorage.getItem('bonusGameScore') ; 
    const imageTitle =document.getElementById('imageTitle')
    imageTitle.src="./images/logo-bonus.svg"
    switchToBonus.children[0].innerHTML='From' 
    rules.children[1].children[0].src= "./images/image-rules-bonus.svg";
    pickTriangle.classList.add( "show-bonus");    
    pickPentagon.classList.remove( "show-bonus");  
    
    if(bonusGameScore){
        scoreValue.innerHTML = bonusGameScore;
    }else{
        scoreValue.innerHTML = 0;
    }
 
}

switchToBonus.addEventListener('click',()=>{   
    if(switchToBonus.children[0].innerHTML.toLowerCase()=='to'){  
               
        BonusGame()
        localStorage.setItem('isbonus','true');
    }else{
      
        noBonusGame()
        localStorage.setItem('isbonus','false');
    }
   
})

function playAgain() {
    pickOptionElement.classList.add('show-pick');
    personPickElement.classList.remove('show-pick'); 
    pickResultElement.classList.remove('show-pick');
   
}

function removeClass(element){
  
    for (let cls of element.classList){
        if(cls.includes('pentagon')){
            element.classList.remove(cls)
        }
    }
    return element
}



function personPick(id) {   
    let homeId;   
    pickOptionElement.classList.remove('show-pick');
    personPickElement.classList.add('show-pick');
    let personalPick =document.getElementById('personalPick');
    personalPick.src=options[id].src;
    removeClass( personalPick.parentElement.parentElement.parentElement);
    personalPick.parentElement.parentElement.parentElement.classList.add(options[id].optionClass);
    // -----------result------------ 
    let resultPersonalPick =document.getElementById('resultPersonalPick');
    resultPersonalPick.src=options[id].src;
    removeClass(resultPersonalPick.parentElement.parentElement.parentElement);
    resultPersonalPick.parentElement.parentElement.parentElement.classList.add( options[id].optionClass);

    function showHomePick() {
        let index, id;        
        if(isbonus.toLowerCase()==='true'){
          index=Math.floor(Math.random()*5)
          id=possibleOption[index];
                  
        }else{
            index=Math.floor(Math.random()*3)
            id=possibleOption[index];
        }
        const homePick =document.getElementById('homePick')
        homePick.src=options[id].src;
        removeClass(homePick.parentElement.parentElement.parentElement);
        homePick.parentElement.parentElement.parentElement.classList.add(options[id].optionClass);        
        homePick.parentElement.parentElement.parentElement.previousElementSibling.classList.toggle('hide')
        homePick.parentElement.parentElement.parentElement.classList.toggle('hide');
    //    --------------- result-----------
        const resultHomePick=document.getElementById('resultHomePick')
        resultHomePick.src=options[id].src; 
        removeClass(resultHomePick.parentElement.parentElement.parentElement);
        resultHomePick.parentElement.parentElement.parentElement.classList.add(options[id].optionClass);
        
        return id;
    }

    function updateScore(scored){    

        if(isbonus.toLowerCase()==='true'){
            let bonusGameScore= localStorage.getItem('bonusGameScore') ;   
           
            if(bonusGameScore === null){
               bonusGameScore = scored
            }else{
              bonusGameScore = parseInt(bonusGameScore)+ scored
              
            }
           
            scoreValue.innerHTML = bonusGameScore;
            localStorage.setItem('bonusGameScore',bonusGameScore)
        
        }else{
            
            let gameScore= localStorage.getItem('gameScore') ;        
            if(gameScore){
                gameScore = parseInt(gameScore)+scored           
            }else{
                gameScore = scored
            }
            scoreValue.innerHTML = gameScore;
            localStorage.setItem('gameScore',gameScore)
        }
       
              
    }

    function gameWin() {
        resultPersonalPick.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].classList.remove('hide');
        resultHomePick.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].classList.add('hide');
        const showResult =document.getElementById('showResult');
        showResult.children[0].children[0].innerHTML='YOU WIN'; 
        showResult.children[0].children[1].classList.remove('lose');      
    }
    function gameLose() {       
        resultHomePick.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].classList.remove('hide');
        resultPersonalPick.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].classList.add('hide');
        const showResult =document.getElementById('showResult');
        showResult.children[0].children[0].innerHTML='YOU LOSE';  
        showResult.children[0].children[1].classList.add('lose');    
    }

    function showResult() {
       const scored = resultTable[possibleOption.indexOf(id)][possibleOption.indexOf(homeId)]       
       if(scored===0){
        setTimeout(() => {
            playAgain()
        }, 500); 
        return
       }else if(scored>0){
        gameWin()        
       }else if(scored<0){
        gameLose()        
       }
       updateScore(scored); 
       setTimeout(() => {
        personPickElement.classList.remove('show-pick'); 
       pickResultElement.classList.add('show-pick');
       }, 500);
    }
    setTimeout(() => {
        homeId =showHomePick()
        showResult();
    },500);
     
    
}

if(isbonus && isbonus.toLowerCase()==='true'){
    BonusGame()
   
}else{
    noBonusGame()
}