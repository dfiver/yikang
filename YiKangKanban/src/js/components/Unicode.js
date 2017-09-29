exports.getUnicode = function(str){
    var arr = [];
    for(var i in str){
        arr.push(encrypt(str.charCodeAt(i)));
    }
    return arr;
};

exports.getStringForUnicode = function(arr){
    var str = '';
    for(var i in arr){
        str += String.fromCharCode(decrypt(arr[i]));
    }
    return str;
};

function encrypt(num){
    num += 10086;
    return num;
}

function decrypt(num){
    num -= 10086;
    return num;
}

