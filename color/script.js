if(window.location.pathname.indexOf("color")!=-1){
//selectors
var hover=document.getElementById("hover");
var list=document.getElementById("list");
var add=document.getElementById("add");
var saveText=document.getElementById("saveText")
var box1 = document.getElementById("color1");
var box2 = document.getElementById("color2");
var hex1 = document.getElementById("text1");
var hex2 = document.getElementById("text2");
var body = document.getElementsByTagName("body")[0];
var color=["#263238","#263238"];
if(localStorage.getItem("colors")){
    var saved = JSON.parse(localStorage.getItem("colors"));
    addSaved(saved);
}
else{
    var saved = [];
}
var count =0;

//random color generator===========================================
function randomColor(){
    var input = ["1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    var color ="#";
    for(var i=0;i<6;i++){
        var rnd = Math.round(Math.random()*(input.length-1));
        var x = input[rnd];
        color += x;
    }
    return color;
}
//setcolors function===============================================
function setColors(c1,c2){
body.style.background="linear-gradient(to bottom left, "+color[0]+", "+color[1]+")";
box1.style.background=c1;
box2.style.background=c2;
hex1.innerHTML=c1;
hex2.innerHTML=c2;
}
//main color maker===========================================
function getColors(){
    color[0]=randomColor();
    color[1]=randomColor();
    setColors(color[0],color[1]);
    count++;
    console.log(count+". left color: "+color[0]+" right color: "+color[1]);
    isSaved = false;
    add.style.background="";
    add.style.opacity="1";
}
//body color change on click===========================================
function bodyColor(num){
    var hex=document.getElementsByClassName("hexcode");
    body.style.background=hex[num].innerHTML;
}
//fb analytics===========================================
function onButtonClick() {
    FB.AppEvents.logEvent("getcolor");
}
//save function===========================================
var isOpen=false;
//open the list
hover.addEventListener("click",function(){
    if(isOpen){
        list.style.width="0";
        hover.classList.remove("flip");
        isOpen=false;
    }
    else{
        list.style.width="auto";
        hover.classList.add("flip");
        isOpen=true;
    }
});
//click the add circle
var isSaved = false;
add.onclick=function(){
    if(isSaved){
        //click while the color is saved
        add.style.background="";
        isSaved = false;
        saved.pop();
        localStorage.setItem("colors", JSON.stringify(saved));
        list.lastChild.remove();
    }
    else{
        //click to save
        add.style.background="white";
        isSaved = true;
        saveText.style.display="none";
        var clr1=color[0];
        var clr2=color[1];
        saved.push([clr1,clr2]);
        localStorage.setItem("colors", JSON.stringify(saved));
        addSaved([[clr1,clr2]]);
    }
}

//create saved list item function
function addSaved(arr){
    var single, color1,color2;
    for(var c=0;c<arr.length;c++){
        single=document.createElement("div");
        color1=document.createElement("div");
        color2=document.createElement("div");
        single.className="single";
        color1.className="side";
        color2.className="side";
        color1.style.backgroundColor=arr[c][0];
        color2.style.backgroundColor=arr[c][1];
        single.appendChild(color1);
        single.appendChild(color2);
        list.appendChild(single);
        single.addEventListener("click", function(){
            color[0]=rgb2hex(this.children[0].style.backgroundColor).toUpperCase();
            color[1]=rgb2hex(this.children[1].style.backgroundColor).toUpperCase();
            setColors(color[0],color[1]);
            isSaved = true;
            add.style.background="white";
            add.style.opacity="1";
        });
    }
}
//clear list
var clear =document.getElementById("clear");
clear.addEventListener("click",function(){
    list.innerHTML='<div id="clear"><span>Clear List</span></div>';
    localStorage.clear();
});

//switch to hex ============================================
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
}else{//off-site ===========================================
    var saved = document.getElementsByClassName("container")[0];
    saved.style.fontSize="60px";
    saved.style.color="white";
    saved.innerHTML = "visit <a href='http://itibook.com/color' style='text-decoration:underline'>itibook.com/color</a>"
}