//需要zepto或jQuery
function radio_checkbox () {
    //声明一个对象盛放所有name类，每一个此对象的属性代表一个小题。
    var names = {};
    //直接forEach会报错，用Array.prototype.forEach.call代替。
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