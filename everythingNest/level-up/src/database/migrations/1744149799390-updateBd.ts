import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBd1744149799390 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
                RENAME COLUMN "created_at" TO "createdAt";
            ALTER TABLE "user"
                ADD COLUMN "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            DROP COLUMN "createdAt"
            DROP COLUMN "updatedAt"
            `)
    }

}
