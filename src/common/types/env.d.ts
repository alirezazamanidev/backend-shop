declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    // Application
    PORT: number;
    API_URL: string;
    DEBUG: boolean;

    // Database
    DB_TYPE: string;
    DB_HOST: string;
    DB_PASSWORD: string;
    DB_USERNAME: string;
    DB_PORT: number;
    DB_NAME: string;
    // Secrets
    OTP_TOKEN_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    COOKIE_TOKEN_SECRET: string;
  }
}
