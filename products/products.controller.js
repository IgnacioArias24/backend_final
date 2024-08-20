const { crearProducto, obtenerProductoPorId, eliminarProductoPorId, buscarProductos } = require("./products.service")




const postProductController = async (req, res) =>{
    try{
        const result = await crearProducto(req.body)
        res.status(200).json(result)
    }
    catch(error){

        res.status(error.status).json(error)
    }
}

const getProductByIdController = async (req, res) => {
    try{
        const {pid} = req.params
        const result = await obtenerProductoPorId(pid)
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}


const updateProductController = async (req, res) => {
    try{
        const {pid} = req.params
        const result = await actualizarProductoPorId(pid, req.body)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(error.status).json(error)
    }
}
 

const deleteProductByIdController = async (req, res)=>{
    try{
        const{pid} = req.params //obtenemos el producto por id
        const result = await eliminarProductoPorId (pid)
        res.status(200).json(result)
    }
    catch(error){
        
        res.status(error.status).json(error)
    }
}

const getAllProducts = async (req, res) => {
    try{
        const result = await buscarProductos()
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}


module.exports = {updateProductController, postProductController, getProductByIdController, deleteProductByIdController, getAllProducts}