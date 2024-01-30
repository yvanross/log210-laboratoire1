import chai from 'chai';
import chaiHttp from 'chai-http';
import SgbMock from './SgbMock';
import semestersForMock from './data/semester.json';

chai.use(chaiHttp);
const expect = chai.expect;

describe("SemesterRouterTest", () => {
      it('get all semesters', async () => {
        let mock:SgbMock = new SgbMock();
        const data = await mock.semesters();
        expect(data).to.deep.equal(semestersForMock);
      }, 10000);
});
