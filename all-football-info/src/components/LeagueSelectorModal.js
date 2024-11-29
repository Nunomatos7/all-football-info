import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { setLeague } from "../redux/slices/leagueSlice";
import { useGetLeaguesQuery } from "../api/footballApi";

const TARGET_LEAGUES = [39, 140, 78, 135, 61]; // Premier League, La Liga, Bundesliga, Serie A, Ligue 1

const LeagueSelectorModal = ({ isOpen, onClose }) => {
  const { data, isLoading, error } = useGetLeaguesQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const topLeagues = data?.response
    ?.filter((league) => TARGET_LEAGUES.includes(league.league.id))
    .map((league) => ({
      id: league.league.id,
      name: league.league.name,
      logo: league.league.logo,
    })) || [];

  const otherLeagues = data?.response
    ?.filter((league) => !TARGET_LEAGUES.includes(league.league.id))
    .map((league) => ({
      id: league.league.id,
      name: league.league.name,
      logo: league.league.logo,
    })) || [];

  const handleLeagueSelect = (leagueId) => {
    dispatch(setLeague(leagueId)); // Update the selected league in Redux
    onClose();
  };

  const filteredTopLeagues = topLeagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOtherLeagues = otherLeagues.filter((league) =>
    league.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return null;
  if (error) return null;

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>Select a League</h2>

        <SearchBar
          type="text"
          placeholder="Search leagues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ScrollableContent>
          {filteredTopLeagues.length > 0 && (
            <LeagueList>
              {filteredTopLeagues.map((league) => (
                <LeagueCard
                  key={league.id}
                  onClick={() => handleLeagueSelect(league.id)}
                >
                  <img src={league.logo} alt={league.name} />
                  <span>{league.name}</span>
                </LeagueCard>
              ))}
            </LeagueList>
          )}

          {filteredOtherLeagues.length > 0 && (
            <>
              <Divisory>
                <span>Other Leagues</span>
              </Divisory>
              <LeagueList>
                {filteredOtherLeagues.map((league) => (
                  <LeagueCard
                    key={league.id}
                    onClick={() => handleLeagueSelect(league.id)}
                  >
                    <img src={league.logo} alt={league.name} />
                    <span>{league.name}</span>
                  </LeagueCard>
                ))}
              </LeagueList>
            </>
          )}
        </ScrollableContent>
      </ModalContent>
    </ModalContainer>
  );
};

// Styled Components
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  color: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const ScrollableContent = styled.div`
  overflow-y: auto;
  margin-top: 10px;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
`;

const LeagueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const LeagueCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(0, 123, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(0, 123, 255, 0.4);
    transform: scale(1.05);
  }

  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    border-radius: 10px;
    background: #ffffff;
    padding: 5px;
  }

  span {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ffffff;
  }
`;

const Divisory = styled.div`
  margin: 20px 0;
  text-align: center;
  color: #ffffff;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;

  span {
    background: rgba(0, 0, 0, 1);
    padding: 0 10px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
    z-index: -1;
  }
`;

export default LeagueSelectorModal;
