import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.header`
  background-color: #1764C1;
  color: white;
  padding: 10px;
  text-align: left;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;  
  cursor: pointer;
  text-decoration: none;

  a {
    text-decoration: none; 
    color: white;
  }

  a:hover {
    color: white; 
    text-decoration: none;
  }
`;

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <CustomLink href="/">
                <HeaderTitle>Futlovers</HeaderTitle>
            </CustomLink>
        </HeaderContainer>
    );
};

export default Header;