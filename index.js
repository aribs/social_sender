import { sendMessage } from './class/sendMessage.js'



if(!process.argv.slice(2)[0]){
  console.log("Need an argument to continue");
  process.exit();
}

var element = new sendMessage(process.argv.slice(2)[0]);
element.sendMessage('https://www.amazon.es/Braun-50-M4500cs-Afeitadora-recortadora-Inal%C3%A1mbrica/dp/B085CXYPFZ?ref_=Oct_DLandingS_D_0b19c7c2_61&smid=A1AT7YVPFBWXBL', 'https://m.media-amazon.com/images/I/91gQJklmuSL._AC_SL1500_.jpg');
console.log(element);