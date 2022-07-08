import React from 'react';



export const BuildForm = ({onSubmit}) => {
	return (
		<form onSubmit = {onSubmit}>
			<div className = "flex flex-col">
				<div className = "form-group">
					<label htmlFor = "name">Name</label>
					<input type = "text" className = "form-control" id = "name" placeholder = "Enter name"/>
				</div>
				<div className = "form-group">
					<label htmlFor = "dataType">Data Type</label>
					<select className = "form-control" id = "dataType">
						<option>String</option>
						<option>Number</option>
						<option>Boolean</option>
					</select>
				</div>
				<div className = "form-group">
					<button className = {'form-control btn btn-primary'} type = {"submit"}>Build</button>
				</div>
			</div>
		</form>
	);
}

export default BuildForm;