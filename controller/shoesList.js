var _ = require('common/util');
var app = this;
var ui = require('ui');
var TextView = ui.TextView;
var VLayout = require('ui').VLayout;
var Control = require('ui').Control;
var Panels = require('ui/panels').Panels;
//Container
var HLayout = ui.HLayout;
var CellLayout = ui.CellLayout;

_.extend(exports, {
    ':load': function() {
        console.log('View was loaded');
        var self = this;
        self.clear();

        app.on('connected', function() {
            app.msg('getdata', {
                data: ''
            });

            app.on('message', function(action, data) {
                if (action === 'getdata') {
                    var dataar = data.text.data_;
                    console.log('Data Array : ' + dataar.title);
                    var array = [data.text.data_.title];
                    console.log(array);
                    var i = 1;
                    array.forEach(function(item) {
                        var temp;
                        if (i % 2 === 0) {
                            temp = new TextView({
                                label: item,
                                style: {
                                    'color': 'black',
                                    width: 'fill-parent',
                                    'background-color': '#FFFFFF'
                                }
                            });
                            temp.on('blur', function() {
                                this.style({
                                    'background-color': '#FFFFFF'
                                });
                            });
                        } else {
                            temp = new TextView({
                                label: item,
                                style: {
                                    width: 'fill-parent',
                                    'background-color': '#F8F8FF'
                                }
                            });
                            temp.on('blur', function() {
                                this.style({

                                    'background-color': '#F8F8FF'
                                });
                            });
                        }
                        temp.on('activate', function() {
                            app.setContent('details', {url: data.text.data_.link, title: data.text.data_.title});
                        });
                        temp.on('focus', function() {
                            this.style({
                                'color': 'black',
                                'background-color': '#FFD700'
                            });
                        });
                        console.log('Nilai : ' + i);
                        self.add(item, temp);


                    });
                    i++;
                    self.focusItem(0);
                }

            });
        });
    },
    ':keypress':function(key) {
        if (this.index === undefined) {
            if (this.size() > 1) {
                this.focusItem(1);
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
        }
    }

    ,

    focusItem: function(index) {
        if (this.index !== undefined) {
            this.get(this.index).emit('blur');
        }
        this.index = index;
        this.get(index).emit('focus');
        if (index === 1) {
            this.scrollTop(0);
        }
        this.scrollTo(index);
    }
});