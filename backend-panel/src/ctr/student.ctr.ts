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
    if (isAdvisor.length < 2) {
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
    await studentDaos.insertStudent({
      student_id: body.student_id,
      student_name: body.student_name,
      type: body.type,
      topic: body.topic,
      advisor_name: body.advisor_name,
      co_advisor_name: body.co_advisor_name,
      grade: body.grade,
      semester: body.semester,
      batch: body.batch,
      remark: body.remark,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString()
    })
    // await advisorDaos.updateAdvisor(
    //   {
    //     advisor_name: { $in: [body.advisor_name, body.co_advisor_name] }
    //   },
    //   {
    //     $inc: { [`${lowerCase(body.type)}_count`]: 1 },
    //     $set: { updated_at: new Date().toISOString() }
    //   }
    // );

    return {
      data: {},
      devMessage: "Success",
    };
  }

  public async updateStudent(body: IUpdateStudentRequest): Promise<any> {
    if (!body) {
      return {
        data: {},
        devMessage: "Request is incomplete"
      }
    }
    const updatedField: any = {}
    if (body.new_student_id) updatedField.student_id = body.new_student_id
    if (body.student_name) updatedField.student_name = body.student_name
    if (body.type) updatedField.type = body.type
    if (body.topic) updatedField.topic = body.topic
    if (body.advisor_name) updatedField.advisor_name = body.advisor_name
    if (body.co_advisor_name) updatedField.co_advisor_name = body.co_advisor_name
    if (body.remark) updatedField.remark = body.remark
    if (body.grade) updatedField.grade = body.grade
    if (body.semester) updatedField.semester = body.semester
    if (body.batch) updatedField.batch = body.batch
    if (body.is_graduated) updatedField.is_graduated = body.is_graduated
    updatedField.updated_at = new Date(Date.now()).toISOString()

    const studentDaos = new StudentDaos()
    const isStudent = await studentDaos.queryStudent({ student_name: body.student_name })
    if (isStudent.length === 0) {
      return {
        data: {},
        devMessage: "Dupplicated student_name"
      }
    }
    await studentDaos.updateStudent({ student_id: body.student_id }, {
      $set: updatedField
    })

    return {
      data: {},
      devMessage: "Success",
    };
  }
}


export default StudentCtr;
