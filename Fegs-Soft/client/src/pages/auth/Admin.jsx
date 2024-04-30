import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Axios from 'axios';
import Menu from './Menu';

const Alerta = withReactContent(Swal);

const Admin = () => {
  const [Nombre, setNombre] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Usuario, setUsuario] = useState('');
  const [Clave, setClave] = useState('');
  const [Rol, setRol] = useState('');
  const [id, setId] = useState('0');
  const [imagen, setImagen] = useState(null);
  const [Editar, setEditar] = useState(false);
  const [usuariosList, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();

  }, []);

  const handleImagenChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file instanceof Blob) {
        const imageUrl = URL.createObjectURL(file);
    
        setImagen(imageUrl);
      } else {
        console.error('El archivo seleccionado no es un Blob válido.');
      }
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  }

  

  const createObjectURLAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
  
  const add = () => {
    // Enviar la imagen directamente al servidor
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Correo: Correo,
      Usuario: Usuario,
      Clave: Clave,
      Rol: Rol,
      Imagen: imagen // Pasar el Blob directamente
    })
      .then(() => {
        getUsuarios();
        LimpiarCampos();
        Alerta.fire({
          title: <strong>Creado Correctamente</strong>,
          html: <i>El usuario {Nombre} fue registrado con éxito</i>,
          icon: "success",
          timer: 3000000
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          footer:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "intente mas tarde"
              : JSON.parse(JSON.stringify(error)).message
        });
      });
  };

    const update = ()=>{
      Axios.put("http://localhost:3001/update",{
          id:id,
          Nombre:Nombre,
          Correo:Correo,
          Usuario:Usuario,
          Rol:Rol
      }).then(()=>{
        getUsuarios();
        LimpiarCampos();


        Alerta.fire({
          title: <strong>Actualizado Correctamente</strong>,
          html: <i>El usuario {Nombre} fue actualizado con éxito</i>,
          icon: "info",
          timer:3000
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"intente mas tarde":JSON.parse(JSON.stringify(error)).message
          });
        });
        
      });
  }


  const deleteUsuario = (val)=>{

    Swal.fire({
      title: "Confirmar eliminacion?",
      html: "<i>Esta Seguro de eliminar a <strong>"+val.Nombre+"</strong></i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Elimarlo"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
          getUsuarios();
          LimpiarCampos();
          Alerta.fire({
            icon: "success",
            title: val.Nombre+" Fue Eliminado.",
            showConfirmButton: false,
            timer: 2000
          });
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo Eliminar!",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"intente mas tarde":JSON.parse(JSON.stringify(error)).message
          });
        });
       
      }
    });

}

        const LimpiarCampos = ()=> {
          setNombre("");
          setCorreo("");
          setUsuario("");
          setClave("");
          setRol("");
          setEditar(false)
        }
       
       const EditarUsuario = (val)=>{
        setEditar(true);

        setNombre(val.Nombre);
        setCorreo(val.Correo);
        setUsuario(val.Usuario);
        setRol(val.Rol);
        setId(val.id)
       }


    const getUsuarios = ()=>{
        Axios.get("http://localhost:3001/usuarios").then((response)=>{
           setUsuarios(response.data);
        });
    }
    
    getUsuarios();

  return (
    <div className='absolute bg-white py-4 top-10 w-[95%] left-[2%] border-2 border-blue-500 z-20 h-[90%] rounded-lg overflow-auto'>
   
           <Menu />
           <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 top-20 relative">
           <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0">
            </div>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-gray-100 shadow-2xl border-2 border-primary rounded-lg">
            <p className="text-xl font-bold leading-tight tracking-tight text-Third md:text-2xl">
              Formulario de Registro
              </p><div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nombre
                </label>
                <input 
                value={Nombre}
                type="text"
                onChange={(event)=> {
                  setNombre(event.target.value);
                }}
                placeholder="Ingrese Su Nombre" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" id="username" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Usuario
                </label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                placeholder="Ingrese Una contraseña" 
                value={Usuario}
                type="text"
                onChange={(event)=> {
                  setUsuario(event.target.value);
                }}
                />
              </div>
              <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
              Correo
                </label>
                <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                placeholder="Correo" 
                value={Correo}
                type="email"
                onChange={(event)=> {
                  setCorreo(event.target.value);
                 }} />
              </div>
              <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
              Contraseña
                </label>
                <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                placeholder="*********" 
                value={Clave}
                type="text"
                onChange={(event)=> {
                  setClave(event.target.value);
                 }} />
              </div>
              <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
              Rol
                </label>
                <input 
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" 
                placeholder="Ingrese  el rol del usuario" 
                value={Rol}
                type="text"
                onChange={(event)=> {
                  setRol(event.target.value);
                 }} />
              </div>
              <div>
      <label className='' htmlFor="ImagenInput">
        Selecciona una imagen</label> <br /> <br />
      <input 
        type="file"
        onChange={handleImagenChange}
        id="ImagenInput" 
        name='imagen' 
      />
      {imagen && (
        <div>
          <p>Imagen seleccionada</p>
          <img src={imagen}  alt="Imagen Seleccionada" />
        </div>
      )}
    </div>
            
              <div className='flex items-start'>
              </div>
              {

                
          Editar?
          <div>
  
            
          <button onClick={update}  className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   text-white">Actualizar</button> 
          <button onClick={LimpiarCampos}  className="w-full bg-blue-500 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 top-4 relative text-center   text-white">Cancelar</button>
          </div>
          :<button onClick={add} className="w-full bg-blue-400 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   text-white">Registrar</button>
        }
              </div>
           </div>
       
<div>
  <table className='w-[80%] relative left-36 z-10 border-collapse rounded-lg border-gray-300 top-[10rem]  '>
  <thead className='bg-primary border-b-2 border-gray-200 '>
    <tr className='relative h-[50px] text-white'>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-left'>#</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-center'>Imagen</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-left'>Nombre</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-left'>Correo</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-left'>Usuario</th>
      <th className='w-20 p-3 text-sm font-semibold  tracking-wide text-center'>Rol</th>
      <th className='w-20 p-3 tracking-wide text-center bg-primary  text-sm font-semibold  '>Acciones</th>
    </tr>
  </thead>
  <tbody className='bg-gray-200'>
  {usuariosList.map((val) => {
    return (
      <tr key={val.id} className='bg-white'>
        <td className='p-3 text-sm whitespace-nowrap font-bold text-blue-500 hover:underline'>{val.id}</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold hover:underline'>
  {val.Imagen ? <img src={val.Imagen} alt="Imagen" /> : 'Sin imagen'}
</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold  hover:underline'>{val.Nombre}</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold  hover:underline'>{val.Correo}</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold  hover:underline'>{val.Usuario}</td>
        <td className='p-3 text-sm whitespace-nowrap font-bold text-blue-500 hover:underline'><h1 className='bg-primary rounded text-white text-center'>{val.Rol}</h1></td>
        <td className=''>
          <div className='flex' role="group" aria-label="Basic example">
            <button
              type='button'
              onClick={() => {
                EditarUsuario(val);
              }}
              className='focus:outline-none focus:shadow-outline bg-emerald-500  hover:bg-emerald-600 text-white font-bold py-4 px-4 left-10 relative rounded mr-2'
            >
              Editar
            </button>
            <button
              type='button'
              onClick={() => {
                deleteUsuario(val);
              }}
              className='focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 left-14  relative rounded'
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
</table>
</div>
    </div>
  )
}

export default Admin