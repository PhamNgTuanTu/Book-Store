import Swal from 'sweetalert2'
const modalSuccess = (mes) => {
    return (
        Swal.fire({
            text: mes,
            icon: 'success',
            timer: 2000,
        })
    )
}
export default modalSuccess;