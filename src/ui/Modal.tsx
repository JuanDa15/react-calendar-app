import { PropsWithChildren } from 'react';
import Modal from 'react-modal';
import useUiStore from '../hooks/ui-store-hook';
import useCalendarStore from '../hooks/calendar-hook';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
  },
};

Modal.setAppElement('#root');

export function ModalComponent({ children }: PropsWithChildren): JSX.Element {
  const { isModalOpen, closeModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore()

  const handleCloseModal = () => {
    setActiveEvent(null)
    closeModal()
  }
  return (
    <Modal
      isOpen={isModalOpen}
      style={customStyles}
      onRequestClose={handleCloseModal}
      contentLabel='Example Modal'
    >
      {children}
    </Modal>
  );
}
