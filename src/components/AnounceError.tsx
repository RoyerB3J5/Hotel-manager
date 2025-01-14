import React from 'react'

function AnounceError() {
  return (
    <section className="w-full bg-red-800 px-6 py-3 text-white text-p rounded-xl text-md shadow-lg ">  
      <h3> 
        El correo o contraseña ingresado es incorrecto, por favor ingrese de nuevo sus datos       
      </h3>
    </section>
  )
}

export default AnounceError