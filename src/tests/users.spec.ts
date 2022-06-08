import request from 'supertest';
import { App } from'../app';
const app = new App();

jest.mock("../../models/index", () => ({
    connectDb:jest.fn()
}));

jest.mock("../../models/user");

describe("User Routes", () => {

    beforeAll(() => {
        app.listen();
    });

    afterAll(() => {
        app.close()
    });
    
    test("Signup assers", async() => {
        const res = await request(app.server).post(`/api/users/signup`)
        .set('Accept', 'application/json')
        .send({
            email:"proof@gmail.com",
            password:"123456",
            firstName:"irio",
            lastName:"gomez",
            phone:"58545554",
        });

        expect(res.status).toEqual(200);
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
    }); 

    test("Login assers", async() => {
        const res = await request(app.server).post(`/api/users/login`)
        .set('Accept', 'application/json')
        .send({
            email:"proof@gmail.com",
            password:"123456",
        });

        expect(res.status).toEqual(200);
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
    }); 

    test("Forgot OTP assers", async() => {
        const res = await request(app.server).post(`/api/users/forgotOTP`)
        .set('Accept', 'application/json')
        .send({
            email:"proof@gmail.com",
        });

        expect(res.status).toEqual(200);
        expect(res.body.otpCode).toBeDefined();
    }); 

    test("Forgot assers", async() => {
        const res = await request(app.server).post(`/api/users/forgot`)
        .set('Accept', 'application/json')
        .send({
            email:"proof@gmail.com",
            password:"123456",
            otpCode:"221881"
        });

        expect(res.status).toEqual(200);
        expect(res.body.message).toBeDefined();
    });  
});

