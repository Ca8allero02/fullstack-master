import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Producto = ({ userProfile }) => {
    const [productos, guardarProductos] = useState([]);
    const [nuevoProducto, guardarNuevoProducto] = useState({
        nombre: '',
        marca: '',
        inventario: '',
        valor: '',
        vendido: ''
    });
    const [mensaje, guardarMensaje] = useState('');
    const [editado, guardarEditado] = useState(false);
    const [idProductoEditando, setIdProductoEditando] = useState(null);

    const recuperarProductos = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/productos');
            guardarProductos(response.data);
        } catch (error) {
            console.error('Error al cargar productos:', error);
            guardarMensaje('Error al cargar productos.');
        }
    };

    useEffect(() => {
        recuperarProductos();
    }, []);

    const cambioEnProducto = (e) => {
        const { name, value } = e.target;
        guardarNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const editarProducto = (product) => {
        guardarNuevoProducto({
            nombre: product.nombre,
            inventario: product.inventario,
            valor: product.valor,
            vendido: product.vendido
        });
        setIdProductoEditando(product.id);
        guardarEditado(true);
    };

    const anadirProducto = async (e) => {
        e.preventDefault();
        try {
            if (editado) {
                const response = await axios.put(`http://localhost:3001/api/productos/${idProductoEditando}`, nuevoProducto);
                guardarMensaje(response.data.mensaje);
                guardarEditado(false);
                setIdProductoEditando(null);
            } else {
                const response = await axios.post('http://localhost:3001/api/productos', nuevoProducto);
                guardarMensaje(response.data.mensaje);
            }
            guardarNuevoProducto({ nombre: '', marca: '', inventario: '', valor: '', vendido: '' });
            recuperarProductos();
        } catch (error) {
            console.error('Error al agregar o editar producto:', error);
            guardarMensaje(error.response ? error.response.data.mensaje : 'Error de conexión');
        }
    };

    const eliminarProducto = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/productos/${id}`);
            guardarMensaje(response.data.mensaje);
            recuperarProductos();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            guardarMensaje(error.response ? error.response.data.mensaje : 'Error de conexión');
        }
    };

    return (
        <div className="producto-container">
            <div className="form-section">
                <h1>{editado ? 'Editar Producto' : 'Agregar Producto'}</h1>
                <form onSubmit={anadirProducto}>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={nuevoProducto.nombre}
                        onChange={cambioEnProducto}
                        required
                    />
                    <input
                        type="text"
                        name="marca"
                        placeholder="Marca"
                        value={nuevoProducto.marca}
                        onChange={cambioEnProducto}
                        required
                    />
                    <input
                        type="number"
                        name="inventario"
                        placeholder="Inventario"
                        value={nuevoProducto.inventario}
                        onChange={cambioEnProducto}
                        required
                    />
                    <input
                        type="number"
                        name="valor"
                        placeholder="Valor"
                        value={nuevoProducto.valor}
                        onChange={cambioEnProducto}
                        required
                    />
                    <input
                        type="number"
                        name="vendido"
                        placeholder="Vendidos"
                        value={nuevoProducto.vendido}
                        onChange={cambioEnProducto}
                        required
                    />
                    <button type="submit">{editado ? 'Actualizar Producto' : 'Agregar Producto'}</button>
                </form>
                {mensaje && <p>{mensaje}</p>}
            </div>
            <div className="table-section">
                <h2>Lista de Productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Inventario</th>
                            <th>Valor</th>
                            <th>Vendidos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((product, index) => (
                            <tr key={index}>
                                <td>{product.nombre}</td>
                                <td>{product.marca}</td>
                                <td>{product.inventario}</td>
                                <td>{product.valor}</td>
                                <td>{product.vendido}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="button-edit" onClick={() => editarProducto(product)}>Editar</button>
                                        <button className="button-delete" onClick={() => eliminarProducto(product.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Producto;