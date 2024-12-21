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
        const filePath = join(__dirname, "..", "..", "voice-notes", filename + Date.now() + ".oga");

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



    // convertToMp3(filePath: string): string {
    //     new Promise<string>((resolve, reject) => {
    //         // Verificar si el archivo existe antes de procesarlo
    //         if (!fs.existsSync(filePath)) {
    //             const errorMessage = `El archivo ${filePath} no existe.`;
    //             this._logger.error(errorMessage);
    //             return reject(new Error(errorMessage));
    //         }

    //         ffmpeg.ffprobe(filePath, (err, metadata) => {
    //             if (err) {
    //                 this._logger.error("Error al obtener metadata:", err);
    //                 return reject(err);
    //             }

    //             const duration = metadata.format.duration;
    //             const newFilePath = filePath + ".mp3";

    //             ffmpeg(filePath)
    //                 .toFormat("mp3")
    //                 .setStartTime(0)
    //                 .setDuration(duration)
    //                 .on("error", (err) => {
    //                     this._logger.error("Error durante la conversión:", err);
    //                     reject(err);
    //                 })
    //                 .on("end", () => {
    //                     this._logger.log(`Conversión completa: ${newFilePath}`);
    //                     resolve(newFilePath);
    //                 })
    //                 .save(newFilePath);
    //         });
    //     });
    // }


    async ensureAudiosDirectoryExists() {
        const audiosDir = join(__dirname, "..", "..", "voice-notes");

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