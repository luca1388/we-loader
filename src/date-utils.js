const DEFAULT_FRIDAY_HOURS = 18;
const DEFAULT_FRIDAY_MINUTES = '00';
const MILLISECONDS_IN_A_DAY = (1000 * 60 * 60 * 24);
const DEFAULT_STARTING_WEEK_DAY = 1;

const getCurrentDay = () => {
  const todayDate = new Date();
  
  return {
    todayDate,
    currentWeekDay: todayDate.getDay(),
    currentMonthDay: todayDate.getDate()
  };
};

const getFridayDate = ({startingFridayHours = DEFAULT_FRIDAY_HOURS, startingFridayMinutes = DEFAULT_FRIDAY_MINUTES}) => {
  const { currentWeekDay, currentMonthDay, todayDate } = getCurrentDay();
  const fridayDate = new Date();
  
  fridayDate.setDate(currentMonthDay + (5 - currentWeekDay));
  fridayDate.setHours(startingFridayHours, startingFridayMinutes, '00', '00');
  
  return fridayDate;
};

const getStartingWeekTime = () => {
  const startingDay = new Date();
  const { currentWeekDay } = getCurrentDay();
  
  startingDay.setDate(startingDay.getDate() - (DEFAULT_STARTING_WEEK_DAY - currentWeekDay));
  startingDay.setHours('00', '00', '00', '00');
  
  return startingDay.getTime();
};

export const getFridayLoader = () => {
  const todayTime = new Date().getTime();
  const fridayTime = getFridayDate({}).getTime();
  // const startingWeekTime = getStartingWeekTime();
  
  const differenceInTime = fridayTime - todayTime;
  const differenceInDays = differenceInTime / MILLISECONDS_IN_A_DAY;
  const percentageToFridayFromToday = (todayTime / fridayTime) * 100;

  if (differenceInTime < 0) {
    return {
      differenceInDays: 0,
      differenceInTime: 0,
      percentageToFridayFromToday: 100,
      todayTime,
      fridayTime
    };
  }
  
  return {
    differenceInDays,
    differenceInTime,
    percentageToFridayFromToday,
    todayTime,
    fridayTime
  };
  // return {
  //   differenceInDays: differenceInDays < 0 ? differenceInDays : 0,
  //   differenceInTime: differenceInTime < 0 ? differenceInTime : 0,
  //   percentageToFridayFromToday: percentageToFridayFromToday > 100 ? 100 : percentageToFridayFromToday
  // };
};
