var Utils = (function() {
	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var d = new Date();
	var todayNum = d.getDay();
	var todayDate = d.getDate();
	var begWeekDate = todayDate - todayNum;

	function getWeek() {
		var d = new Date();
		var dayNr = (d.getDay() + 6) % 7;
		d.setDate(d.getDate() - dayNr + 3);
		var jan4 = new Date(d.getFullYear(), 0, 4);
		var dayDiff = (d - jan4) / 86400000;
		var weekNr = 1 + Math.ceil(dayDiff / 7);
		return weekNr;
	}

	function setupWeek() {
	    var html = '';
	    for(var i = 1; i < 6; ++i) {
	        html += '<div class="days">';
	        html += '<span class="day">' + days[i] + '</span>';
	        html += '<span class="day-date">' + (begWeekDate + (i - 1)) + '</span>';
	        html += '</div>';
    	}
    	return html;
	}

	return {
		setupWeek: setupWeek
	};
}());

var Routines = {
	weekTemplate: $('#week-template').html(),
	weekTableTemplate: $('#week-table-template').html(),

	render: function( $el ) {
		var template = _.template( this.weekTemplate )({
			phase: routine.phases[0],
			weeks: routine.phases[0].weeks,

			partial: function( id, vars ) {
				vars.partial = this.partial;
				return _.template( $(id).html() )(vars);
			}
		});

		var template2 = _.template( this.weekTableTemplate )({
			phase: routine.phases[0],
			weeks: routine.phases[0].weeks,

			partial: function( id, vars ) {
				vars.partial = this.partial;
				return _.template( $(id).html() )(vars);
			}
		});

		$el.html( template );
		$el.html( template2 );
	}
}

var App = (function() {
	var phase = 0,
		week = 0;

	var $week = $('#week'),
		$exerciseContainer = $('#exerciseContainer');


	function init() {
		$week.html( Utils.setupWeek() );
		Routines.render( $exerciseContainer );
	}

	return {
		init: init
	};

}());

$(function() {
	App.init();
})