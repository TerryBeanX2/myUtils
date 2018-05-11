# 一些工作中写过的可能有用的代码片段

* 写了个格式化银行卡的方法
```javascript
function formatBankcard(str){
    return str.split('').reduce((prev, next, index)=> {
        return prev + ((index % 4) ? next : (' ' + next ));
    });
}

let str = '6214143523234154320';
formatBankcard(str)； //6214 1435 2323 4154 320
```

* 格式化货币的正则(借鉴来的)
```javascript
var test1 = '1234567890'
var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
console.log(format) // 1,234,567,890

//或者

(23333333).toLocaleString('en-US')  // 23,333,333
```

* 节流函数
```javascript
function throttle(fn, context) {
    clearTimeout(fn.timeoutId);
    fn.timeoutId = setTimeout(fn.bind(context), 500);
}
```

* input中文键盘处理
```javascript
    input.addEventListener('compositionstart', fn);
    input.addEventListener('compositionend', fn);
```

* 列表触底
```javascript
const body = document.body;
const html = document.documentElement;
body.onscroll = () => {
    throttle(fnCheckListStop);
    if (html.scrollHeight - html.clientHeight > 0) {
      ((html.scrollHeight - html.clientHeight) <= (html.scrollTop || body.scrollTop)) && fnCheckListTouchBottom;
    }
}
```




