import { MongosConnect } from "@db/Mongos.connect"
import { DATABASE_NAME, COLLECTION_NAME } from "src/constant/db.constant";
let devDB = ''
let colName = ''
if (process.env.NODE_ENV === 'dev') {
  devDB = DATABASE_NAME.DEV_DB,
    colName = COLLECTION_NAME.STUDENT_TEST
} else {
  devDB = DATABASE_NAME.DB,
    colName = COLLECTION_NAME.STUDENT
}
class StudentDaos {
  public async queryStudent(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.queryData(devDB, colName, option)
    return data
  }

  public async insertStudent(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.insertOneData(devDB, colName, option)
    return data
  }

  public async updateStudent(id: any, option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.updateById(devDB, colName, id, option)
    return data
  }

  public async groupBy(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.countAgg(devDB, colName, option)
    return data
  }
}

export default StudentDaos;
