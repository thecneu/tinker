/*
  Strategy:
  Create APi for multiple drivers - change based on 1 line change based off of configureStore?
  Store:
  {
    config: startWeek, phase, week
    selected: day to show dashboard
    calendar: add exercises to an array of days in the week - all data logged here
    exercises: (initFunction) to log only the current phase
    exerciseConfig: created to log the current cached
  }

  Localstorage
    - load initial data from localStorage
    - save on subscribe

  JSON (express or myjson)
    - requires api
    - load async from server
    - save ? button or middleware (whtelist actions)

  Firebase or DynamoDB
    - requires api & middleware(3rd party api)
    - load async from server
    - save ? button or middleware (whtelist actions)
*/
