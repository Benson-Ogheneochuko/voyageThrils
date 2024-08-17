// import { config } from '../config/env.js';
import '../config/env.js';
import { app } from './index.js';
// const port = config.port;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
