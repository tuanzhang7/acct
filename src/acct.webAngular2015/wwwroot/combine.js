var saveAs=saveAs||function(e){"use strict";if("undefined"==typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),i="download"in r,o=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/Version\/[\d\.]+.*Safari/.test(navigator.userAgent),f=e.webkitRequestFileSystem,u=e.requestFileSystem||f||e.mozRequestFileSystem,s=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},c="application/octet-stream",d=0,l=500,w=function(t){var r=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()};e.chrome?r():setTimeout(r,l)},p=function(e,t,n){t=[].concat(t);for(var r=t.length;r--;){var i=e["on"+t[r]];if("function"==typeof i)try{i.call(e,n||e)}catch(o){s(o)}}},v=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e},y=function(t,s,l){l||(t=v(t));var h,R,N,y=this,m=t.type,S=!1,O=function(){p(y,"writestart progress write writeend".split(" "))},g=function(){if(R&&a&&"undefined"!=typeof FileReader){var r=new FileReader;return r.onloadend=function(){var e=r.result;R.location.href="data:attachment/file"+e.slice(e.search(/[,;]/)),y.readyState=y.DONE,O()},r.readAsDataURL(t),void(y.readyState=y.INIT)}if(!S&&h||(h=n().createObjectURL(t)),R)R.location.href=h;else{var i=e.open(h,"_blank");void 0==i&&a&&(e.location.href=h)}y.readyState=y.DONE,O(),w(h)},b=function(e){return function(){if(y.readyState!==y.DONE)return e.apply(this,arguments)}},E={create:!0,exclusive:!1};return y.readyState=y.INIT,s||(s="download"),i?(h=n().createObjectURL(t),r.href=h,r.download=s,void setTimeout(function(){o(r),O(),w(h),y.readyState=y.DONE})):(e.chrome&&m&&m!==c&&(N=t.slice||t.webkitSlice,t=N.call(t,0,t.size,c),S=!0),f&&"download"!==s&&(s+=".download"),(m===c||f)&&(R=e),u?(d+=t.size,void u(e.TEMPORARY,d,b(function(e){e.root.getDirectory("saved",E,b(function(e){var n=function(){e.getFile(s,E,b(function(e){e.createWriter(b(function(n){n.onwriteend=function(t){R.location.href=e.toURL(),y.readyState=y.DONE,p(y,"writeend",t),w(e)},n.onerror=function(){var e=n.error;e.code!==e.ABORT_ERR&&g()},"writestart progress write abort".split(" ").forEach(function(e){n["on"+e]=y["on"+e]}),n.write(t),y.abort=function(){n.abort(),y.readyState=y.DONE},y.readyState=y.WRITING}),g)}),g)};e.getFile(s,{create:!1},b(function(e){e.remove(),n()}),b(function(e){e.code===e.NOT_FOUND_ERR?n():g()}))}),g)}),g)):void g())},m=y.prototype,S=function(e,t,n){return new y(e,t,n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return n||(e=v(e)),navigator.msSaveOrOpenBlob(e,t||"download")}:(m.abort=function(){var e=this;e.readyState=e.DONE,p(e,"abort")},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,S)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=saveAs:"undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs}),!function(a,b,c){function d(b,c){this.element=a(b),this.settings=a.extend({},f,c),this._defaults=f,this._name=e,this.init()}var e="metisMenu",f={toggle:!0,doubleTapToGo:!1};d.prototype={init:function(){var b=this.element,d=this.settings.toggle,f=this;this.isIE()<=9?(b.find("li.active").has("ul").children("ul").collapse("show"),b.find("li").not(".active").has("ul").children("ul").collapse("hide")):(b.find("li.active").has("ul").children("ul").addClass("collapse in"),b.find("li").not(".active").has("ul").children("ul").addClass("collapse")),f.settings.doubleTapToGo&&b.find("li.active").has("ul").children("a").addClass("doubleTapToGo"),b.find("li").has("ul").children("a").on("click."+e,function(b){return b.preventDefault(),f.settings.doubleTapToGo&&f.doubleTapToGo(a(this))&&"#"!==a(this).attr("href")&&""!==a(this).attr("href")?(b.stopPropagation(),void(c.location=a(this).attr("href"))):(a(this).parent("li").toggleClass("active").children("ul").collapse("toggle"),void(d&&a(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide")))})},isIE:function(){for(var a,b=3,d=c.createElement("div"),e=d.getElementsByTagName("i");d.innerHTML="<!--[if gt IE "+ ++b+"]><i></i><![endif]-->",e[0];)return b>4?b:a},doubleTapToGo:function(a){var b=this.element;return a.hasClass("doubleTapToGo")?(a.removeClass("doubleTapToGo"),!0):a.parent().children("ul").length?(b.find(".doubleTapToGo").removeClass("doubleTapToGo"),a.addClass("doubleTapToGo"),!1):void 0},remove:function(){this.element.off("."+e),this.element.removeData(e)}},a.fn[e]=function(b){return this.each(function(){var c=a(this);c.data(e)&&c.data(e).remove(),c.data(e,new d(this,b))}),this}}(jQuery,window,document),$(function(){$("#side-menu").metisMenu({toggle:!1})}),$(function(){$(window).bind("load resize",function(){topOffset=50,width=this.window.innerWidth>0?this.window.innerWidth:this.screen.width,width<768?($("div.navbar-collapse").addClass("collapse"),topOffset=100):$("div.navbar-collapse").removeClass("collapse"),height=this.window.innerHeight>0?this.window.innerHeight:this.screen.height,height-=topOffset,height<1&&(height=1),height>topOffset&&$("#page-wrapper").css("min-height",height+"px")})});