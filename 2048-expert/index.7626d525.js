const n=document.querySelector(".game-board"),e=document.getElementById("current-score"),r=document.getElementById("best-score");let t=[],i=0,M=null===getBestScore()?0:getBestScore();function L(){const n=Math.floor(Math.random()*t.length);0==t[n].innerHTML?t[n].innerHTML=Math.random()>.5?4:2:L()}function H(){for(let n=0;n<6;n++){let e=t[n].innerHTML,r=t[n+6].innerHTML,i=t[n+12].innerHTML,M=t[n+18].innerHTML,L=t[n+24].innerHTML,H=t[n+30].innerHTML,T=[parseInt(e),parseInt(r),parseInt(i),parseInt(M),parseInt(L),parseInt(H)];T=T.filter((n=>n));let l=6-T.length,a=Array(l).fill(0).concat(T);t[n].innerHTML=a[0],t[n+6].innerHTML=a[1],t[n+12].innerHTML=a[2],t[n+18].innerHTML=a[3],t[n+24].innerHTML=a[4],t[n+30].innerHTML=a[5]}}function T(){for(let n=0;n<6;n++){let e=t[n].innerHTML,r=t[n+6].innerHTML,i=t[n+12].innerHTML,M=t[n+18].innerHTML,L=t[n+24].innerHTML,H=t[n+30].innerHTML,T=[parseInt(e),parseInt(r),parseInt(i),parseInt(M),parseInt(L),parseInt(H)];T=T.filter((n=>n));let l=6-T.length,a=T.concat(Array(l).fill(0));t[n].innerHTML=a[0],t[n+6].innerHTML=a[1],t[n+12].innerHTML=a[2],t[n+18].innerHTML=a[3],t[n+24].innerHTML=a[4],t[n+30].innerHTML=a[5]}}function l(){for(let n=0;n<36;n+=6){let e=t[n].innerHTML,r=t[n+1].innerHTML,i=t[n+2].innerHTML,M=t[n+3].innerHTML,L=t[n+4].innerHTML,H=t[n+5].innerHTML,T=[parseInt(e),parseInt(r),parseInt(i),parseInt(M),parseInt(L),parseInt(H)];T=T.filter((n=>n));let l=6-T.length,a=Array(l).fill(0).concat(T);t[n].innerHTML=a[0],t[n+1].innerHTML=a[1],t[n+2].innerHTML=a[2],t[n+3].innerHTML=a[3],t[n+4].innerHTML=a[4],t[n+5].innerHTML=a[5]}}function a(){for(let n=0;n<36;n+=6){let e=t[n].innerHTML,r=t[n+1].innerHTML,i=t[n+2].innerHTML,M=t[n+3].innerHTML,L=t[n+4].innerHTML,H=t[n+5].innerHTML,T=[parseInt(e),parseInt(r),parseInt(i),parseInt(M),parseInt(L),parseInt(H)];T=T.filter((n=>n));let l=6-T.length,a=T.concat(Array(l).fill(0));t[n].innerHTML=a[0],t[n+1].innerHTML=a[1],t[n+2].innerHTML=a[2],t[n+3].innerHTML=a[3],t[n+4].innerHTML=a[4],t[n+5].innerHTML=a[5]}}function o(){for(let n=0;n<6;n++)for(let e=0;e<5;e++){let r=6*n+e;if(t[r].innerHTML===t[r+1].innerHTML){let n=parseInt(t[r].innerHTML)+parseInt(t[r+1].innerHTML);t[r].innerHTML=n,t[r+1].innerHTML=0,c(n)}}}function s(){for(let n=0;n<6;n++)for(let e=0;e<5;e++){let r=6*e+n;if(t[r].innerHTML===t[r+6].innerHTML){let n=parseInt(t[r].innerHTML)+parseInt(t[r+6].innerHTML);t[r].innerHTML=n,t[r+6].innerHTML=0,c(n)}}}function c(n){i+=n,e.innerHTML=i,i>parseInt(M)&&(setBestScore(i),r.innerHTML=i)}function f(){t.forEach((n=>n.innerHTML="")),i=0,e.innerHTML=0,L(),L()}document.addEventListener("keyup",(function(n){37===n.keyCode?(a(),o(),a(),L(),L()):38===n.keyCode?(T(),s(),T(),L(),L()):39===n.keyCode?(l(),o(),l(),L(),L()):40===n.keyCode?(H(),s(),H(),L(),L()):16===n.keyCode&&f()})),function(){for(let e=0;e<36;e++){let r=document.createElement("div");r.classList.add("cell"),r.setAttribute("data-index",e),t.innerHTML=0,n.appendChild(r),t.push(r)}L(),L(),r.innerHTML=M}();document.getElementById("new-btn").onclick=function(){f()};
//# sourceMappingURL=index.7626d525.js.map