// Style -- backend.js
log.info('Hello from backend bootstrap.');

var http = require('blaast/simple-http');
var rssparser = require('htmlparser');
var _ = require('underscore');
var sys = require('sys');
var jsdom = require('jsdom');
var ReqLog = require('blaast/mark').RequestLogger;
var Scaling = require('blaast/scaling').Scaling;
var rlog = new ReqLog(app.log);
var scaling = new Scaling(app.config);
var ltx = require('ltx');

//var url = "http://www.google.com/ig/api?weather=bali";

var debug = true;
var url_shoes = "http://feeds.feedburner.com/fashion4usshoesfeed";
var url_bag = "http://feeds.feedburner.com/fashion4usbagsfeed";
var url_access = "http://feeds.feedburner.com/fashion4usaccessoriesfeed";
var url_woman = "http://feeds.feedburner.com/fashion4usfeed";
var url_man = "http://feeds.feedburner.com/fashion4usmensfeed";

app.message(function(client, action, data) {
    if (action === 'getdata') {

        var handler = new rssparser.RssHandler(function(error, dom) {
            if (error) {
                console.log(error);
            }
            else {
                if (debug) {
                    sys.puts('Raw data : ' + sys.inspect(dom, false, null));
                }
                console.log('****************' + dom.items.length);
                _.each(dom.items, function(param) {
                    console.log('Title ==> : ' + param.title);
                    console.log('Link ==> : ' + param.link);
                    console.log('Description ==>  : ' + param.description);

                    client.msg('getdata', {text : {
                        data_ : param
                    }
                    });


                });
            }

        });
        var parser = new rssparser.Parser(handler);
        http.get(url_shoes, {
            ok:function(data) {
                console.log('Data : => ' + data);
                parser.parseComplete(data);
            },
            error:function(err) {
                console.log('Error : ' + err);
            }

        });

    }
});

app.setResourceHandler(function(request, response) {

    app.debug('Client requested resource-id=' + request.id);

    function sendReply(response, error, imageType, data) {
        if (error) {
            app.warn('Failed to load image: ' + error);
            response.failed();
        } else {
            app.debug('Loaded image.');
            response.reply(imageType, data);
        }
    }

    if (request.id !== null) {
        scaling.scale(request.id, request.display_width, request.display_height, 'image/jpeg',
            function(err, data) {
                sendReply(response, err, 'image/jpeg', data);
            }
        );
    }
});
