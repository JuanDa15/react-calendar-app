import { useDispatch, useSelector } from "react-redux";
import { AppStore, closeModal, openModal } from "../store";

export default function useUiStore() {
  const { isModalOpen } = useSelector((state: AppStore) => state.ui)
  const dispatch = useDispatch()

  const openModalFn = () => dispatch(openModal())
  const closeModalFn = () => dispatch(closeModal())
  return {
    isModalOpen,
    openModal: openModalFn,
    closeModal: closeModalFn,
  }
}