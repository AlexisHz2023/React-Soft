import React from 'react'
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";





const Eleccion = () => {


  const redirigir = () => {
   


  };



  return (
    
    <div className='overflow-hidden'>
      <div  className='absolute  bg-white p-10 rounded-lg w-full md:w-[55%] h-[85%] left-[5%] top-[5%] z-20 shadow-lg shadow-slate-500 overflow-hidden'  >
        <img src="./imagenes/Logo.PNG" className='w-[200px] h-[50px]'/>
        <h1 className='relative -right-[55%] text-4xl font-sans -top-[50px] text-primary'>Menú de  elección</h1>
         <img src="./imagenes/coffe.svg" className='' />
      </div>


      <div className="Tercer_Cuadro absolute z-10 bg-white top-[10%] w-[35rem] h-[75%] left-[50%] rounded-lg transition-transform ease-in-out transform-gpu hover:z-20 hover:scale-110  [#c4c4c4]]  shadow-lg shadow-slate-500 overflow-hidden">

        <h1 className='text-center text-5xl p-10 text-primary' >Bienvenido</h1>
        <p className='text-center p-7 text-4xl text-Third' >!Hola!, ¿Que Deseas Hacer?</p>
      
          
    <div className='p-3 relative'>

   
     <div className='bg-primary w-[150px] h-[140px] rounded-lg relative text-center text-white left-20 hover:bg-Third'  >



     <Link 
      to="/saldo"
      >Actualizar
      <GrUpdate className='py-0 relative top-7  left-14 text-center content-center text-4xl'
      /></Link>
     </div>

<div className='relative bg-primary w-[150px] left-72 text-white rounded-lg h-[140px] -top-[140px] text-center hover:bg-Third'>
<Link
     to="/actualizar"
     >Ver Saldo
    
     <TbReportMoney className='relative w-[150px] top-6 text-5xl'
     /></Link>


     

</div>

<div className='relative bg-primary hover:bg-orange-400 w-[25%] h-[3rem] left-44 text-white rounded-lg -top-[80px] text-center hover:scale-105 transition-all'>
<Link
     to="/"
     ><p className='relative text-center top-2 text-lg'>Volver</p>
     </Link>

</div>
</div>
        
      </div>
    </div>
  )
}

export default Eleccion
