        //首次出现的字符。 
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
