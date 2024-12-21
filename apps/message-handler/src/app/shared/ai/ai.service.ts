import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AIService {

    constructor(
        private readonly http: HttpService,
        private readonly configService: ConfigService,
    ) { }

    getTranscript(file: string) {
        return lastValueFrom(this.http.post("/", {
            model: this.configService.get<number>("AI_MODEL"),
            prompt: this.configService.get<string>("TRANSCRIPT_PROMPT"),
            response_format: "json",
            temperature: this.configService.get<number>("TEMPERATURE"),
            language: this.configService.get<number>("TEMPERATURE"),
            file: file,
        }));
    }
}