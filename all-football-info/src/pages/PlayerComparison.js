import React, { useState, useMemo } from "react";
import Select from "react-select";
import {
  useGetLeaguesQuery,
  useGetTeamsQuery,
  useGetPlayerStatsQuery,
  useGetTeamDetailsQuery
} from "../api/footballApi";
import styled, { keyframes } from "styled-components";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router-dom";

const PlayerComparison = () => {
  const { data: leaguesData, isLoading: leaguesLoading } = useGetLeaguesQuery();
  const [leftLeague, setLeftLeague] = useState(null);
  const [rightLeague, setRightLeague] = useState(null);
  const [leftTeam, setLeftTeam] = useState(null);
  const [rightTeam, setRightTeam] = useState(null);
  const [leftPlayer, setLeftPlayer] = useState(null);
  const [rightPlayer, setRightPlayer] = useState(null);
  const [leftSeason, setLeftSeason] = useState("2023");
  const [rightSeason, setRightSeason] = useState("2023");

  const { data: leftTeamsData, isLoading: leftTeamsLoading } = useGetTeamsQuery(leftLeague?.value);
  const { data: rightTeamsData, isLoading: rightTeamsLoading } = useGetTeamsQuery(rightLeague?.value);

  const { data: leftStatsData } = useGetPlayerStatsQuery({
    playerId: leftPlayer?.value,
    season: leftSeason,
  });
  const { data: rightStatsData } = useGetPlayerStatsQuery({
    playerId: rightPlayer?.value,
    season: rightSeason,
  });

  const leftStats = leftStatsData?.response?.[0]?.statistics?.[0];
  const rightStats = rightStatsData?.response?.[0]?.statistics?.[0];

  const leagueOptions = useMemo(
    () =>
      leaguesData?.response.map((league) => ({
        value: league.league.id,
        label: league.league.name,
        logo: league.league.logo,
      })),
    [leaguesData]
  );

  const leftTeamOptions = useMemo(
    () =>
      leftTeamsData?.response?.map(({ team }) => ({
        value: team.id,
        label: team.name,
        logo: team.logo,
      })),
    [leftTeamsData]
  );

  const rightTeamOptions = useMemo(
    () =>
      rightTeamsData?.response?.map(({ team }) => ({
        value: team.id,
        label: team.name,
        logo: team.logo,
      })),
    [rightTeamsData]
  );

  const { data: leftTeamData, isLoading: leftPlayersLoading } = useGetTeamDetailsQuery(leftTeam?.value);
  const leftPlayerOptions = leftTeamData?.response?.[0]?.players.map((player) => ({
    value: player.id,
    label: player.name,
    photo: player.photo,
  })) || [];

  const { data: rightTeamData, isLoading: rightPlayersLoading } = useGetTeamDetailsQuery(rightTeam?.value);
  const rightPlayerOptions = rightTeamData?.response?.[0]?.players.map((player) => ({
    value: player.id,
    label: player.name,
    photo: player.photo,
  })) || [];

  const handleLeftLeagueChange = (selectedLeague) => {
    setLeftLeague(selectedLeague);
    setLeftTeam(null);
    setLeftPlayer(null);
  };

  const handleRightLeagueChange = (selectedLeague) => {
    setRightLeague(selectedLeague);
    setRightTeam(null);
    setRightPlayer(null);
  };

  const handleLeftTeamChange = (selectedTeam) => {
    setLeftTeam(selectedTeam);
    setLeftPlayer(null);
  };

  const handleRightTeamChange = (selectedTeam) => {
    setRightTeam(selectedTeam);
    setRightPlayer(null);
  };

  const highlightStat = (leftValue, rightValue, isLowerBetter = false) => {
    if (isLowerBetter) {
      if (leftValue < rightValue) return { left: "better", right: "worse" };
      if (leftValue > rightValue) return { left: "worse", right: "better" };
    } else {
      if (leftValue > rightValue) return { left: "better", right: "worse" };
      if (leftValue < rightValue) return { left: "worse", right: "better" };
    }
    return { left: "equal", right: "equal" };
  };

  const statsComparison = leftStats && rightStats ? {
    goals: highlightStat(leftStats?.goals.total || 0, rightStats?.goals.total || 0),
    assists: highlightStat(leftStats?.goals.assists || 0, rightStats?.goals.assists || 0),
    appearances: highlightStat(leftStats?.games.appearences || 0, rightStats?.games.appearences || 0),
    yellowCards: highlightStat(leftStats?.cards.yellow || 0, rightStats?.cards.yellow || 0, true),
    redCards: highlightStat(leftStats?.cards.red || 0, rightStats?.cards.red || 0, true),
  } : null;

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#fff",
      borderRadius: "8px",
      border: "none",
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
    }),
    option: (base, { isFocused }) => ({
      ...base,
      backgroundColor: isFocused ? "rgba(0, 123, 255, 0.2)" : "#fff",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }),
  };

  const formatOptionLabel = ({ label, logo, photo }) => (
    <OptionContainer>
      {logo && <OptionImage src={logo} alt={label} />}
      {photo && <OptionImage src={photo} alt={label} />}
      <span>{label}</span>
    </OptionContainer>
  );

  const navigate = useNavigate();

  return (
    <ComparisonContainer>
      <LogoContainer onClick={() => navigate("/")}>
        <img src={logo} alt="App Logo" />
        <TextContainer>
          <AppName>OfffsideZone</AppName>
          <Slogan>Stay Ahead of the Game.</Slogan>
        </TextContainer>
      </LogoContainer>
      <Header>
        <h1>Player Comparison</h1>
        <p>Compare stats of players from different leagues and teams.</p>
      </Header>
      <Selectors>
        <PlayerSection>
          <h2>Player 1</h2>
          <StyledSelect
            options={leagueOptions}
            value={leftLeague}
            onChange={handleLeftLeagueChange}
            isLoading={leaguesLoading}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            placeholder="Select League"
          />
          <StyledSelect
            options={leftTeamOptions}
            value={leftTeam}
            onChange={handleLeftTeamChange}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            isDisabled={!leftLeague || leftTeamsLoading}
            placeholder="Select Team"
          />
          <StyledSelect
            options={leftPlayerOptions}
            value={leftPlayer}
            onChange={setLeftPlayer}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            isDisabled={!leftTeam || leftPlayersLoading}
            placeholder="Select Player"
          />
          <StyledDropdown
            value={leftSeason}
            onChange={(e) => setLeftSeason(e.target.value)}
          >
            <option value="2023">2023/2024</option>
            <option value="2022">2022/2023</option>
            <option value="2021">2021/2022</option>
            <option value="2020">2020/2021</option>
            <option value="2019">2019/2020</option>
          </StyledDropdown>
        </PlayerSection>
        <Divisory />
        <PlayerSection>
          <h2>Player 2</h2>
          <StyledSelect
            options={leagueOptions}
            value={rightLeague}
            onChange={handleRightLeagueChange}
            isLoading={leaguesLoading}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            placeholder="Select League"
          />
          <StyledSelect
            options={rightTeamOptions}
            value={rightTeam}
            onChange={handleRightTeamChange}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            isDisabled={!rightLeague || rightTeamsLoading}
            placeholder="Select Team"
          />
          <StyledSelect
            options={rightPlayerOptions}
            value={rightPlayer}
            onChange={setRightPlayer}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            isDisabled={!rightTeam || rightPlayersLoading}
            placeholder="Select Player"
          />
          <StyledDropdown
            value={rightSeason}
            onChange={(e) => setRightSeason(e.target.value)}
          >
            <option value="2023">2023/2024</option>
            <option value="2022">2022/2023</option>
            <option value="2021">2021/2022</option>
            <option value="2020">2020/2021</option>
            <option value="2019">2019/2020</option>
          </StyledDropdown>
        </PlayerSection>
      </Selectors>
      <ComparisonSection>
        {leftLeague && leftTeam && leftPlayer && leftSeason && (
          <PlayerCard>
            <PlayerCardInfo>
              <PlayerCardPhoto>
                {leftPlayer?.photo && <img src={leftPlayer?.photo} alt={leftPlayer?.name} />}
              </PlayerCardPhoto>
            </PlayerCardInfo>
            <Stat highlight={statsComparison?.appearances?.left}>
              Appearances: {leftStats?.games.appearences || "0"}
            </Stat>
            <Stat highlight={statsComparison?.goals?.left}>
              Goals: {leftStats?.goals.total || "0"}
            </Stat>
            <Stat highlight={statsComparison?.assists?.left}>
              Assists: {leftStats?.goals.assists || "0"}
            </Stat>
            <Stat highlight={statsComparison?.yellowCards?.left}>
              Yellow Cards: {leftStats?.cards.yellow || "0"}
            </Stat>
            <Stat highlight={statsComparison?.redCards?.left}>
              Red Cards: {leftStats?.cards.red || "0"}
            </Stat>
          </PlayerCard>
        )}
        {rightLeague && rightTeam && rightPlayer && rightSeason && (
          <PlayerCard>
            <PlayerCardInfo>
              <PlayerCardPhoto>
                {rightPlayer?.photo && <img src={rightPlayer?.photo} alt={rightPlayer?.name} />}
              </PlayerCardPhoto> 
            </PlayerCardInfo>
            <Stat highlight={statsComparison?.appearances?.right}>
              Appearances: {rightStats?.games.appearences || "0"}
            </Stat>
            <Stat highlight={statsComparison?.goals?.right}>
              Goals: {rightStats?.goals.total || "0"}
            </Stat>
            <Stat highlight={statsComparison?.assists?.right}>
              Assists: {rightStats?.goals.assists || "0"}
            </Stat>
            <Stat highlight={statsComparison?.yellowCards?.right}>
              Yellow Cards: {rightStats?.cards.yellow || "0"}
            </Stat>
            <Stat highlight={statsComparison?.redCards?.right}>
              Red Cards: {rightStats?.cards.red || "0"}
            </Stat>
          </PlayerCard>
        )}
      </ComparisonSection>
    </ComparisonContainer>
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
  }
`;

const ComparisonContainer = styled.div`
  padding: 100px 50px 50px 50px;
  text-align: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: 30px;
  animation: ${fadeIn} 0.5s ease-in-out;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
  }
`;

const Selectors = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const PlayerSection = styled.div`
  flex: 1;
  text-align: center;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const StyledSelect = styled(Select)`
  margin-bottom: 15px;
  color: #000;
`;

const StyledDropdown = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  border-radius: 5px;
  border: none;
`;

const Divisory = styled.div`
  width: 2px;
  background: rgba(255, 255, 255, 0.5);
`;

const ComparisonSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const PlayerCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  width: 45%;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-in-out;

  h3 {
    margin-bottom: 15px;
    font-size: 1.5rem;
  }
`;

const PlayerCardInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PlayerCardPhoto = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 50%;
  }
`;

const Stat = styled.p`
  font-size: 1rem;
  margin: 5px 0;
  padding: 5px;
  border-radius: 5px;
  background: ${({ highlight }) =>
    highlight === "better" ? "rgba(40, 167, 69, 0.8)" : highlight === "worse" ? "rgba(220, 53, 69, 0.8)" : "transparent"};
  color: ${({ highlight }) => (highlight ? "#ffffff" : "#ffffff")};
  font-weight: ${({ highlight }) => (highlight ? "bold" : "normal")};
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OptionImage = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 5px;
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

export default PlayerComparison;
