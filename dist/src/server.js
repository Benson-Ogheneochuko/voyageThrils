import { config } from '../config/env.js';
import { app } from './index.js';
const port = config.port;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
