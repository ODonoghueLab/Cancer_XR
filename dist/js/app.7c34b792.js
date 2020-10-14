(function(r){function e(e){for(var n,a,c=e[0],s=e[1],p=e[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(r[n]=s[n]);u&&u(e);while(d.length)d.shift()();return i.push.apply(i,p||[]),t()}function t(){for(var r,e=0;e<i.length;e++){for(var t=i[e],n=!0,c=1;c<t.length;c++){var s=t[c];0!==o[s]&&(n=!1)}n&&(i.splice(e--,1),r=a(a.s=t[0]))}return r}var n={},o={app:0},i=[];function a(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=r,a.c=n,a.d=function(r,e,t){a.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:t})},a.r=function(r){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},a.t=function(r,e){if(1&e&&(r=a(r)),8&e)return r;if(4&e&&"object"===typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(a.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)a.d(t,n,function(e){return r[e]}.bind(null,n));return t},a.n=function(r){var e=r&&r.__esModule?function(){return r["default"]}:function(){return r};return a.d(e,"a",e),e},a.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},a.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var p=0;p<c.length;p++)e(c[p]);var u=s;i.push([0,"chunk-vendors"]),t()})({0:function(r,e,t){r.exports=t("56d7")},"034f":function(r,e,t){"use strict";var n=t("85ec"),o=t.n(n);o.a},"29db":function(r,e,t){},"56d7":function(r,e,t){"use strict";t.r(e);t("e260"),t("e6cf"),t("cca6"),t("a79d");var n=t("2b0e"),o=function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("div",{attrs:{id:"app"}},[t("Matrix",{attrs:{msg:"Cancer XR"}})],1)},i=[],a=function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("div",{attrs:{id:"matrix"}},[t("h1",[r._v(r._s(r.msg))]),t("div",{attrs:{id:"container"}},r._l(r.structures,(function(e){return t("div",r._g({key:e.primary_accession,staticClass:"cell"},e.primary_accession>0?{click:function(){return r.redirect(e.primary_accession)}}:{}),[t("a",{staticClass:"link",style:[{cursor:"pointer"}],attrs:{href:[r.redirect(e.link)],target:"_blank"}},[t("h3",[r._v(r._s(e.primary_accession))]),t("picture",[t("source",{attrs:{srcset:["../images/covid19/WEBP/"+e.primary_accession+".webp 2000w, ../images/covid19/WEBP/"+e.primary_accession+"_w1000.webp 1000w, ../images/covid19/WEBP/"+e.primary_accession+"_w500.webp 500w"],type:"image/webp",sizes:"33vw"}}),t("source",{attrs:{srcset:["../images/covid19/JPEG/"+e.primary_accession+".jpg 2000w, ../images/covid19/JPEG/"+e.primary_accession+"_w1000.jpg 1000w, ../images/covid19/JPEG/"+e.primary_accession+"_w500.jpg 500w"],type:"image/jpeg",sizes:"33vw"}}),t("img",{attrs:{src:["../images/covid19/JPEG/"+e.primary_accession+"_w1000.jpg"]}})])])])})),0)])},c=[],s={name:"Matrix",props:{msg:String},data:function(){return{structures:t("ab93")}},mounted:function(){console.log(this.json)},methods:{redirect:function(r){return r}}},p=s,u=(t("ffa6"),t("2877")),l=Object(u["a"])(p,a,c,!1,null,"0cdcab25",null),d=l.exports,f={name:"App",components:{Matrix:d}},g=f,m=(t("034f"),Object(u["a"])(g,o,i,!1,null,null,null)),h=m.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(r){return r(h)}}).$mount("#app")},"85ec":function(r,e,t){},ab93:function(r){r.exports=JSON.parse('[{"primary_accession":"P0DTC1","link":"http://test.aquaria.app/P0C6V9"},{"primary_accession":"P0DTC2","link":"http://odonoghuelab.org:8009/P0C6F5"},{"primary_accession":"P0DTD1","link":"http://odonoghuelab.org:8009/Q0Q475"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/Q0Q474"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/Q0Q472"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/Q0Q468"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/Q0Q470"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/Q0Q473"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/P0C5A6"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/Q0Q471"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/P0C5A9"},{"primary_accession":"P0DTC1","link":"http://odonoghuelab.org:8009/Q0Q469"}]')},ffa6:function(r,e,t){"use strict";var n=t("29db"),o=t.n(n);o.a}});
//# sourceMappingURL=app.7c34b792.js.map