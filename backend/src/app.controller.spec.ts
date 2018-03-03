import { Test } from '@nestjs/testing';

import { AppController } from './app.controller';

describe(`AppController`, () => {
  let appController: AppController;

  beforeEach(async () => {
    const myModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = myModule.get<AppController>(AppController);
  });

  describe(`Get /`, () => {
    it(`should return "Hello World!"`, () => {
      expect(appController.root()).toBe(`Hello World!`);
    });
  });
});
