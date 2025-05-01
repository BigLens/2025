import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseandUserMigration1744144805791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
              "id" SERIAL PRIMARY KEY,
              "email" VARCHAR NOT NULL,
              "password" VARCHAR NOT NULL,
            );
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
