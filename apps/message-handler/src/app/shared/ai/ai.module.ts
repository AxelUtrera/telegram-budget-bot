import { HttpModule } from "@nestjs/axios";
import { DynamicModule, Module } from "@nestjs/common";
import { AIService } from "./ai.service";
import { AIAsyncModuleOptions, AIModuleOptions } from "./ai-options";

@Module({})
export class AIModule {
    static registerAsync(asyncOptions: AIAsyncModuleOptions): DynamicModule {
        return {
            module: AIModule,
            providers: [
                AIService,
                {
                    provide: AIModuleOptions,
                    useFactory: asyncOptions.useFactory,
                    inject: asyncOptions.inject,
                },
            ],
            exports: [AIService],
            imports: [
                HttpModule.registerAsync({
                    useFactory: async (...args) => {
                        const options = await asyncOptions.useFactory(...args);
                        return httpOptionsFactory(options)
                    },
                    inject: asyncOptions.inject || [],
                }),
            ],
        };
    }
}


const httpOptionsFactory = (options: AIModuleOptions) => {
    return {
        url: options.url,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + options.apikey,
        },
    }
}