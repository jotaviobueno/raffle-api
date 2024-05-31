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
    ...data
  }: CreateFileDto & {
    files: Express.Multer.File[];
  }) {
    if (data.raffleId) {
      const raffle = await this.prismaService.raffle.findFirst({
        where: { id: data.raffleId, deletedAt: null },
      });

      if (!raffle)
        throw new HttpException('Raffle not found', HttpStatus.NOT_FOUND);
    }

    if (data.userId) {
      const user = await this.prismaService.user.findFirst({
        where: { id: data.userId, deletedAt: null },
      });

      if (!user)
        throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    if (data.sellerId) {
      const seller = await this.prismaService.seller.findFirst({
        where: { id: data.sellerId, deletedAt: null },
      });

      if (!seller)
        throw new HttpException('Seller not found', HttpStatus.NOT_FOUND);
    }

    const images =
      files &&
      (await this.s3Service.manyFiles(
        files.map((file) => ({ file, path: 'files' })),
      ));

    const result = await this.prismaService.file.create({
      data: {
        ...data,
        path: images,
      },
    });

    return result;
  }
}
