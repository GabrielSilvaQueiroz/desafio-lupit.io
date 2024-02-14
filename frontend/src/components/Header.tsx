import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1764C1;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <h1>Futlovers</h1>
        </HeaderContainer>
    );
};

export default Header;