(this["webpackJsonpts-app"]=this["webpackJsonpts-app"]||[]).push([[0],{38:function(n,t,e){},45:function(n,t,e){"use strict";e.r(t);var r=e(1),c=e(0),i=e(19),o=e.n(i),a=(e(38),e(12)),u=e(5),s=e(10);var b=e(16),d=e(4);function l(){var n=Object(u.a)(["\n        border : 0;\n        outline : 0;\n        cursor : pointer;\n        transition:all ease-out .5s;\n        padding : 5px 10px;\n        margin-bottom : 5px;\n        margin-right : 5px;\n        background : ",";\n        color : ",";\n        border-radius : 10px;\n        font-weight : 600;\n        ","\n    "]);return l=function(){return n},n}var j=d.d.button(l(),(function(n){return n.bg||"#EAEAEA"}),(function(n){return n.color||"unset"}),"true"===sessionStorage.getItem("mobile")?"&:active{background : rgb(70, 77, 82); color : white;}":"&:hover{background : rgb(70, 77, 82); color : white;}"),f=function(n){var t=n.color,e=n.bg,c=n.content,i=n.click,o=n.id;return Object(r.jsx)(j,{color:t,bg:e,onClick:i,id:o,children:c})};function g(){var n=Object(u.a)(["\n    animation: "," .5s linear alternate;\n    display : inline-block;\n    width : 30px;\n    border : 1px solid rgba(86, 115, 235, 0.19);\n    padding : 5px 0px;\n    margin-bottom : 5px;\n    margin-right : 5px;\n    background : ",";\n    color : ",";\n    border-radius : 50px;\n    font-weight : 600;\n"]);return g=function(){return n},n}var p=d.d.span(g(),(function(n){return n.theme.fadeUp}),(function(n){return n.corrected?"rgba(235, 83, 116,.12)":"white"}),(function(n){return n.corrected?"rgb(235, 83, 116)":"rgb(70, 77, 82)"})),x=function(n){var t=n.num,e=n.correct;return Object(r.jsx)(p,{corrected:e,children:t})};function O(){var n=Object(u.a)(["\n    margin-top : 10px;\n    margin-bottom : 5px;\n    color : ",";\n    font-size : ",';\n    font-weight : 600;\n    display: flex;\n    align-items: center;\n    &:before{\n        content: "";\n        margin-right : 8px;\n        flex: 0%;\n        height: 1px;\n        background: rgba(134, 134, 134, 0.19);\n        z-index: -100;\n    }\n    &:after{\n        content: "";\n        margin-left : 8px;\n        flex: 0%;\n        height: 1px;\n        background: rgba(134, 134, 134, 0.19);\n        z-index: -100;\n    }\n']);return O=function(){return n},n}var m=d.d.div(O(),(function(n){return n.color||"unset"}),(function(n){return n.fontSize||"unset"})),h=function(n){var t=n.color,e=n.content,c=n.fontSize;return Object(r.jsx)(m,{color:t,fontSize:c,children:e})},v=function(){var n,t=Object(b.c)((function(n){return n.Reducer.list})),e=Object(c.useState)([]),i=Object(a.a)(e,2),o=i[0],u=i[1],d=Object(c.useState)([]),l=Object(a.a)(d,2),j=l[0],g=l[1],p=Object(c.useCallback)((function(t){var e;null===(e=document.getElementById("startBtn"))||void 0===e||e.setAttribute("disabled","true");var r=document.getElementById("num");n=setInterval((function(){for(r||clearInterval(n);r;){var e=Math.floor(45*Math.random()+1);if(!t.includes(e)){r.innerText=e.toString();break}}}),50)}),[]),O=function(n,t){var e;return function(){for(var r=arguments.length,c=new Array(r),i=0;i<r;i++)c[i]=arguments[i];clearTimeout(e),e=setTimeout((function(){n.apply(void 0,c)}),t)}}(Object(c.useCallback)((function(t,e,r){var c=parseInt(document.getElementById("num").innerText);0!==c&&(clearInterval(n),r.includes(c)&&(t[c]=!0,g(Object(s.a)(t))),u([].concat(Object(s.a)(e),[c])),e.length<5?setTimeout((function(){p([].concat(Object(s.a)(e),[c]))}),700):(document.getElementById("stopBtn").setAttribute("disabled","true"),setTimeout((function(){alert("".concat(t.filter((function(n){return n})).length,"\uac1c \ub9de\ucd94\uc168\uc2b5\ub2c8\ub2e4!"))}),500)))}),[]),700),m=Object(c.useCallback)((function(){clearInterval(n),document.getElementById("num").innerText="0",u([]),g([]),document.getElementById("stopBtn").removeAttribute("disabled"),document.getElementById("startBtn").removeAttribute("disabled")}),[]);return Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{id:"num",children:"0"}),Object(r.jsx)(f,{id:"startBtn",content:"\ucd94\ucca8\uc2dc\uc791",click:function(){return p([])}}),Object(r.jsx)(f,{id:"stopBtn",click:function(){return O(j,o,t)},content:"\ubf51\uae30"}),Object(r.jsx)(f,{id:"resetBtn",color:"rgb(86, 115, 235)",bg:"rgb(224, 230, 251)",click:m,content:"\ucd08\uae30\ud654"}),Object(r.jsx)(h,{content:"\ucd94\ucca8 \uacb0\uacfc"}),Object(r.jsx)("p",{children:o.map((function(n){return Object(r.jsx)(x,{correct:j[n],num:n})}))}),Object(r.jsx)(h,{content:"\ub0b4\uac00 \uace0\ub978 \uc22b\uc790"}),Object(r.jsx)("p",{children:t.sort((function(n,t){return n-t})).map((function(n){return Object(r.jsx)(x,{correct:j[n],num:n})}))})]})},w=e(3);function k(){var n=Object(u.a)(["\n        max-width : 360px;\n    "]);return k=function(){return n},n}function y(){var n=Object(u.a)(["\n        width : 35px;\n        outline : 0;\n        cursor : pointer;\n        border : 0;\n        transition:all ease-out .5s;\n        padding : 5px 0px;\n        margin-bottom : 5px;\n        margin-right : 5px;\n        background : ",";\n        color : ",";\n        border-radius : 10px;\n        font-weight : 600;\n        ","\n    "]);return y=function(){return n},n}var I=d.d.button(y(),(function(n){return n.selected?"rgb(70, 77, 82)":"#EAEAEA"}),(function(n){return n.selected?"white":"unset"}),"true"===sessionStorage.getItem("mobile")?"":"&:hover{font-size : 16px}"),E=d.d.div(k()),S=function(n){var t=n.addList,e=Object(w.f)(),i=Object(c.useState)([]),o=Object(a.a)(i,2),u=o[0],b=o[1],d=Object(c.useState)([]),l=Object(a.a)(d,2),j=l[0],g=l[1],p=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45].map((function(n,t){return Object(r.jsx)(I,{selected:u[t],id:"btn".concat(n),onClick:function(){return function(n){if(j.includes(n))j.splice(j.indexOf(n),1),u[n-1]=!1,b(Object(s.a)(u)),g(Object(s.a)(j));else{if(6===j.length)return;u[n-1]=!0,b(Object(s.a)(u)),j.push(n),g(Object(s.a)(j))}}(n)},children:n})}));return Object(r.jsxs)("div",{children:[Object(r.jsx)(E,{children:p}),Object(r.jsx)(f,{color:"rgb(86, 115, 235)",bg:"rgb(224, 230, 251)",content:"\ucd08\uae30\ud654",click:function(){b([]),g([])}}),Object(r.jsx)(f,{color:"rgb(86, 115, 235)",bg:"rgb(224, 230, 251)",content:"\ubc88\ud638\uc81c\ucd9c",click:function(){j.length<6?alert("\ucd1d 6\uac1c\uc758 \ubc88\ud638\ub97c \uc120\ud0dd\ud574\uc8fc\uc138\uc694"):window.confirm("\ub85c\ub610\ubc88\ud638 ".concat(j," \ub97c \uc81c\ucd9c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"))&&(t(j),e.push("/result"))}}),Object(r.jsx)(h,{content:"\ub0b4\uac00 \ubf51\uc740 \ub85c\ub610 \ubc88\ud638"}),Object(r.jsx)("p",{children:j.map((function(n){return Object(r.jsx)(x,{num:n})}))})]})},B=e(18),T="LIST",A="LIST2";var L={list:function(n){return{type:T,newList:n}},list2:function(n){return{type:A,newList:n}}},C={list:[],list2:[1,2,3,4,5]};var z=e(23);function _(){var n=Object(u.a)(["\nposition: relative;\nbottom: 10vh;\n"]);return _=function(){return n},n}function D(){var n=Object(u.a)(["\n  animation: "," .5s linear alternate;\n"]);return D=function(){return n},n}var F=d.d.div(D(),(function(n){return n.theme.fadeUp})),M=d.d.h2(_()),U=window.navigator.userAgent.indexOf("Mobile")>-1?"true":"false";sessionStorage.setItem("mobile",U);var N=function(){var n=Object(b.b)(),t=function(t){n(L.list(t))},e=Object(c.useState)(123),i=Object(a.a)(e,2);return i[0],i[1],Object(r.jsx)(z.a,{basename:"/lotto-ts-react",children:Object(r.jsx)(w.c,{children:Object(r.jsxs)(F,{className:"App",children:[Object(r.jsx)(M,{children:"\ub85c\ub610 \ucd94\ucca8\uae30 with TypeScript"}),Object(r.jsx)(w.a,{exact:!0,path:"/",render:function(){return Object(r.jsx)(S,{addList:t})}}),Object(r.jsx)(w.a,{path:"/result",component:v})]})})})},P=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,46)).then((function(t){var e=t.getCLS,r=t.getFID,c=t.getFCP,i=t.getLCP,o=t.getTTFB;e(n),r(n),c(n),i(n),o(n)}))},R=e(14),J=Object(R.b)({Reducer:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case T:return Object(B.a)(Object(B.a)({},n),{},{list:t.newList});case A:return Object(B.a)(Object(B.a)({},n),{},{list2:t.newList});default:return n}}});function X(){var n=Object(u.a)(["\n      display: flex;\n      flex-direction: row;\n    "]);return X=function(){return n},n}function Y(){var n=Object(u.a)(["\n    0% {\n      opacity: 0;\n      transform : translateY(10px);\n    }\n    \n    100% {\n      opacity: 1;\n      transform : translateY(0px);\n    }\n  "]);return Y=function(){return n},n}var V={fadeUp:Object(d.e)(Y()),flexDiv:Object(d.c)(X())};function q(){var n=Object(u.a)(["\n  * {\n    margin: 0;\n    padding: 0;  \n  }\n\n  body {\n    padding: 12px 20px;\n    margin: auto;\n    width: 400px;\n    overflow: hidden;\n    min-height: 100vh;\n    box-sizing: border-box;\n    text-align : center;\n    align-items : center;\n    display : grid;\n    color : rgb(70, 77, 82);\n  }\n  \n  @media(max-width : 400px){\n    body{\n      width : 100%;\n    }\n  }\n"]);return q=function(){return n},n}var G=Object(d.b)(q()),H=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||R.c,K=Object(R.d)(J,H());o.a.render(Object(r.jsx)(b.a,{store:K,children:Object(r.jsxs)(d.a,{theme:V,children:[Object(r.jsx)(N,{}),Object(r.jsx)(G,{})]})}),document.getElementById("root")),P()}},[[45,1,2]]]);
//# sourceMappingURL=main.0cec3945.chunk.js.map