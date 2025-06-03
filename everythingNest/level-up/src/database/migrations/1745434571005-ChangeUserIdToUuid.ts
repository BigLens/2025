import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserIdToUuid1745434571005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
          `);

    await queryRunner.query(`
            ALTER TABLE "user"
            ADD COLUMN "uuid" UUID DEFAULT uuid_generate_v4();
          `);

    await queryRunner.query(`
            UPDATE "user" SET "uuid" = uuid_generate_v4();
          `);

    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "user_pkey";
          `);

    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id";
          `);

    await queryRunner.query(`
            ALTER TABLE "user" RENAME COLUMN "uuid" TO "id";
          `);

    await queryRunner.query(`
            ALTER TABLE "user" ADD PRIMARY KEY ("id");
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "user_pkey";
          `);

    await queryRunner.query(`
            ALTER TABLE "user" ADD COLUMN "old_id" SERIAL;
          `);

    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id";
          `);

    await queryRunner.query(`
            ALTER TABLE "user" RENAME COLUMN "old_id" TO "id";
          `);

    await queryRunner.query(`
            ALTER TABLE "user" ADD PRIMARY KEY ("id");
          `);
  }
}
