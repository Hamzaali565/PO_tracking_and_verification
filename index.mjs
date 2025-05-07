

import { app } from "./src/app.mjs";
import { dbConfig } from "./src/Database/db.config.mjs";

dbConfig().then(() => {

  app.listen(3001, () => {
    console.log("server listen at port 3001");
  });
}).catch((error) => {
  console.log("database connection issue with error", error);

})
