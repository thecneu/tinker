Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    if( value == 'undefined' ) return;
    return value && JSON.parse(value);
}

Date.weeknum = (function() { 
	var d = new Date();
	var dayNr = (d.getDay() + 6) % 7;
	d.setDate(d.getDate() - dayNr + 3);
	var jan4 = new Date(d.getFullYear(), 0, 4);
	var dayDiff = (d - jan4) / 86400000;
	var weekNr = 1 + Math.ceil(dayDiff / 7);
	return parseInt(weekNr);
}());

var DataStore = {
	init : function() {
		var data = this._get();
		var defaults = {startWeek: Date.weeknum, data: {cardio: [], weight: [], days: [ [], [], [], [], [], [], [] ]}};
		if( !data ) this._set(defaults);
		return this._get();
	},

	_save : function( data ) {
		var plans = this._get();
		plans.data = data;
		this._set( plans );
	},

	_get : function() {
		return localStorage.getObject( 'woplans' );
	},

	_set : function(value) {
		return localStorage.setObject( 'woplans', value );
	},

	_log : function() {
		console.log( JSON.stringify( this._get() ) );
	}
};