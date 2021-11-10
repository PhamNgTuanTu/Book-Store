import Swal from 'sweetalert2'
const modalError = (mes) => {
    return (
        Swal.fire({
            text: mes,
            icon: 'error',
            timer: 2000,
        })
    )
}
export default modalError;