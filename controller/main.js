var _ = require('common/util');
ui = require('ui');
LinearLayout = ui.LinearLayout;
TextView = ui.TextView;
ImageView = ui.ImageView;

var app = this;

var ListBox = LinearLayout.extend({
initialize: function(data){
ListBox.__super__.initialize.call(this);
	this.style({
		orientation:'horizontal',
		width:'fill-parent',
		padding:20,
		border:4
	});

	var image = new ImageView();
	image.setSrc(data.src);

	var title = new TextView({
		label : data.title,
		style :{
			height:'fill-parent'		
		}	
	});
	this.add(image);
	this.add(title);
	this.title = data.title;

}
});

_.extend(exports, {
	':load': function() {
		console.log('View was loaded');
	var view = this;
	this.style({
	padding:10
	});

	var listShoes = new ListBox({
		src: app.imageURL('logo.png'),
		title: 'Shoes'
			
	});

	var listWoman = new ListBox({
		src: app.imageURL('logo.png'),
		title: 'Woman'
			
	});

	var listBag = new ListBox({
		src: app.imageURL('logo.png'),
		title: 'Bag'
			
	});

	view.add(listShoes);
	view.add(listWoman);
	view.add(listBag);

	view.selection = view.keySelectionWithItems([listShoes,listWoman,listBag],{
	focusedCallBack: function(item){
		console.log('Selection : => '+item.title);
	}
});

	},


	':keypress': function(key) {
	if(key === 'fire'){
		console.log('Selection : ' + this.selection.selected);
	}
		
	}
});
