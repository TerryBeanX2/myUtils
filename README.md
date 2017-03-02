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
* nginx跨域配置文件中的片段，极大提高前端开发效率，重点在于Access-Control-Allow-Headers 很难搜..已经解决
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
* 摘抄一段自定义Event的写法，以后的用来写类似钩子的东西
```javascript
var Event = {
        on: function(eventName, callback){
            if(!this[eventName]){
                this[eventName] = [];
            }
            this[eventName].push(callback);
        },
        emit: function(eventName){
            var that = this;
            var params = arguments.length>1 ? Array.prototype.slice.call(arguments,1) : [];
            if(that[eventName]){
                Array.prototype.forEach.call(that[eventName],function(arg){
                    arg.apply(self,params);
                });
            }
        }
    };

    Event.on('test', function (result) {
        console.log(result);
    });

    Event.emit('test','helloWorld'); // 输出 'hello world' 和 'test'
```
