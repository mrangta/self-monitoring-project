import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test("GET to / should return a HTML web-page with status 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200);
});