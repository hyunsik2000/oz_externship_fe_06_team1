import type { QuestionListResponse } from '@/types/question'

export const MOCK_QUESTION_LIST_RESPONSE: QuestionListResponse = {
  id: 101,
  title: 'TypeScript 쪽지시험',
  subject: {
    id: 1,
    title: 'TypeScript',
  },
  questions: [
    {
      id: 301,
      type: 'multiple_choice',
      question:
        'TypeScript의 타입 호환성 규칙에 따라, 상위 타입-하위 타입 관계에서 보통 안전하게 허용되는 값 할당은 어떤 방식일까요?',
      prompt: '',
      point: 5,
      blank_count: 0,
      options: [
        '상위 타입 값을 하위 타입 변수에 할당',
        '하위 타입 값을 상위 타입 변수에 할당',
        '서로소 유니온 타입 값을 일반 유니온 타입 변수에 할당',
        'any 타입 값을 unknown 타입 변수에 할당',
      ],
      correct_answer: '하위 타입 값을 상위 타입 변수에 할당',
      explanation:
        '하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고 하며, 이는 대부분의 경우 안전하게 허용됩니다. 반대인 다운캐스팅은 일반적으로 허용되지 않아요.',
    },
    {
      id: 302,
      type: 'ox',
      question:
        'TypeScript의 타입 호환성 규칙에 따라, 상위 타입-하위 타입 관계에서 보통 안전하게 허용되는 값 할당은 어떤 방식일까요?',
      prompt: '',
      point: 5,
      blank_count: 0,
      options: ['O', 'X'],
      correct_answer: 'O',
      explanation:
        '하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고 하며, 이는 대부분의 경우 안전하게 허용됩니다. 반대인 다운캐스팅은 일반적으로 허용되지 않아요.',
    },
    {
      id: 303,
      type: 'ordering',
      question:
        '다음은 TypeScript 코드가 실행되기까지의 과정을 순서 없이 나열한 것입니다. 아래 항목들을 올바른 순서로 나열해보세요.',
      prompt: '',
      point: 5,
      blank_count: 0,
      options: [
        '자바스크립트로 변환 (컴파일)',
        'TypeScript 파일 작성',
        '타입 검사 (오류 확인)',
        '변환된 자바스크립트 실행',
      ],
      correct_answer: [
        'TypeScript 파일 작성',
        '타입 검사 (오류 확인)',
        '자바스크립트로 변환 (컴파일)',
        '변환된 자바스크립트 실행',
      ],
      explanation:
        '하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고 하며, 이는 대부분의 경우 안전하게 허용됩니다. 반대인 다운캐스팅은 일반적으로 허용되지 않아요.',
    },
    {
      id: 304,
      type: 'short_answer',
      question: 'TypeScript에서 as 키워드는 어떤 용도로 사용되나요?',
      prompt: '20글자 이내로 입력하세요',
      point: 5,
      blank_count: 0,
      correct_answer: '타입단언',
      explanation:
        '하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고 하며, 이는 대부분의 경우 안전하게 허용됩니다. 반대인 다운캐스팅은 일반적으로 허용되지 않아요.',
    },
    {
      id: 305,
      type: 'fill_blank',
      question:
        'TypeScript의 타입 호환성 규칙에 따라, 상위 타입-하위 타입 관계에서 보통 안전하게 허용되는 값 할당은 어떤 방식일까요?',
      prompt: '',
      point: 5,
      blank_count: 2,
      options: [
        '변수나 함수의 매개변수, 반환값에 타입을 명시하는 것을  (A) ________이라고 한다.',
        'interface 또는 type 키워드를 사용하여 객체의 구조를 정의할 수 있는데, 이렇게 만든 타입을 (B) ________이라고 부른다.',
      ],
      correct_answer: ['타입주석', '사용자 정의 타입'],
      explanation:
        '하위 타입 값을 상위 타입으로 취급하는 것을 업캐스팅이라고 하며, 이는 대부분의 경우 안전하게 허용됩니다. 반대인 다운캐스팅은 일반적으로 허용되지 않아요.',
    },
  ],
  thumbnail_img_url:
    'https://oz-externship.s3.ap-northeast-2.amazonaws.com/exams/image.png',
  created_at: '2025-02-01 13:20:33',
  updated_at: '2025-02-05 15:10:20',
}

export const MOCK_EMPTY_QUESTION_LIST_RESPONSE: QuestionListResponse = {
  id: 102,
  title: 'TypeScript 쪽지시험',
  subject: {
    id: 1,
    title: 'TypeScript',
  },
  questions: [],
  thumbnail_img_url:
    'https://oz-externship.s3.ap-northeast-2.amazonaws.com/exams/image.png',
  created_at: '2025-02-01 13:20:33',
  updated_at: '2025-02-05 15:10:20',
}
