"use strict";

import config from "../config/config.js"
import axios from "axios"
import * as cheerio from 'cheerio';
import { sendMessage } from './sendMessage.js'


export const getFromAmazon = function (configName){
  this.opts = {
    //affiliateCode = config.amazonAffiliateCode
    configName: configName
  }
  this.construct = () => {
    this.getAffiliateCode();
    this.getUrl();
    this.getProducts();
  }
  this.getAffiliateCode = () => {
    if (config[this.opts.configName] && config[this.opts.configName].amazonAffiliateCode){
      this.opts.affiliateCode = config[this.opts.configName].amazonAffiliateCode;
    }
  }
  this.getUrl = () => {
    if (config[this.opts.configName] && config[this.opts.configName].urlProducts){
      var pageNumber =  Math.floor(Math.random() * (15 - 1) + 1);
      this.opts.urlProducts = config[this.opts.configName].urlProducts + '&page=' + pageNumber;
    }
  }
  this.getProducts = () => {
    if(this.opts.urlProducts){
      axios.get(this.opts.urlProducts)
        .then(response =>{
          var indexElements =  Math.floor(Math.random() * (56 - 1) + 1);
          let $ = cheerio.load(response.data);
          var arrElements =  $('.a-link-normal.s-no-outline');
          var arrProducts = []
          for(var i = indexElements; i < indexElements +4; i++){
            var product = {}
            product.url = encodeURIComponent('https://amazon.es' + arrElements[i].attribs.href + '&tag=' + this.opts.affiliateCode);
            product.img = arrElements[i].children[0].children[0].attribs.src;
            product.text = arrElements[i].children[0].children[0].attribs.alt;
            arrProducts.push(product);
          }
          var messagier = new sendMessage(this.opts.configName);
          for(var product of arrProducts){
            messagier.sendMessage(product.url, product.img)
          }
        })
        .catch(error =>{
          console.log(error.request);
        })
    }
  }
  this.construct();
}