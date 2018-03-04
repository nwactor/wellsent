// encryption rules for well_Sent
// Dependencies:
var bc = require("base-conversion");
var stb = require("string-to-binary");
var hexToBin = bc(16,2);

function xOR(a,b){
	var combin = a+b;
	switch (combin) {
        case (0 || 2):
            return 0;
            break;
        case(1):
            return 1;
            break;
    }
}
 
var key = process.argv[2];

var message = process.argv[3];

binary_key = hexToBin(key);

binary_message = stb(message);

function longify_key(message, inkey){
	var key = inkey.toString;
	var key_len_message;
	var msg_len = message.length;
	var key_len = key.length;
	var tail = msg_len % key_len;
	var multiples = (msg_len - tail)/key_len;
	key = tail;
	for (n in multiples){
		key += key;
	};
	return key;
};


function xORencrypt(inkey,message){
	var key = longify_key(inkey);
	var key_arr = key.split();
	var message_arr = message.split();
	var encrypted_msg;
	for (var n in key_arr.length){
		var el_1 = key_arr[n];
		var el_2 = message_arr[n];
		var temp = xOR(el_1,el_2);
		encrypted_msg.prepend(temp);
	};
	return encrypted_msg;
};

var output = xORencrypt(binary_key,binary_message);
console.log(output);
module.exports(output);





