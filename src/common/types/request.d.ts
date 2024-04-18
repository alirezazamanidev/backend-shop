import { UserEntity } from "src/modules/user/entities"


declare global {
    namespace Express {
        interface Request {
            user?:UserEntity
        }
    }
}