
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV:string,
        // Application
        PORT:number,
        API_URL:string
        // Database
        DB_TYPE:string
        DB_HOST:string
        DB_PASSWORD:string
        DB_USERNAME:string
        DB_PORT:number
        DB_NAME:string
    }
}