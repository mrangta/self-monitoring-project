import { getCurrentDate, getYesterdayDate } from "../../utils/helper.js";
import { getUserAllAveragesByDate } from "../../services/summaryServices.js";

const showDashboardPage = async ({ render }) => {
  const allDataToday = await getUserAllAveragesByDate(await getCurrentDate());
  let genericMoodToday = 0;
  let genericMoodYesterday = 0;
  if(!allDataToday){
    render('landingpage.ejs', {genericMoodToday: genericMoodToday, genericMoodYesterday: genericMoodYesterday});
    return
  }
  genericMoodToday = Number(allDataToday[0].avg_mood);
  const allDataYesterday = await getUserAllAveragesByDate(await getYesterdayDate());
  genericMoodYesterday = Number(allDataYesterday[0].avg_mood);
  render('landingpage.ejs', {genericMoodToday: genericMoodToday, genericMoodYesterday: genericMoodYesterday});
}

export { showDashboardPage }