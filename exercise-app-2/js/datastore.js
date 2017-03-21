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
	return weekNr;
}());

// namespace: woprograms
// keys: startWeek | routines
var DataStore = {
	init : function() {
		var data = this._get();
		if( !data ) this._set({ startWeek : Date.weeknum, routines : [] });
		return this._get().startWeek;
	},

	add : function( ex ) {
		var currentRoutines = this._get().routines;
		currentRoutines.push(ex);
		this._save(currentRoutines);
	},

	update : function( obj ) {
		var filterby = [], currentRoutines = this._get().routines;
		if( obj.type == 'cardio' ) filterby = ['time', 'distance', 'calroes'];
		else if( obj.type == 'workout' ) filterby = ['weight'];
		var updates = _.pick( obj, filterby );
		var exercise = _.findWhere( currentRoutines, _.omit( obj, filterby ) );
		console.log(JSON.stringify(obj));
		_.extend( exercise, updates );
		this._save( currentRoutines );
	},

	remove : function( obj ) {
		var currentRoutines = this._get().routines;
		var i = currentRoutines.indexOf( _.findWhere( currentRoutines, obj ) );
		var removed = currentRoutines.splice(i, 1);
		this._save( currentRoutines );

		return removed;
	},

	fetchWeek : function( wn ) {
		return _.chain( this._get().routines )
		.where( { weeknum : wn } )
		.sortBy( 'daynum' )
		.value();
	},

	_get : function() {
		return localStorage.getObject( 'woplans' );
	},

	_save : function( data ) {
		var plans = this._get();
		plans.routines = data;
		console.log( plans.routines[0].daynum );
		this._set( plans );
	},

	_set : function(value) {
		return localStorage.setObject( 'woplans', value );
	}
};