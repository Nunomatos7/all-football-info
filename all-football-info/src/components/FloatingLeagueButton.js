import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LeagueSelectorModal from "./LeagueSelectorModal";
import { useGetLeaguesQuery } from "../api/footballApi";

const FloatingLeagueButton = () => {
  const { selectedLeague } = useSelector((state) => state.league); // Get the selected league from Redux
  const { data: leagueData, isLoading } = useGetLeaguesQuery(); // Fetch league data
  const [leagueLogo, setLeagueLogo] = useState(null); // State for league logo
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Find and set the selected league's logo once the data is available
  useEffect(() => {
    if (leagueData && selectedLeague) {
      const selectedLeagueDetails = leagueData.response?.find(
        (league) => league.league.id === selectedLeague
      );
      setLeagueLogo(selectedLeagueDetails?.league?.logo || null);
    }
  }, [leagueData, selectedLeague]);

  return (
    <>
      <FloatingButton onClick={() => setIsModalOpen(true)}>
        {isLoading ? (
          "⚽" // Show a fallback icon while loading
        ) : leagueLogo ? (
          <img src={leagueLogo} alt="Selected League" />
        ) : (
          "⚽" // Fallback icon if no logo is found
        )}
      </FloatingButton>
      <LeagueSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

// Styled Components
const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  &:hover {
    background: #0056b3;
    transform: scale(1.1);
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: contain;
  }
`;

export default FloatingLeagueButton;
