import React from 'react';

export const ModalTriggerButton = ({triggerID, buttonRef, showModal, onSubmit}) => {
	return (
		<button
			className = {'btn btn-lg btn-danger right modal-button'}
			type = {"button"}
			ref = {buttonRef}
			onClick = {showModal}
		>
			Build
		</button>
	);
}

export default ModalTriggerButton;