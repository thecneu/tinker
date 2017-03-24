/* globals $ */
export const weeknum = () => {
  const d = new Date()
  const dayNr = (d.getDay() + 6) % 7
  d.setDate(d.getDate() - dayNr + 3)
  const jan4 = new Date(d.getFullYear(), 0, 4)
  const dayDiff = (d - jan4) / 86400000
  const weekNr = 1 + Math.ceil(dayDiff / 7)
  return parseInt(weekNr, 10)
}

export const ready = true;
export const resize = () => {
  // fit text size dynamically
  $('.dayName').css('font-size', (e) => parseInt($(e.currentTarget).width() * .14, 10) + 'px')
  $('.workout-title').css('font-size', (e) => parseInt($(e.currentTarget).width() * .08, 10) + 'px')
};

export const refresh = () => {
  let h = 0;
  $('li').height('auto')
  $('li').each(function() {
    if( $(this).height() > h )
      h = $(this).height()
  });
  $('li').height(h)
}

export const close = (e) => {
  const c = () => $('#overlay').css('height', 'auto').removeClass('cardio')

  if (e) {
    if($(e.target).attr('id') === 'overlay') $('#overlay').empty().fadeOut(c)
  } else $('#overlay').empty().fadeOut(c)
}

export const open = (el) => {
  $('#overlay').html(el).fadeIn(() => {
    if ($(document).height() > $('#overlay').height())
      $('#overlay').height($(document).height() + 84)
  })

  $('#overlay').click(close)
}

export const normalize = (data) => {
  const exercises = []
  data.phases.forEach((phase) => {
    phase.weeks.forEach((week) => {
      week.workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
          exercises.push({
            ...exercise,
            phase: phase.number,
            week: week.number
          })
        })
      })
    })
  })
}