window.log = function( d ) { console.log( JSON.stringify(d) ); };

var App = { 
	daytitles : ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
	templates : {
		dayTemplate : $('#daycontent-template').html(),
		cardioTemplate : $('#cardio-template').html(),
		exerciseTemplate : $('#exercise-template').html(),
		workoutTemplate : $('#workout-template').html(),
		workoutTitleTemplate : 	$('#workout-title-template').html(),
		mainTemplate : $('#main-template').html()
	}, 
	cardio : cardio,
	routinedata : routine,
	activeWorkouts : [],
	activeDay : 0,
	startWeek: 0,
	days: []
}, ds = DataStore;

App.init = function() {
	this.initData();
	this.initListeners();
};

App.initData = function() {
	var data = ds.init();
	this.startWeek = data.startWeek;
	this.data = data.data;
	this.initCalendar();
	this.activeWorkouts = _.chain(_.flatten(this.data.days)).where({weeknum:this.weeknum, type:'workout'}).pluck('title').value();
	for( var i = 0; i < this.data.days.length; i++ ) {
		var template = Handlebars.compile(this.templates.dayTemplate);
		var workouts = _.chain(this.data.days[i]).where({weeknum:this.weeknum}).value();
		$('.day').eq(i).find('.dayContent').append( template({workout:workouts}) );
	}	
	this.Utils.refresh();
};

App.initListeners = function() {
	var that = this;
	$('.dayContent').dblclick(function() { that.showTitles(); that.activeDay = parseInt($(this).parent().attr('data-id')); });
	$(document).on('click', '#workout-titles .workout-title', function() { that.addWorkout($(this)) });
	$(document).on('click', '.dayContent .workout-title', function() { that.activeDay = parseInt($(this).parents('.day').attr('data-id')); that.showWorkout($(this)); });
	$(document).on('click', '#clear', function() { delete localStorage.woplans; location.reload(); });
	$(document).on('click', '.delete', function() { that.removeWorkout($(this).parent()); return false; });
	$(document).on('blur', '.weight', function() { that.enterWeight($(this)) });
	$(document).on('click', '#cardioApply', function() { that.enterCardio() });
	$(document).on('focus', '.weight', function() { $(this).find('div').empty(); });
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

App.initCalendar = function() {
	this.weeknum = Date.weeknum;
	this.week = Date.weeknum - this.startWeek;
	this.phase = Math.floor( this.week / 4 );
	this.routine = this.routinedata.phases[this.phase].weeks[this.week]; // cache routine for the week
	// possibly delete this.routinedata;
	var template = Handlebars.compile(this.templates.mainTemplate);
	$('#app').html( template({
		ip: this.phase + 1,
		iw: this.week + 1,
		days: this.daytitles
	}) );
};

App.showTitles = function() {
	var template = Handlebars.compile(this.templates.workoutTitleTemplate);
	var workouts = _.difference( _.chain(App.routine.workouts).pluck('title').value(), this.activeWorkouts );
	this.Utils.open( template({
		workouts: workouts,
		cardio: this.cardio
	}) );
};

App.showWorkout = function( $el ) {
	if( $el.hasClass('cardio-title') ) var template = Handlebars.compile(this.templates.cardioTemplate);
	else var template = Handlebars.compile(this.templates.workoutTemplate);
	var workout = _.chain(this.data.days[this.activeDay]).findWhere({weeknum: this.weeknum, title: $el.attr('data-title')}).value();	
	this.Utils.open( template(workout) );
	$('.cardio-card input:eq(0)').trigger('focus');
};

App.addWorkout = function( $workout ) {
	var $el = $('.day').eq(this.activeDay).find('.dayContent'),
		wo = this.getWorkout( $el );
	if( wo.length > 0 && !$workout.hasClass('cardio-title') ) {
		this.removeWorkout( wo );
	}
	if( $workout.hasClass('cardio-title') ) {
		// process both treadmill/elliptical when press running button
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

	if( !$workout.hasClass('cardio-title') )
		this.activeWorkouts.push( $workout.attr('data-title') );

	if( this.Utils.ready ) {
		this.Utils.refresh();
		this.Utils.close();
	}

	this.data.days[this.activeDay].push( this._data($workout) );
	ds._save(this.data);
};

App.removeWorkout = function( $workout ) {
	this.activeWorkouts = _.without( this.activeWorkouts, $workout.attr('data-title') );	
	var data = {
		title : $workout.attr('data-title'),
		weeknum : Date.weeknum,
		daynum : parseInt($workout.parents('.day').attr('data-id')),
	};
	$workout.remove();
	
	var d = this.data.days[data.daynum],
		i = d.indexOf(_.chain(d).findWhere(data).value());
	this.data.days[data.daynum].splice(i, 1);
	
	ds._save(this.data);
	this.Utils.refresh();
};

App.enterCardio = function( $el ) {
	var time = $('.time').val(),
		distance = $('.distance').val(),
		calories = $('.calories').val(),
		title = $('.cardio-card h2').text();

	if(time == '' || isNaN(time) || distance == '' || isNaN(distance) || calories == '' || isNaN(calories)) return false;
	
	var data = {
		type : 'cardio',
		title : title,
		time : time,
		distance : distance,
		calories : calories,
		daynum : this.activeDay,
		weeknum : this.weeknum
	};
	
	var $el = $('.day').eq(this.activeDay).find('.cardio-title[data-title="'+title+'"]').addClass('added');
	$el.find('.info').html(time + ':00 ' + distance + 'm ' + calories + 'c').addClass('added');
	
	var day = this.data.days[this.activeDay],
		c = _.chain(day).findWhere({title:title, weeknum:this.weeknum}).value(),
		i = day.indexOf(c);
	this.data.days[this.activeDay][i] = data;
	this.data.cardio[data.weeknum][data.daynum][data.title] = {time:time, distance:distance, calories:calories};
	
	ds._save(this.data);
	this.Utils.close();
};

App.enterWeight = function( $weight ) {
	var $el = $weight.find('div'),
		lbs = $el.text();
	if( lbs != '' && !isNaN(lbs) ) {
		$text = $el.text().replace(/lbs/g, '');
		$el.text( $text + 'lbs' );
		$el.trigger('blur');

		var wo = $weight.parents('.workout-card');
		var data = {
			type : 'exercise',
			exnum : parseInt($weight.parents('li').attr('data-id')),
			wotitle : $weight.parents('.workout-card').find('h2').text(),
			title : $weight.siblings('.exname').attr('data-title'),
			weight : parseInt($text),
			daynum : this.activeDay,
			weeknum : this.weeknum
		};
		var wo = _.chain(this.data.days[this.activeDay]).findWhere({title:data.wotitle}).value(),
			i = this.data.days[this.activeDay].indexOf( wo );
		_.extend(wo.exercises[data.exnum], data);
		this._prepare('weight', data.weeknum, data.wotitle);
		this.data.days[this.activeDay][i] = wo;
		this.data.weight[data.weeknum][data.wotitle][data.exnum] = data.weight;

		ds._save(this.data);
	}
};

App._data = function( $el ) {
	var data = {
		title : $el.attr('data-title'),		
		daynum :  this.activeDay,
		weeknum : this.weeknum
	}
	data.type = $el.hasClass('cardio-title') ? 'cardio' : 'workout';
	if( data.type == 'workout' )
		data.exercises = _.chain(this.routine.workouts).findWhere({title:data.title}).value().exercises;	

	return data;
};

App._prepare = function(type, w, t) {
	switch( type ) {
		case 'weight':
			var data = this.data[type];
			if( !data[w] ) data[w] = [];
			if( !data[w][t] ) data[w][t] = [];
			break;
	}
	this.data[type] = data;
}

App.getWorkout = function( $day ) {
	return $day.find('.workout-title').not('.cardio-title');
};

App.getLastWeeksDetails = function() {};

$(function() {
	App.init();
});