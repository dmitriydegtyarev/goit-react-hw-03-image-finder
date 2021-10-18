import { Component } from 'react';
import { createPortal } from 'react-dom';
import { GrFormClose } from 'react-icons/gr';

import { Overlay, ImmageWrapper, CloseBtn } from './Modal.styled';

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
      <Overlay onClick={this.handleBackdropClick}>
        <ImmageWrapper>
          <img src={this.props.src} alt={this.props.alt} />
          <CloseBtn type="button" onClick={this.props.onClick}>
            <GrFormClose />
          </CloseBtn>
        </ImmageWrapper>
      </Overlay>,
      modalRoot,
    );
  }
}
