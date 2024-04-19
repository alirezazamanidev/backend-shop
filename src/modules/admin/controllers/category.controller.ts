import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ContentType, SwaggerTags } from "src/common/enums";
import { CategoryService } from "../services";
import { Auth } from "src/common/decorators";
import { CreateCategoryDto } from "../dto";

@ApiTags(SwaggerTags.CategoryAdmin)
@Controller('admin/category')
@Auth()
export class CategoryController {

    constructor(private readonly categoryService:CategoryService){}

    @ApiOperation({summary:'create new category'})
    @ApiConsumes(ContentType.UrlEncoded,ContentType.Json)
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    create(@Body() CreateCategoryDto:CreateCategoryDto){
        return this.categoryService.create(CreateCategoryDto)
    }
}