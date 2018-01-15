import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  height: 30px;
  text-align: center;
  width: 130px;
  border-radius: 40px;
  background: #fff;
  border: 2px solid #1ECD97;
  color: #1ECD97;
  letter-spacing: 1px;
  text-shadow: 0;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
  margin: 5px 0;

  &:hover {
    color: white;
    background: #1ECD97;
  }
`;

export default Button;