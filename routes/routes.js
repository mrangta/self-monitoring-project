import { Router } from "../deps.js";

import { showDashboardPage } from './controllers/dashboardController.js';
import { postMorningReport, showReport, showMorningReport, showEveningReport, postEveningReport } from './controllers/reportController.js';
import { postRegistration, postLogin, logout, showLogin, showRegistration } from './controllers/userController.js';
import { showSummary, postWeeklyReport, postMonthlyReport } from './controllers/summaryController.js';
import { getApiSummary, getSpecificDayApiSummary } from "./apis/summaryApi.js";


const router = new Router();

router.get('/', showDashboardPage);

router.get('/auth/login', showLogin);
router.post('/auth/login', postLogin);
router.post('/auth/logout', logout);
router.get('/auth/registration', showRegistration);
router.post('/auth/registration', postRegistration);

router.get('/behavior/reporting', showReport);
router.get('/behavior/reporting/morning', showMorningReport);
router.post('/behavior/reporting/morning', postMorningReport);
router.get('/behavior/reporting/evening', showEveningReport);
router.post('/behavior/reporting/evening', postEveningReport);

router.get('/behavior/summary', showSummary);
router.post('/behavior/summary/week', postWeeklyReport);
router.post('/behavior/summary/month', postMonthlyReport);

router.get('/api/summary', getApiSummary);
router.get('/api/summary/:year/:month/:day', getSpecificDayApiSummary);

export { router };