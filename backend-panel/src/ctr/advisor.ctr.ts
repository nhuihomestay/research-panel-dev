import { AdvisorDaos } from '@daos';

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
        devMessage: "Dupplicated advisor_name"
      }
    }
    const data = await advisorDaos.insertAdvisor({
      advisor_name: body.advisor_name,
      th_count: 0,
      ls_count: 0,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString()
    })
    return {
      data: data,
      devMessage: "Success",
    };
  }
}


export default AdvisorCtr;
