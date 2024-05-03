import {Router} from 'express';
import ProvinceService from './../services/province-service.js';
import Province from './../entities/province.js';
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllSync();
    if (returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else {
        respuesta = res.status(500).send('Error interno.');
    }
    return respuesta;
});

router.get('/:id', async (req, res) => {
    let respuesta;
    const returnObject = await svc.getByIdSync(req.params.id);
    if (returnObject != null){
        respuesta = res.status(200).json(returnObject)
    }
    else {
        respuesta = res.status(404).send("Id no encontrado.");
    };
    return respuesta;
})

router.post('', async (req, res) => {
    let respuesta;
    const provincia = new Province(req.body.name, req.body.full_name, req.body.latitude, req.body.longitude, req.body.display_order);
    const response = await svc.createAsync(provincia);
    if (response == 1){
        respuesta = res.status(201).send("Objeto creado.");
    }
    else if (response > 1){
        respuesta = res.status(400).send("Mas de un objeto creado.");
    }
    else if (response < 1){
        respuesta = res.status(400).send("No se creo el objeto.");
    }
    return respuesta;
})

router.put('', async (req, res) => {
    
})

router.delete('/:id', async (req, res) => {
    
})

export default router;