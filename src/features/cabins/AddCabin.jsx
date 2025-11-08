import Button from '../../ui/Button'
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal"

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button variations="primary" sizes="medium">Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false)

//   return (
//     <div>
//       <Button variations="primary" sizes="medium" onClick={() => setIsOpenModal((show) => !show)}>Add new Cabin</Button>
//       {isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
//         <CreateCabinForm onClose={() => setIsOpenModal(false)} />
//       </Modal>}
//     </div>
//   )
// }

export default AddCabin
