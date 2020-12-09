import { superoak } from '../../../deps.js';
import { app } from '../../../app.js';

Deno.test("GET to /auth/login should always return HTML web-page with status 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/login")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200)
});

Deno.test("GET to /auth/registration should always return HTML web-page with status 200", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/registration")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200)
});


/*
Deno.test("POST to /auth/registration should return status 200 when registration is successful", async () => {
    const testClient = await superoak(app);
    const randomString = Math.random().toString(36).substring(7);
    await testClient.post("/auth/registration")
        .send(`email=${randomString}@work.com&&password=password&&verification=password`)
        .expect(200)
});


Deno.test("POST to /auth/registration should return status 200 when registration is successful", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/registration")
        .send('email=my@email.com&&password=password&&verification=password')
        .expect(200)
});

Deno.test("POST to /auth/registration should return message 'This email is already reserved' if email already exists in the database", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/registration")
        .send('email=my@email.com&&password=password&&verification=password')
        .expect('This email is already reserved');
});

Deno.test("POST to /auth/login should return status 401 when password is incorrect", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/login")
        .send('email=my@email.com&&password=oooopps')
        .expect("Status Code","401 Unauthorized");
});

Deno.test("POST to /auth/login should return HTML web-page with status 200 when login is successful", async () => {
    const testClient = await superoak(app);
    await testClient.post("/auth/login")
        .send('email=my@email.com&&password=password')
        .expect(200)
});

*/