import { Test, TestingModule } from "@nestjs/testing";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppResolver],
      providers: [AppService],
    }).compile();
  });

  describe("getData", () => {
    it("should return \"Hello API\"", () => {
      const appController = app.get<AppResolver>(AppResolver);
      expect(appController.getData()).toEqual({ message: "Hello API" });
    });
  });
});
