declare interface IAddStudentRequest {
    student_id: string,
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
    student_id: string,
    new_student_id: string,
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