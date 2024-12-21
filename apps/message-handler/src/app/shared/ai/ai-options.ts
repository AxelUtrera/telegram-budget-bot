import { FactoryProvider, ModuleMetadata } from "@nestjs/common";

export abstract class AIModuleOptions {
    model?: string;
    prompt?: string;
    temperature?: number;
    url: string;
    apikey: string;
}

export interface AIAsyncModuleOptions extends
    Pick<ModuleMetadata, "imports">,
    Pick<FactoryProvider<AIModuleOptions>, "useFactory" | "inject"> { }