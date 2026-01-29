export const API_PATHS = {
  GRAPH: {
    STUDENT_SCORES: (studentId: number | string) =>
      `api/v1/admin/students/${studentId}/scores`,
    TERM_AVERAGE: (courseId: number | string) =>
      `api/v1/admin/courses/${courseId}/cohorts/avg-scores`,
    SUBJECT_SCATTER: (subjectId: number | string) =>
      `api/v1/admin/subjects/${subjectId}/scatter`,
  },
}
