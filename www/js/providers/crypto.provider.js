(function () {
  'use strict';

  angular
    .module('mdo-angular-cryptography')
    .provider('$crypto', CryptoProvider);

  function CryptoProvider() {
    var cryptoKey;

    this.setCryptographyKey = function(value) {
        this.cryptoKey = value;
    }

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
      }
    }];
  };
})();
