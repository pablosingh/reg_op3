import express from "express";
import criptoRoutes from "./routes/cripto.routes.js";
import holdingRoutes from "./routes/holdings.routes.js";
import operationsRoutes from "./routes/operations.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import usersRoutes from "./routes/users.routes.js";
import cors from "cors";

const app = express();

// app.options("*", (req, res) => {
//     res.sendStatus(200); // Respuesta para solicitudes preflight
// });

app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept",
//     );
//     res.header(
//         "Access-Control-Allow-Methods",
//         "GET, POST, OPTIONS, PUT, DELETE",
//     );
//     next();
// });

app.use(criptoRoutes);
app.use(holdingRoutes);
app.use(operationsRoutes);
app.use(tasksRoutes);
app.use(usersRoutes);

export default app;
