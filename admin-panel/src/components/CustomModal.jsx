import { Modal } from 'antd';
import propTypes from "prop-types";

const CustomModal = (props) => {
    const { open, hideModal, performAction, title } = props;
    return (
        <Modal
            title="Modal"
            open={open}
            onOk={performAction}
            onCancel={hideModal}
            okText="OK"
            cancelText="Cancel"
        >
            <p>{title}</p>
        </Modal>
    )
};

CustomModal.propTypes = {
    open: propTypes.bool.isRequired,
    hideModal: propTypes.func.isRequired,
    performAction: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
}

export default CustomModal;
