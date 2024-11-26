import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetStandingsQuery } from "../api/footballApi";
import styled from "styled-components";
import LeagueSelectorModal from "../components/LeagueSelectorModal";

const LeagueStandings = () => {
  const { selectedLeague } = useSelector((state) => state.league); // Get selected league from Redux
  const { data, error, isLoading } = useGetStandingsQuery(selectedLeague); // Fetch standings for selected league
  const [isLeagueModalOpen, setIsLeagueModalOpen] = useState(false);

  const standings = data?.response?.[0]?.league?.standings?.[0] || []; // Extract standings

  return (
    <>
      <StandingsContainer>
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
      
      <FloatingButton onClick={() => setIsLeagueModalOpen(true)}>⚽</FloatingButton>
      <LeagueSelectorModal
        isOpen={isLeagueModalOpen}
        onClose={() => setIsLeagueModalOpen(false)}
      />
    </>
  );
};

const StandingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
`;

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
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1000;

  &:hover {
    background: #0056b3;
    transform: scale(1.1);
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
  }
`;

const StandingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  thead {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  th,
  td {
    padding: 10px 15px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
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
  }

  span {
    font-size: 1rem;
    color: #ffffff;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #ffebff;
  font-size: 1.5rem;
  padding: 20px;
`;

export default LeagueStandings;
