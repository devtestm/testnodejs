var Skb = require('skb');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkZWYyMzAzNTc1NzAwMTI1NmMyYzAiLCJ1c2VybmFtZSI6Im1heF9rYXJsc3J1aGVAeWFob28uZGUiLCJyb2xlIjoidXNlciIsImlhdCI6MTQ4MTEyNzg0NX0.DKLsKcwPqEL-i2bf6X1-UV3yYYfyv1KU3dgHP1D46A4';
var skb = new Skb(token);
skb.taskHelloWorld('My 1st node.js app.');