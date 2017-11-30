function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload !='function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName+= " ";
        newClassName+= value;
        element.className = newClassName;
    }
}
function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = "0px";
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";//加号是拼凑成字符串传入setTimeout()变为movement("elementID",final_x,final_y,interval)
    elem.movement = setTimeout(repeat,interval);//每隔一段时间再次调用moveElement函数，还需要把elementID等参数传给它。即需上述字符串
}
function showSection(id){
    var sections = document.getElementsByTagName("section");
    for (var i=0;i<sections.length;i++){
        if(sections[i].getAttribute("id")!=id){
            sections[i].style.display = "none";
        }else{
            sections[i].style.display = "block";
        }
    }
}
function prepareInternalnav(){
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    var articles = document.getElementsByTagName("article");
    if(articles.length ==0)return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length == 0)return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for(var i= 0;i<links.length;i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;//为了解决给链接添加onclick事件处理函数时，将sectionId传给showSection函数，而sectionId是个局部变量
        links[i].onclick = function(){
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);
function showPic(whichpic){ 
    if (!document.getElementById("placeholder")) return true;
        var source = whichpic.getAttribute("href");  
        var placeholder = document.getElementById("placeholder");  
    if(placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src",source);
    if(document.getElementById("describe")) {
        var text=whichpic.getAttribute("title")? whichpic.getAttribute("title") : "";
        var describe=document.getElementById('describe'); 
        if (describe.firstChild.nodeType == 3){
            describe.childNodes[0].nodeValue=text;
        }
    }
    return false;
}
function preparePlaceholder() {
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/DSC02253.JPG");
    placeholder.setAttribute("alt","my image gallery");
    placeholder.style.position = "absolute";//设置绝对位置
    placeholder.style.left = "230px";
    var describe = document.createElement("p");
    describe.setAttribute("id","describe");
    describe.style.position = "absolute";
    describe.style.left = "230px";
    var desctext = document.createTextNode("Choose an image");
    describe.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder,gallery);
    insertAfter(describe,placeholder);
}
function prepareGallery(){
    if(!document.getElementsByTagName|| !document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery =document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for ( var i=0;i < links.length;i++){
        links[i].onclick = function(){
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
function focusLabels(){
    if(!document.getElementsByTagName)return false;
    var labels = document.getElementsByTagName("label");
    for (var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function(){
        var id = this.getAttribute("for");
        if(!document.getElementById(id))return false;
        var element = document.getElementById(id);
        element.focus();
        }
    }
}
addLoadEvent(focusLabels);
