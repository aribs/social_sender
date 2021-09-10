"use strict";
import config from "../config/config.js"
import axios from "axios"

export const sendTelegram = function (configName){
  this.opts = {
    configName: configName,
    telegramBotToken: null,
    telegramChannelId: null
  }
  this.construct = () => {
    this.getBotToken();
    this.getChannelId();
  }
  this.getBotToken = () => {
    if (config[this.opts.configName] && config[this.opts.configName].telegramBotToken){
      this.opts.telegramBotToken = config[this.opts.configName].telegramBotToken;
    }
  }
  this.getChannelId = () => {
    if (config[this.opts.configName] && config[this.opts.configName].telegramChannelId){
      this.opts.telegramChannelId = config[this.opts.configName].telegramChannelId;
    }
  }
  this.mountUrl = () => {
    var baseUrl = 'https://api.telegram.org/bot';
    return baseUrl + this.opts.telegramBotToken + '/sendMessage?chat_id=' + this.opts.telegramChannelId + '&text=';
  }
  this.sendMessage =  (message) => {
    var url = this.mountUrl() + message
    axios.get(url)
    .then(response =>{
      console.log('200->SendOK');
    })
    .catch(error =>{
      console.log(error.request);
    })
  }
  this.construct();
}
