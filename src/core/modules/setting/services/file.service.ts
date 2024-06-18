import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { S3Service } from './s3.service';
import { CreateFileDto } from 'src/domain/dtos';
import { FileEntity } from 'src/domain/entities';

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
  }): Promise<FileEntity[]> {
    if (dto.sellerId) {
      const seller = await this.prismaService.seller.findFirst({
        where: { id: dto.sellerId, deletedAt: null },
      });

      if (!seller)
        throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);
    }

    const data = await Promise.all(
      files.map(async (file) => {
        const url = await this.s3Service.singleFile({ file, path: 'files' });

        return this.prismaService.file.create({
          data: {
            ...dto,
            filename: file.originalname,
            originalname: file.originalname,
            size: file.size,
            path: url,
          },
        });
      }),
    );

    return data;
  }

  async findById(id: string): Promise<FileEntity> {
    const file = await this.prismaService.file.findFirst({ where: { id } });

    if (!file) throw new HttpException('File not found', HttpStatus.NOT_FOUND);

    return file;
  }

  async remove(id: string): Promise<boolean> {
    const file = await this.findById(id);

    const remove = await this.prismaService.file.update({
      where: { id: file.id },
      data: { deletedAt: new Date() },
    });

    if (!remove)
      throw new HttpException('Failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }
}
