import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AudioFileModule } from "../shared/audio-file.module";
import { TelegramService } from "./telegram.service";

@Module({
    imports: [ConfigModule, AudioFileModule],
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule { }