import { getUserMonthlyAverage, getUserWeeklyAverage } from "../../services/summaryServices.js";
import { getWeekStartDate, getMonthFormat, getWeekFormat, getWeekNumber } from "../../utils/helper.js";

const renderingHelper = (render, summaryData, allDataWeek, user, formattedMonth, formattedWeek) => {
    if(summaryData){
        if(allDataWeek){
            render('summary.ejs', {user: user, summaryData: summaryData,  month: formattedMonth, weekSummary: allDataWeek, week: formattedWeek});
        } else {
        render('summary.ejs', {user: user, summaryData: summaryData, month: formattedMonth, weekSummary: [], week: formattedWeek});
        }
    } else if (allDataWeek){
        render('summary.ejs', {user: user, summaryData: [],  month: formattedMonth, weekSummary: allDataWeek, week: formattedWeek});
    } else {
        render('summary.ejs', {user: user, summaryData: [], month: formattedMonth, weekSummary: [], week: formattedWeek});
    }
}

const showSummary = async ({render, session}) => {
    const user = await session.get('user');
    const date = new Date();
    const month = date.getMonth() > 0 ? date.getMonth() : 12;
    const summaryData = await getUserMonthlyAverage(user.id, month);
    const firstWeekOfMonth = getWeekNumber(date)[1] - 1;
    const allDataWeek = await getUserWeeklyAverage(user.id, firstWeekOfMonth);
    const formattedMonth = getMonthFormat(month);
    const formattedWeek = getWeekFormat(firstWeekOfMonth);
    renderingHelper(render, summaryData, allDataWeek, user, formattedMonth, formattedWeek)
}

const postMonthlyReport = async ({ render, request, session }) => {
    const user = await session.get('user');
    const body = request.body();
    const params = await body.value;
    const newMonth = params.get("month");
    const formattedYear = Number(newMonth.substring(0, 4));
    const numberOfMonth = Number(newMonth.substring(5, 7));
    const summaryData = await getUserMonthlyAverage(user.id, numberOfMonth);
    const endDate = new Date(formattedYear, numberOfMonth - 1, 8);
    const firstWeekOfMonth = getWeekNumber(endDate)[1];
    const allDataWeek = await getUserWeeklyAverage(user.id, firstWeekOfMonth);
    const formattedMonth = getMonthFormat(numberOfMonth);
    const formattedWeek = getWeekFormat(firstWeekOfMonth);
    renderingHelper(render, summaryData, allDataWeek, user, formattedMonth, formattedWeek)
}

const postWeeklyReport = async({render, request, session}) => {
    const user = await session.get('user');
    const body = request.body();
    const params = await body.value;
    const newWeek = params.get("week");
    const numberOfYear = Number(newWeek.substring(0,4));
    const numberOfWeek = Number(newWeek.substring(6, 8));
    const mondayOfWeek = getWeekStartDate(numberOfWeek, numberOfYear);
    const numberOfMonth = mondayOfWeek.getMonth() +1;
    const summaryData = await getUserMonthlyAverage(user.id, numberOfMonth);
    const allDataWeek = await getUserWeeklyAverage(user.id,numberOfWeek);
    const formattedMonth = getMonthFormat(numberOfMonth);
    const formattedWeek = getWeekFormat(numberOfWeek);
    renderingHelper(render, summaryData, allDataWeek, user, formattedMonth, formattedWeek);
}

export { showSummary, postMonthlyReport, postWeeklyReport };