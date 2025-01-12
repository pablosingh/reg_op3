import sequelize from "./database/database.js";
import app from "./app.js";

import Holding from "./models/Holding.js";
import Operation from "./models/Operation.js";
import Cripto from "./models/Cripto.js";
import User from "./models/User.js";
import Task from "./models/Task.js";

import {
    initialCriptoLoadingCMC,
    initialCriptoLoadingCMCtwo,
    programarEjecucionDiaria,
} from "./controllers/criptos/initDBcmc.controllers.js";

User.hasMany(Holding, { foreinkey: "UserId" });
Holding.belongsTo(User, { foreignKey: "UserId" });

Holding.hasMany(Operation, { foreinkey: "HoldingId" });
Operation.belongsTo(Holding, { foreignKey: "HoldingId" });

Holding.hasMany(Task, { foreinkey: "HoldingId" });
Task.belongsTo(Holding, { foreinkey: "HoldingId" });

const port = process.env.PORT || 3001;
sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(port, async () => {
            console.log("Server on port ", port);
            // initialCriptoLoadingCMC();
            initialCriptoLoadingCMCtwo();
            programarEjecucionDiaria();
        });
    })
    .catch((e) => console.error(e));
