import { StudentDaos, AdvisorDaos } from '@daos';
import { lowerCase } from 'lodash';

class StudentCtr {
  public async getStudent(query: any): Promise<any> {
    const studentDaos = new StudentDaos()
    const data = await studentDaos.queryStudent(query ? query : {})
    return {
      data: data,
      devMessage: "Success",
    };
  }

  public async addStudent(body: IAddStudentRequest): Promise<any> {
    if (!/^(TH|LS)$/.test(body.type) || !body) {
      return {
        data: {},
        devMessage: "Request is incomplete"
      }
    }
    const advisorDaos = new AdvisorDaos()
    const isAdvisor = await advisorDaos.queryAdvisor({
      "advisor_name": {
        $in: [body.advisor_name, body.co_advisor_name]
      }
    })
    if (isAdvisor.length === 0) {
      return {
        data: {},
        devMessage: "This Advisor is invalid"
      }
    }
    const studentDaos = new StudentDaos()
    const isStudent = await studentDaos.queryStudent({ student_name: body.student_name, student_id: body.student_id })
    if (isStudent.length > 0) {
      return {
        data: {},
        devMessage: "Already Registered"
      }
    }
    const insertData = await studentDaos.insertStudent({
      student_id: body.student_id,
      student_name: body.student_name,
      type: body.type,
      advisor_name: body.advisor_name,
      co_advisor_name: body.co_advisor_name,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString()
    })
    await advisorDaos.updateAdvisor(
      {
        "advisor_name": {
          $in: [body.advisor_name, body.co_advisor_name]
        }
      },
      {
        $inc: { [`${lowerCase(body.type)}_count`]: 1 },
        $set: { updated_at: new Date() }
      }
    );

    return {
      data: insertData,
      devMessage: "Success",
    };
  }
}


export default StudentCtr;
