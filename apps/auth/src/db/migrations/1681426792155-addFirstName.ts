import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFirstName1681426792155 implements MigrationInterface {
    name = 'AddFirstName1681426792155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "firstName"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "firstName" TO "name"`);
    }

}
