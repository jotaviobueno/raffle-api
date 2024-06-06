import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { S3Service } from './s3.service';
import { CreateFileDto } from 'src/domain/dtos';

@Injectable()
export class FileService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create({
    files,
    ...dto
  }: CreateFileDto & {
    files: Express.Multer.File[];
  }): Promise<Express.Multer.File[]> {
    if (dto.sellerId) {
      const seller = await this.prismaService.seller.findFirst({
        where: { id: dto.sellerId, deletedAt: null },
      });

      if (!seller)
        throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);
    }

    const values = await this.s3Service.manyFiles(
      files.map((file) => ({ file, path: 'files' })),
    );

    await this.prismaService.file.createMany({
      data: values.map((value) => ({
        ...dto,
        fieldname: value.fieldname,
        filename: value.filename,
        originalname: value.originalname,
        path: value.path,
        size: value.size,
        deletedAt: null,
        destination: value.destination,
        mimetype: value.mimetype,
      })),
    });

    return values;
  }
}
