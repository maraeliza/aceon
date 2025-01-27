import Swal from 'sweetalert2'

const AlertDelete = async (
  deleteItem: (id: number) => Promise<boolean>,
  idItem: number,
  name: string,
) => {
  Swal.fire({
    title: `Deletar ${name}?`,
    text: 'Tem certeza que deseja apagar esse item?\n Isso não pode ser desfeito! ',
    icon: 'warning',
    showConfirmButton: false,
    showCancelButton: true,
    showDenyButton: true,
    denyButtonText: 'Sim, tenho certeza!',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isDenied) {
      const success = await deleteItem(idItem)
      if (success) {
        Swal.fire('Deletado!', `${name} foi deletado com sucesso.`, 'success')
      } else {
       
      }
    }
  })
}

export default AlertDelete
