import React from 'react';



export const BuildTrigger = ({triggerID, buttonRef, showModal, onSubmit}) => {
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
};

export default BuildTrigger;