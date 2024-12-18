import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import GameDetailsModal from "../components/GameDetailsModal";
import { useGetMatchesQuery } from "../api/footballApi";
import { useSelector } from "react-redux";
import LeagueSelectorModal from "../components/LeagueSelectorModal";
import FloatingLeagueButton from "../components/FloatingLeagueButton";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { selectedLeague } = useSelector((state) => state.league);
  const { data, error, isLoading } = useGetMatchesQuery(selectedLeague);
  const scrollContainerRef = useRef(null);
  const divisoryRef = useRef(null);
  const [isLeagueModalOpen, setIsLeagueModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [filter, setFilter] = useState("All");

  // Sort matches by date
  const sortMatches = (matches) =>
    [...matches].sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));

  useEffect(() => {
    if (scrollContainerRef.current && divisoryRef.current) {
      divisoryRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [data]);

  const matches = data?.response || [];
  const today = new Date();

  const sortedMatches = sortMatches(matches);
  const divisoryIndex = sortedMatches.findIndex(
    (match) => new Date(match.fixture.date) >= today
  );

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  const filteredMatches = sortedMatches.filter((match) => {
    if (filter === "All") return true;
    if (filter === "Finished") return match.fixture.status.short === "FT";
    if (filter === "Scheduled") return match.fixture.status.short === "NS";
    return true;
  });

  const navigate = useNavigate();

  return (
    <HomeContainer>
      <LogoContainer  onClick={() => navigate("/")}>
        <img src={logo} alt="App Logo" />
        <TextContainer>
          <AppName>OfffsideZone</AppName>
          <Slogan>Stay Ahead of the Game.</Slogan>
        </TextContainer>
      </LogoContainer>

      <HeroSection>
        <HeroContent>
          <h1>Your Gateway to Football Insights</h1>
          <p>Previous scores, upcoming matches, and the pulse of the game.</p>
        </HeroContent>
      </HeroSection>
      
      <Filter>
        <FilterContainer>
          <FilterDropdown
            id="matchFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Finished">Finished</option>
            <option value="Scheduled">Scheduled</option>
          </FilterDropdown>
        </FilterContainer>
        <h2> 2024/2025 Matches</h2>
      </Filter>
      <MatchesSection>
        {isLoading ? (
          <LoadingWrapper>
            <LoadingSpinner />
            <LoadingText>Fetching Matches...</LoadingText>
          </LoadingWrapper>
        ) : error ? (
          <Error>Error loading matches</Error>
        ) : (
          <MatchesScroll ref={scrollContainerRef}>
            {filteredMatches.map((match, index) => (
              <MatchCard
                key={match.fixture.id}
                onClick={() => handleMatchClick(match)}
                ref={index === divisoryIndex ? divisoryRef : null}
              >
                <TeamLogo src={match.teams.home.logo} alt={match.teams.home.name} />
                <MatchDetails>
                  <strong>{match.teams.home.name}</strong>
                  <span>vs</span>
                  <strong>{match.teams.away.name}</strong>
                  <small>
                    {new Date(match.fixture.date).toLocaleDateString("en-GB")} -{" "}
                    {new Date(match.fixture.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                  {new Date(match.fixture.date) < today && (
                    <Score>
                      {match.score.fulltime.home} : {match.score.fulltime.away}
                    </Score>
                  )}
                </MatchDetails>
                <TeamLogo src={match.teams.away.logo} alt={match.teams.away.name} />
              </MatchCard>
            ))}
          </MatchesScroll>
          
        )}
        <CenteredButton>
          <ResetButton onClick={() => divisoryRef.current?.scrollIntoView({ behavior: "smooth", inline: "center" })}>
            Return to Today
          </ResetButton>
        </CenteredButton>
      </MatchesSection>

      <FloatingLeagueButton />
      <LeagueSelectorModal
        isOpen={isLeagueModalOpen}
        onClose={() => setIsLeagueModalOpen(false)}
      />
      <GameDetailsModal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedMatch && (
          <>
            <ModalTitle>
              <h3>Match Details</h3>
            </ModalTitle>
            <ModalHeader>
              <img
                src={selectedMatch.league.logo}
                alt={selectedMatch.league.name}
                style={{ width: "50px", height: "50px" }}
              />
              <h2>{selectedMatch.league.name}</h2>
            </ModalHeader>
            <ModalTeams>
              <div>
                <img
                  src={selectedMatch.teams.home.logo}
                  alt={selectedMatch.teams.home.name}
                  style={{ width: "60px", height: "60px" }}
                />
                <strong>{selectedMatch.teams.home.name}</strong>
              </div>
              <span>vs</span>
              <div>
                <img
                  src={selectedMatch.teams.away.logo}
                  alt={selectedMatch.teams.away.name}
                  style={{ width: "60px", height: "60px" }}
                />
                <strong>{selectedMatch.teams.away.name}</strong>
              </div>
            </ModalTeams>
            <ModalDetails>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedMatch.fixture.date).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(selectedMatch.fixture.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                <strong>Venue:</strong> {selectedMatch.fixture.venue.name},{" "}
                {selectedMatch.fixture.venue.city}
              </p>
              <p>
                <strong>Referee:</strong>{" "}
                {selectedMatch.fixture.referee || "Not assigned"}
              </p>
              {new Date(selectedMatch.fixture.date) < today && (
                <Scores>
                  <p>
                    <strong>Halftime:</strong>{" "}
                    {selectedMatch.score.halftime.home} -{" "}
                    {selectedMatch.score.halftime.away}
                  </p>
                  <p>
                    <strong>Fulltime:</strong>{" "}
                    {selectedMatch.score.fulltime.home} -{" "}
                    {selectedMatch.score.fulltime.away}
                  </p>
                </Scores>
              )}
            </ModalDetails>
          </>
        )}
      </GameDetailsModal>
    </HomeContainer>
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

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const HomeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;
  overflow: hidden;
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
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;

  @media (max-width: 480px) {
    opacity: 0;
  }
`;

const AppName = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Slogan = styled.p`
  font-size: 0.8rem;
  color: #d0d0d0;
  margin: 0;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
`;


const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ff7bff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 10px;
  font-size: 1.2rem;
  color: #ff7bff;
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 100px 20px 0px 20px;
  background: linear-gradient(180deg, #001f3f, transparent);
  width: 100%;
`;

const HeroContent = styled.div`
  max-width: 600px;
  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
    animation: ${fadeIn} 1s ease-in;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    animation: ${fadeIn} 1.5s ease-in;
  }
`;

const MatchesSection = styled.div`
  width: 100%;
  padding: 20px;
`;

const MatchesScroll = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 10px 0;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }
`;

const MatchCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 10px 20px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  min-width: 300px;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const MatchDetails = styled.div`
  margin: 10px 0;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 1.1rem;
    margin-bottom: 5px;
  }

  span {
    margin: 5px 0;
    font-size: 1rem;
  }

  small {
    font-size: 0.9rem;
    color: #ffebff;
    margin-top: 5px;
  }
`;

const TeamLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
  background: #ffffff;
  padding: 5px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 0px 0px;
  font-size: 1.5rem;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  h2 {
    margin: 0px;
    padding-left: 10px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

const FilterDropdown = styled.select`
  padding: 10px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  background: white;
  color: black;
  cursor: pointer;

  &:focus {
    outline: none;
    border: 2px solid #0056b3;
  }
`;

const CenteredButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ResetButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
    background: #0056b3;
  }
`;

const Score = styled.div`
  margin-top: 5px;
  font-size: 1rem;
  color: #ffd700;
  font-weight: bold;
  border-radius: 5px;
  border: 2px solid #ffd700;
  padding: 5px 10px;
`;

const ModalTitle = styled.h2`
  text-align: left;
  margin-top: 0px;
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    margin: 10px 0;
  }
`;

const ModalTeams = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  div {
    text-align: center;

    img {
      margin: 0 auto;
    }

    strong {
      display: block;
      margin-top: 5px;
    }
  }

  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const ModalDetails = styled.div`
  text-align: center;

  p {
    margin-bottom: 10px;
    font-size: 1rem;
  }
`;

const Scores = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
  border-radius: 5px;
  border: 2px solid #000;
`;

const Error = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
  color: #ff0000;
  font-weight: bold;
`;

export default Home;
