import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test("GET to /behavior/reporting should return HTML web-page with status 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});
/*
Deno.test("GET to /behavior/reporting should return HTML web-page with status 200 and a user in session", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .set('Session', { user: { id: 1, email: 'me@email.net' } })
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /behavior/reporting/morning should always return HTML web-page with status 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /behavior/reporting/morning should return HTML web-page with status 200 and a user in session", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .set('session', {user: {id: 1, email: 'me@email.net'}})
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /behavior/reporting/evening should always return HTML web-page with status 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});

Deno.test("GET to /behavior/reporting/evening should return HTML web-page with status 200 and a user in session", async () => {
    const testClient = await superoak(app);
    await testClient.get("/behavior/reporting")
        .set('session', {user: {id: 1, email: 'me@email.net'}})
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});
*/

// Deno.test("POST to /behavior/reporting/evening should always return error if no userId ", async () => {
//     const testClient = await superoak(app);
//     await testClient.post("/behavior/reporting")
//         .expect("Content-Type", "text/html; charset=utf-8")
//         .expect(200);
// });