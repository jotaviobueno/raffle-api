import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userModuleMock } from './user.module';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule(userModuleMock).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
