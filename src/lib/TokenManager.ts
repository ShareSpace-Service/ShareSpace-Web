import config from "@/config/config";

class TokenRefreshManager {
  private isRefreshing = false;
  private refreshSubscribers: Array<() => void> = [];

  public addSubscriber(callback: () => void) {
    this.refreshSubscribers.push(callback);
  }

  private onRefreshed() {
    this.refreshSubscribers.forEach((callback) => callback());
    this.refreshSubscribers = [];
  }

  async refreshToken(): Promise<boolean> {
    if (this.isRefreshing) {
      return new Promise<boolean>((resolve) => {
        this.addSubscriber(() => resolve(true));
      });
    }

    this.isRefreshing = true;

    try {
      const response = await fetch(`${config.baseUrl}/token/reissue`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('토큰 갱신 실패');
      }

      this.isRefreshing = false;
      this.onRefreshed();
      return true;
    } catch (error) {
      this.isRefreshing = false;
      this.refreshSubscribers = [];
      return false;
    }
  }
}

export default new TokenRefreshManager();
