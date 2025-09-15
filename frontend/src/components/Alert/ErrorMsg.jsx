import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'
import { resetErrorAction } from '../../redux/slices/globalSlice/globalSlice';
const ErrorMsg =({msg})=>{
    const dispatch = useDispatch();
    Swal.fire({icon:"error",title:"Oops...",text:msg}); 
    dispatch(resetErrorAction());
}


export default ErrorMsg