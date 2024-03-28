var pres = document.getElementsByTagName("pre");
for(var i = 0; i < pres.length; i++){
    var pre = pres[i];
    if(pre.childNodes[0].nodeName == "CODE"){
        //pre.setAttribute("class","line-numbers");
        pre.classList.add("line-numbers,"toolbar");
    }
}
