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
}


export default AdvisorCtr;
