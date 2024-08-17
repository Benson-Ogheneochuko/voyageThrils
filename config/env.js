import { config as dotenvConfig } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const result = dotenvConfig({
    path: path.resolve(__dirname, '../.env'),
});
if (result.error) {
    throw result.error;
}
console.log('Environment variables loaded');
export const config = {
    port: process.env.PORT || 3000,
    // Add other environment variables as needed
};
