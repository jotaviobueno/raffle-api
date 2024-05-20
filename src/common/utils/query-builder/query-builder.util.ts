import { QueryParamsDto } from 'src/domain/dtos';
import { QueryBuilderEntity } from 'src/domain/entities';

export class QueryBuilder {
  private query: QueryBuilderEntity;

  constructor(private readonly queryParams: QueryParamsDto) {
    this.query = {
      where: {
        deletedAt: null,
      },
    };
  }

  pagination() {
    const { page, pageSize } = this.queryParams;
    const skip =
      (parseInt(page.toString()) - 1) * parseInt(pageSize.toString());

    this.query['skip'] = skip;
    this.query['take'] = Number(pageSize);

    return this;
  }

  where(condition: Record<string, unknown>) {
    this.query.where = { ...this.query.where, ...condition };

    return this;
  }

  date() {
    if (!this.queryParams.from && this.queryParams.to)
      this.query.where['createdAt'] = {
        lte: new Date(this.queryParams.to),
      };

    if (this.queryParams.from && !this.queryParams.to)
      this.query.where['createdAt'] = {
        gte: new Date(this.queryParams.from),
      };

    if (this.queryParams.from && this.queryParams.to)
      this.query.where['createdAt'] = {
        lte: new Date(this.queryParams.to),
        gte: new Date(this.queryParams.from),
      };

    return this;
  }

  sort() {
    try {
      const [field, value] = this.queryParams?.orderBy?.split('.');

      this.query.orderBy = {
        [field]: value,
      };

      return this;
    } catch (e) {
      return this;
    }
  }

  handle() {
    return this.query;
  }
}
