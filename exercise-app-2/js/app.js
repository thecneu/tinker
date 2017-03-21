var App = { 
	days : ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
	templates : {
		dayTemplate : $('#daycontent-template').html(),
		cardioTemplate : $('#cardio-template').html(),
		exerciseTemplate : $('#exercise-template').html(),
		workoutTemplate : $('#workout-template').html(),
		workoutTitleTemplate : 	$('#workout-title-template').html(),
		mainTemplate : $('#main-template').html()
	}, 
	cardio : cardio,
	routineraw : routine,
	activeWorkouts : [],
	activeDay : 0
}, ds = DataStore;

App.Utils = App.Utils || {};

App.Utils.ready = true;
App.Utils.refresh = function() {
	var h = 0;
	$('li').height('auto');
	$('li').each(function() {
		if( $(this).height() > h ) h = $(this).height();
	});
	$('li').height(h);
};

App.Utils.open = function( $el ) {
	$('#overlay').append( $('<div id="workout-titles"></div>').html( $el ) ).fadeIn();
	$('#overlay').click( App.Utils.close );
}

App.Utils.close = function(e) {
	if( e ) {
		if( $( e.target ).attr('id') == 'overlay' ) {
			$('#overlay').empty().fadeOut();
		}	
	}
	else {
		$('#overlay').empty().fadeOut();
	}
}

App.enterWeight = function($weight) {
	var $el = $weight.find('div');
	var lbs = $el.text();
	if( lbs != '' && !isNaN(lbs) ) {
		$text = $el.text().replace(/lbs/g, '');
		$el.text( $text + 'lbs' );
		$el.trigger('blur');

		// send data ajax
		var wo = $weight.parents('.workout-card');
		console.log($weight);
		var data = {
			type : 'workout',
			wonum : wo.attr('data-wonum'),
			title : $weight.siblings('.exname').attr('data-title'),
			weight : $text,
			daynum : this.activeDay,
			weeknum : Date.weeknum
		};
		ds.update( data );
	}
};

App.enterCardio = function( $cardio ) {
	var data = {
		type : 'cardio',
		time : $('.time').val(),
		distance : $('.distance').val(),
		calories : $('.calories').val(),
		daynum : this.activeDay,
		weeknum : Date.weeknum
	};
	ds.update( data );
};

App.initCalendar = function() {
	this.week = Date.weeknum - this.startWeek;
	this.phase = Math.floor( this.week / 4 );
	this.routine = this.routineraw.phases[this.phase].weeks[this.week];
	var template = _.template( this.templates.mainTemplate, { 
		ip : this.phase, 
		iw : this.week, 
		days : this.days 
	});

	$('#app').html( template );
};

App.initData = function() {
	this.startWeek = ds.init();
	this.initCalendar();
	var weekobj = ds.fetchWeek( Date.weeknum );
	var numdays = _.chain( weekobj ).pluck('daynum').uniq().value();
	this.activeWorkouts = _.chain( weekobj ).where({type:'workout'}).pluck('title').value();
	for(var i = 0, ln = numdays.length; i < ln; i++) {
		var wo = _.chain( weekobj ).where( {'daynum':numdays[i]} ).value();
		var template = _.template( this.templates.dayTemplate, { 
			workouts : wo
		});
		$('.day').eq(numdays[i]).find('.dayContent').append( template );
	}
	this.Utils.refresh();
}

App.initListeners = function() {
	var that = this;
	$('.dayContent').dblclick(function() { that.showTitles(this); that.activeDay = $(this).parent().attr('data-id'); });
	$(document).on('click', '#workout-titles .workout-title', function() { that.addWorkout( $(this) ); });
	$(document).on('click', '.dayContent .workout-title', function() { that.showWorkout( $(this) ); });
	$(document).on('click', '.delete', function() { that.removeWorkout($(this).parent()); return false; });
	$(document).on('blur', '.weight', function() { that.enterWeight( $(this) ); });
	$(document).on('blur', '.cardio-card input', function() { that.enterCardio( $(this) ); });
	$(document).on('focus', '.weight, .cardio-card input', function() {
		$this = $(this);
		$(document).on('keydown', function(e) {
			if( e.keyCode == 13 ) { 
				$this.trigger('blur');
				return false;
			}
		});
	});
}
App.init = function() {
	this.initData();
	this.initListeners();
};

App._data = function( $el ) {
	if( $el.hasClass('cardio-title') ) {
		var data = {
			type : 'cardio',
			title : $el.attr('data-title'),
			daynum :  this.activeDay,
			weeknum : Date.weeknum
		};	
	}
	else {
		var data = {
			type : 'workout',
			wonum : $el.attr('data-id'),
			title : $el.attr('data-title'),	
			exercises : this.workoutExercises($el.attr('data-id')),		
			daynum :  this.activeDay,
			weeknum : Date.weeknum
		}
	}
	
	return data;
};

/***
METHODS
*/

App.showTitles = function() {
	var template = _.template( this.templates.workoutTitleTemplate, {
		workouts : this.routine.workouts,
		cardio : this.cardio,
		active : this.activeWorkouts
	});

	this.Utils.open( template );
};

App.addWorkout = function( $workout ) {
	var $el = $('.day[data-id="'+this.activeDay+'"]').find('.dayContent');
	if( this.getWorkout( $el ).length > 0 && !$workout.hasClass('cardio-title') ) {
		this.removeWorkout( this.getWorkout( $el ) );
	}
	if( $workout.hasClass('cardio-title') ) {
		if( $workout.hasClass('running') ) {
			this.Utils.ready = false;
			$('.cardio-title').eq(1).click();
			this.Utils.ready = true;
			$('.cardio-title').eq(1).click();
			return false;
		}
		var title = $workout.attr('data-title'),
		dupes = $('.cardio-title[data-title="'+title+'"]', $el).length;
		if( dupes > 0 ) {
			$workout.attr('data-title', function(i, t) { return t + ' ' + parseInt(dupes + 1) });
		}
	}
	$el.append( $workout );

	if( !$workout.hasClass('cardio-title') ) {
		this.activeWorkouts.push( $workout.attr('data-title') );	
	}
	if( this.Utils.ready ) {
		this.Utils.refresh();
		this.Utils.close();
	}
	
	DataStore.add( this._data($workout) );
};
App.removeWorkout = function( $workout ) {
	this.activeWorkouts = _.without( this.activeWorkouts, $workout.attr('data-title') );
	$workout.remove();
	var data = {
		title : $workout.attr('data-title'),
		weeknum : Date.weeknum,
		daynum : $(this.activeDay).parent().attr('data-id'),
	};
	ds.remove( data );
};

App.showWorkout = function($el) {
	if( $el.hasClass('cardio-title') ) {
		var template = _.template( this.templates.cardioTemplate, {
			cardio  : $el.html()
		});	
	}
	else {
		var template = _.template( this.templates.workoutTemplate, {
			workout : this.routine.workouts[$el.attr('data-id')],
			wonum 	: $el.attr('data-id'),
			partial : function( id, vars ) {
				vars.partial = this.partial;
				return _.template( $(id).html(), vars );
			}
		});	
	}
	 
	this.Utils.open( template );
	$('.cardio-card input:eq(0)').trigger('focus');
};

App.getWorkout = function( $day ) {
	return $day.find('.workout-title').not('.cardio-title');
};

App.getCardio = function( $day ) {
	return $day.find('.workout-title').not('.cardio-title');
};

$(function() {
	App.init();
});