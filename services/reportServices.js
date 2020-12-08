import { executeQuery } from "../database/database.js";

const getSpecificDateReport = async (date, userId) => {
    const res = await executeQuery("SELECT * FROM reports WHERE date = $1 AND user_id = $2", date, userId);
    if(res && res.rowCount > 0) {
        return res.rowsOfObjects()[0];
    }
    return;
}

const addMorningReport = async (data) => {
    await executeQuery("INSERT INTO reports (date, sleepDuration, sleepQuality, morningMood, user_id) VALUES ($1, $2, $3, $4, $5);", data.date, data.sleepDuration, data.sleepQuality, data.mood, data.userId);
}

const addEveningReport = async (data) => {
    await executeQuery("INSERT INTO reports (date, exerciseTime, studyTime, qualityOfEating, eveningMood, user_id) VALUES ($1, $2, $3, $4, $5, $6);", data.date, data.exerciseTime, data.studyTime, data.qualityOfEating, data.mood, data.userId);
}

const updateMorningReport = async (date, userId, data) => {
    const res = await executeQuery(`UPDATE reports SET sleepDuration = $3, sleepQuality = $4, morningMood = $5 WHERE date = $1 AND user_id = $2;`, date, userId, data.sleepDuration, data.sleepQuality, data.mood);
}

const updateEveningReport = async (date, userId, data) => {
    const res = await executeQuery(`UPDATE reports SET exerciseTime = $3, studyTime = $4, qualityOfEating = $5, eveningMood = $6 WHERE date = $1 AND user_id = $2;`, date, userId, data.exerciseTime, data.studyTime, data.qualityOfEating, data.mood);
}


export { getSpecificDateReport, addMorningReport, addEveningReport, updateMorningReport, updateEveningReport}