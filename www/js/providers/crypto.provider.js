(function () {
  'use strict';

  angular
    .module('Contacts.crypto') //On module Contacts.crypto
    .provider('$crypto', CryptoProvider); //Define $crypto provider

  function CryptoProvider() {
    var cryptoKey;

    //Sets cryptography key
    this.setCryptographyKey = function(value) {
      this.cryptoKey = value;
    };

    //Provider definition
    this.$get = [function() {
      return {
        cryptoKey: this.cryptoKey,
        encrypt: function(message, key) {
          if (key === undefined) { key = this.cryptoKey; }
          return CryptoJS.AES.encrypt(message, key ).toString();
        },
        decrypt: function(message, key) {
          if (key === undefined) { key = this.cryptoKey; }
          return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8)
        },
        hash: function(message) {
          return CryptoJS.MD5(message).toString(CryptoJS.enc.Base64);
        }
      };
    }];
  };

})();
