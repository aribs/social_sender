"use strict";
import config from "../config/config.js"
import axios from "axios"

export const sendFacebook = function (type, configName){
  this.opts = {
    type: type,
    message: '',
    url: '',
    published: true,
    configName: configName
  }
  this.construct =  () =>{
    this.getFacebookAccessToken();
    this.getFacebookPageId();
  }

  this.getFacebookClientId = () => {
    if (config[this.opts.configName] && config[this.opts.configName].facebookClientID){
      this.opts.facebookClientId = config[this.opts.configName].facebookClientID;
    }
  }

  this.getFacebookClientSecret = () => {
    if (config[this.opts.configName] && config[this.opts.configName].facebookClientSecret){
      this.opts.facebookClientSecret = config[this.opts.configName].facebookClientSecret;
    }
  }

  this.getFacebookAccessToken = () => {
    if (config[this.opts.configName] && config[this.opts.configName].facebookToken){
      this.opts.facebookAccessToken = config[this.opts.configName].facebookToken;
    }
  }

  this.getFacebookPageId = () => {
    if (config[this.opts.configName] && config[this.opts.configName].facebookPage){
      this.opts.facebookPageId = config[this.opts.configName].facebookPage;
    }
  }

  this.setMessage = (message) => {
    this.message = message;
  }

  this.setUrl = (url) => {
    this.url = url;
  }

  this.sendMessage = () => {
    var url = this.mountUrl()
    axios.post(url)
    .then(response =>{
      console.log('works', response);
    })
    .catch(error =>{
      console.log(error.request);
    })
  }
  this.sendPhotoMessage = (message, urlPhoto) => {
    if(!message && !urlPhoto) return;
    var url = this.mountUrl(message, urlPhoto)
    axios.post(url)
    .then(response =>{
        console.log('Send OKs');
      })
      .catch(error =>{
      console.log(error.request);
      })
  }

  this.mountUrl = (message, urlPhoto) => {
    var baseUrl = 'https://graph.facebook.com/v11.0/';
    var url = baseUrl + '/' + this.opts.facebookPageId + '/photos/?';
    var messageQs = 'caption=' + message;
    var accessTokenQs = 'access_token=' + this.opts.facebookAccessToken;
    var urlQs = 'url=' + urlPhoto;
    var publishedQs =  'published=' + this.opts.published;
    url = url + messageQs + '&' + accessTokenQs + '&' + urlQs + '&' + publishedQs;
    return url;
  }
  this.construct();
}
