import chai from 'chai';
import chaiHttp from 'chai-http';
import SgbMock from './SgbMock';

chai.use(chaiHttp);
const expect = chai.expect;
import coursesForMock from './data/courses.json';

describe("CourseRouterTest", () => {
  
  it('get all courses', async () => {
    let mock:SgbMock = new SgbMock();
    let data = await mock.getAllCourses();
    expect(data).to.deep.equal( { message: 'Success', data: coursesForMock});
  }, 10000);
  
});
