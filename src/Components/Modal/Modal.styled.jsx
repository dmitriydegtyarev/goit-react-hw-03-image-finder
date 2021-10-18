import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ImmageWrapper = styled.div`
  position: relative;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;

export const CloseBtn = styled.button`
  position: absolute;
  height: 20px;
  width: 20px;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
