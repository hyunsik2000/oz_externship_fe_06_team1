import { COMMON_RULES, TYPE_RULES } from './rules'
import type { ProblemValidationData, ValidationResult } from './types'

// 유효성 검사 함수
export function validateProblemForm(
  data: ProblemValidationData
): ValidationResult {
  // 1. 공통 규칙 검사
  const commonErrors = COMMON_RULES(data)
  if (commonErrors.length) {
    const firstError = commonErrors[0]
    return {
      isValid: false,
      title: firstError.title || '입력 정보를 확인해주세요',
      description: firstError.message,
      errors: [firstError.message],
      firstInvalidField: firstError.field,
    }
  }

  // 2. 유형별 규칙 검사
  const typeSpecificErrors = TYPE_RULES[data.type](data)
  if (typeSpecificErrors.length) {
    const firstError = typeSpecificErrors[0]
    return {
      isValid: false,
      title: firstError.title || '입력 정보를 확인해주세요',
      description: firstError.message,
      errors: [firstError.message],
      firstInvalidField: firstError.field,
    }
  }

  return {
    isValid: true,
    errors: [],
  }
}
