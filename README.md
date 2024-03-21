# carpraze-appraisal-form

## How to use

place the following code in your html file
```html
<a class="appraisal-button cp-appraisal-btn" href="#carpraze-appraisal">appraisal</a>
<meta name="carprazeForm:token" content="aa88dd5135899c05895f8a1c57dc9748">
<meta name="carprazeForm:selector" content=".cp-appraisal-btn">
<!--formType is optional defaults to customerInput-->
<meta name="carprazeForm:formType" content="customerInput">
<script>
    (function(){var s=document.createElement('script');s.type='text/javascript';s.src='https://carpraze.s3.amazonaws.com/assets/js/customer_input_wp_form.js?v='+(new Date).toISOString().slice(0,13).replace(/[-T:]/g,'');document.head.appendChild(s);})();
</script>
<!--<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/saynadim/carpraze-appraisal-form@1.7/appraisal-form.js"> </script>-->

```


## Development

### setup
open `localhost:3000/examples/example` after preparing
```bash
yarn install
yarn serve
```

### test
```bash
# run all tests in all browsers
yarn test

# run all tests in a browser
yarn test:chromium

# run single test case
yarn test:chromium -g "testcase name"
```
