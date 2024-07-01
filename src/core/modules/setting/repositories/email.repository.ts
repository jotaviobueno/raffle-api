import { Injectable } from '@nestjs/common';
import { RepositoryFactory } from 'src/common/factories';
import { CreateEmailDto } from 'src/domain/dtos';
import { EmailEntity } from 'src/domain/entities';

@Injectable()
export class EmailRepository extends RepositoryFactory<
  EmailEntity,
  CreateEmailDto
> {
  constructor() {
    super('email');
  }

  create(data: CreateEmailDto): Promise<EmailEntity> {
    return this.prismaService.email.create({
      data: {
        data: {
          toJSON() {
            return data;
          },
        },
        userId: data.userId,
        deletedAt: null,
      },
    });
  }
}
