import React from 'react'
import { Link } from 'react-router-dom'

const Actualizar = () => {
  return ( 
    <div className='font-sans absolute w-[62rem] bg-white h-[550px] rounded-xl right-[400px]  <button class="bg-gray-500 shadow-lg shadow-gray-500/50 font-sans	'>
      <img className='text-center absolute left-[25px] top-[20px] w-[215px] h-[55px]' src='../imagenes/Logo.png' ></img>
      <p className='text-center py-14 font-sans	text-Third text-5xl'>Ingrese Sus Datos</p>
      
      <div className='text-center'>
      <form action='/submi' method='post'>
        <label></label>
        <br></br>
        <select className='bg-primary text-white w-[330px] h-[50px] rounded-xl' id="tipoDocumento" name="tipoDocumento" required>
            <option value="" disabled selected>Selecciona el tipo de documento</option>
            <option value="DNI">Cedula Extranjera</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Cédula">Cédula Ciudadania</option>
       </select>
          <br></br>
       <label></label>
       <input className='bg-white w-[400px] h-[50px] border-4 relative top-4 border-4 border-indigo-200 border-x-indigo-500 rounded-lg' type="number" placeholder='Numero De Documento' id="numeroDocumento" name="numeroDocumento" required/>  

      </form>
      </div>

      <input className='bg-primary text-white w-[140px] h-[50px] text-2xl absolute text-center left-[460px] top-[325px] rounded-lg' type="submit" value="enviar"></input>
      
      <div className='relative bg-primary left-[300px] w-[140px] top-[50px] h-[50px] rounded-lg text-center'>
        <Link
        to="/"
        ><p className='relative text-center py-2 text-2xl text-white'>Volver</p>
        </Link>
      </div>
    </div>
  )
  
}


export default Actualizar
