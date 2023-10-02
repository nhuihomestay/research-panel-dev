import { MongosConnect } from "@db/Mongos.connect"
import { DATABASE_NAME, COLLECTION_NAME } from "src/constant/db.constant";

class AdvisorDaos {
  public async queryAdvisor(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.queryData(DATABASE_NAME.DEV_DB, COLLECTION_NAME.ADVISOR_TEST, {})
    return data
  }
}

export default AdvisorDaos;
