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

App.Utils.open = function( el ) {
	$('#overlay').html( el ).fadeIn(function() {
		if( $(document).height() > $('#overlay').height() ) $('#overlay').height($(document).height() + 84 );
	});
	$('#overlay').click( App.Utils.close );

}

App.Utils.close = function(e) {
	if( e ) {
		if( $( e.target ).attr('id') == 'overlay' ) $('#overlay').empty().fadeOut(c);
	}
	else $('#overlay').empty().fadeOut(c); 

	function c () { $('#overlay').css('height', 'auto').removeClass('cardio'); }
}