import{e as l,i as d,t as f}from"./index.6aff17fd.js";function o(t){return new Promise((e,n)=>{t.oncomplete=t.onsuccess=()=>e(t.result),t.onabort=t.onerror=()=>n(t.error)})}function p(t,e){const n=indexedDB.open(t);n.onupgradeneeded=()=>n.result.createObjectStore(e);const r=o(n);return(a,c)=>r.then(i=>c(i.transaction(e,a).objectStore(e)))}let s;function u(){return s||(s=p("keyval-store","keyval")),s}function v(t,e=u()){return e("readonly",n=>o(n.get(t)))}function y(t,e,n=u()){return n("readwrite",r=>(r.put(e,t),o(r.transaction)))}function S(t,e=u()){return e("readwrite",n=>(n.delete(t),o(n.transaction)))}function g(t,e){return t.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},o(t.transaction)}function b(t=u()){return t("readonly",e=>{if(e.getAll)return o(e.getAll());const n=[];return g(e,r=>n.push(r.value)).then(()=>n)})}const h=f("<div></div>"),x=({children:t,classes:e=""})=>(()=>{const n=h.cloneNode(!0);return l(n,`flex flex-col gap-3 p-2 ${e}`),d(n,t),n})();export{x as L,S as d,v as g,y as s,b as v};
