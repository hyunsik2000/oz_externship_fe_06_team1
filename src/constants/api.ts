export const API_PATHS = {
  ACCOUNTS: {
    LIST: '/api/v1/admin/accounts/',
    DETAIL: (accountId: number | string) =>
      `/api/v1/admin/accounts/${accountId}/`,
  },
  AUTH: {
    LOGIN: '/api/v1/accounts/login/',
    REFRESH_TOKEN: '/api/v1/accounts/me/refresh/',
    LOGOUT: '/api/v1/accounts/logout/',
  },
  MEMBER: {
    STUDENT_REGISTRATION: '/api/v1/admin/student-enrollments/',
    STUDENT_REGISTRATION_ACCEPT: '/api/v1/admin/student-enrollments/accept',
    STUDENT_REGISTRATION_REJECT: '/api/v1/admin/student-enrollments/reject',
  },
  EXAM: {
    LIST: '/api/v1/admin/exams',
    CREATE: '/api/v1/admin/exams',
    DETAIL: (examId: number | string) => `/api/v1/admin/exams/${examId}`,
    PRESIGNED_URL: '/api/v1/admin/exams/presigned-url/thumbnail',
  },
  QUESTION: {
    CREATE: (examId: number | string) =>
      `/api/v1/admin/exams/${examId}/questions`,
    UPDATE: (questionId: number | string) =>
      `/api/v1/admin/exams/questions/${questionId}`,
    DELETE: (questionId: number | string) =>
      `/api/v1/admin/exams/questions/${questionId}`,
  },
  SUBMISSIONS: {
    LIST: '/api/v1/admin/submissions',
    DETAIL: (submissionId: number | string) =>
      `/api/v1/admin/exams/submissions/${submissionId}`,
  },
  GRAPH: {
    STUDENT_SCORES: (studentId: number | string) =>
      `api/v1/admin/students/${studentId}/scores`,
    TERM_AVERAGE: (courseId: number | string) =>
      `api/v1/admin/courses/${courseId}/cohorts/avg-scores`,
    SUBJECT_SCATTER: (subjectId: number | string) =>
      `api/v1/admin/subjects/${subjectId}/scatter`,
  },
  WITHDRAWAL: {
    LIST: '/api/v1/admin/withdrawals/',
    DETAIL: (withdrawalId: number | string) =>
      `/api/v1/admin/withdrawals/${withdrawalId}/`,
  },
}
