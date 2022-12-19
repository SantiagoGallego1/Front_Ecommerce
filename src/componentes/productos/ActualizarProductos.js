import React,{ useEffect, useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from 'react-router-dom';
import crud from '../../conexiones/crud';
import swal from 'sweetalert';

const ActualizarProducto = () => {
  
  const navigate = useNavigate();

  const { idProducto} = useParams();

 const [producto, setProducto] = useState({
    nombre:'',
    imagen:'',
    stock:'',
    precio:'',
    descripcion
 })

 const cargarProducto = async () =>{
    const response = await crud.GET(`/api/productos/${idProducto}`);
    console.log(response);
    setProducto(response.producto);
 }

 useEffect(() =>{
  cargarProducto();
 },[]);

//console.log(categoria);

const {nombre, imagen,stock,precio,descripcion} = producto;

const onChange = (e) =>{
    setProducto({
        ...producto,
            [e.target.name]: e.target.value,
            [e.target.imagen]: e.target.value,
            [e.target.stock]: e.target.value,
            [e.target.precio]: e.target.value,
            [e.target.descripcion]: e.target.value
    })
};

const actualizarProductos = async () =>{
    const data ={
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        imagen: producto.imagen,
        stock: producto.stock,
        precio: producto.precio
    }
    const response = await crud.PUT(`/api/productos/${idProducto}`, data);
    const mensaje = "El producto se actualizo correctamente";
    swal({
        title:'Información',
        text: mensaje,
        icon: 'success',
        buttons:{
          confirm:{
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-primary',
            closeModal: true
          }
        }
      });
      navigate("/home-productos");
}

const onSubmit = (e) => {
    e.preventDefault();
    actualizarProductos();
}

  return (
    <>
      <Header/>
      <div className="md:flex md:min-h-screen bg-white">
        <Sidebar/>
        <main className="flex-1">
        <div className="mt-10 flex justify-center">
        <h1 className="inline bg-gradient-to-r from-black via-orange-700 to-black bg-clip-text font-display text-5xl tracking-tight text-transparent">
          Actualizar producto
        </h1>
        </div>

        <div className="mt-10 flex justify-center">
        <form 
        onSubmit={onSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
    >
      <div className="my-5">
        <label className="uppercase text-gray-600 block text-lx font-bold">Nombre del producto</label>
        <input 
        type="nombre"
        id="nombre"
        name="nombre"
        placeholder="Nombre"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={nombre}
        onChange={onChange}
        />
        <label className="uppercase text-gray-600 block text-lx font-bold">descripcion del producto</label>
        <input 
        type="text"
        id="descripcion"
        name="descripcion"
        placeholder="Descripcion"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={descripcion}
        onChange={onChange}
        />
        <label className="uppercase text-gray-600 block text-lx font-bold">Stock del producto</label>
        <input 
        type="number"
        id="stock"
        name="stock"
        placeholder="Stock"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={stock}
        onChange={onChange}
        />
        <label className="uppercase text-gray-600 block text-lx font-bold">Precio del producto</label>
        <input 
        type="text"
        id="precio"
        name="precio"
        placeholder="Precio"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={precio}
        onChange={onChange}
        />

        <label className="uppercase text-gray-600 block text-lx font-bold">Imagen del producto</label>
        <input 
        type="text"
        id="imagen"
        name="imagen"
        placeholder="Imagen"
        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
        value={imagen}
        onChange={onChange}
        />

       
      </div>
      <input 
          type="submit"
          value="Actualizar Categoria"
          className="bg-orange-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-orange-300 transition-colors"
      />

  </form>
        </div>

        </main>
        
     
      </div>
    
    
    </>
    );
}

export default ActualizarProducto;