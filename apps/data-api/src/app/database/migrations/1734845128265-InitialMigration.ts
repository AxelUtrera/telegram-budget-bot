import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1734845128265 implements MigrationInterface {
    name = "InitialMigration1734845128265"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE \"users\" (\"phone\" character varying NOT NULL, \"name\" text NOT NULL, \"created_at\" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT '\"2024-12-22T05:25:32.313Z\"', \"updated_at\" TIMESTAMP WITH TIME ZONE, \"billsId\" integer, CONSTRAINT \"PK_users\" PRIMARY KEY (\"phone\"))");
        await queryRunner.query("CREATE TABLE \"bills\" (\"id\" SERIAL NOT NULL, \"amount\" numeric, \"description\" text, \"payment_method\" text, \"transaction_type\" text, \"created_at\" TIMESTAMP WITH TIME ZONE DEFAULT '\"2024-12-22T05:25:32.315Z\"', \"user_id\" character varying, CONSTRAINT \"PK_bills\" PRIMARY KEY (\"id\"))");
        await queryRunner.query("ALTER TABLE \"bills\" ADD CONSTRAINT \"FK_users_bills\" FOREIGN KEY (\"user_id\") REFERENCES \"users\"(\"phone\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"bills\" DROP CONSTRAINT \"FK_users_bills\"");
        await queryRunner.query("DROP TABLE \"bills\"");
        await queryRunner.query("DROP TABLE \"users\"");
    }

}
