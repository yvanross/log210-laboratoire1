import {Student} from './data/Student';
import axios from 'axios';
import HttpRequestMock from 'http-request-mock'; // https://github.com/huturen/http-request-mock
const mocker = HttpRequestMock.setup();
import coursesForMock from './data/courses.json';
import schedulesForMock from './data/schedule.json';
import semestersForMock from './data/semester.json';
import teachersForMock from './data/teachers.json';
import { GroupStudentJSON, ScheduleJSON, StudentJSON } from "./data";

// TODO: Change if needed
const host = "http://localhost:3200";

mocker.mock({
  url: `${host}/api/v3/course/all`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body:  { message: 'Success', data: coursesForMock}
});

mocker.mock({
  url: `${host}/api/v3/healt/ping`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: {body:{message: "Success"}}
});

mocker.mock({
  url: `${host}/api/v3/grade/group?group_id=S20213-LOG210-01`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: [{"group_id": "S20213-LOG210-01", "note": "75.1", "student_id": "first_name.last_name+1@gmail.com", "type": "Devoir1", "type_id": "2"}]
});

mocker.mock({
  url: `${host}/api/v3/grade/insert?student_id=first_name.last_name%2B1%40gmail.com&group_id=S20213-LOG210-01&type=Devoir1&type_id=2&note=75.1`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: "first_name.last_name+1@gmail.com"
});

mocker.mock({
  url: `${host}/api/v3/grade/student?student_id=first_name.last_name%2B1%40gmail.com`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body:  [{"group_id": "S20213-LOG210-01", "note": "75.1", "student_id": "first_name.last_name+1@gmail.com", "type": "Devoir1", "type_id": "2"}]
});

mocker.mock({
  url: `${host}/api/v3/grade/group?group_id=S20213-LOG210-01`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body:  [{"group_id": "S20213-LOG210-01", "note": "75.1", "student_id": "first_name.last_name+1@gmail.com", "type": "Devoir1", "type_id": "2"}]
});

mocker.mock({
  url: `${host}/api/v3/schedule/all`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body:  { message: 'Success', data: schedulesForMock}
});

mocker.mock({
  url: `${host}/api/v3/semester/all`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body:  semestersForMock
});

mocker.mock({
  url: `${host}/api/v3/student/login?email=first_name.last_name%2B1%40gmail.com&password=1234`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body:  Student.login('first_name.last_name+1@gmail.com','1234')
});

mocker.mock({
  url: `${host}/api/v3/student/login?email=invalid%2B3%40gmail.com&password=1234`,
  method: 'get',
  status: 500,
  header: {
    'content-type': 'application/json'
  },
  body:  Student.login('invalid%2B3%40gmail.com','1234')
});

mocker.mock({
  url: `${host}/api/v3/student/all`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: Student.all()
});

mocker.mock({
  url: `${host}/api/v3/student/fromtoken?token=e649905a37aa58c397647862118e3474`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: Student.fromToken('e649905a37aa58c397647862118e3474')
});


mocker.mock({
  url: `${host}/api/v3/student/fromtoken?token=invalid`,
  method: 'get',
  status: 500,
  header: {
    'content-type': 'application/json'
  },
  body:  {error: 'Error: Student token not found'}
});

mocker.mock({
  url: `${host}/api/v3/student/groupstudent`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: Student.groupStudent()
});

mocker.mock({
  url: `${host}/api/v3/teacher/login?email=cc-yvan.ross%40etsmtl.ca&password=1234`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: { token: "7f1b6b7c407b1292560e61a21e47d645", user: { id: 'cc-yvan.ross@etsmtl.ca', first_name: 'Yvan', last_name: 'Ross' } }
});

mocker.mock({
  url: `${host}/api/v3/teacher/login?email=teacher%2B100%40gmail.com&password=1234`,
  method: 'get',
  status: 500,
  header: {
    'content-type': 'application/json'
  },
  body: {error:'Error: Email and password do not match teacher'}
});

mocker.mock({
  url: `${host}/api/v3/teacher/all`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: {
    length: 8,
    data: teachersForMock
  }
});

mocker.mock({
  url: `${host}/api/v3/teacher/fromtoken?token=7f1b6b7c407b1292560e61a21e47d645`,
  method: 'get',
  status: 200,
  header: {
    'content-type': 'application/json'
  },
  body: {user_id: 'cc-yvan.ross@etsmtl.ca'}
});

mocker.mock({
  url: `${host}/api/v3/teacher/fromtoken?token=invalid`,
  method: 'get',
  status: 500,
  header: {
    'content-type': 'application/json'
  },
  body: {error:'Error: Teacher token not found'}
});

export interface SgbResponse<T> {
    message: string;
    data: T;
}

export default class SgbMock {

  public async gradeGroup(group_id: string): Promise<string> {
    let res = await axios.get(host + '/api/v3/grade/group?group_id=' + group_id)
    return res.data;
  }
  public async gradeStudent(student_id: String): Promise<string> {
    let res = await axios.get(host + '/api/v3/grade/student?student_id=' + student_id)
    return res.data;
  }

  public async insertGrade(student_id: string, group_id: string, type: string, type_id: string, note: string): Promise<string> {
    let res = await axios.get(host + '/api/v3/grade/insert?student_id=' + student_id + '&group_id=' + group_id + '&type=' + type + '&type_id=' + type_id + '&note=' + note);
    return res.data;
  }
  
  public async getAllCourses(): Promise<string> {
    const res = await axios.get(host + '/api/v3/course/all');
    return res.data;
  }

  public async ping(): Promise<string> {
    const res = await axios.get(host + '/api/v3/healt/ping');
    return res.data.body.message;
  }

  public async schedules(): Promise<SgbResponse<ScheduleJSON[]>> {
    const res = await axios.get(host + '/api/v3/schedule/all')
    return res.data;
  }

  public async semesters(): Promise<String> {
    const res = await axios(host + '/api/v3/semester/all')
    return res.data;
  }

  public async studentLogin(email: string, password: string){
    const res = await axios.get(host + '/api/v3/student/login?email=' + email + '&password=' + password)
    return res.data
  }

  
  public async students(): Promise<SgbResponse<StudentJSON[]>>{
    const res = await axios.get(host + '/api/v3/student/all')
    return res.data;
  }

  public async student(token: string){
    const res = await axios.get(host + '/api/v3/student/fromtoken?token=' + token)
    return res.data;
  }
  
  public async groupstudent(): Promise<SgbResponse<GroupStudentJSON[]>>{
    const res = await axios.get(host+'/api/v3/student/groupstudent');
    return res.data
  }

  public async teacherLogin(email: string, password: string) {
    const res = await axios.get(host + '/api/v3/teacher/login?email=' + email + '&password=' + password);
    return res.data;
  }

  
  public async teachers(){
    const res = await axios.get(host+'/api/v3/teacher/all')
    return res.data;
  }
  
  public async teacher(token:string){
    const res = await axios.get(host+'/api/v3/teacher/fromtoken?token='+token)
    return res.data;
  }
  
}