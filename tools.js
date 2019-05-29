// //数组去重
// var arr = [1,1,1,2,2,2,3,3,3]; 
// Array.prototype.unique = function () {
//     var temp = {},
//         arr = [],
//         len = this.length;
//     for(var i = 0; i < len; i++) {
//         if(!temp[this[i]]) { //检测temp里面存不存在，如果存在在不执行。
//             temp[this[i]] = "abc";
//             arr.push(this[i]);
//         }
//     }
//     return arr;
// }

// 深度克隆
//    function deepClone(a) {
//        return JSON.parse(JSON.stringify(a));
//    };

//影子克隆
Object.prototype.shadowClone = function () {
    var origin = this;
    var toStr = Object.prototype.toString;
    var arrStr = "[object Array]";
    var objStr = "[object Object]";
    var target = toStr.call(this) == arrStr ? [] : {};
    for (var prop in origin) {
        var tyep = toStr.call(origin[prop]);
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== null && tyep == objStr || tyep == arrStr) {
                target[prop] = tyep == arrStr ? [] : {};
                target[prop] = origin[prop].shadowClone();
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}
//深度克隆
function deepClone(origin, target) {
    var target = target || {}; //防止你不传目标对象。空传也是可以的。
    var toStr = Object.prototype.toString; //用于区别出[object Array]
    var arrStr = "[object Array]";
    for (prop in origin) {
        if (origin.hasOwnProperty(prop)) { //看看是不是自己的，不复制原型链上的
            if (origin[prop] !== null && typeof (origin[prop]) == "object") { //看看是不是对象
                //   if(toStr.call(origin[prop]) == arrStr) {//看看是不是数组类对象。
                //      target[prop] = []; 
                //   }else{
                //      target[prop] = {};
                //   }
                target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {}; //三目运算符
                deepClone(origin[prop], target[prop]); //如果是对象，还要再递归的克隆一下。
            } else {
                target[prop] = origin[prop]; //如果是不是引用值，直接克隆。
            }
        }
    }
    return target;
}
//封装检测具体的数据类型函数
function type(target) {
    var ret = typeof (target);
    var template = {
        "[object Array]": "array",
        "[object Object]": "objcet",
        "[object Number]": "number-object",
        "[object Boolean]": "boolean-object",
        "[object String]": "string-object"
    }
    if (target === null) {
        return "null";
    } else if (ret == "object") {
        var str = Object.prototype.toString.call(target); //能检测具体是什么东西。
        return template[str];
    } else {
        return ret;
    }
}
//封装获取滚动条的函数
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            x: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
//封装可视区窗口的函数
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") { //IE8 以下怪异模式
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}
//封装得到元素的某个属性。 
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}
// //封装兼容的异步加载函数
// //只是第一种写法。 
function loadScript1(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (script.readyState) { // IE的script没有onload事件。
        script.onreadystatechange = function () { //通过这个方法能检测readyState状态的更改
            if (script.readyState == "complete" || script.readyState == "loaded") { //异步加载完成了
                callback(); //执行。
            }
        }
    } else {
        script.onload = function () {
            callback();
        }
    }
    script.src = url; //放后面避免出现下载完了，绑定检测事件无效。
    document.head.appendChild(script);
}
// loadScript1('demo.js',function(){
//     test();//demo.js里面的函数。
// })

//封装兼容性好的getByClassName函数。
Document.prototype.getByClassName = function (className) {
    //改变this指向，让获取到的类数组有数组的方法。
    var allDomArr = Array.prototype.slice.call(document.getElementsByTagName('*'), 0);
    var filterArr = []; //存放想要的类名。
    function dealClass(dom) { //利用正则表达式处理下类名串。
        //demo   item       aaa --> demo item aaa
        var reg = /\s+/g;
        var arrClassName = dom.className.replace(reg, ' ').trim();
        return arrClassName; //返回处理好的dom元素的类名的字符串。
    }
    allDomArr.forEach(function (ele, index) {
        var itemClassArr = dealClass(ele).split(' '); //处理好的字符串再打散成数组。
        for (var i = 0; i < itemClassArr.length; i++) {
            if (itemClassArr[i] == className) { //存不存在那个类名。
                filterArr.push(ele); //存在直接把元素存起来。
                break;
            }
        }
    })
    return filterArr; //最后返回筛选好标签数组
}

//封装绑定事件处理函数
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}

//封装取消冒泡函数。
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

//封装取消默认事件函数
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

//封装多物体，多值链式运动框架函数
function startMove(obj, json, callback) {
    var iSpeed, iCur;
    obj.timer = setInterval(function () { //都有自己的定时器。
        var bStop = true;
        for (var attr in json) { //循环判断对象里面的属性
            if (attr == 'opacity') {
                iCur = parseFloat(getStyle(obj, attr)) * 100;
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            iSpeed = (json[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if (attr == 'opacity') {
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
            if (iCur != json[attr]) { //iCur是每次都变化的当前值，
                bStop = false; //没达到目标点，就不能停。
            }
        }
        if (bStop) { //都达到目标点了，就清除
            clearInterval(obj.timer); //循环完一圈，到目标点了。
            typeof callback == 'function' ? callback() : ''; //增强函数的健壮性
        }
    }, 30)
}

//封装简单的拖拽函数
function bindEvent(ele, wrap) {
    var mouseX,
        mouseY,
        boxL,
        boxT,
        disL,
        disT;
    var drag = false;
    ele.onmousedown = function (e) { //注意事件源对象e是鼠标。
        var event = e || window.event;
        // console.log(event);
        drag = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
        boxL = ele.offsetLeft; // event.offsetLeft;
        boxT = ele.offsetLeft;
        disL = mouseX - boxL;
        disT = mouseY - boxT;

    }
    wrap.onmousemove = function (e) {
        var event = e || window.event;
        if (drag) {
            ele.style.left = event.clientX - disL + "px";
            ele.style.top = event.clientY - disT + "px";
        }
    }
    ele.onmouseup = function (e) {
        drag = false;
    }
}

//封装函数角度性能优化之函数记忆（阶乘）
function memorize(fn) {
    //fn == factorial
    var cache = {}; //缓存区
    return function () {
        //key是传参的唯一标识,以下的写法能够唯一标识key.
        var key = arguments.length + Array.prototype.join.call(arguments);
        if (cache[key]) {
            return cache[key];
        } else {
            cache[key] = fn.apply(this, arguments); //把用过的阶乘结果存到缓冲区。
            return cache[key];
        }
    }
}
// var newF = memorize(factorial);

//封装节流函数
function throttle(handler, wait) {
    var lastTime = 0; //前一次的点击时间
    return function (e) { //此函数被返回,形成闭包,点击事件的处理函数是这个函数，系统会把e传给这个函数的实参。
        //console.log(arguments[0]);//刚好是事件源对象。 
        var nowTime = new Date().getTime(); //当前点击时间。
        if (nowTime - lastTime > wait) { // 判断当前的等待时间。
            //console.log(this);//btn点击事件处理函数是这个函数，所以this执向btn。
            handler.apply(this, arguments); //改变this执向，让buy执向一下btn,相当于是btn执行了buy
            lastTime = nowTime; //就相当于oBtn.onclick = buy
        }
    }
}

//封装防抖函数
function debounce(handler, delay) {
    var timer = null; //防抖延迟执行，利用setTimeout延时器。
    return function (e) { //oInp.oninput真正执行的函数。
        var _self = this, //this指向oInp。
            _arg = arguments; //系统会打包源对象传到实参来。
        clearTimeout(timer); //用户不停的输入删除操作，不超过一秒时。会无限制调用定时器里面的handler。
        //所以在用户不确定的时候，把之前的定时器都清除掉。
        timer = setTimeout(function () { //延迟执行handler。达到真正的防抖。
            handler.apply(_self, _arg); //由于有时候被返回的事件处理函数需要用到源对象。所以apply一下。
            //这样写相当于达到oInp.oninput = ajax的效果，并且把源对象传过去。
        }, delay);
    }
}

//清除浮动最好的方式，加在浮动元素的父级
// .clearfloat:after{
//     display:block;
//     clear:both;
//     content:"";
//     visibility:hidden;
//     height:0}
// .clearfloat{zoom:1}

//trim
String.prototype.trim = function () {
    return this.replace( /^\s+|\s+$/g, '');
}

// String.prototype.trim = function() {
//     return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
//   }

        // //封装ajax
        // function ajaxFun(method, url, data, callBack, flag) {
        //     var flag = flag == true ? true : false;
        //     var xhr = null;
        //     if (window.XMLHttpRequest) {
        //         xhr = new XMLHttpRequest();
        //     } else {
        //         xhr = new ActiveXObject("Microsoft.XMLHttp");
        //     }
        //     method = method.toUpperCase();
        //     if (method == "GET") {
        //         xhr.open(method,url+'?'+data,flag);
        //         xhr.send();
        //     } else if(method == "POST"){
        //         xhr.open(method,url,flag);
        //         xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        //         xhr.send(data);
        //     }else{
        //         console.log("not post and get method !");
        //     }
        //     xhr.onreadystatechange = function(){
        //         if(xhr.readyState == 4){
        //             if(xhr.state == 200){
        //                 callBack(xhr.responseText);//返回JSON格式的字符串
        //             }
        //         }
        //     }
        // }

        //传统的原型链
        //共享原型
        //借用构造函数
        //圣杯模式 
        // function inherit(Origin,Target){
        //     function F(){}
        //     F.prototype = Origin.prototype;
        //     Target.prototype = new F();
        //     Target.prototype.constuctor = Target;//构造器
        //     Target.prototype.uber = Origin.prototype;//继承自谁
        // }
//不稳定快排
function quick(arr){
  if(arr.length<=1){
    return arr;
  }
  var left = [];
  var right = [];
  var base = arr[0];
  for(var i=1;i<arr.length;i++)
  {
   // 判决条件
    if(arr[i]>base){
      right.push(arr[i]);
    }else {
      left.push(arr[i])
    }
  }
  return quick(left).concat(base,quick(right));
}
// console.log(quick([3,2,0,1]));
