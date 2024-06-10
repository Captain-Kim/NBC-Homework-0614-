import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px 20px;

//   position: relative;
//   top: 0;
//   left: 0;
//   right: 0;
//   width: 100%;
  z-index: 1000;
`;

// const Logo = styled.div`
//   font-size: 24px;
//   font-weight: bold;
//   color: white;
// `;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.a`
  margin-right: 20px;
  font-size: 18px;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Username = styled.span`
  font-size: 18px;
  color: white;
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e60000;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      {/* <Logo>HOME</Logo> */}
      <NavLinks>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">내 프로필</NavLink>
      </NavLinks>
      <ProfileContainer>
        <ProfileImage src="profile_image_url" alt="Profile" />
        <Username>test344</Username>
        <LogoutButton>로그아웃</LogoutButton>
      </ProfileContainer>
    </HeaderContainer>
  );
};

export default Header;
