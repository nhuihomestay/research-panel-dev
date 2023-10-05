import { MongosConnect } from "@db/Mongos.connect"
import { DATABASE_NAME, COLLECTION_NAME } from "src/constant/db.constant";

class StudentDaos {
  public async queryStudent(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.queryData(DATABASE_NAME.DEV_DB, COLLECTION_NAME.STUDENT_TEST, option)
    return data
  }

  public async insertStudent(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.insertOneData(DATABASE_NAME.DEV_DB, COLLECTION_NAME.STUDENT_TEST, option)
    return data
  }

  public async updateStudent(id: any, option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.updateById(DATABASE_NAME.DEV_DB, COLLECTION_NAME.STUDENT_TEST, id, option)
    return data
  }

  public async groupBy(option: any): Promise<any> {
    const connect = new MongosConnect();
    const data = connect.countAgg(DATABASE_NAME.DEV_DB, COLLECTION_NAME.STUDENT_TEST, option)
    return data
  }
}

export default StudentDaos;
