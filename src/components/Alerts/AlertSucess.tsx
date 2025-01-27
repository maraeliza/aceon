import Swal from 'sweetalert2'

const AlertSucess = async (title: string, text: string) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    showConfirmButton: true,
    showCancelButton: false,
    showDenyButton: false,
  }).then(async (result) => {})
}

export default AlertSucess
