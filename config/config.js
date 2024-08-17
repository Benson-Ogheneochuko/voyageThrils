import dotenv from 'dotenv';
import path from 'path';
// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });
export const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY,
    // Add other environment variables here
};
// Type-safe function to get environment variables
export function getEnvVar(key) {
    const value = config[key];
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
}
// import { configDotenv } from 'dotenv';
// import path from 'path';
// const result = configDotenv({
//   path: path.resolve(__dirname, '../.env'),
// });
// if (result.error) {
//   throw result.error;
// }
// console.log('Environment variables loaded');
// // You can add any additional configuration logic here if needed
// export const config = {
//   port: process.env.PORT || 3000,
//   // Add other environment variables as needed
// };
