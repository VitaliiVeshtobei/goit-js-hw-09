!function(){var e={form:document.querySelector(".form"),delay:document.querySelector('[name="delay"]'),step:document.querySelector('[name="step"]'),amount:document.querySelector('[name="amount"]')};console.log(e.form),console.log(e.delay),console.log(e.step),console.log(e.amount),e.form.addEventListener("submit",(function(e){e.preventDefault();var a=setInterval((function(){if(n!==Number(o.amount))return n+=1,t+=Number(o.step),(e=n,r=o.delay,new Promise((function(o,n){var t=Math.random()>.3;setTimeout((function(){t?o({position:e,delay:r}):n({position:e,delay:r})}),r)}))).then((function(e){var o=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(o," in ").concat(n,"ms"))})).catch((function(e){var o=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(o," in ").concat(n,"ms"))}));var e,r;clearInterval(a)}),t)})),e.form.addEventListener("input",(function(e){o[e.target.name]=e.target.value,console.log(o)}));var o={},n=0,t=0}();
//# sourceMappingURL=03-promises.5afa810f.js.map
