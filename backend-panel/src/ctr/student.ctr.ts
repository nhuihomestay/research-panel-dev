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
      is_graduated: body.is_graduated ? body.is_graduated : "false",
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString()
    })

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
    if (body.is_graduated) updatedField.is_graduated = String(body.is_graduated)
    updatedField.updated_at = new Date(Date.now()).toISOString()

    const studentDaos = new StudentDaos()
    if (updatedField.student_name) {
      const isStudent = await studentDaos.queryStudent(updatedField.student_name ? { student_name: updatedField.student_name } : {})
      if (isStudent.length !== 0) {
        return {
          data: {},
          devMessage: "Dupplicated student_name"
        }
      }
    }

    const updatedData = await studentDaos.updateStudent({ student_id: body.student_id }, {
      $set: updatedField
    })

    if (updatedData.modifiedCount === 0) {
      return {
        data: {},
        devMessage: "Update database is incomplete"
      }
    }

    return {
      data: updatedData,
      devMessage: "Success",
    };
  }

  public async groupStudent(query: any): Promise<any> {
    const studentDaos = new StudentDaos()
    const pipeline: any[] = []
    if (query.match) pipeline.push({
      $match: {
        advisor_name: query.match
      }
    })
    pipeline.push({
      $group: {
        _id: `${query.id ? '$' + query.id : null}`,
        count: { $sum: 1 }
      }
    })
    const getData = await studentDaos.groupBy(pipeline)
    return {
      data: getData,
      devMessage: "Success",
    };
  }

  public async deleteStudent(body: any): Promise<any> {
    const studentDaos = new StudentDaos()
    const updatedData = await studentDaos.delStudent({ student_id: body.student_id, is_graduated: 'true' })
    if (updatedData.length === 0) {
      return {
        data: {},
        devMessage: "Student not found"
      }
    }

    return {
      data: {
        student_id: body.student_id
      },
      devMessage: "Success",
    };
  }
}


export default StudentCtr;
