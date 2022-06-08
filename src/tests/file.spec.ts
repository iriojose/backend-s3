import request from 'supertest';
import { App } from'../app';
import path from 'path';

const app = new App();
const testExample = {Key:"test.png",Location:"http://ejemplo.com"};

jest.mock("../../models/index", () => ({
    connectDb:jest.fn()
}));

jest.mock("../utils/policy", () => jest.fn((req,res,next) => {
    req.header.Authorization = 1
    next()
}));

jest.mock("../../models/file");

jest.mock("../utils/s3",() => () => ({
    uploadToS3: jest.fn(() => testExample),
    downloadToS3: jest.fn(() => testExample),
    uploadFileToS3WithUrl: jest.fn(() => testExample)
})); 

describe("File Routes", () => {

    beforeAll(() => {
        app.listen();
    });

    afterAll(() => {
        app.close();
    });

    test("Upload assers", async() => {
        const filePath = path.join('public', 'ejemplo.png');

        const res = await request(app.server).post(`/api/files/upload`)
        .set('Accept', 'application/json')
        .attach('file', filePath);

        expect(res.status).toEqual(200);
        expect(res.body.file).toBeDefined();
    }); 

    test("Download assers", async() => {
        const res = await request(app.server).post(`/api/files/download`)
        .set('Accept', 'application/json')
        .send({
            id:1
        })

        expect(res.status).toEqual(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.file).toBeDefined();
    }); 

    test("Upload with url assers", async() => {
        const res = await request(app.server).post(`/api/files/uploadUrl`)
        .set('Accept', 'application/json')
        .send({
            fileName:"ejemplo.png",
            url:"http://google.com"
        })

        expect(res.status).toEqual(200);
        expect(res.body.file).toBeDefined();
    }); 

    test("Get all assers", async() => {
        const res = await request(app.server).get(`/api/files/getAll`)
        .set('Accept', 'application/json')
        .query({fileName:"ejemplo.png"})
        .send()

        expect(res.status).toEqual(200);
        expect(res.body.files).toBeDefined();
    }); 
});

