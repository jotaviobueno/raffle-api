import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpecificationService } from '../services/specification.service';
import { CreateSpecificationDto } from 'src/domain/dtos/specification';

@Controller('specification')
@ApiTags('specification')
export class SpecificationController {
  constructor(private readonly specificationService: SpecificationService) {}

  @Post()
  create(@Body() createSpecificationDto: CreateSpecificationDto) {
    return this.specificationService.create(createSpecificationDto);
  }

  //   @Get()
  //   @UseInterceptors(CacheInterceptor)
  //   @CacheTTL(15)
  //   @IsPublic()
  //   findAll(@Query() queryParams: QueryParamsDto) {
  //     return this.specificationService.findAll(queryParams);
  //   }

  //   @Get(':id')
  //   @IsPublic()
  //   findAllCountryId(@Param('id') id: string) {
  //     return this.specificationService.findById(id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
  //     return this.specificationService.update({ ...updateBrandDto, id });
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.specificationService.remove(id);
  //   }
}
