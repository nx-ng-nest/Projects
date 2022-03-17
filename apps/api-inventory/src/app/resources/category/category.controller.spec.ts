import {
  Test,
  TestingModule,
} from '@nestjs/testing';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api-inventory!"', () => {
      const appController = app.get<CategoryController>(CategoryController);
      expect(appController.get()).toEqual({
        message: 'Welcome to api-inventory!',
      });
    });
  });
});
