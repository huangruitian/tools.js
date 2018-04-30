        //首次出现的字符。 (数组去重的思想)
        Array.prototype.unique = function () {
            var temp = {},
                lastStr = "",
                len = this.length;
            for (var i = 0; i < len; i++) {
                if (!temp[this[i]]) { //检测temp里面存不存在，如果存在在不执行。
                    temp[this[i]] = "1";
                }else{
                    temp[this[i]] += "1";
                }
            }
            for(prop in temp){
                if(temp[prop].length == 1){
                    lastStr = prop;
                    break;
                }
            }
            return lastStr; 
        }
        //首次出现的字符。
        function unique(str){
            for(var i = 0; i < str.length; i++){
                //str.indexOf(str[i],i+1) === -1 确保后面没有。（后面都没有返回-1）
                //str.indexOf(str[i]) === i 返回第一个出现的位置。
                if(str.indexOf(str[i],i+1) === -1 && (str.indexOf(str[i]) === i)){
                    return str[i];
                }
            }
        }
        //经典的闭包
        // var liArr = document.getElementsByTagName('li');
        // var len = liArr.length;
        // for (var i = 0; i < len; i++) {
        //     (function (i) {
        //         liArr[i].addEventListener('click', function (e) {
        //             console.log(i);
        //         }, false)
        //     })(i)
        // }
