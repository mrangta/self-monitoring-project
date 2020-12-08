
import { getSpecificDateReport, updateMorningReport, updateEveningReport, addMorningReport, addEveningReport } from "../../services/reportServices.js";
import { validateMorningForm, validateEveningForm } from '../../middlewares/validations.js';


const showReport = async ({ session, render }) => {
  const user = await session.get('user');
  const current_date = new Date().toISOString().substring(0, 10);
  const reportToday = await getSpecificDateReport(current_date, user.id);
  const morningDone = reportToday && reportToday.morningmood;
  const eveningDone = reportToday && reportToday.eveningmood;
  render('dashboard.ejs', { user: user, morningDone: morningDone, eveningDone: eveningDone });
}

const showMorningReport = async ({ session, render }) => {
  const user = await session.get('user');
  const current_date = new Date();
  // To get previous day value
  current_date.setDate(current_date.getDate() - 1);
  const previousDate = current_date.toISOString().substring(0, 10);
  const reportToday = await getSpecificDateReport(previousDate, user.id);
  if (!reportToday) {
    render('morning.ejs', { user: user, date: previousDate, sleepDuration: 0, sleepQuality: 1, morningMood: 1, morningDone: false, eveningDone: false, errors: {} });
    return;
  }
  const morningDone = reportToday && reportToday.morningmood;
  const eveningDone = reportToday && reportToday.eveningmood;
  render('morning.ejs', { user: user, date: previousDate, sleepDuration: (reportToday.sleepduration || 0), sleepQuality: (reportToday.sleepquality || 1), morningMood: (reportToday.morningmood || 1), morningDone: morningDone, eveningDone: eveningDone, errors: {} });
}

const showEveningReport = async ({ session, render }) => {
  const user = await session.get('user');
  const date = new Date().toISOString().substring(0, 10);
  const reportToday = await getSpecificDateReport(date, user.id);
  if (!reportToday) {
    render('evening.ejs', { user: user, date: date, exerciseTime: 0, studyTime: 0, qualityOfEating: 1, eveningMood: 1, morningDone: false, eveningDone: false, errors: {} });
    return;
  }
  const morningDone = reportToday && reportToday.morningmood;
  const eveningDone = reportToday && reportToday.eveningmood;
  render('evening.ejs', { user: user, date: date, exerciseTime: (reportToday.exercisetime || 0), studyTime: (reportToday.studytime || 0), qualityOfEating: (reportToday.qualityofeating || 1), eveningMood: (reportToday.eveningmood || 1), morningDone: morningDone, eveningDone: eveningDone, errors: {} });
}

const postMorningReport = async ({ session, request, response, render }) => {
  const data = await validateMorningForm(request);
  const user = await session.get('user');
  data.userId = user.id;
  if (data.errors) {
    data.user = user;
    const date = new Date().toISOString().substring(0, 10);
    data.date = date;
    const reportToday = await getSpecificDateReport(date, user.id);
    const morningDone = reportToday && reportToday.morningmood;
    const eveningDone = reportToday && reportToday.eveningmood;
    data.morningDone = morningDone;
    data.eveningDone = eveningDone;
    render('morning.ejs', data);
    return;
  }
  const existingReport = await getSpecificDateReport(data.date, data.userId);
  if (existingReport) {
    await updateMorningReport(data.date, data.userId, data);
  } else {
    await addMorningReport(data);
  }
  response.redirect('/behavior/reporting');
}

const postEveningReport = async ({ session, request, response, render }) => {
  const data = await validateEveningForm(request);
  const user = await session.get('user');
  data.userId = user.id;
  if (data.errors) {
    data.user = user;
    const date = new Date().toISOString().substring(0, 10);
    data.date = date;
    const reportToday = await getSpecificDateReport(date, user.id);
    const morningDone = reportToday && reportToday.morningmood;
    const eveningDone = reportToday && reportToday.eveningmood;
    data.morningDone = morningDone;
    data.eveningDone = eveningDone;
    render('evening.ejs', data);
    return;
  }
  const existingReport = await getSpecificDateReport(data.date, data.userId);
  if (existingReport) {
    await updateEveningReport(data.date, data.userId, data);
  } else {
    await addEveningReport(data);
  }
  response.redirect('/behavior/reporting');
}



export { postMorningReport, postEveningReport, showReport, showMorningReport, showEveningReport }
