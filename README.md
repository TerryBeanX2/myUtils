#一些工作中写过的可能有用的代码片段
* 表单中判断是否填全了单选框和多选框；
```javascript
//需要zepto或jQuery
function radio_checkbox () {
    //声明一个对象盛放所有name类，每一个此对象的属性代表一个小题。
    var names = {};
    //任性不用jQ的each，用Array.prototype.forEach.call代替，正常人建议用each
    Array.prototype.forEach.call($('input[type="radio"],input[type="checkbox]'), function (e) {
        //两个嵌套的三元运算符，属性为1代表此类name下已有选项；括号内的三元运算是当属性已有1时不再作为，属性不为1时就此类name下还未有任何选中，记为0；
        e.checked ? names[e.name] = 1 : (names[e.name] == 1 ? null : names[e.name] = 0);
    });
    //这个打印便于理解
    console.log(names);
    for (var i in names) {
        if (!names[i]) {
            alert('您尚有未选项');
            //返回false是为了防止刷新，刷新后全部重新填会疯的
            return false;
        }
    }
    alert('提交成功');
    //返回false是为了防止刷新
    return false;
}
```
* nginx服务器实现跨域，极大提高前端效率，此为自用代码段，重点在于Access-Control-Allow-Headers
```javascript
location / {	
    add_header 'Access-Control-Allow-Headers' 'HEAD_INFO,Content-Type';
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET,POST';
    //保留参数(前提/apis)			
    #rewrite  ^.+apis/?(.*)$ /$1 break;
    include  uwsgi_params;	
    //反向地址			
    proxy_pass   http://[your link];
}
```
