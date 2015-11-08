// send a simple reply to a text
// also handles /echo function

// https://github.com/reigndesign/wechat-eliza/blob/master/app/controllers/webadmin.js

var util = Meteor.npmRequire("util");
var xmlparser = Meteor.npmRequire( 'express-xml-bodyparser');

Picker.middleware( xmlparser() );

function getReply(input) {
  return "you said: " + input;
}

Picker.route('/echo', function(params, req, res, next) {
  // this is actually only needed once when you validate the server
  // var query = JSON.stringify(req.query);
  console.log("/echo", params);
  var echostr = params.query.echostr;
  if (echostr) {
    console.warn("echostr detected. returning:", params.query.echostr);
    res.end(params.query.echostr);
    return;
  }
  var input = params.query;
  var reply = "hello world!";
  try {

    console.log("reply:", reply);
    console.log("req.body:", req.body);
    console.log("params:\n", params);
    console.log("req:\n", req);
    console.log("rawBody:\n", req.rawBody);
    console.log("req.body.xml", req.body.xml);

  } catch(e){
    console.error("ERROR cant decode message body:", e);
  }

  var str = '';
  try {
      message = {
          to: req.body.xml.tousername[0],
          from: req.body.xml.fromusername[0],
          msgtype: req.body.xml.msgtype[0],
          content: req.body.xml.content[0],
          createtime: parseInt(req.body.xml.createtime[0])
      }

      message.openid = message.from;
      message.reply = getReply(message.content);

      str = util.format("<xml><ToUserName>%s</ToUserName><FromUserName>%s</FromUserName><CreateTime>%d</CreateTime><MsgType>text</MsgType><Content><![CDATA[%s]]></Content></xml>", message.from, message.to, message.createtime + 1, message.reply);

  } catch (e) {
      console.error("ERROR cant decode message body:", req.body);
  }

  res.writeHead(200, {
    // 'Content-Length': body.length,
    'Content-Type': 'application/xml'
  });

  Players.create(message);

  console.log("result str:" + str);

  Meteor.call("wc/sendNews", message.openid, message.content);

  res.end(str);
});
