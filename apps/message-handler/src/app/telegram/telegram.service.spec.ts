import { Test } from "@nestjs/testing";
import { TelegramService } from "./telegram.service"

describe("AppService", () => {
  let service: TelegramService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TelegramService],
    }).compile();

    service = app.get<TelegramService>(TelegramService);
  });

  describe("getData", () => {
    it("should return \"Hello API\"", () => {
      expect(service.getData()).toEqual({ message: "Hello API" });
    });
  });
});
