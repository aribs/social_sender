"use strict";
import { sendFacebook } from './sendFacebook.js';
import { sendTelegram } from './sendTelegram.js';
export const sendMessage = function (configName){
  this.opts = {
    configName: configName,
    sendFacebook: null,
    sendTelegram: null
  }
  this.construct = () => {
    this.opts.sendFacebook =  new sendFacebook('photos', this.opts.configName);
    this.opts.sendTelegram = new sendTelegram(this.opts.configName);
  }
  this.sendMessage =  (message, urlPhoto) => {
    this.opts.sendFacebook.sendPhotoMessage(message, urlPhoto);
    this.opts.sendTelegram.sendMessage(message);
  }
  this.construct();
}
