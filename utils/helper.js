const getMonthFormat = (month) => {
    return month > 9 ? month : "0" + month;
}

const getWeekFormat = (week) => {
    return week > 9 ? week : "0" + week;
}


const getCurrentDate = (date) => {
    if(date){
        return date.toISOString().substring(0,10);
    }
    const newDate = new Date();
    return newDate.toISOString().substring(0,10);
}

const getYesterdayDate = (date) => {
    if(date){
        date.setDate(date.getDate() - 1);
        return date.toISOString().substring(0,10);
    }
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);
    return newDate.toISOString().substring(0,10);
}

const getWeekStartDate = (week, year) => {
    var date = new Date(year, 0, 1 + (week - 1) * 7);
    var dow = date.getDay();
    var weekStart = date;
    if (dow <= 4)
        weekStart.setDate(date.getDate() - date.getDay() + 1);
    else
        weekStart.setDate(date.getDate() + 8 - date.getDay());
    return weekStart;
}

const getOneWeekAgoDate = (date) => {
    if(date){
    date.setDate(date.getDate() - 7);
    return date.toISOString().substring(0,10);
    }
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - 7);
    return newDate.toISOString().substring(0,10);
}

const getWeekNumber = (date) => {
    date = new Date(Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    var weekNo = Math.ceil((((date - yearStart) / 86400000) + 1)/7);
    return [date.getUTCFullYear(), weekNo];
}


export { getMonthFormat, getWeekFormat, getCurrentDate, getYesterdayDate, getWeekStartDate, getOneWeekAgoDate, getWeekNumber};