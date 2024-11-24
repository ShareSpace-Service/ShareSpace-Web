interface Config {
  baseUrl: string;
  env: string;
}

// 개발 환경 기본값 설정
const DEFAULT_BASE_URL = 'http://sharespace.store:8080';
const DEFAULT_ENV = 'release';

const config: Config = {
  baseUrl: import.meta.env.VITE_BASE_URL ?? DEFAULT_BASE_URL,
  env: import.meta.env.VITE_ENV ?? DEFAULT_ENV,
};

// 환경 변수 로드 확인을 위한 로그
// console.log('Current Environment:', config.env);
// console.log('Base URL:', config.baseUrl);

export default config;
