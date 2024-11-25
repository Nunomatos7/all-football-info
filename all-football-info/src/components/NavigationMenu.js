import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHome, FaUsers, FaInfoCircle, FaTrophy } from "react-icons/fa";

const NavigationMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setMenuOpen(false); // Close the menu on navigation
    navigate(path);
  };

  return (
    <>
      <MenuContainer>
        <FloatingButton onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </FloatingButton>
        <MenuOverlay open={menuOpen} onClick={() => setMenuOpen(false)} />
        <MenuItems open={menuOpen}>
          <MenuItem onClick={() => handleNavigate("/")}>
            <FaHome size={24} />
            <span>Home</span>
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/teams")}>
            <FaUsers size={24} />
            <span>Teams</span>
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/standings")}>
            <FaTrophy size={24} />
            <span>Standings</span>
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/about")}>
            <FaInfoCircle size={24} />
            <span>About</span>
          </MenuItem>
        </MenuItems>
      </MenuContainer>
    </>
  );
};

const MenuContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const FloatingButton = styled.button`
  background: #ff7bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #ff49eb;
    transform: scale(1.1);
  }
`;

const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const MenuItems = styled.div`
  position: absolute;
  top: 100px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) =>
    open ? "translateY(0)" : "translateY(20px)"};
  transition: all 0.3s ease-in-out;
`;

const MenuItem = styled.div`
  background: #007bff;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #0056b3;
  }

  span {
    font-weight: bold;
  }
`;

export default NavigationMenu;
