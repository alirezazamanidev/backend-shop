
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
        DB_PROT:string
        DB_NAME:string
    }
}