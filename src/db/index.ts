import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Initialize Neon connection
const sql = neon(process.env.DATABASE_URL!);

// Create Drizzle instance with schema
export const db = drizzle(sql, { schema });

// Export all schema tables and types for convenience
export * from './schema';

// Type helpers
export type Database = typeof db;
export type Transaction = Parameters<Parameters<Database['transaction']>[0]>[0];
