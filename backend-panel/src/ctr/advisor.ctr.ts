import { AdvisorDaos, StudentDaos } from '@daos';
import { lowerCase } from 'lodash';

class AdvisorCtr {
  public async getAdvisor(query: any): Promise<any> {
    const advisorDaos = new AdvisorDaos()
    const data = await advisorDaos.queryAdvisor(query ? query : {})
    return {
      data: data,
      devMessage: "Success",
    };
  }

  public async addAdvisor(body: any): Promise<any> {
    if (!body.advisor_name) {
      return {
        data: {},
        devMessage: "Request is incomplete"
      }
    }
    const advisorDaos = new AdvisorDaos()
    const isDuplicate = await advisorDaos.queryAdvisor({ advisor_name: body.advisor_name })
    if (isDuplicate.length > 0) {
      return {
        data: {},
        devMessage: "Already Registered"
      }
    }
    await advisorDaos.insertAdvisor({
      advisor_name: body.advisor_name,
      th_count: 0,
      ls_count: 0,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString()
    })
    return {
      data: {},
      devMessage: "Success",
    };
  }

  public async checkThesis(body: any): Promise<any> {
    const advisorDaos = new AdvisorDaos();
    const studentDaos = new StudentDaos();
    const queryStudent = await studentDaos.queryStudent({ student_id: body.student_id });
    if (queryStudent.length === 0) {
      return {
        data: {},
        devMessage: "student_id is invalid"
      }
    }

    const updateAdvisor = await advisorDaos.updateAdvisor({ advisor_name: body.advisor_name }, {
      $inc: {
        [`${lowerCase(queryStudent[0].type)}_count`]: 1
      },
      $set: {
        updated_at: new Date(Date.now()).toISOString()
      }
    })

    if (updateAdvisor.matchedCount === 0) {
      return {
        data: {},
        devMessage: "advisor_name is invalid"
      }
    }

    await studentDaos.updateStudent({ student_id: body.student_id }, {
      $set: {
        checked_by: body.advisor_name,
        updated_at: new Date(Date.now()).toISOString()
      }
    })

    return {
      data: {},
      devMessage: "Success",
    };
  }

  public async groupAdvisor(): Promise<any> {
    const advisorDaos = new AdvisorDaos()
    const pipeline: any[] = [
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      }]
    const getData = await advisorDaos.groupBy(pipeline)
    return {
      data: {
        total_advisor: getData[0].count
      },
      devMessage: "Success",
    };
  }

  public async deleteAdvisor(body: any): Promise<any> {
    const advisorDaos = new AdvisorDaos()
    const getData = await advisorDaos.queryAdvisor({ _id: body.id })
    if (getData.length === 0) {
      return {
        data: {},
        devMessage: "Advisor not found"
      }
    }
    const updatedData = await advisorDaos.delAdvisor({ _id: body.id })
    if (updatedData.modifiedCount === 0) {
      return {
        data: {},
        devMessage: "Update database is incomplete"
      }
    }

    return {
      data: getData,
      devMessage: "Success",
    };
  }
}


export default AdvisorCtr;
