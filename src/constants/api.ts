export const API_PATHS = {
  AUTH: {
    LOGIN: '/api/v1/accounts/login/',
    REFRESH_TOKEN: '/api/v1/accounts/me/refresh/',
    LOGOUT: '/api/v1/accounts/logout/',
  },
  GRAPH: {
    STUDENT_SCORES: (studentId: number | string) =>
      `api/v1/admin/students/${studentId}/scores`,
    TERM_AVERAGE: (courseId: number | string) =>
      `api/v1/admin/courses/${courseId}/cohorts/avg-scores`,
    SUBJECT_SCATTER: (subjectId: number | string) =>
      `api/v1/admin/subjects/${subjectId}/scatter`,
  },
}
