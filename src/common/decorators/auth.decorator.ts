import { applyDecorators, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiSecurity } from "@nestjs/swagger"
import { AuthGuard } from "src/modules/auth/guards"

export const Auth=()=>applyDecorators(ApiSecurity('Authorization'),UseGuards(AuthGuard))