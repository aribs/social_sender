import { sendFacebook } from './class/sendFacebook.js'



if(!process.argv.slice(2)[0]){
  console.log("Need an argument to continue");
  process.exit();
}

var element = new sendFacebook('photos', process.argv.slice(2)[0]);
element.sendPhotoMessage('KIES DE SALCHICHA 30000', 'https://www.animalfiel.com/wp-content/uploads/2020/10/tipos-de-perro-salchicha.jpg')

console.log(element);