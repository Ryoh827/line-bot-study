import linebot from 'linebot'
import dotenv from 'dotenv'

dotenv.config()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

bot.on('message', function (event) {
  console.log(event.message.text)
  let message = {}
  switch(event.message.text) {
    case 'buy':
      message = {
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#FFFFFF",
            "title": "Menu",
            "text": "Please select",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://example.com/page/123"
            },
            "actions": [
                {
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=123"
                },
                {
                  "type": "postback",
                  "label": "Add to cart",
                  "data": "action=add&itemid=123"
                },
                {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://example.com/page/123"
                }
            ]
        }
      };
      break;
    default:
      message = 'Sorry. Something went wrong'
      break;
  }
  event.reply(message).then(function (data) {
    // success
  }).catch(function (error) {
    // error
  });
});

bot.listen('/webhook', 3000);
