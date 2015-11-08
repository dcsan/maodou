
var APP_ID = process.env.WECHAT_APP_ID;
var APP_SECRET = process.env.WECHAT_APP_SECRET;



WechatAPI = function(options){
    console.log("wechat api options", options);
    this.API_ENDPOINT = "https://api.weixin.qq.com";
    this._http = HTTP;
    this._app_id = APP_ID;
    this._app_secret = APP_SECRET;
}

WechatAPI.prototype = {
    _get: function(url, params){
        var http = this._http;
        try{
            return http.get(url, { params: params });
        }catch(e){
            return e;
        }
    },
    // Exchange access_token for user info with code from Wechat callback
    getWebAccessToken: function(code){
        return this._get(this.API_ENDPOINT + "/sns/oauth2/access_token", {
            appid: this._app_id,
            secret: this._app_secret,
            code: code,
            grant_type: "authorization_code"
        });
    },
    getUserInfoOpenId: function(accessToken, openId){
        return this._get(this.API_ENDPOINT + "/sns/userinfo", {
            access_token: accessToken,
            openid: openId
        });
    },
    refreshWebAccessToken: function(refreshToken){
        return this._get(this.API_ENDPOINT + "/sns/oauth2/refresh_token", {
            appid: this._app_id,
            grant_type: "refresh_token",
            refresh_token: refreshToken
        });
    },
    generateNonce: function(){
        return Math.random().toString(36).substr(2, 15);
    },
    getJSSDKSig: function (nonceStr, jsapi_ticket, timestamp, url) {
        // Code borrowed from npm package "wechat-api"
        function raw(args) {
          var keys = Object.keys(args);
          keys = keys.sort();
          var newArgs = {};
          keys.forEach(function (key) {
            newArgs[key.toLowerCase()] = args[key];
          });

          var string = '';
          for (var k in newArgs) {
            string += '&' + k + '=' + newArgs[k];
          }
          return string.substr(1);
        };
        var ret = {
        jsapi_ticket: jsapi_ticket,
        nonceStr: nonceStr,
        timestamp: timestamp,
        url: url
        };
        var string = raw(ret);
        var hash = sha1(string).toString();
        return hash;
        // var shasum = crypto.createHash('sha1');
        // shasum.update(string);
        // return shasum.digest('hex');
    },
    /**
    * get server side access token
    */
    getAccessToken: function(){
      var params = {
          appid: this._app_id,
          secret: this._app_secret,
          grant_type: "client_credential"
      }
      console.log("getAccessToken params", params);
      // var res = this._get(this.API_ENDPOINT + "/cgi-bin/token", params);
      var res = HTTP.get(this.API_ENDPOINT + "/cgi-bin/token", params);
      console.log("res", res);
      return res;
    },

    refreshAccessToken: function(){
      console.log("before refresh ----");
      var result = this.getAccessToken();
      console.log("refreshAccessToken got result data", result.data);

      WechatTokens.saveAccessToken(this._app_id, result.data.access_token, result.data.expires_in);
      console.log("after refresh ----");
      console.log(JSON.stringify(result, {indent: true}));

      return result.data.access_token;
    },

      getJSSDKTicket: function(accessToken){
          return this._get(this.API_ENDPOINT + "/cgi-bin/ticket/getticket", {
              access_token: accessToken,
              type: "jsapi"
          });
      },
      getJSSDKConfig: function(url, jsApiList, debug){
          // var accessToken = "zcHbiDcboen-wj4b-1efFvEpFvECWWhkTBj9pTrRuOR57xCR3C-oikHAp4DNVJsfLOcdstrGTL1_GYnlbRF38NCOgrL9ZMoMx7Pnj_Q4cgcUYAgAIAPTV";
          // var accessToken = this.getAccessTokenStr();
          var accessToken = '1';
          var response = this.getJSSDKTicket(accessToken);
          var debug = !!debug;
          var ticket = response.data;
          if(ticket == undefined || ticket.errcode != 0){
              console.err("cannot get ticket, response is: ", response);
              return;
          }
          var nonce = this.generateNonce();
          var timestamp = Math.floor(new Date().getTime() / 1000);
          var sig = this.getJSSDKSig(nonce, ticket.ticket, timestamp, url);
          return {
              debug: debug,
              appid: this._app_id,
              timestamp: timestamp,
              nonceStr: nonce,
              signature: sig,
              jsApiList: jsApiList
          }
      },
    getAccessTokenStr: function(){
        var appId = this._app_id;
        var token = WechatTokens.findOne({appId: appId});
        var accessToken = '';
        if (token == undefined){
          accessToken = this.refreshAccessToken();
        } else {
          var nowTime = Math.floor(new Date().getTime() / 1000);
          var diff = token.expiresAt - nowTime;
          var accessToken = '';
          if(diff <= 0 ){
              accessToken = this.refreshAccessToken();
          } else {
              accessToken = token.accessToken;
          }
        }

        return accessToken;

    },
    /*
    * get app_id
    */
    getAppId: function(){
        return this._app_id;
    },
    sendMessageToUser: function(dataObject){
      var accessToken = this.getAccessTokenStr();
      console.log("accessToken:" + accessToken);
      console.log("accessToken:" + JSON.stringify(dataObject, {indent: true}));


      var url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + accessToken;
      HTTP.post(url, {data: dataObject}, function(error, result){
        if(error){
          console.log("sendMessageToUser.error", error);
        }
        if(result){
          console.log("sendMessageToUser.result", JSON.stringify(result, {indent: true}));
        }
      });
    },

}
