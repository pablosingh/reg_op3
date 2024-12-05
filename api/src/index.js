import sequelize from "./database/database.js";
import app from "./app.js";

const port = process.env.PORT || 3001;
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, async () => {
      console.log("Server on port ", port);
      //   initialCriptoLoadingCMC();
      //   programarEjecucionDiaria();
    });
  })
  .catch((e) => console.error(e));
