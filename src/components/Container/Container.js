import React, {Component}    from 'react';
import {Strategy, changeRed} from '../Strategy/Strategy';
import {BuildTrigger}        from '../../modals/buttons/buildbutton/BuildTrigger';
import {BuildForm}           from '../../modals/form/BuildForm';
import ModalTriggerButton    from '../../modals/buttons/modaltrigger/ModalTriggerButton';



export class Container extends Component {
	state = {isShown: false};

	showModal = () => {
		this.setState({isShown: true}, () => {
			this.closeModal = this.closeModal.bind(this);
			this.closeButton.focus();
		});
		this.toggleScrollLock();
	};

	onCloseModal = () => {
		this.setState({isShown: false});
		this.toggleScrollLock();

	}

	onClickOutside = (e) => {
		if (this.modalRef && !this.modalRef.contains(e.target)) {
			this.onCloseModal();
		}
	}

	onKeyDown = (e) => {
		if (e.key === 'Escape') {
			this.onCloseModal();
		}

		else {
			switch (e.key) {
				case 'Enter': {

					break;
				}
				case 'ArrowUp': {

					break;
				}
				case 'ArrowDown': {

					break;
				}
				default:
					break;
			}
		}
	}

	toggleScrollLock = () => {
		document.querySelector('html').classList.toggle('scroll-lock');
	}


	render() {
		return (
			<React.Fragment>
				<BuildTrigger triggerID = "bar" buttonRef = {this.buttonRef} showModal = {this.showModal} onSubmit = {this.onSubmit}/>
				{this.state.isShown ? (
					<BuildForm
						onSubmit = {this.onSubmit}
						onCloseModal = {this.onCloseModal}
						onClickOutside = {this.onClickOutside}
						onKeyDown = {this.onKeyDown}
					/>
				) : null}
			</React.Fragment>
		)
	}
}



export default Container;