import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AudioFileModule } from "./shared/audio-file.module";
import { TelegramModule } from "./telegram/telegram.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegramModule,
  ],
  providers: [
    AudioFileModule,
  ],
})
export class AppModule { }
