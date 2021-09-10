import { sendMessage } from './class/sendMessage.js'
import { getFromAmazon } from './class/getFromAmazon.js';



if(!process.argv.slice(2)[0]){
  console.log("Need an argument to continue");
  process.exit();
}
var article = new getFromAmazon(process.argv.slice(2)[0])