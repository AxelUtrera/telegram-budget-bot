import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AudioFileService } from "./audio-file.service";

@Module({
    imports: [HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
        responseType: "arraybuffer",
    }), ConfigModule.forRoot()],
    providers: [
        AudioFileService,
    ],
    exports: [AudioFileService],
})
export class AudioFileModule { }