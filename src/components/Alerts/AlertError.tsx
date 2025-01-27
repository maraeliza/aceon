import Swal from 'sweetalert2'

const AlertError = async (title: string, text: string) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    showConfirmButton: true,
    showCancelButton: false,
    showDenyButton: false,
  }).then(async (result) => {})
}

export default AlertError
