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
		delete localStorage.woplans;
		var data = this._get();
		if( !data ) {
			this._set({ startWeek : Date.weeknum, routines : [] });
		}
		// test data
		//this._set(testData);
		return this._get().startWeek;
	},

	add : function( ex ) {
		var data = this._get();
		//fetch data
		data.routines.push(ex);
		this._set(data);
	},

	update : function() {

	},

	remove : function( obj ) {

	},

	fetchExercise : function( week, daynum, exercise ) {

	},

	fetchWeek : function( phase, week ) {
		_.chain( this._get().routines )
		.where( { phase : phase, week : week } )
		.sortBy( 'daynum' )
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

	_set : function(value) {
		return localStorage.setObject( 'woplans', value );
	},

};
var testData = {
	startWeek : 3,
	routines : [{
		type : 'cardio',
		phase : 0,
		week  : 0,
		name : '',
		time : '',
		distance : '',
		calories : '',
		daynum : 2,
		weeknum : 3
	},
	{
		type : 'workout',
		phase : 1,
		week  : 0,
		wonum : 0,
		name : '',
		weight : '',
		daynum : 0,
		weeknum : 3
	},
	{
		type : 'cardio',
		phase : 1,
		week  : 1,
		name : '',
		time : '',
		distance : '',
		calories : '',
		daynum : 1,
		weeknum : 3
	},
	{
		type : 'workout',
		phase : 0,
		week  : 0,
		wonum : 0,
		name : '',
		weight : '',
		daynum : 1,
		weeknum : 3
	}]
};