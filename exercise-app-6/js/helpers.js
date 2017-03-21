Handlebars.registerHelper('classtime', function(time) {
	if( time ) return ' added';
	else return '';
});

Handlebars.registerHelper('ift', function(v1, options) {
	if( v1 === 'workout' ) return options.fn(this);
	else return options.inverse(this);
});

Handlebars.registerPartial("exercise", App.templates.exerciseTemplate);