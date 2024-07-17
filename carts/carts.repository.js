const {conectionMongoose} = require('../config/connection.mongodb')
const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({
    product_id: {type: conectionMongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    cantidad: {type: Number, required: true}
})
const cartSchema = new mongoose.Schema({
    user_id: {type: conectionMongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    items: [cartItemSchema]
})

const Cart = conectionMongoose.model('Cart', cartSchema)


const obtenerOCrearCarrito = async (user_id) => {
    try{
        let carrito = await Cart.findOne({user_id: user_id})
        if(!carrito){
            carrito = new Cart({user_id: user_id, items: []})
            await carrito.save()
        }
        return carrito
    }
    catch (error) {
        console.error("MONGO_DB_ERROR al obetener o crear un carrito", error)
        throw { status: 500, message: "INTERNAL SERVER ERROR" }
    }
}


const agregarAlCarrito = async (cart_id, product_id, cantidad) =>{
    try{
        let carrito = await Cart.findById(cart_id)
        if(!carrito){
            throw {status: 404, message: 'carrito no encontrado'}
        }
        const itemIndex = carrito.items.findIndex((item ) => {
            return item.product_id.equals(product_id)
        })
        if(itemIndex === -1){
            carrito.items.push({product_id: product_id, cantidad: cantidad})
        }
        else{
            carrito.items[itemIndex].cantidad += cantidad
        }
        await carrito.save()
    }
    catch(error){
        console.error("MONGO_DB_ERROR al obetener o crear un carrito", error)
        throw { status: 500, message: "INTERNAL SERVER ERROR" }
    }   
} 


 
const obtenerCarritoDetallado = async (cart_id) =>{
    try{
        const carrito = await Cart.findById(cart_id).populate('items.product_id')
        if(!carrito){
            throw {status: 404, message: 'carrito no encontrado'}
        }
        return carrito
    }
    catch(error){
        console.error("MONGO_DB_ERROR al obetener o crear un carrito", error)
        throw { status: 500, message: "INTERNAL SERVER ERROR" }
    }
}


const eliminarProductoDelCarrito = async ( cart_id, product_id ) => {
    try{
        const carrito = await Cart.findById(cart_id)
        if(!carrito){
            throw {status: 404, message: 'carrito no encontrado'}
        }
        carrito.items = carrito.items.filter((item) => !item.product_id.equals(product_id))
        await carrito.save()
    }
    catch(error){
        console.error("MONGO_DB_ERROR al obetener o crear un carrito", error)
        throw { status: 500, message: "INTERNAL SERVER ERROR" }
    }
}




module.exports = {obtenerOCrearCarrito, agregarAlCarrito, obtenerCarritoDetallado, eliminarProductoDelCarrito}