(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{33:function(e,t,a){var r=a(34),n=a(35);e.exports=function(e,t,a){var s=t&&a||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var i=(e=e||{}).random||(e.rng||r)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t)for(var o=0;o<16;++o)t[s+o]=i[o];return t||n(i)}},34:function(e,t){var a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(a){var r=new Uint8Array(16);e.exports=function(){return a(r),r}}else{var n=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),n[t]=e>>>((3&t)<<3)&255;return n}}},35:function(e,t){for(var a=[],r=0;r<256;++r)a[r]=(r+256).toString(16).substr(1);e.exports=function(e,t){var r=t||0,n=a;return[n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]]].join("")}},36:function(e,t,a){e.exports=a.p+"static/media/si-glyph-edit.7f611cf5.svg"},37:function(e,t,a){e.exports=a.p+"static/media/si-glyph-delete.287cf291.svg"},38:function(e,t,a){e.exports=a.p+"static/media/si-glyph-checked.0c04f91b.svg"},63:function(e,t,a){"use strict";a.r(t);var r=a(2),n=a(3),s=a(5),i=a(4),o=a(7),l=a(6),c=a(0),m=a.n(c),u=a(33),d=a.n(u),h="object"===typeof localStorage,p=function(){var e=[];try{return(e=JSON.parse(localStorage.getItem("todoAppStorage")))||[]}catch(t){return e}},g=h,f=p,b=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];try{var a=p(),r=t?null:{id:d()(),text:e.tname,done:"false"};return!t&&a.push(r),localStorage.setItem("todoAppStorage",t?JSON.stringify(e):JSON.stringify(a)),{saved:!0}}catch(n){return{saved:!1,err:n}}},v=a(36),k=a.n(v),y=a(37),N=a.n(y),E=a(38),S=a.n(E),C=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={showControls:!1,taskName:a.props.data.text,tNameEdit:!1,err:!1,errorMsg:""},a.mouseEnter=a.mouseEnter.bind(Object(o.a)(a)),a.mouseLeave=a.mouseLeave.bind(Object(o.a)(a)),a.removeBtnClick=a.removeBtnClick.bind(Object(o.a)(a)),a.okBtnClick=a.okBtnClick.bind(Object(o.a)(a)),a.changeTaskName=a.changeTaskName.bind(Object(o.a)(a)),a.editBtnClick=a.editBtnClick.bind(Object(o.a)(a)),a.iconsStyle={cursor:"pointer",marginRight:"10px",width:"20px",height:"20px"},a}return Object(l.a)(t,e),Object(n.a)(t,[{key:"mouseEnter",value:function(e){this.setState({showControls:!0})}},{key:"mouseLeave",value:function(e){this.setState({showControls:!1})}},{key:"removeBtnClick",value:function(){this.props.clickHandler(this.props.data.id)}},{key:"okBtnClick",value:function(){this.props.clickHandler(this.props.data.id,!0)}},{key:"editBtnClick",value:function(){this.setState({tNameEdit:!0})}},{key:"changeTaskName",value:function(e){if(e.preventDefault(),this.props.data.text===this.state.taskName)return this.setState({tNameEdit:!1,err:!1,errorMsg:""});this.setState({tNameEdit:!1,err:!1,errorMsg:""}),this.props.clickHandler(this.props.data.id,!0,this.state.taskName)}},{key:"cancelTaskNameEditing",value:function(){this.setState({tNameEdit:!1,taskName:this.props.data.text,err:!1,errorMsg:""})}},{key:"editInputChanged",value:function(e){var t=this,a=e.target.value,r="";if(a.length>30&&(r="Only 30 chars."),!/^[a-z\d\-_\s]+$/i.test(a)&&a.length&&(r="No special characters.")&&(a=a.substr(0,a.length-1)),r)return this.setState({taskName:a,errorMsg:r,err:!0}),void setTimeout(function(){t.setState({errorMsg:"",err:!1})},4e3);this.setState({taskName:a,err:!1,errorMsg:""})}},{key:"render",value:function(){var e=this.iconsStyle,t=this.state.showControls;if(this.state.tNameEdit){var a=this.state.errorMsg?m.a.createElement("div",{className:"alert alert-danger mt-2"},this.state.errorMsg):null;return m.a.createElement("div",null,m.a.createElement("li",{className:"list-group-item"},m.a.createElement("form",{className:"form-inline",onSubmit:this.changeTaskName},m.a.createElement("div",{className:"input-group"},m.a.createElement("input",{type:"text",className:"form-control",value:this.state.taskName,onChange:this.editInputChanged.bind(this)}),m.a.createElement("div",{className:"input-group-append",id:"button-addon4"},m.a.createElement("button",{className:"btn btn-outline-success",type:"submit",disabled:!this.state.taskName||this.state.err},m.a.createElement("img",{src:S.a,style:{width:"20px",height:"20px",cursor:"pointer"},alt:"Ok"})),m.a.createElement("button",{className:"btn btn-outline-danger",type:"button",onClick:this.cancelTaskNameEditing.bind(this)},m.a.createElement("img",{src:N.a,style:{width:"20px",height:"20px",cursor:"pointer"},alt:"Cancel"})))))),m.a.createElement("div",{className:"row justify-content-center align-items-center"},a))}var r=this.props.data,n=this.props.hash,s=t&&"true"!==r.done?"list-group-item infobg":"true"===r.done?"list-group-item strk":"list-group-item",i=t?m.a.createElement("img",{className:"float-right",onClick:this.removeBtnClick,title:"Remove todo item",src:N.a,style:e,alt:""}):null,o=t&&"true"!==r.done?m.a.createElement("img",{className:"float-right",onClick:this.okBtnClick,title:"Mark as done.",src:S.a,style:e,alt:""}):null,l=t&&"true"!==r.done?m.a.createElement("img",{className:"float-right",onClick:this.editBtnClick,title:"Edit task name.",src:k.a,style:e,alt:""}):null;return m.a.createElement("li",{className:s,onMouseEnter:this.mouseEnter,onMouseLeave:this.mouseLeave},m.a.createElement("b",null,m.a.createElement("span",{className:"float-left"},n,"."),m.a.createElement("span",{className:"rmv",title:r.text.length>25?r.text:""},r.text.length>25?r.text.substr(0,25)+".. ":r.text)),i,o,l)}}]),t}(c.Component),O=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={tname:"",error:!1,errorMsg:""},a.tnameChange=a.tnameChange.bind(Object(o.a)(a)),a.handleFormSubmit=a.handleFormSubmit.bind(Object(o.a)(a)),a}return Object(l.a)(t,e),Object(n.a)(t,[{key:"tnameChange",value:function(e){var t=this,a=e.target.value,r="";if(a.length>30&&(r="Only 30 chars."),!/^[a-z\d\-_\s]+$/i.test(a)&&a.length&&(r="No special characters.")&&(a=a.substr(0,a.length-1)),r)return this.setState({tname:a,errorMsg:r,error:!0}),void setTimeout(function(){t.setState({errorMsg:"",err:!1})},4e3);this.setState({tname:a,error:!1,errorMsg:""})}},{key:"handleFormSubmit",value:function(e){e.preventDefault();var t={tname:this.state.tname};this.setState({tname:"",errorMsg:"",error:!1}),this.props.formsubmit(t)}},{key:"render",value:function(){var e=this.state.errorMsg?m.a.createElement("div",{className:"alert alert-danger mt-2"},this.state.errorMsg):null;return m.a.createElement("div",null,m.a.createElement("div",{className:"row justify-content-center align-items-center"},m.a.createElement("form",{className:"form-inline",onSubmit:this.handleFormSubmit},m.a.createElement("div",{className:"input-group"},m.a.createElement("input",{type:"text",className:"form-control",placeholder:"What to do?",value:this.state.tname,onChange:this.tnameChange}),m.a.createElement("div",{className:"input-group-append"},m.a.createElement("button",{className:"btn btn-outline-success",type:"submit",disabled:!this.state.tname||this.state.error},"Add"))))),m.a.createElement("div",{className:"row justify-content-center align-items-center"},e))}}]),t}(c.Component),j=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(s.a)(this,Object(i.a)(t).call(this,e))).state={data:[]},a.loadTodos=a.loadTodos.bind(Object(o.a)(a)),a.handleFormSubmit=a.handleFormSubmit.bind(Object(o.a)(a)),a.updateTodo=a.updateTodo.bind(Object(o.a)(a)),a}return Object(l.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){this.loadTodos()}},{key:"loadTodos",value:function(){this.setState({data:f()})}},{key:"handleFormSubmit",value:function(e){var t=b(e);t.saved?this.loadTodos():console.error("Error: "+t.err.message)}},{key:"updateTodo",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=!1,n=this.state.data;n.forEach(function(n,s){n.id===e&&(r=s),n.id===e&&t&&(a?n.text=a:n.done="true")}),t&&(this.setState({data:n}),b(n,!0)),r>=0&&!t&&n.splice(r,1)&&(this.setState({data:n}),b(n,!0))}},{key:"render",value:function(){var e=this;if(!g)return m.a.createElement("div",{className:"alert alert-danger"},"Your browser do not support Local Storage. Please use any modern browser.");var t=this.state.data.map(function(t,a){return m.a.createElement(C,{data:t,clickHandler:e.updateTodo,key:t.id,hash:a+1})}),a=this.state.data.length?null:m.a.createElement("div",{className:"alert alert-danger"},"Your task list is empty."),r=function(){var t=e.state.data.filter(function(e){return"true"===e.done});return m.a.createElement("span",{className:"btn btn-success float-right"},"Done ",m.a.createElement("span",{className:"badge badge-light"},t.length))}();return m.a.createElement("div",{className:"card"},this.state.data.length?m.a.createElement("div",{className:"card-header"},m.a.createElement("h5",{className:"card-title"},m.a.createElement("span",{className:"btn btn-info"},"Total ",m.a.createElement("span",{className:"badge badge-light"}," ",this.state.data.length)),r)):null,m.a.createElement("div",{className:"card-body"},a,m.a.createElement("ul",{className:"list-group"},t)),m.a.createElement("div",{className:"card-footer"},m.a.createElement(O,{formsubmit:this.handleFormSubmit})))}}]),t}(c.Component);t.default=j}}]);
//# sourceMappingURL=4.e2696281.chunk.js.map