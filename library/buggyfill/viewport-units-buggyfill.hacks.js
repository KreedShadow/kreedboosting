(function(root,factory){'use strict';if(typeof define==='function'&&define.amd){define([],factory);}else if(typeof exports==='object'){module.exports=factory();}else{root.viewportUnitsBuggyfillHacks=factory();}}(this,function(){'use strict';var options;var calcExpression=/calc\(/g;var quoteExpression=/[\"\']/g;var urlExpression=/url\([^\)]*\)/g;var userAgent=window.navigator.userAgent;var isBuggyIE=/MSIE [0-9]\./i.test(userAgent);var isOldIE=/MSIE [0-8]\./i.test(userAgent);var supportsVminmax=true;var supportsVminmaxCalc=true;if(!isBuggyIE){isBuggyIE=!!navigator.userAgent.match(/MSIE 10\.|Trident.*rv[ :]*1[01]\.| Edge\/1\d\./);}if(isBuggyIE===true){supportsVminmaxCalc=false;supportsVminmax=false;}function checkHacks(declarations,rule,name,value){var needsHack=name==='content'&&value.indexOf('viewport-units-buggyfill')>-1;if(!needsHack){return;}var fakeRules=value.replace(quoteExpression,'');fakeRules.split(';').forEach(function(fakeRuleElement){var fakeRule=fakeRuleElement.split(':');if(fakeRule.length!==2){return;}var name=fakeRule[0].trim();if(name==='viewport-units-buggyfill'){return;}var value=fakeRule[1].trim();declarations.push([rule,name,value]);if(calcExpression.test(value)){var webkitValue=value.replace(calcExpression,'-webkit-calc(');declarations.push([rule,name,webkitValue]);}});}return{required:function(options){return options.isMobileSafari||isBuggyIE;},initialize:function(initOptions){options=initOptions;var div=document.createElement('div');div.style.width='1vmax';supportsVminmax=div.style.width!=='';if(options.isMobileSafari||options.isBadStockAndroid){supportsVminmaxCalc=false;}},initializeEvents:function(options,refresh,_refresh){if(options.force){return;}if(isBuggyIE&&!options._listeningToResize){window.addEventListener('resize',_refresh,true);options._listeningToResize=true;}},findDeclarations:function(declarations,rule,name,value){if(name===null){return;}checkHacks(declarations,rule,name,value);},overwriteDeclaration:function(rule,name,_value){if(isBuggyIE&&name==='filter'){_value=_value.replace(/px/g,'');}return _value;}};}));