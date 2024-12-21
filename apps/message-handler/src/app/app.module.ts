import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AIModule } from "./shared/ai/ai.module";
import { AudioFileModule } from "./shared/audio-file/audio-file.module";
import { TelegramModule } from "./telegram/telegram.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramModule,
    AIModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        url: config.get<string>("WHISPER_BASE_URL"),
        apikey: config.get<string>("OPEN_AI_APIKEY"),
      }),
    }),
  ],
  providers: [
    AudioFileModule,
  ],
})
export class AppModule { }
