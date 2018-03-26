//selectors
var pingBtn = document.getElementById("getPing");
var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var input =document.getElementById("input");
var isOn = false;
pingBtn.addEventListener("click", function(){
    if(parseInt(input.value)){
        
        input.style.border="initial";
        if(isOn){
            isOn=false;
            box1.style.backgroundColor="";
            setTimeout(function(){
            box2.style.backgroundColor="";
            },parseInt(input.value))

        }
        else{
            isOn=true;
            box1.style.backgroundColor="white";
            setTimeout(function(){
            box2.style.backgroundColor="white";
            },parseInt(input.value))
        }
    }
    else{
        input.style.border="4px solid red";
    }
});