(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){e.exports=n(25)},20:function(e,t,n){},22:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(8),c=n.n(i),r=(n(20),n(9)),l=n(10),s=n(2),u=n(3),d=n(5),m=n(4),p=n(7),h=n(6),f=(n(21),n(22),n(1)),v=(n(23),n(24),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={date:new Date},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval(function(){return e.tick()},1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tick",value:function(){this.setState({date:new Date})}},{key:"render",value:function(){return o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-body text-center"},o.a.createElement("h1",null,"Hello, world!"),o.a.createElement("h2",null,"It is ",this.state.date.toLocaleTimeString(),".")))}}]),t}(o.a.Component)),b=n(13),g=function(e){var t=e.title,n=e.comp,a=e.handleClick,i=e.modal,c=Object(b.a)(e,["title","comp","handleClick","modal"]);return o.a.createElement("button",Object.assign({type:"button",id:t,title:t,onClick:function(){return a(t,n,i)}},c),t)},w=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).el=document.createElement("div"),n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.rootNode.appendChild(this.el)}},{key:"componentWillUnmount",value:function(){this.props.rootNode.removeChild(this.el)}},{key:"render",value:function(){return c.a.createPortal(this.props.children,this.el)}}]),t}(o.a.Component),j={theme:"primary",headerTitle:"Default Title",position:"center-top 0 20%",contentSize:{width:"".concat(Math.round(window.innerWidth/1.2),"px"),height:"auto"},contentOverflow:"auto",onwindowresize:!1,content:function(e){var t=document.createElement("div"),n="".concat(e.id,"-node");t.id=n,e.content.append(t)},callback:function(e){e.content.style.padding="10px";var t=window.innerHeight-30*window.innerHeight/100;e.content.style.maxHeight="".concat(t,"px"),e.content.style.maxWidth="".concat(window.innerWidth-20,"px")},onclosed:function(){}},O=Object(a.lazy)(function(){return n.e(6).then(n.bind(null,59))}),y=Object(a.lazy)(function(){return n.e(5).then(n.bind(null,60))}),E=Object(a.lazy)(function(){return n.e(4).then(n.bind(null,63))}),k=Object(a.lazy)(function(){return Promise.all([n.e(2),n.e(8)]).then(n.bind(null,62))}),N=Object(a.lazy)(function(){return n.e(7).then(n.bind(null,61))}),x=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(d.a)(this,Object(m.a)(t).call(this))).createJsPanel=function(t,n){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=Object(p.a)(e);if(o.state.panels[t])return o.state.panels[t].panel.front(function(){o.state.panels[t].panel.resize({height:"auto"}),o.state.panels[t].panel.reposition("center-top 0 20%")});var i=Object(l.a)({},j,{headerTitle:t,onclosed:function(){var e=o.state.panels;e[t]&&(delete e[t],o.setState({panels:Object(l.a)({},e)}))}}),c=a?f.a.modal.create(i):f.a.create(i);o.setState({panels:Object(l.a)({},o.state.panels,Object(r.a)({},t,{panel:c,comp:n}))})},e.state={panels:{},modal:!1},e}return Object(h.a)(t,e),Object(u.a)(t,[{key:"renderJsPanlesInsidePortal",value:function(){var e=this.state.panels;return Object.keys(e).map(function(t){var n=e[t].panel,i=e[t].comp,c=document.getElementById("".concat(n.id,"-node"));return i?o.a.createElement(w,{rootNode:c,key:n.id},Array.isArray(i)?i.map(function(e){return o.a.createElement(a.Suspense,{key:Math.random().toString().substr(2),fallback:o.a.createElement("div",{className:"alert alert-info"},"Loading...")},o.a.createElement(e,{jsPanel:n}))}):o.a.createElement(a.Suspense,{fallback:o.a.createElement("div",{className:"alert alert-info"},"Loading...")},o.a.createElement(i,{jsPanel:n}))):null})}},{key:"render",value:function(){var e=Object.keys(this.state.panels),t={className:"btn btn-outline-primary ml-2 mb-2",handleClick:this.createJsPanel};return o.a.createElement("div",{className:"container-fluid"},o.a.createElement("div",{className:"row bg-dark text-white shadow p-2"},o.a.createElement("div",{className:"col-md-12"},o.a.createElement("h4",{className:"text-center"},"jsPanel with react"))),o.a.createElement("div",{className:"row justify-content-center mt-4"},o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-body"},o.a.createElement(g,Object.assign({},t,{title:"Simple Example",comp:O})),o.a.createElement(g,Object.assign({},t,{title:" Countries List",comp:y})),o.a.createElement(g,Object.assign({},t,{title:"Todo App",comp:E})),o.a.createElement(g,Object.assign({},t,{title:"Sample Users",comp:k})),o.a.createElement(g,Object.assign({},t,{title:"Random Image",comp:N})),o.a.createElement(g,Object.assign({},t,{title:"Modal Example",comp:v,modal:!0})),o.a.createElement(g,Object.assign({},t,{title:"Multiple Components",comp:[v,O,N,y]}))))),e.length>0&&this.renderJsPanlesInsidePortal())}}]),t}(a.Component),C=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function P(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(o.a.createElement(x,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/react-jspanel4",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/react-jspanel4","/service-worker.js");C?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):P(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):P(e)})}}()}},[[14,1,3]]]);
//# sourceMappingURL=main.3eb1e1b0.chunk.js.map