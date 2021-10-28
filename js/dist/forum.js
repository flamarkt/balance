module.exports=function(t){var n={};function e(a){if(n[a])return n[a].exports;var o=n[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,a){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:a})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(e.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(a,o,function(n){return t[n]}.bind(null,o));return a},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=18)}([function(t,n,e){"use strict";function a(t,n){return(a=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function o(t,n){t.prototype=Object.create(n.prototype),t.prototype.constructor=t,a(t,n)}e.d(n,"a",(function(){return o}))},function(t,n){t.exports=flarum.core.compat["common/Model"]},function(t,n){t.exports=flarum.core.compat["common/extend"]},function(t,n,e){"use strict";e.d(n,"a",(function(){return c}));var a=e(0),o=e(1),r=e.n(o),c=function(t){function n(){for(var n,e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o];return(n=t.call.apply(t,[this].concat(a))||this).amount=r.a.attribute("amount"),n.comment=r.a.attribute("comment"),n.createdAt=r.a.attribute("createdAt",r.a.transformDate),n}return Object(a.a)(n,t),n.prototype.apiEndpoint=function(){return"/flamarkt/balance/"+this.data.id},n}(r.a)},function(t,n){t.exports=flarum.extensions["flamarkt-core"].common["helpers/formatPrice"]},function(t,n,e){"use strict";e.d(n,"a",(function(){return a}));var a={"models/History":e(3).a}},function(t,n){t.exports=flarum.core.compat["common/utils/ItemList"]},,function(t,n){t.exports=flarum.extensions["flamarkt-core"].forum["layouts/CartLayout"]},,,,function(t,n){t.exports=flarum.core.compat["common/components/LinkButton"]},function(t,n){t.exports=flarum.extensions["flamarkt-core"].forum["utils/AccountControls"]},function(t,n){t.exports=flarum.core.compat["common/components/Page"]},function(t,n){t.exports=flarum.extensions["flamarkt-core"].common["states/AbstractListState"]},function(t,n){t.exports=flarum.extensions["flamarkt-core"].forum["layouts/AbstractAccountLayout"]},function(t,n){t.exports=flarum.core.compat["common/helpers/humanTime"]},function(t,n,e){"use strict";e.r(n),e.d(n,"common",(function(){return _.a})),e.d(n,"forum",(function(){return w}));var a=e(2),o=e(12),r=e.n(o),c=e(13),u=e.n(c),i=e(8),s=e.n(i),f=e(3),l=e(0),p=e(14),d=e.n(p),y=e(15),b=function(t){function n(){return t.apply(this,arguments)||this}return Object(l.a)(n,t),n.prototype.type=function(){return"flamarkt/balance"},n}(e.n(y).a),h=e(6),x=e.n(h),v=e(16),O=e.n(v),j=e(4),g=e.n(j),k=e(17),B=e.n(k),P=function(t){function n(){return t.apply(this,arguments)||this}Object(l.a)(n,t);var e=n.prototype;return e.className=function(){return"BalancePage"},e.title=function(){return"Balance"},e.content=function(){return m("div",this.sections().toArray())},e.sections=function(){var t=new x.a;return t.add("current",m("p",["Current balance: ",g()(app.session.user.attribute("flamarktBalance"))]),20),t.add("history",m("ul",this.attrs.state.pages.map((function(t){return t.items.map((function(t){return m("li",[B()(t.createdAt()),": ",g()(t.amount())])}))}))),10),t},n}(O.a),A=function(t){function n(){for(var n,e=arguments.length,a=new Array(e),o=0;o<e;o++)a[o]=arguments[o];return(n=t.call.apply(t,[this].concat(a))||this).state=void 0,n}Object(l.a)(n,t);var e=n.prototype;return e.oninit=function(n){t.prototype.oninit.call(this,n),this.state=new b({filter:{user:app.session.user.username()}}),this.state.refresh()},e.view=function(){return P.component({state:this.state})},n}(d.a),_=e(5),w={"layouts/BalanceLayout":P,"pages/BalancePage":A,"states/HistoryState":b};app.initializers.add("flamarkt-balance",(function(){app.store.models["flamarkt-balance-history"]=f.a,app.routes["flamarkt.account.balance"]={path:"/account/balance",component:A},Object(a.extend)(u.a,"controls",(function(t){t.add("balance",r.a.component({href:app.route("flamarkt.account.balance")},"Balance"))})),Object(a.extend)(s.a.prototype,"oninit",(function(){this.payWithBalance=!1})),Object(a.extend)(s.a.prototype,"sectionPayment",(function(t){var n=this,e=app.session.user.attribute("flamarktBalance");t.add("balance",m(".Form-group",[m("label",[m("input",{type:"checkbox",checked:this.payWithBalance,onchange:function(){n.payWithBalance=!n.payWithBalance},disabled:e<this.attrs.cart.priceTotal()||this.submitting})," Pay with balance (",g()(e),")"])]))})),Object(a.extend)(s.a.prototype,"data",(function(t){t.payWithBalance=this.payWithBalance}))}))}]);
//# sourceMappingURL=forum.js.map