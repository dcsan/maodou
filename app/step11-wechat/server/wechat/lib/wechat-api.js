
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

    // {
    //     "subscribe": 1,
    //     "openid": "o6_bmjrPTlm6_2sgVt7hMZOPfL2M",
    //     "nickname": "Band",
    //     "sex": 1,
    //     "language": "zh_CN",
    //     "city": "广州",
    //     "province": "广东",
    //     "country": "中国",
    //     "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
    //    "subscribe_time": 1382694957,
    //    "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"
    //    "remark": "",
    //    "groupid": 0
    // }

    getUserInfoOpenId: function(openId){
      var accessToken = this.getAccessTokenStr();
      // https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
      var res = this._get(this.API_ENDPOINT + "/cgi-bin/user/info", {
        access_token: accessToken,
        openid: openId
      });
      // var data = JSON.parse(res);
      console.log("getUserInfoOpenId", res);
      return res;
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
      // var res = this._get(this.API_ENDPOINT + "/cgi-bin/token", params);
      var url = this.API_ENDPOINT + "/cgi-bin/token";
      // url += "?grant_type=client_credential&appid=" + this._app_id + "&secret=" + this._app_secret;
      console.log("getAccessToken params", params);
      console.log("getAccessToken url", url);

      var res = Meteor.http.get(url, {params: params});
      console.log("res", res);
      // console.log("res", res.body);
      return res;
    },

    // FIXME - nearly duplicate method
    refreshToken: function(appId){

      // var result = WechatObject.getAccessToken();
      var result = WechatObject.getAccessTokenStr();
      // if(result.data != undefined){
      if(result != undefined){
        WechatTokens.saveAccessToken(appId, result, 7200);
      } else {
        console.error('get access_token error.');
      }

    },

    refreshAccessToken: function(){
      console.log("refreshAccessToken refresh ----");
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

// global used instance
WechatObject = {}

Meteor.startup(function(){
  var params = {app_id:APP_ID, app_secret:APP_SECRET};
  WechatObject = new WechatAPI(params);
  WechatObject.refreshToken(APP_ID);
});
