import { MongosConnect } from "@db/Mongos.connect"
import { isArray } from "lodash";
import { DATABASE_NAME, COLLECTION_NAME } from "src/constant/db.constant";

class AdvisorDaos {
  public async queryAdvisor(option: any): Promise<any> {
    const connect = new MongosConnect();
    if (isArray(option)) option = option[0]
    const data = connect.queryData(DATABASE_NAME.DEV_DB, COLLECTION_NAME.ADVISOR_TEST, option)
    return data
  }

  public async insertAdvisor(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.insertOneData(DATABASE_NAME.DEV_DB, COLLECTION_NAME.ADVISOR_TEST, option)
    return data
  }

  public async updateAdvisor(id: any, option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.updateById(DATABASE_NAME.DEV_DB, COLLECTION_NAME.ADVISOR_TEST, id, option)
    return data
  }

  public async groupBy(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.countAgg(DATABASE_NAME.DEV_DB, COLLECTION_NAME.ADVISOR_TEST, option)
    return data
  }
}

export default AdvisorDaos;
