import styled from 'styled-components';

export const Container = styled('div')`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;

  padding: 2rem;
`;

export const Content = styled('section')`
  max-width: 620px;
  width: 100%;
  opacity: ${props => (!props.disabled ? 1 : 0.5)};
  font-size: ${props => (props.small ? '0.75rem' : 'inherit')};
`;

export const Title = styled('h1').attrs({
  className: 'title',
})``;

export const Help = styled('button')`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
`;

export const Balloon = styled('div')`
  position: absolute;
  bottom: 5rem;
  right: 4rem;
  margin-left: 1rem;
  z-index: 10;
`;
