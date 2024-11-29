import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetStandingsQuery } from "../api/footballApi";
import styled from "styled-components";
import LeagueSelectorModal from "../components/LeagueSelectorModal";
import FloatingLeagueButton from "../components/FloatingLeagueButton";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";

const LeagueStandings = () => {
  const navigate = useNavigate();

  const { selectedLeague } = useSelector((state) => state.league); // Get selected league from Redux
  const { data, error, isLoading } = useGetStandingsQuery(selectedLeague); // Fetch standings for selected league
  const [isLeagueModalOpen, setIsLeagueModalOpen] = useState(false);

  const standings = data?.response?.[0]?.league?.standings?.[0] || []; // Extract standings

  return (
    <>
      <StandingsContainer>
        <LogoContainer onClick={() => navigate("/")}>
          <img src={logo} alt="App Logo" />
          <TextContainer>
            <AppName>OfffsideZone</AppName>
            <Slogan>Stay Ahead of the Game.</Slogan>
          </TextContainer>
        </LogoContainer>
        <HeaderSection>
          <h1>League Standings</h1>
          <p>Explore the current standings for the selected league.</p>
        </HeaderSection>

        {isLoading ? (
          <LoadingMessage>Loading standings...</LoadingMessage>
        ) : error ? (
          <LoadingMessage>Error fetching standings.</LoadingMessage>
        ) : (
          <StandingsTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Played</th>
                <th>Wins</th>
                <th>Draws</th>
                <th>Losses</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team) => (
                <tr key={team.team.id}>
                  <td>{team.rank}</td>
                  <td>
                    <TeamInfo>
                      <img src={team.team.logo} alt={team.team.name} />
                      <span>{team.team.name}</span>
                    </TeamInfo>
                  </td>
                  <td>{team.all.played}</td>
                  <td>{team.all.win}</td>
                  <td>{team.all.draw}</td>
                  <td>{team.all.lose}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </StandingsTable>
        )}
      </StandingsContainer>
      
      <FloatingLeagueButton />
      <LeagueSelectorModal
        isOpen={isLeagueModalOpen}
        onClose={() => setIsLeagueModalOpen(false)}
      />
    </>
  );
};

// Styled Components
const StandingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;
  padding: 100px 50px 50px 50px;

  @media (max-width: 768px) {
    padding: 50px 20px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const StandingsTable = styled.table`
  width: 100%;
  min-width: 400px;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
  overflow-x: scroll;

  thead {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  th,
  td {
    padding: 10px 15px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    @media (max-width: 768px) {
      padding: 8px 10px;
    }
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    th,
    td {
      padding: 5px 8px;
    }
  }
`;

const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
    border-radius: 50%;
    background: #ffffff;
    padding: 5px;

    @media (max-width: 480px) {
      width: 25px;
      height: 25px;
    }
  }

  span {
    font-size: 1rem;
    color: #ffffff;

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  cursor: pointer;

  img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    object-fit: cover;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

    @media (max-width: 480px) {
      width: 50px;
      height: 50px;
    }
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;

  @media (max-width: 480px) {
    gap: 0;
  }
`;

const AppName = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Slogan = styled.p`
  font-size: 0.8rem;
  color: #d0d0d0;
  margin: 0;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #ffebff;
  font-size: 1.5rem;
  padding: 20px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;


export default LeagueStandings;
