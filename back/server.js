const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fullstack'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL.');
});

// Registro de usuario
app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: 'Error al hashear la contraseña.' });

        const sql = 'INSERT INTO users (email, password, estado) VALUES (?, ?, ?)';
        db.query(sql, [email, hash, 0], (error) => {
            if (error) {
                console.error('Error al registrar el usuario:', error);
                return res.status(400).json({ message: 'Error al registrar el usuario.' });
            }
            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        });
    });
});


// Inicio de sesión
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT id, email, password, estado FROM users WHERE email = ?';

    db.query(sql, [email], (error, results) => {
        if (error) {
            console.error('Error en el inicio de sesión:', error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            const user = results[0];
            // Verificar la contraseña usando bcrypt
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (isPasswordValid) {
                res.json({ message: 'Inicio de sesión exitoso', estado: user.estado });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    });
});



// Agregar producto
app.post('/api/productos', (req, res) => {
    const { nombre, marca, inventario, valor, vendido } = req.body;

    const sql = 'INSERT INTO productos (nombre, marca, inventario, valor, vendido) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, marca, inventario, valor, vendido], (error) => {
        if (error) {
            console.error('Error al agregar el producto:', error);
            return res.status(400).json({ message: 'Error al agregar el producto.' });
        }
        res.status(201).json({ message: 'Producto agregado exitosamente.' });
    });
});

// Obtener productos
app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos', (error, results) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            return res.status(500).json({ message: 'Error al obtener productos.', error: error.message });
        }
        res.json(results);
    });
});

// Editar producto
app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, inventario, valor, vendido } = req.body;

    const sql = 'UPDATE productos SET nombre = ?, inventario = ?, valor = ?, vendido = ? WHERE id = ?';
    db.query(sql, [nombre, inventario, valor, vendido, id], (error, results) => {
        if (error) {
            console.error('Error al editar el producto:', error);
            return res.status(400).json({ message: 'Error al editar el producto.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.json({ message: 'Producto editado exitosamente.' });
    });
});

// Eliminar producto
app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;

    // Primero, obtenemos el producto para almacenarlo en la tabla de productos eliminados
    db.query('SELECT * FROM productos WHERE id = ?', [id], (error, results) => {
        if (error || results.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }

        const product = results[0];

        // Insertamos el producto en la tabla de productos eliminados
        db.query('INSERT INTO productos_eliminados (nombre, marca, inventario, valor, vendido) VALUES (?, ?, ?, ?, ?)', 
            [product.nombre, product.marca, product.inventario, product.valor, product.vendido], 
            (err) => {
                if (err) {
                    console.error('Error al agregar el producto a la tabla de eliminados:', err);
                    return res.status(500).json({ message: 'Error al registrar el producto eliminado.' });
                }

                // Ahora eliminamos el producto de la tabla original
                db.query('DELETE FROM productos WHERE id = ?', [id], (deleteError) => {
                    if (deleteError) {
                        console.error('Error al eliminar el producto:', deleteError);
                        return res.status(500).json({ message: 'Error al eliminar el producto.' });
                    }
                    res.json({ message: 'Producto eliminado exitosamente.' });
                });
            });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});