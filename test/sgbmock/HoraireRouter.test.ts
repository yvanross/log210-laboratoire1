import chai from 'chai';
import chaiHttp from 'chai-http';
import SgbMock from './SgbMock';
import schedulesForMock from './data/schedule.json';

chai.use(chaiHttp);
const expect = chai.expect;

describe("ScheduleRouterTest", () => {

  it('get all Schedules', async () => {
        let mock:SgbMock = new SgbMock();
        let data = await mock.schedules();
        expect(data).to.deep.equal({message: "Success", data: schedulesForMock});
      }, 10000);
});
