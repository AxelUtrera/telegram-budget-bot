import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { BillEntity, UserEntity } from "./database/entities";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("POSTGRES_HOST"),
        port: Number(configService.get<string>("POSTGRES_PORT")),
        password: configService.get<string>("POSTGRES_PASSWORD"),
        username: configService.get<string>("POSTGRES_USER"),
        database: configService.get<string>("POSTGRES_DATABASE"),
        logging: ["warn", "error"],
        ssl: false,
        migrations: ["./database/migrations/*.js"],
        entities:[UserEntity, BillEntity],
        synchronize: false,
        autoLoadEntities: true,
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //here we can set up the playground if we need it
      playground: true,
      autoSchemaFile: true,
    }),
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
