declare interface IAddStudentRequest {
    student_id: number,
    student_name: string,
    type: string,
    topic: string,
    advisor_name: string,
    co_advisor_name: string
    remark: string | undefined
    grade: string | undefined
    semester: string | undefined
    batch: string
    is_graduated: boolean
}

declare interface IUpdateStudentRequest {
    student_id: number,
    new_student_id: number,
    student_name: string,
    type: string,
    topic: string,
    advisor_name: string,
    co_advisor_name: string
    remark: string | undefined
    grade: string | undefined
    semester: string | undefined
    batch: string
    is_graduated: boolean
}