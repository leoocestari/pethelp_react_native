import React from 'react';
import styled from 'styled-components/native';
import { SvgProps } from 'react-native-svg';

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

interface Props {
  onChangeText: (text: string) => void
  password?: boolean
  IconSvg?: React.FC<SvgProps>
  value?: string
  placeholder?: string
}

export const LoginInput: React.FC<Props> = ({onChangeText, password, IconSvg, value, placeholder}) => {

  let Svg = IconSvg ? IconSvg : () => null;

  return(
    <InputArea>
        <Svg width="22" height="22" fill="#aa94d3" />
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