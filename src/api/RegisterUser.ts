/**
 * 임시 회원가입 요청 + 이메읿 발송을 처리하는 함수
 * @param {any} body - 회원가입 시 전송할 데이터
 * @returns {Promise<any>} 서버로부터의 응답 데이터를 포함한 Promise
 * @throws {Error} - 요청 실패 시 에러 발생
 */
export async function registerUser(body: any): Promise<any> {
  const response = await fetch('http://localhost:8080/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    throw result; // 서버에서 온 에러 메시지를 직접 던짐
  }

  return result;
}

/**
 * 이메일 인증을 수행하는 함수
 *
 * 주어진 userId와 validationNumber를 사용하여 이메일 인증 요청을 서버로 보냄
 * 서버 응답을 JSON으로 파싱하고, 응답이 실패할 경우 예외를 던짐
 *
 * @param {number} userId - 인증할 사용자의 고유 ID
 * @param {number} validationNumber - 사용자가 입력한 인증 번호
 * @returns {Promise<any>} - 서버 응답의 JSON 데이터
 * @throws {Error} - 응답이 성공적이지 않을 경우 에러 메시지를 포함한 예외를 던짐
 */

export async function validateEmail(
  userId: number,
  validationNumber: number
): Promise<any> {
  const body = {
    userId: userId,
    validationNumber: validationNumber,
  };

  const response = await fetch('http://localhost:8080/user/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  if (!response.ok) {
    throw result; // 서버에서 온 에러 메시지를 직접 던짐
  }

  return result;
}
