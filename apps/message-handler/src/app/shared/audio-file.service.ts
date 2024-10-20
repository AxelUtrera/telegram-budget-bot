import { writeFile } from "fs";
import { promises as fs } from "fs";
import { join } from "path";
import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AudioFileService {
    _logger = new Logger(AudioFileService.name);
    constructor(
        private readonly http: HttpService,
    ) { }


    async downloadAudio(url: string, filename: string): Promise<string> {
        const { data } = await lastValueFrom(this.http.get(url, {
            responseType: "arraybuffer",
        }));

        await this.ensureAudiosDirectoryExists();
        const filePath = join(__dirname, "..", "..", "audios", filename + Date.now() + ".oga");

        await new Promise<void>((resolve, reject) => {
            writeFile(filePath, data, (err) => {
                if (err) {
                    reject(err);
                    this._logger.error(err);
                }
                else {
                    resolve();
                }
            });
        });

        return filePath;
    }

    async ensureAudiosDirectoryExists() {
        const audiosDir = join(__dirname, "..", "..", "audios");

        try {
            await fs.stat(audiosDir);
            this._logger.log("📂 Audios directory already exists at: " + audiosDir);
        }
        catch (error) {
            if (error.code === "ENOENT") {
                await fs.mkdir(audiosDir);
                this._logger.log("📂 Audios directory created at: " + audiosDir);
            }
            else {
                this._logger.error("❌ Error checking audios directory:", error);
            }
        }
    }
}