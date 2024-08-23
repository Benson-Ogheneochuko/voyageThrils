import '../config/env'
import {app} from ".";

if (process.env.NODE_ENV !== 'production'){
  const port = process.env.PORT || 3000
  app.listen(port, ()=>{
    console.log('server running on port ' + port)
  })
}

export default app