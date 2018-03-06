// encryption rules for well_Sent
// Dependencies:
var bc = require("base-conversion");
var stb = require("string-to-binary");
var hexToBin = bc(16,2);

function xOR(a,b){
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
console.log(binary_key)

var binary_message = stb(message);
console.log(binary_message);

function longify_key(message, inkey){
	var key = inkey+'';
	console.log("key: " + key);
	var msg_len = message.length; 
	var key_len = key.length;
	var tail_len = msg_len % key_len;
	var tail = key.split("");
	var tail_start = key_len-tail_len;
	tail = tail.splice(tail_start,tail.length);
	console.log("tail is "+tail);
	var multiples = (msg_len - tail_len)/key_len;
	key_len_message = tail;
	for (var n in multiples){
		key_len_message += key;
	};
	return key_len_message;
};


function xORencrypt(inkey,message){
	var key = longify_key(message,inkey);
	console.log("key_long = " + key);
	var key_arr = key;
	console.log("key arr "+ key_arr)
	var message_arr = message.split('');
	console.log("message array "+message_arr)
	var encrypted_msg = '';
	for (var n in key_arr){
		var el_1 = parseInt(key_arr[n]);
		// console.log("el1 "+el_1);
		var el_2 = parseInt(message_arr[n]);
		// console.log("el2 "+el_2)
		var temp = xOR(el_1,el_2);
		console.log("temp"+temp);
		encrypted_msg+= temp;
		// console.log(encrypted_msg)
	};
	console.log("encrypted :"+encrypted_msg)
	return encrypted_msg;
};

var output = xORencrypt(binary_key,binary_message);
console.log("here: "+output);
module.exports = output;





