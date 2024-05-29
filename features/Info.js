module.exports = function (controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("info", controller);
    // const nlu = require('../scripts/nlu.js');  flow.after(async (response, bot) => {
    
    flow.addAction("info") 

    flow.addMessage(JSON.stringify({
        "type":"message",
        "section": "informação",
        "body": "que tipo de informação você gostaria de ter   ?"
    }), "info")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
    });
    controller.addDialog(flow);
};