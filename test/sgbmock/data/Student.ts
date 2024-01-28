import md5 = require('md5');
import { Schedule } from './Schedule';
import { GroupStudentJSON } from '.';
import { validUserJSON, StudentJSON } from '.'
import { SgbResponse } from "../SgbMock";

export class Student{

  static login(email: string, password: string) : validUserJSON {
    const student = Student.all().data.find(student => email == student.id);
    return student ? { token: md5(email), user: student } : null;
  }

  static fromToken(token: string): StudentJSON {
    const student = Student.all().data.find(student => md5(student.id) == token);

    // if (!student) {
    //   throw new Error("Student token not found");
    // }

    return student;
  }

  static all() : SgbResponse<StudentJSON[]> {
    let students = []
    for (let i = 1; i <= 100; i++){
      students.push({first_name: `first_name_${i}`,last_name: `last_name_${i}`,id: `first_name.last_name+${i}@gmail.com` })  // console.log(i);
    }
    return { message: "Success", data: students };
  }
  
  static groupStudent(): SgbResponse<GroupStudentJSON[]> {
    let students = Student.all().data;
    let groups = Schedule.groups();
    let nbStudentByGroup = students.length / groups.length;

    nbStudentByGroup = Math.round(nbStudentByGroup);
    let groupStudentArray: GroupStudentJSON[] = [];
    for (let iStudent = 0; iStudent < students.length; iStudent++){
      let igroup = iStudent % groups.length;
      let group_student  = { group_id: groups[igroup], student_id: students[iStudent].id };
      groupStudentArray.push(group_student);
    }
    return { message: "Success", data: groupStudentArray};
  }
}
