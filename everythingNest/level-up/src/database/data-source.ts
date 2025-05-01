import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { globSync } from 'glob';

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const dataSource = new DataSource({
  type: (process.env.DB_TYPE as 'postgres') || 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT!,
  entities: globSync(process.env.DB_ENTITIES || 'src/**/*.entity.{ts,js}'),
  migrations: globSync(
    process.env.DB_MIGRATIONS || 'src/database/migrations/*.{ts,js}',
  ),
  synchronize: false,
  migrationsTableName: 'migrations',
  ssl: process.env.DB_SSL === 'true',
});

export async function dataSourceInit() {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
}
export default dataSource;
