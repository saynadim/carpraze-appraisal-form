# carpraze-appraisal-form

## How to use

place the following code in your html file
```html
<a class="appraisal-button cp-appraisal-btn" href="#carpraze-appraisal">appraisal</a>
<meta name="carprazeForm:token" content="aa88dd5135899c05895f8a1c57dc9748">
<meta name="carprazeForm:selector" content=".cp-appraisal-btn">
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/saynadim/carpraze-appraisal-form@1.7/appraisal-form.js"> </script>
<!-- or -->
<script>
    (function(){var s=document.createElement('script');s.type='text/javascript';s.src='appraisal-form.js?v='+(new Date).toISOString().slice(0,13).replace(/[-T:]/g,'');document.head.appendChild(s);})();
</script>

```
