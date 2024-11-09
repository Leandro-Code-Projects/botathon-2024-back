import { getPrivateEnvs } from "./config";
import app from "./app";

app.listen(getPrivateEnvs().port, () => {
  console.log(`Server is running on http://localhost:${getPrivateEnvs().port}`);
});
