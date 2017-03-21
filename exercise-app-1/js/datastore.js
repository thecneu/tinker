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
		//delete localStorage.woplans;
		var data = this._get();
		if( !data ) {
			this.__set({ startWeek : Date.weeknum, routines : [] });
		}
		// test data
		//this._set(testData);
		return this._get().startWeek;
	},

	add : function( ex ) {
		var data = this._get().routines;
		data.push(ex);
		this._set(data);
	},

	update : function( obj ) {
		var filterby = [], currentRoutines = this._get().routines;
		if( obj.type == 'cardio' ) filterby = ['time', 'distance', 'calroes'];
		else if( obj.type == 'workout' ) filterby = ['weight'];
		var updates = _.pick( obj, filterby );
		var exercise = _.findWhere( currentRoutines, _.omit( obj, filterby ) );
		_.extend( exercise, updates );

	},

	remove : function( obj ) {
		var currentRoutines = this._get().routines;
		var i = currentRoutines.indexOf( _.findWhere( currentRoutines, obj ) );
		var removed = currentRoutines.splice(i, 1);
		var data = this._get();
		data.routines = currentRoutines;
		this._set( data );

		return removed;
	},

	fetchExercise : function( week, daynum, exercise ) {

	},

	fetchWeek : function( wn ) {
		
		return _.chain( this._get().routines )
		.where( { weeknum : wn } )
		.sortBy( 'daynum' )
		.value();
		
	},

	_fetch : function( obj, values ) {
		// _.chain(obj).omit( values )
		// _.chain(obj).findWhere( values )
		// obj.indexOf( _.findWhere( obj, {} ) )
		// obj.splice( i, 1 );
	},

	_get : function() {
		return localStorage.getObject( 'woplans' );
	},

	_set : function( data ) {
		var plans = this._get();
		plans.routines = data;
		this.__set( plans );
	},
	__set : function(value) {
		return localStorage.setObject( 'woplans', value );
	},

};
var testData = {
	startWeek : 3,
	routines : [{
		type : 'cardio',
		title : '',
		time : '',
		distance : '',
		calories : '',
		daynum : 2,
		weeknum : 3
	},
	{
		type : 'workout',
		wonum : 0,
		title : '',
		weight : '',
		daynum : 0,
		weeknum : 3
	},
	{
		type : 'cardio',
		title : '',
		time : '',
		distance : '',
		calories : '',
		daynum : 1,
		weeknum : 3
	},
	{
		type : 'workout',
		wonum : 0,
		title : '',
		weight : '',
		daynum : 1,
		weeknum : 3
	}]
};