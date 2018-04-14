import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Server from '../server';
import { userUri, userIdTest, userNameTest } from '../env';

chai.use(chaiHttp);
const expect = chai.expect;


describe("Server Test", () => {
    describe('User Api Test', () => {
        it("Get All Users Test", () => {
            return chai.request(Server)
                .get(userUri)
                .then((res) => {
                    // console.log(res.body);
                    expect(res.type).to.eql('application/json');
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                });
        });

        it("Get 1 User By ID Test", () => {
            return chai.request(Server)
                .get(userUri + `/${userIdTest}`)
                .then((res) => {
                    // console.log(res.body);
                    expect(res.type).to.eql('application/json');
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.be.equal(userNameTest);
                });
        });
    });
});


