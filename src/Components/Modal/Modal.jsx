import { Component } from 'react';
import { createPortal } from 'react-dom';
import { GrFormClose } from 'react-icons/gr';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClick();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClick();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return createPortal(
      <div className="Overlay">
        <div className="Modal">
          <img src="" alt="" />
          <button type="button" onClick={this.props.onClick()}>
            <GrFormClose />
          </button>
        </div>
      </div>,
      modalRoot,
    );
  }
}
