window.log = function( d ) { console.log( JSON.stringify(d) ); };
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
App.Utils.resize = function() {
	// fit text size dynamically
	$('.dayName').css('font-size', function() {
		return parseInt($(this).width() * .14) + 'px';
	});
	$('.workout-title').css('font-size', function() {
		return parseInt($(this).width() * .08) + 'px';
	});
};

App.Utils.refresh = function() {
	var h = 0;
	$('li').height('auto');
	$('li').each(function() {
		if( $(this).height() > h ) h = $(this).height();
	});
	$('li').height(h);
};

App.Utils.open = function( $el ) {
	$('#overlay').append( $('<div id="workout-titles"></div>').html( $el ) ).fadeIn(function() {
		if( $(document).height() > $('#overlay').height() ) $('#overlay').height($(document).height() + 84 );
	});
	$('#overlay').click( App.Utils.close );
}

App.Utils.close = function(e) {
	if( e ) {
		if( $( e.target ).attr('id') == 'overlay' ) {
			$('#overlay').empty().fadeOut(c);
		}	
	}
	else {
		$('#overlay').empty().fadeOut(c);
	}
	function c () { $('#overlay').css('height', 'auto'); }
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
		var data = {
			type : 'exercise',
			wonum : parseInt(wo.attr('data-wonum')),
			title : $weight.siblings('.exname').attr('data-title'),
			weight : parseInt($text),
			daynum : parseInt(this.activeDay),
			weeknum : parseInt(Date.weeknum)
		};
		ds.update( data );
	}
};

App.enterCardio = function( ) {
	var time = $('.time').val(),
		distance = $('.distance').val(),
		calories = $('.calories').val(),
		title = $('.cardio-card h2').text();
	//if( $('.time').val() == '' && $('.distance').val() == '' && $('.calories').val() == '' ) return;
	var data = {
		type : 'cardio',
		title : title,
		time : time,
		distance : distance,
		calories : calories,
		daynum : parseInt(this.activeDay),
		weeknum : parseInt(Date.weeknum)
	};
	ds.update( data );
	var $el = $('.day').eq(this.activeDay).find('.cardio-title[data-title="'+title+'"]').addClass('added'),
		$info = $el.find('.info');
	$info.html(
		time + ':00 ' + distance + 'm ' + calories + 'c'
	).addClass('added');
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
		var wo = _.chain( weekobj ).where( {daynum:numdays[i]} ).reject(function(obj) { return obj.type == 'exercise' }).value();
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
	$(document).on('click', '.dayContent .workout-title', function() { that.activeDay = parseInt($(this).parents('.day').attr('data-id')); that.showWorkout( $(this) ); });
	$(document).on('click', '.delete', function() { that.removeWorkout($(this).parent()); return false; });
	$(document).on('blur', '.weight', function() { that.enterWeight( $(this) ); });
	$(document).on('focus', '.weight', function() { $(this).find('div').empty(); });
	$(document).on('click', '#cardioApply', function() { that.enterCardio(); that.Utils.close(); });
	$(document).on('click', '#clear', function() { delete localStorage.woplans; location.reload(); });
	$(document).on('focus', '.weight, .cardio-card input', function() {
		$this = $(this);
		$(document).on('keydown', function(e) {
			if( e.keyCode == 13 ) { 
				if( $this.hasClass('calories') ) $('#cardioApply').trigger('click');
				else $this.trigger('blur');
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
			daynum :  parseInt(this.activeDay),
			weeknum : parseInt(Date.weeknum)
		};	
	}
	else {
		var data = {
			type : 'workout',
			wonum : parseInt($el.attr('data-id')),
			title : $el.attr('data-title'),		
			daynum :  parseInt(this.activeDay),
			weeknum : parseInt(Date.weeknum)
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
		dupes = $('.cardio-title[data-title^="'+title+'"]', $el).length;
		if( dupes > 0 ) {
			$workout.attr('data-title', function(i, t) { title =  t + ' ' + parseInt(dupes + 1); return title; });
			$workout.find('span').html(title);
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
	
	ds.add( this._data($workout) );
};
App.removeWorkout = function( $workout ) {
	this.activeWorkouts = _.without( this.activeWorkouts, $workout.attr('data-title') );	
	var data = {
		title : $workout.attr('data-title'),
		weeknum : Date.weeknum,
		daynum : parseInt($workout.parents('.day').attr('data-id')),
	};
	$workout.remove();
	ds.remove( data );
	this.Utils.refresh();
};

App.showWorkout = function($el) {
	
	if( $el.hasClass('cardio-title') ) {
		var template = _.template( this.templates.cardioTemplate, {
			cardio  : $el.attr('data-title'),
			cdata : _.chain( ds.fetchWeek( Date.weeknum ) ).findWhere({daynum:this.activeDay, title:$el.attr('data-title')}).value() || {time:'', distance:'', calories:''}
		});	
	}
	else {
		var template = _.template( this.templates.workoutTemplate, {
			workout : this.routine.workouts[$el.attr('data-id')],
			exercises : _.chain( ds.fetchWeek( Date.weeknum ) ).where({wonum:parseInt($el.attr('data-id'))}).value(),
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
	$(window).resize(App.Utils.resize);
	App.Utils.resize();
});