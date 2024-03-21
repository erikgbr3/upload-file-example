  import bcrypt from 'bcrypt';
  import db from "database/models";
  
  
export default function handler(req, res) {
  switch(req.method) {

      case 'POST':
          return userUpdate(req, res);

      default:
          res.status(400).json({error: true, message: 'Petición errónea'});
  }
}


  const userUpdate = async (req, res) =>{
    try {

      if (!req.body.name) {
        return res.status(400).json({ message: 'El nombre es obligatorio.'});
      }

      if (!req.body.username) {
        return res.status(400).json({ message: 'El nombre de usuario es obligatorio.'});
      }

      if (!req.body.email) {
        return res.status(400).json({ message: 'El email es obligatorio.'});
      }

      // validar que venga la contraseña
      if (!req.body.password) {
        return res.status(400).json({ message: 'La contraseña es obligatoria.'});
      }

      const datosUsuario = {...req.body};

      // asegurar la contraseña
      // usar bcrypt
      // salt: generacion de una cadena aleatoria de N longitud
      const salt = await bcrypt.genSalt(10);

      // cifrar la contraseña y meterla en los datos del usuario
      datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);

      // registrar el usuario
      const user = await db.User.create(datosUsuario);

      user.password = null; // evitar enviarlo en la respuesta

      res.json({ message: 'El usuario ha sido registrado.', user});
    } catch (error) {
      console.log(error);
    
      let errors = [];
      if (error.errors) {
        errors = error.errors.map( errorItem => ({ 
          campo: errorItem.path,
          error: errorItem.message,
        }));
      }

      res.json({ error: true, message: 'Error al registrar el usuario', errors });
    }
  };