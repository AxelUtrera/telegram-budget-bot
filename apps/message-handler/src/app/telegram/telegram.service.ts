import { Injectable, Logger } from "@nestjs/common";
import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Context, Markup, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { AudioFileService } from "../shared/audio-file/audio-file.service";

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  _logger = new Logger(TelegramService.name);
  private _bot: Telegraf<Context>;

  constructor(
    private readonly configService: ConfigService,
    private readonly audioFile: AudioFileService,
  ) {
    this.initialize();
  }

  private initialize() {
    this._bot = new Telegraf(this.configService.get<string>("TELEGRAM_BOT_TOKEN"));
  }

  onModuleInit() {
    this.initialize_bot();
    this._bot.launch();
    this._logger.log("🚀 Telegram _bot launched...");
  }

  onModuleDestroy() {
    this._bot.stop("SIGTERM");
    this._logger.log("🛑 Telegram bot stopped...");
  }

  private initialize_bot() {
    this._bot.start((context) => {
      context.reply(`Hola ${context.message.from.first_name || ""} elije una de las siguiente opciones`,
        Markup.inlineKeyboard([
          [Markup.button.callback("Decir hola", "1")],
          [Markup.button.callback("Mandar alv", "2")],
        ]));
    });

    this._bot.on(message("text"), async (context) => {
      await context.reply(`Hello ${context.message.from.first_name || ""}`);
    });

    this._bot.on(message("voice"), async (context) => {
      const fileLink = (await context.telegram.getFileLink(context.message.voice.file_id)).toString();
      this._logger.log(fileLink)
      const pathDownloaded = this.audioFile.downloadAudio(fileLink, "voice-note");
      this._logger.log(pathDownloaded);
    });

  }
}
