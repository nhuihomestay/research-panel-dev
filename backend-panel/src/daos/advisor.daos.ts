import { MongosConnect } from "@db/Mongos.connect"
import { isArray } from "lodash";
import { DATABASE_NAME, COLLECTION_NAME } from "src/constant/db.constant";
let devDB = ''
let colName = ''
if (process.env.NODE_ENV !== 'prod') {
  devDB = DATABASE_NAME.DEV_DB,
    colName = COLLECTION_NAME.ADVISOR_TEST
} else {
  devDB = DATABASE_NAME.DB,
    colName = COLLECTION_NAME.ADVISOR
}
class AdvisorDaos {
  public async queryAdvisor(option: any): Promise<any> {
    const connect = new MongosConnect();
    if (isArray(option)) option = option[0]
    const data = connect.queryData(devDB, colName, option)
    return data
  }

  public async insertAdvisor(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.insertOneData(devDB, colName, option)
    return data
  }

  public async updateAdvisor(id: any, option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.updateById(devDB, colName, id, option)
    return data
  }

  public async groupBy(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.countAgg(devDB, colName, option)
    return data
  }

  public async delAdvisor(id: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.delById(devDB, colName, id)
    return data
  }
}

export default AdvisorDaos;
