import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

// Deno.test("GET to /api/summary should return data of last week", async () => {
//   const testClient = await superoak(app);
//   await testClient.get("/api/summary").expect(200);
// });

// Deno.test("GET to /api/summary/:year/:month/:day should return status 200 and realted data on given date", async () => {
//   const testClient = await superoak(app);
//   await testClient.get("/api/summary/2020/12/2")
//     .expect(200);
// });

// Deno.test("GET to /api/summary/:year/:month/:day should return status 200 and realted data on given date format with 0", async () => {
//   const testClient = await superoak(app);
//   await testClient.get("/api/summary/2020/12/06")
//     .expect(200);
// });

// Deno.test("GET to /api/summary/:year/:month/:day should return status 404, if no data is present on given date", async () => {
//   const testClient = await superoak(app);
//   await testClient.get("/api/summary/2020/03/28")
//     .expect('No data available for selected date')
//     .expect(404);
// });
