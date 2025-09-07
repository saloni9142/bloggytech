import React from 'react'
import Swal from 'sweetalert2'
const ErrorMsg =({msg})=>{
    Swal.fire({icon:"error",title:"Oops...",text:msg}); 
}


export default ErrorMsg