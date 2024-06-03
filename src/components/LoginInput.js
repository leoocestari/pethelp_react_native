import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
width: 100%;
height: 60px;
background-color: #e3d4ff;
flex-direction: row;
border-radius: 25px;
padding-left: 15px;
align-items: center;
margin-bottom: 15px;
`;

export default () => {
  return(
    <InputArea></InputArea>

  );
}