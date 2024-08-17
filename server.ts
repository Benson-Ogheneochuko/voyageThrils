import { config } from './config/env';
import { app } from './src/index';

const port = config.port;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});