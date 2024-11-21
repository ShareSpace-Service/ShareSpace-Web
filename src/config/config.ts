interface Config {
  baseUrl: string;
  env: string;
}

const config: Config = {
  baseUrl: process.env.REACT_APP_BASE_URL || 'http://localhost:8080',
  env: process.env.REACT_APP_ENV || 'dev',
};

export default config; 