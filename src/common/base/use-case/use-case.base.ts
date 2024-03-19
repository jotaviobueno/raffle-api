export abstract class UseCaseBase<T, Response> {
  abstract execute(data: T): Promise<Response>;
}
