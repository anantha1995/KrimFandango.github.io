//random color generator
function randomColor(){
    var input = ["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    var color ="#";
    for(var i=0;i<6;i++){
        var rnd = Math.round(Math.random()*(input.length-1));
        var x = input[rnd];
        color += x;
    }
    console.log(color);
    return color;
}
//background color changer
function bgcolor(rndBox,hexcode){
    var color1 = randomColor();
    var color2= randomColor();
    var body=document.getElementsByTagName("body")[0];
    body.style.background=color1;
    body.style.color=color2;

    var anchor=document.getElementsByTagName("a");
    for(var i=0;i<anchor.length;i++){
        anchor[i].style.borderBottom="2px dashed "+color2;
    }


    var list=document.getElementsByTagName("li");
    for(var i=0;i<list.length;i++){
        list[i].style.background=color2;
        list[i].style.color=color1;
    }
    var showcase=document.getElementsByClassName("showcase");
    for(var i=0;i<showcase.length;i++){
        showcase[i].style.border="5px solid "+color2;
    }
    
}