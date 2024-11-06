import { getCookieValue } from '@/api/Login';
class TokenRefreshManager {
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  async refreshToken(): Promise<boolean> {
    if (this.isRefreshing) {
      // 이미 갱신 중이면 완료될 때까지 대기
      return new Promise((resolve) => {
        this.refreshSubscribers.push(() => resolve(true));
      });
    }

    this.isRefreshing = true;

    try {
      const response = await fetch('http://localhost:8080/token/reissue', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('토큰 갱신 실패');
      }

      this.isRefreshing = false;
      this.refreshSubscribers.forEach((cb) =>
        cb(getCookieValue('accessToken') || '')
      );
      this.refreshSubscribers = [];

      return true;
    } catch (error) {
      this.isRefreshing = false;
      this.refreshSubscribers = [];
      return false;
    }
  }
}

export default new TokenRefreshManager();
