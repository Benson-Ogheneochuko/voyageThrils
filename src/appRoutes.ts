import { Router } from "express";
export const appRouter = Router()

import { authRoute, authRouter } from "./authModules";
import { userRoute, userRouter } from "./usersModules";

appRouter.use(authRoute, authRouter)
appRouter.use(userRoute, userRouter)

export default appRouter

// {
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "dev": "NODE_OPTIONS='--experimental-specifier-resolution=node --loader ts-node/esm' tsx watch src/server.ts",
//     "build": "tsc && tsc-alias && cp .env dist/.env",
//     "postbuild": "node fix-imports.js",
//     "start": "NODE_OPTIONS='--experimental-specifier-resolution=node' node dist/src/server.js"
//   },
//   "type": "module"
// }