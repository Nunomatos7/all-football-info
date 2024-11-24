import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useGetMatchesQuery } from "../api/footballApi";

// Sort matches by date
const sortMatches = (matches) => {
  return [...matches].sort(
    (a, b) => new Date(a.fixture.date) - new Date(b.fixture.date)
  );
};

const Home = () => {
  const { data, error, isLoading } = useGetMatchesQuery("39"); // Premier League (ID: 39) by default
  const scrollContainerRef = useRef(null);
  const divisoryRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current && divisoryRef.current) {
      // Scroll to the divisory point on load
      divisoryRef.current.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading matches</p>;

  const matches = data?.response || []; // Fallback if data is undefined
  const today = new Date();

  // Sort matches and find the divisory index
  const sortedMatches = sortMatches(matches);
  const divisoryIndex = sortedMatches.findIndex(
    (match) => new Date(match.fixture.date) >= today
  );

  // Scroll to the divisory point when the button is clicked
  const handleResetScroll = () => {
    divisoryRef.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <h1>Your Gateway to Football Insights</h1>
          <p>Real-time scores, upcoming matches, and the pulse of the game.</p>
        </HeroContent>
      </HeroSection>
      <MatchesSection>
        <h2>All Matches</h2>
        <MatchesScroll ref={scrollContainerRef}>
          {sortedMatches.map((match, index) => (
            <MatchCard
              key={match.fixture.id}
              match={match}
              ref={index === divisoryIndex ? divisoryRef : null}
            />
          ))}
        </MatchesScroll>
        <CenteredButton>
          <ResetButton onClick={handleResetScroll}>Return to Today</ResetButton>
        </CenteredButton>
      </MatchesSection>
    </HomeContainer>
  );
};

const MatchCard = React.forwardRef(({ match }, ref) => (
  <MatchCardContainer ref={ref}>
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
      {new Date(match.fixture.date) < new Date() && (
        <Score>
          {match.score.fulltime.home} : {match.score.fulltime.away}
        </Score>
      )}
    </MatchDetails>
    <TeamLogo src={match.teams.away.logo} alt={match.teams.away.name} />
  </MatchCardContainer>
));

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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;
  overflow: hidden;
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 50px 20px 0px 20px;
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
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    animation: ${fadeIn} 2s ease-in;
  }
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

const MatchCardContainer = styled.div`
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

const Score = styled.div`
  margin-top: 5px;
  font-size: 1rem;
  color: #ffd700;
`;

const TeamLogo = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 50%;
  background: #ffffff;
  padding: 5px;
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

export default Home;
