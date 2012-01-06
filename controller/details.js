var _ = require('common/util');
var ui = require('ui');
var TextView = ui.TextView;
var Panels = require('ui/panels').Panels;
var HLayout = ui.HLayout;
var VLayout = ui.VLayout;
var CellLayout = ui.CellLayout;
var ImageView = require('ui').ImageView;
var app = this;


_.extend(exports, {
    'load':function() {
        var view = this;
        view.get('title').label();
        view.get('pic').resource('');

    },
    ':state': function(param) {
//        var item = param.title;
        var id = param.title.toString().substr(6, 6);
        console.log('ID  => ' + id);
        console.log(param.url);
        var urlItem = 'http://f.fashion4us.com/images/fashion/detail/1mil/5hun/5ten/8000/' + id + 'a.jpg';
        console.log('Url-Item  => ' + urlItem);
        var self = this;
        self.clear();
        self.add('title', new TextView({
            label:param.title.toString().substr(15),
            style :{
                width: 'fill-parent',
                height: 'wrap-content',
                'background-color':'#FF1493',
                'color':'white',
                'border':'5 10 5 10',
                'font-weight':'bold'
            }

        }));
        self.add('pic', new ImageView({
            style: {
                width: 'fill-parent',
                height: 'fill-parent',
                mode: 'centered'
            }
        }));
        self.get('pic').resource(urlItem);
    },
    ':keypress': function(key) {
        console.log('Key press: ' + key);
        if (this.index === undefined) {
            if (this.size() >= 0) {
                this.focusItem(0);
            }
        } else if (key === 'up' || key === 'down') {
            var next = this.index + (key === 'up' ? -1 : 1);

            if (next < 1) {
                next = 1;
            } else if (next > (this.size() - 1)) {
                next = this.size() - 1;
            }

            if (this.index === next) {
                return;
            }

            this.focusItem(next);
        } else if (key === 'fire') {
            this.get(this.index).emit('activate');
        } else if (key === 'back') {
            console.log('back');
        }
    },
    ':active': function() {
        console.log('View is active');
    },
    ':inactive': function() {
        console.log('View is inactive');
    },

    focusItem: function(index) {
        if (this.index !== undefined) {
            this.get(this.index).emit('blur');
        }
        this.index = index;
        this.get(index).emit('focus');
        if (index === 1) {
            this.scrollTop(0);
        }
        console.log(index);
        this.scrollTo(index);
    }
});