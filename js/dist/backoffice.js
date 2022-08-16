(()=>{var t={n:o=>{var e=o&&o.__esModule?()=>o.default:()=>o;return t.d(e,{a:e}),e},d:(o,e)=>{for(var n in e)t.o(e,n)&&!t.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:e[n]})},o:(t,o)=>Object.prototype.hasOwnProperty.call(t,o),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},o={};(()=>{"use strict";function e(t,o){return e=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},e(t,o)}function n(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,e(t,o)}t.r(o),t.d(o,{backoffice:()=>x,common:()=>w});const a=flarum.core.compat["common/Model"];var r=t.n(a),c=function(t){function o(){for(var o,e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return(o=t.call.apply(t,[this].concat(n))||this).amount=r().attribute("amount"),o.comment=r().attribute("comment"),o.createdAt=r().attribute("createdAt",r().transformDate),o}return n(o,t),o.prototype.apiEndpoint=function(){return"/flamarkt/balance/"+this.data.id},o}(r());const u=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["components/UserList"];var i=t.n(u);const l=((flarum.extensions["flamarkt-backoffice"]||{}).backoffice||{})["pages/UserShowPage"];var s=t.n(l);const p=((flarum.extensions["flamarkt-core"]||{}).common||{})["components/PriceLabel"];var f=t.n(p);const d=flarum.core.compat["common/extend"],b=flarum.core.compat["common/components/Button"];var y=t.n(b);const h=flarum.core.compat["common/components/Modal"];var v=t.n(h);const g=flarum.core.compat["common/utils/ItemList"];var k=t.n(g),O=function(t){function o(){for(var o,e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return(o=t.call.apply(t,[this].concat(n))||this).amount=0,o.comment="",o.saving=!1,o}n(o,t);var e=o.prototype;return e.content=function(){return m(".Modal-body",this.fields().toArray())},e.fields=function(){var t=this,o=new(k());return o.add("amount",m(".Form-group",[m("local","Amount"),m("input.FormControl",{type:"number",value:this.amount,onchange:function(o){t.amount=parseInt(o.target.value)}})])),o.add("comment",m(".Form-group",[m("local","Comment"),m("textarea.FormControl",{value:this.comment,onchange:function(o){t.comment=o.target.value}})])),o.add("submit",m(".Form-group",[y().component({type:"submit",className:"Button Button--primary"},"Apply")]),-10),o},e.data=function(){return{amount:this.amount,comment:this.comment}},e.onsubmit=function(t){var o=this;t.preventDefault(),this.saving=!0,app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/flamarkt/users/"+this.attrs.userId+"/balance",body:{data:{attributes:this.data()}}}).then((function(){o.saving=!1,m.redraw(),o.hide()})).catch((function(t){throw o.saving=!1,m.redraw(),t}))},o}(v()),w={"models/History":c},x={"components/AdjustBalanceModal":O};app.initializers.add("flamarkt-balance",(function(){app.store.models["flamarkt-balance-history"]=c,(0,d.extend)(i().prototype,"head",(function(t){t.add("balance",m("th","Balance"))})),(0,d.extend)(i().prototype,"columns",(function(t,o){t.add("balance",m("td",f().component({value:o.attribute("flamarktBalance")})))})),(0,d.extend)(s().prototype,"fields",(function(t){var o=this;t.add("balance",m(".Form-group",[m("local","Amount"),m("input.FormControl",{type:"number",value:this.user.attribute("flamarktBalance"),readonly:!0}),y().component({className:"Button",onclick:function(){app.modal.show(O,{userId:o.user.id()})}},"Update balance")]))}))}))})(),module.exports=o})();
//# sourceMappingURL=backoffice.js.map