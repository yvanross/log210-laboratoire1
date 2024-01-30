import chai from 'chai';
import chaiHttp from 'chai-http';
import SgbMock from './SgbMock';

chai.use(chaiHttp);
const expect = chai.expect;

describe("HealthRouterTest", () => {

  it('répond à ping', async () => {
      let mock:SgbMock = new SgbMock();
      let message = await mock.ping();
      expect(message).to.equal("Success")
      }, 10000);
});
