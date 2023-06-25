import { Router } from "express";
import ProductManager from "../DAO/productManager.js";


const router = Router();
const pm = new ProductManager();


// ****************** GET ****************** //

router.get('/', async (req, res) => {
    // http://localhost:8080/products?limit=2
    const { limit } = req.query
    try {
        const valueReturned = await pm.getProducts()
        if (valueReturned.error) return res.status(200).send({ status: 'Sin productos', valueReturned })
        const limitProduts = valueReturned.slice(0, limit)
        res.status(200).send({ status: 'Productos', limitProduts })
    }
    catch (err) {
        res.status(400).send({ status: 'error router', err })
    }

})

router.get('/:pid', async (req, res) => {
    try {
        // http://localhost:8080/products/2
        console.log(req.params.pid);

        const product = await pm.getProductById(req.params.pid)
        res.status(200).send({product})
    }
    catch (err) {
        console.log(err);
    }

})

// ****************** POST ****************** //

router.post('/', async (req, res) => {
    try {
        // Obtenemos el body
        const productSend = req.body

        // Comprobamos que todos los campos estén completos
        const campoVacio = Object.values(productSend).find(value => value === '')
        console.log(campoVacio);
        if (campoVacio) {
            return res.status(400).send({ status: "error", message: "Falta completar algún campo" })
        }
        // desestructuración para enviar al método addProduct
        const {
            title,
            description,
            price,
            status,
            thumbnail,
            code,
            stock
        } = productSend



        const valueReturned = await pm.addProduct(title, description, price, status, thumbnail, code, stock)
        console.log(valueReturned)
        // Si addProduct devuelve un objeto con la propiedad error quiere decir que hay un error
        if (valueReturned.status === 'error') return res.status(400).send({ valueReturned })
        res.status(200).send({ productSend })
    }
    catch (err) {
        console.log(err);
    }

});


// ****************** PUT ****************** //

router.put('/:pid', async (req, res) => {
    try {
        // Datos obtenidos desde el cliente
        const { pid } = req.params
        const productUpdate = req.body

        const updateProduct = await pm.updateProduct(pid, productUpdate)
        if (!updateProduct.error) return res.status(400).send({ updateProduct })
        res.send({ updateProduct })
    }
    catch (err) {
        console.log(err);
    }

});

// ****************** DELETE ****************** //

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const response = await pm.deleteProduct(pid)
        console.log(response)
        if (!response.error) return res.status(400).send({ response })
        res.status(200).send({ response })
    }
    catch (err) {
        console.log(err);
    }

});

export default router

