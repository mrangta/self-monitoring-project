import {  getUserAllAveragesByDate, getUserAllAveragesByStartAndEndDate } from "../../services/summaryServices.js";
import { getCurrentDate, getMonthFormat, getWeekFormat, getOneWeekAgoDate } from "../../utils/helper.js";

const getSpecificDayApiSummary = async ({ params, response }) => {
    const formattedMonth = getMonthFormat(params.month);
    const formattedWeek = getWeekFormat(params.day);
    const newDate = `${params.year}-${formattedMonth}-${formattedWeek}`;
    const allData = await  getUserAllAveragesByDate(newDate);
    if(allData && Array.isArray(allData)){
        response.body = allData;
        response.status = 200;
    } else {
        response.body = 'No data available for selected date';
        response.status = 404;
    }
}

const getApiSummary = async ({ response }) => {
    const endDate = getCurrentDate();
    const startDate = getOneWeekAgoDate();
    const allDataWeek = await getUserAllAveragesByStartAndEndDate(startDate, endDate);
    if (allDataWeek) {
        response.body = allDataWeek[0];
        response.status = 200;
    } else {
        response.body = 'No data available for the past week';
        response.status = 404;
    }
}

export { getSpecificDayApiSummary, getApiSummary }