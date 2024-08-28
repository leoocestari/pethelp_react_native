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

const Input = styled.TextInput`
flex:1;
font-size: 14px;
color: #000;
margin-left: 12px;


`;

export default ({IconSvg, placeholder, value, password, onChangeText}) => {
  return(
    <InputArea>
        <IconSvg width="22" height="22" fill="#aa94d3" />
        <Input 
        placeholder={placeholder}
        placeholderTextColor="#aa99d3"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
        />
    </InputArea>

  );
}