var cardio = [
	'Running - Treadmill',
	'Running - Elliptical',
	// 'Running - Outside',
	'Stair Master',
	// 'Cycling - Stand Up',
	// 'Cycling - Sit Down',
	// 'Cycling - Outside'
];
var routine = {
	phases: [{
		number: 1,
		title: 'Phase 1',
		weeks: [{
			number: 1,
			workouts: [{
				number: 1, 
				title: 'Chest, Triceps, Calves',
				exercises: [
				{
					name: 'Bench Press',
					image: 'http://www.exrx.net/AnimatedEx/PectoralSternal/BBBenchPress.gif',
					type: 'chest',
					sets: 4,
					reps: '12-15'
				},
				{
					name: 'Incline Bench Press',
					image: 'http://www.exrx.net/AnimatedEx/PectoralClavicular/BBInclineBenchPress.gif',
					type: 'chest',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Incline Dumbbell Flys',
					image: 'http://www.exrx.net/AnimatedEx/PectoralClavicular/DBInclineFly.gif',
					type: 'chest',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Cable Crossover',
					image: 'http://www.exrx.net/AnimatedEx/PectoralSternal/CBStandingFly.gif',
					type: 'chest',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Triceps Pressdown',
					image: 'http://www.exrx.net/AnimatedEx/Triceps/CBPushdownRope.gif',
					type: 'triceps',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Lying Triceps Extension',
					image: 'http://www.exrx.net/AnimatedEx/Triceps/BBLyingTricepsExtension.gif',
					type: 'triceps',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Cable Overhead Triceps Extension',
					image: 'http://www.exrx.net/AnimatedEx/Triceps/CBOverheadTricepsExtRope.gif',
					type: 'triceps',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Standing Calf Raise',
					image: 'http://www.exrx.net/AnimatedEx/Gastrocnemius/LVStandingCalfRaise.gif',
					type: 'triceps',
					sets: 4,
					reps: '25-30'
				},
				{
					name: 'Seated Calf Raise',
					image: 'http://www.exrx.net/AnimatedEx/Soleus/LVSeatedCalfRaiseH.gif',
					type: 'triceps',
					sets: 4,
					reps: '25-30'
				}]
			},
			{
				number: 2, 
				title: 'Back, Biceps, Abs',
				exercises: [
				{
					name: 'Dumbbell Bent-Over Row',
					image: '',
					type: 'back',
					sets: 4,
					reps: '12-15'
				},
				{
					name: 'Wide-Grip Pulldown',
					image: '',
					type: 'back',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Standing Pulldown',
					image: '',
					type: 'back',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Straight Arm Pulldown',
					image: '',
					type: 'back',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Barbell curl',
					image: '',
					type: 'biceps',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Dumbbell Incline Curl',
					image: '',
					type: 'biceps',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'One-Arm High Cable Curl',
					image: '',
					type: 'biceps',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Hip Thrust',
					image: '',
					type: 'abs',
					sets: 4,
					reps: '25-30'
				},
				{
					name: 'Crunch',
					image: '',
					type: 'abs',
					sets: 4,
					reps: '25-30'
				},
				{
					name: 'Oblique Crunch',
					image: '',
					type: 'abs',
					sets: 4,
					reps: '25-30'
				}]
			},
			{
				number: 3, 
				title: 'Shoulders, Traps, Calves',
				exercises: [
				{
					name: 'Dumbbell Shoulder Press',
					image: 'http://www.exrx.net/AnimatedEx/DeltoidAnterior/DBShoulderPress.gif',
					type: 'shoulders',
					sets: 4,
					reps: '12-15'
				},
				{
					name: 'Dumbbell Lateral Raise',
					image: 'http://www.exrx.net/AnimatedEx/DeltoidLateral/DBLateralRaise.gif',
					type: 'shoulders',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'One-Arm Cable Front Raise',
					image: 'http://www.exrx.net/AnimatedEx/DeltoidAnterior/CBFrontRaise.gif',
					type: 'shoulders',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'High Cable Rear Delt Fly',
					image: 'http://www.exrx.net/AnimatedEx/DeltoidPosterior/CBStandingRearDeltFly.gif',
					type: 'shoulders',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Dumbbell Shrug',
					image: 'http://www.exrx.net/AnimatedEx/TrapeziusUpper/DBShrug.gif',
					type: 'traps',
					sets: 4,
					reps: '12-15'
				},
				{
					name: 'Seated Calf Raise',
					image: 'http://www.exrx.net/AnimatedEx/Soleus/LVSeatedCalfRaiseH.gif',
					type: 'calves',
					sets: 4,
					reps: '25-30'
				},
				{
					name: 'Leg Press Calf Raise',
					image: 'http://www.exrx.net/AnimatedEx/Gastrocnemius/LV45DegCalfPress.gif',
					type: 'calves',
					sets: 4,
					reps: '25-30'
				}]
			},
			{
				number: 4, 
				title: 'Legs and Abs',
				exercises: [
				{
					name: 'Squat',
					image: '',
					type: 'legs',
					sets: 4,
					reps: '12-15'
				},
				{
					name: 'One-Leg Leg Press',
					image: '',
					type: 'legs',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Leg Extension',
					image: '',
					type: 'legs',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Romanian Deadlift',
					image: '',
					type: 'legs',
					sets: 4,
					reps: '12-15'
				},
				{
					name: 'Lying Leg Curl',
					image: '',
					type: 'legs',
					sets: 3,
					reps: '12-15'
				},
				{
					name: 'Hip Thrust',
					image: '',
					type: 'abs',
					sets: 3,
					reps: '20-30'
				},
				{
					name: 'Crunch',
					image: '',
					type: 'abs',
					sets: 3,
					reps: '20-30'
				},
				{
					name: 'Plank',
					image: '',
					type: 'abs',
					sets: 3,
					reps: '1min'
				}]
			}]	
		}],
	}],
};

var abs = "Crunches, Leg Raises, Alternating Leg Crunches";
var back = 'Bent-Over Barbell Row, Barbell Shrug, Lat Pulldowns, Dumbbell Shrug, Lat Pulldowns, Hanging Row, Seated Cable Rows, Trap Bar Shrugs, Reverse Grip Lat Pulldowns'; 
var biceps = 'Hammer Curls, Standing Two-Armed Cable Curls, Cross Body One-Armed Cable Curls, Dumbbell Curl, Incline Dumbbell Curl, Concentration Curls, Cross Body Dumbbell Hammer Curl, EZ-Bar Bicep Curl, Close Grip Chin Up, Resistance Band Barbell Curls, Standing Dumbbell Curls'; 
var chest = 'Barbell Bench Press, Incline Barbell Bench Press, Dumbbell Pullover, Dumbbell Fly, Dumbbell Chest Press, Incline Dumbbell Chest Press, Incline Dumbbell Flies, Low Cross Cable Raise, Incline Push Up, Push Ups, Pec Deck Machine, Cable Crossovers, Dips'; 
var shoulders = 'Bent-Over Barbell Row, Barbell Shrug, Lat Pulldowns, Dumbbell Shrug, Lat Pulldowns, Hanging Row, Seated Cable Rows, Seated Rear Lateral Dumbbell Raises, Trap Bar Shrugs, Reverse Grip Lat Pulldowns'; 
var triceps = 'Close Grip Bench Press, Overhead Dumbbell Extensions, Tricep Dips, Seated One-Arm Dumbbell Tricep Extensions, Skull Crushers, Close Grip Dumbbell Press, Reverse Grip Cable Press Down, Overhead Cable Tricep Extensions, Lying Dumbbell French Press, Close Grip Push Up';