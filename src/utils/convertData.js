const str = '24-09-2022 07:30:14';

const [dateValues, timeValues] = str.split(' ');


const [day, month, year] = dateValues.split('-');
const [hours, minutes, seconds] = timeValues.split(':');

const date = new Date(+year, month - 1, +day, +hours - 3, +minutes, +seconds);


