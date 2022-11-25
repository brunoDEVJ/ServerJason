function converterData (data){
  const str = data;

  const [dateValues, timeValues] = str.split(" ");
  
  const [day, month, year] = dateValues.split("/");
  const [hours, minutes, seconds] = timeValues.split(":");
  
  const date = new Date(
    +year,
    +month - 1,
    +day,
    +hours - 3,
    +minutes,
    +seconds
    );
    console.log(date)
  return date;

}
converterData("23/03/2013 15:40:37")
export default converterData
