var deck = [];
var p1 = [];
var p2 = [];
var ground = [];
var score1 = [];
var score2 = [];
//bonus score is an array of a single value to pass it by referrence
var bonus1 = [0];
var bonus2 = [0];

var deckHTML = document.getElementById('deck');
var p1HTML = document.getElementById('p1');
var p2HTML = document.getElementById('p2');
var groundHTML = document.getElementById('ground');
var s1HTML = document.getElementById('score1');
var s2HTML = document.getElementById('score2');
var overlay = document.getElementById('overlay');
var gameover = document.getElementById('gameover');

var backface = document.createElement('img');
backface.src = "cards/facedown.jpg";
//start a game onload
newGame();
//start a game when the new game button is clicked
document.getElementById('start').addEventListener("click",function(){
    newGame();
});

/* ===================
    NEW GAME FUNCTION
====================*/

function newGame(){
    deck = newDeck();
    p1 = deck.splice((deck.length-5), 4);
    p2 = deck.splice((deck.length-5), 4);
    ground = deck.splice((deck.length-5), 4);
    score1 = [];
    score2 = [];
    bonus1 = [0];
    bonus2 = [0];
    checkJack();
    printGame();
    playersFunc();
}


/* ===================
    DECK FUNCTION
====================*/

function newDeck(){
    var deckOrder = newOrder();
    deck = [];
    var counter = 0;
    for(var i=1;i<=13;i++){
        for(var j=1;j<=4;j++){
            deck[deckOrder[counter]] = newCard(i,j);
            counter++;
        }
    }
    return deck;
}

/* ==================
    CARDS MACHINE
====================*/

function newCard(number, type){
    if(type==1) type = "diamonds";
    if(type==2) type = "spades";
    if(type==3) type = "clubs";
    if(type==4) type = "hearts";
    
    var num = true;
    if(number > 10) num=false;
    if(number==11) number="jack";
    if(number==12) number="king";
    if(number==13) number="queen";
    var card = {
        value: number,
        img: `<img src="cards/${number}_of_${type}.jpg">`,
        src: `cards/${number}_of_${type}.jpg`,
        type: type,
        num: num
    }
    preloadImage(card.src);
    return card;
}
//random order array creator
function newOrder(){
    var order=[];
    for(var x=0;x<52;x++){
        do{
            var rnd = Math.floor(Math.random()*52);
        }
        while(order.indexOf(rnd) != -1);
        order.push(rnd);
    }
    return order;
}

/* ===================
    TURNS GIVER
====================*/

function playersFunc(){
    //clear p1 div
    p1HTML.innerHTML='';
    //insert p1 cards in HTML
    p1.forEach(function(element){
        p1HTML.innerHTML+=element.img;
    });
    p1.forEach(function(element,index){
        p1HTML.children[index].addEventListener("click",function(){
            //if condition to prevent clicking while computer is playing
            if(p1.length==p2.length){
                //player 1 turn
                play(index,1);
                printGame();
                //player 2 picks a random card and plays
                var pickCard = Math.floor(Math.random()*p2.length);
                setTimeout(() => { 
                    p2HTML.children[pickCard].src = p2[pickCard].src;
                    p2HTML.children[pickCard].style.transform ="translateY(15px)";
                }, 400);
                setTimeout(() => {    
                    play(pickCard,2);
                    printGame();
                    playersFunc();
                }, 1200);
                playersFunc();
            }
        })
    });
}
//check if jack is on the ground and replace it
function checkJack(){
    for(var n=0;n<ground.length;n++){
        if(ground[n].value==="jack"){
            var rndIndex = Math.floor(Math.random()*deck.length);
            deck.splice(rndIndex,0,ground.splice(n,1)[0]);
            ground.push(deck.pop());
        }
    }
}

/*======================
    PLAY FUNCTION
======================*/

function play(index,whichPlayer){
    if(whichPlayer == 1){
        var score = score1;
        var player = p1;
        var bonus = bonus1;
    }
    if(whichPlayer == 2){
        var score = score2;
        var player = p2;
        var bonus = bonus2;
    }
    var match = false;
    //Jack or 7 diamond takes everything on the ground
    if(player[index].value === "jack" || player[index].value === 7 && player[index].type === "diamonds"){
        if(ground.length > 0){
            console.log(`[player${whichPlayer}] took all the ground cards with a ${player[index].value}`);
            score.push(...ground);
            ground = [];
            match=true;
        }
    }
    //check if card is equal to ground card or the sum of 2 ground cards
    for(var i=0;i<ground.length;i++){
        if(player[index].value === ground[i].value){    
            console.log(`[player${whichPlayer}] scored, ground ${ground[i].value} equals card ${player[index].value}`);
            score.push(ground.splice(i,1)[0]);
            match = true;
            i--;
            if(ground.length === 0){
                bonus[0]+=9;
                console.log(`player${whichPlayer} scored a Basra`);
            }
        }
        else if(player[index].value>ground[i].value && player[index].num){
            var diff = player[index].value-ground[i].value;
            for(var x=0;x<ground.length;x++){
                if(ground[x].value===diff&&x!==i){
                    console.log(`[player${whichPlayer}] scored, value ${ground[x].value}+${ground[i].value}=${player[index].value}`)
                    score.push(ground.splice(x,1)[0]);
                    score.push(ground.splice(i,1)[0]);
                    match=true;
                    i--;
                    x--;
                    if(ground.length === 0){
                        bonus[0]+=9;
                        console.log(`player${whichPlayer} scored a Basra`);
                    }
                    
                }
                //check if three cards are equal to your card
                else if(ground[x].value < diff && player[index].num && x != i){
                    var diff2 = diff - ground[x].value;
                    for(var y=0;y<ground.length;y++){
                        if(ground[y].value===diff2&& x!=y && i!=y){
                            console.log(`[player${whichPlayer}] scored, value ${ground[x].value}+${ground[i].value}+${ground[y].value}=${player[index].value}`);
                            score.push(ground.splice(y,1)[0]);
                            score.push(ground.splice(x,1)[0]);
                            score.push(ground.splice(i,1)[0]);
                            match=true;
                            y--;
                            i--;
                            x--;
                            if(ground.length === 0){
                                bonus[0]+=9;
                                console.log(`player${whichPlayer} scored a Basra`);
                            }
                        }
                    }
                }
            }
        }
    }
    
    (match)? score.push(player.splice(index,1)[0]) : ground.push(player.splice(index,1)[0]);
    //draw cards when player 2 has none(because player 2 always plays last)
    if(p2.length===0){
        p1 = deck.splice((deck.length-4), 4);
        p2 = deck.splice((deck.length-4), 4);
    }
}

/*======================
    THE GAME PRINTER
======================*/

function printGame(){
    //clear everything
    p2HTML.innerHTML="";
    groundHTML.innerHTML="";
    ground.forEach(function(element){
        groundHTML.innerHTML+=element.img;
    });
    //Add backface cards with the same amount of cards in P2 array
    for(var x=0;x<p2.length;x++)
    p2HTML.innerHTML +=`<img src="cards/facedown.jpg">`;
    //Add one backface in deck
    deckHTML.innerHTML =`<div><img src="cards/facedown.jpg"></div><p>${deck.length} cards</p>`;
    //print scores
    s1HTML.innerHTML= `You<br>${((bonus1[0]>8)? bonus1[0]/9: "0")}  Basra<br>score = ${(score1.length+bonus1[0])}`;
    s2HTML.innerHTML= `Computer<br>${((bonus2[0]>8)? bonus2[0]/9: "0")} Basra<br>score = ${(score2.length+bonus2[0])}`;
    //check if the game is over
    if(deck.length === 0 && p2.length === 0){
        //show the overlay
        overlay.style.display= "flex";
        if((score2.length+bonus2[0])<(score1.length+bonus1[0])){
            gameover.innerHTML= `<h1>You Won!<h1>Your score = ${(score1.length+bonus1[0])}<br>Computer score = ${(score2.length+bonus2[0])}<br><button id="playAgain" class='again'>Play Again</button>`;
        }
        else{
            gameover.innerHTML= `<h1>You Lost!<h1>Your score = ${(score1.length+bonus1[0])}<br>Computer score = ${(score2.length+bonus2[0])}<br><button id="playAgain" class='again'>Play Again</button>`;
        }
        document.getElementById('playAgain').addEventListener('click',function(){
            overlay.style.display="none";
            newGame();
        })
    }
}


// preload images
// on a real website the images will be first loaded when they appear from the deck
//this will result in bad performance, therefore we can preload them using this function
function preloadImage(url)
{
    var img=new Image();
    img.src=url;
}
