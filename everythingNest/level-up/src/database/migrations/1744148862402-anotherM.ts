import { MigrationInterface, QueryRunner } from 'typeorm';

export class AnotherM1744148862402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" 
            ADD COLUMN "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
