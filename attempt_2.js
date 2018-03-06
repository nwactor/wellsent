var bc = require("base-conversion");
var stb = require("string-to-binary");
var hexToBin = bc(16,2);

function xOR(a,b){
    console.log("adding",a,b)
	var combin = a+b;
	console.log("combination "+combin)
	switch (combin) {
        case (0):
            return 0;
            break;
        case (2):
            return 0;
            break;
        case(1):
            return 1;
            break;
    }
}
 
var key = process.argv[2];

var message = process.argv[3];

var binary_key = hexToBin(key);
console.log("binary key: "+binary_key)

var binary_message = stb(message);
console.log("binary message: "+binary_message);



function keyLong(key,msg){
    var tail_dist_from_last = msg.length % key.length;
    var tail_index_st = key.length - tail_dist_from_last;
    var tail = key.splice(tail_index_st,key.length);
    var multiple = msg.length/tail_index_st;
    console.log("the key will fit "+ multiple + " times in the msg");
    var output = tail;
    for (n=0; n<multiple; n++){
        output=key+output;
    }
    return output;

}


var binary_message = binary_message.split("");
console.log("bm to arr "+binary_message);

var binary_key = binary_key.split("");
console.log("bk to arr "+binary_key);

binary_key = keyLong(binary_key,binary_message);
console.log("now it has the right length : "+binary_key);

var encrypt = function(key,msg){
    var output = "";
    for (n in msg){
        console.log("or these ",key[n],msg[n])
        var el1 = parseInt(key[n]);
        var el2 = parseInt(msg[n]);
        var temp = xOR(el1,el2);
        output = output+temp;
    }
    output = output.toString();
    return output;
}

var output = encrypt(binary_key,binary_message);
console.log(output);