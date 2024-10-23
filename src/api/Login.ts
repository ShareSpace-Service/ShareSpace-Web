/**
 * 주어진 이메일(username)과 비밀번호(password)를 이용하여
 * 서버에 로그인 요청을 보내는 함수
 * 요청 성공 시, 서버에서 쿠키를 포함한 응답을 받음
 *
 * @param {string} username - 사용자의 이메일 또는 사용자명
 * @param {string} password - 사용자의 비밀번호
 * @returns {Promise<Response>} 서버 응답을 반환하는 Promise
 * @throws {Error} 서버 응답이 성공적이지 않을 경우 에러를 발생
 */
export async function login(username: string, password: string): Promise<Response> {
    // FormData에 username과 password 추가
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    // 로그인 요청을 POST 방식으로 보내며, credentials: 'include' 옵션을 통해 쿠키 포함
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
  
    // 응답이 성공적이지 않으면 에러를 던짐
    if (!response.ok) {
      throw new Error(`서버 상태가 그냥 미누갓! ${response.status}`);
    }
  
    // 서버 응답 반환
    return response;
  }
  