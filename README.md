#一些工作中写过的可能有用的代码片段
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
```
* nginx跨域配置文件中的片段，重点在于Access-Control-Allow-Headers 很难搜...已经解决
```javascript
//允许自定义的header中带有下划线，我曾经被坑惨了..
underscores_in_headers  on;
//server中的代码段：
location / {	
    //设置了*还跨域失败多数是Header引起的，此处的值由需要填写，HEAD_INFO是自定义的东西
    add_header 'Access-Control-Allow-Headers' 'HEAD_INFO,Content-Type';
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET,POST';
    //保留参数(前提/apis)			
    #rewrite  ^.+apis/?(.*)$ /$1 break;
    include  uwsgi_params;	
    //代理地址			
    proxy_pass   http://[your link];
}
```


