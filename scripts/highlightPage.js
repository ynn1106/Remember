function highlightPage(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var headers = document.getElementsByTagName('header');
    if(headers.length ==0)return false;
    var navs = headers[0].getElementsByTagName('nav');
    if(navs.length ==0)return false;//检查各个元素是否存在
    
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i=0;i<links.length;i++){//取得导航链接，循环遍历
        linkurl = links[i].getAttribute("href");//取得链接的URL
        if (window.location.href.indexOf(linkurl) != -1){
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue;
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);
    
    