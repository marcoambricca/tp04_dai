import express from "express";
import cors from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/front', express.static('public'));
app.use('/api/event', EventRouter);
app.use('/api/provinces', ProvinceRouter);
app.use('/api/user', UserRouter);
app.use(unknownEndpoint);

app.listen(port, () => {
    console.log(`"server" Listening on port ${port}`);
})

app.get('/api/province', (req, res) => {
    //Retorna array de provincias y status 200
});

app.get('/api/province', (req, res) => {
    let provinciaId = req.query.id;
    //Retorna status 200 y el objeto si lo encuentra, status 404 si no existe
});

app.post('/api/province', (req, res) => {
    //Inserta una provincia, retorna status 201. status 400 y el error en caso de existir algun error en reglas de negocio
});

app.put('/api/province' , (req, res) => {
    //Actualiza una provincia, retorna 201, 404 si no existe esa provincia y 400 si hay un error en reglas de negocio
});

app.delete('/api/province/{id}', (req, res) => {
    let provinciaId = req.query.id;
    //Borra una provincia y 200, 404 si no existe provincia con ese id
});