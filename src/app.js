import express from 'express';
import productRouter from '../src/routers/products.router.js';
import routerCar from './routers/carts.router.js';

const app = express()

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// Router de carritos
app.use('/api/carts', routerCar)

// Router de productos
app.use('/api/products', productRouter)


app.listen(8080, () => {
    console.log('Estoy escuchando el puerto 8080');
});
