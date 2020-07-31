import React from 'react';

import './Box.style.sass';

class Box extends React.Component {
	componentDidMount() {
		document.getElementById(this.props.id).focus();
	}
	
	destroyBox() {
		return this.props.removeBox(this.props.id);
	}
	
	handleKeyControl = (event) => {
		if(this.props.isKeyControlDisabled) {
			return;
		}

		if(event.keyCode === 46) {
			return this.destroyBox();
		}

		let steps;
		let direction;
		
		switch(event.keyCode) {
			case 87:
				direction = 'top';
				steps = -1;
				break;
			case 83:
				direction = 'top';
				steps = 1;
				break;
			case 65:
				direction = 'left';
				steps = -1;
				break;
			case 68:
				direction = 'left';
				steps = 1;
				break;
			default:
				return;
		}

		const parentDiv = document.getElementsByClassName('playarea__container')[0];
		
		const initialDistance = parseInt(
			window.getComputedStyle(event.target).getPropertyValue(direction)
		) || 1;

		if ((initialDistance + steps) >= 0) {
			if(steps > 0 && direction === 'top' && !((initialDistance + steps) < (parentDiv.offsetHeight - event.target.offsetHeight))) {
				return;
			}

			if(steps > 0 && direction === 'left' && !((initialDistance + steps) < (parentDiv.offsetWidth - event.target.offsetWidth))) {
				return;
			}
			event.target.style[direction] = `${initialDistance + steps}px`; 
		}

		return;
	}

	render() {
		return (
			<div 
				className="box"
				id={ this.props.id } 
				onKeyDown={ this.handleKeyControl } 
				tabIndex={ this.props.id }>
				<button 
					title="Remove Box"
					className="box__button" 
					onClick={ () => this.destroyBox() }
				>&times;</button>
			</div>
		);
	}
}

export default Box;