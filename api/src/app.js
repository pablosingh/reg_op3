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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Origen permitido
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
    ); // Métodos permitidos
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
    ); // Cabeceras permitidas
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Permitir cookies y credenciales
    next();
});

const corsOptions = {
    origin: "http://localhost:3000",
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.options("*", cors(corsOptions));

// app.options("*", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, OPTIONS",
//     );
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.sendStatus(200);
// });
app.use(cors(corsOptions));
app.use(criptoRoutes);
app.use(holdingRoutes);
app.use(operationsRoutes);
app.use(tasksRoutes);
app.use(usersRoutes);

export default app;
