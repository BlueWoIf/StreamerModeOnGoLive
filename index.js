const { Plugin } = require('powercord/entities');
const webpack = require('powercord/webpack');

//Based on the idea of mihabozic123, just rewritten to PowerCord
//https://github.com/mihabozic123/BDplugins/tree/master/streamerModeOnGoLive

module.exports = class StreamerModeOnGoLive extends Plugin {
    startPlugin() {
        this.start();
    }

    turnOnStreamerMode() {
        webpack.getModule(['dispatch'], false).dispatch({type: "STREAMER_MODE_UPDATE", key: "enabled", value: true});
    }

    turnOffStreamerMode() {
        webpack.getModule(['dispatch'], false).dispatch({type: "STREAMER_MODE_UPDATE", key: "enabled", value: false});
    }

    start() {
        const dispatcher = webpack.getModule(['dispatch'], false);
        dispatcher.subscribe("STREAM_START", this.turnOnStreamerMode);
        dispatcher.subscribe("STREAM_STOP", this.turnOffStreamerMode);
    }
    stop() {
        const dispatcher = webpack.getModule(['dispatch'], false);
        dispatcher.unsubscribe("STREAM_START", this.turnOnStreamerMode);        
        dispatcher.unsubscribe("STREAM_STOP", this.turnOffStreamerMode);
    }

    pluginWillUnload() {
        this.stop();
    }
};
