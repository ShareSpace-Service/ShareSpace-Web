/**
 * 시간 형식을 변환하는 함수
 * @param {number} timeElapsed - 분 단위의 경과 시간
 * @returns {string} 경과 시간에 따른 형식화된 문자열 반환
 */
export function formatTimeElapsed(timeElapsed: number): string {
  if (timeElapsed >= 525600) {
    // 1년 이상일 때
    return '1년 이상 전';
  } else if (timeElapsed >= 1440) {
    // 1일 이상일 때
    const days = Math.floor(timeElapsed / 1440);
    return `${days}일 전`;
  } else if (timeElapsed >= 60) {
    // 1시간 이상일 때
    const hours = Math.floor(timeElapsed / 60);
    return `${hours}시간 전`;
  } else {
    return `${timeElapsed}분 전`; // 1시간 미만일 때
  }
}
