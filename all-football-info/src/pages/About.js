import React from "react";
import styled, { keyframes } from "styled-components";
import logo from "../assets/images/logo.jpg";
import Technologies from "../components/Technologies";
import { useNavigate } from "react-router-dom";
import arch from "../assets/images/arch.png";


const About = () => {
  const navigate = useNavigate();

  return (
    <AboutContainer>
      <Header>
        <LogoSection onClick={() => navigate("/")}>
          <LogoContainer>
            <img src={logo} alt="App Logo" />
          </LogoContainer>
          <TextContainer>
            <AppName>OfffsideZone</AppName>
            <Slogan>Stay Ahead of the Game.</Slogan>
          </TextContainer>
        </LogoSection>
        <HeaderTitle>
          <h2>Project Report</h2>
        </HeaderTitle>
      </Header>

      <Section>
        <h2>1. Student Identification and Repository</h2>
        <p>
          <strong>Student Name:</strong> Nuno Matos
        </p>
        <p>
          <strong>Student Mec:</strong> 97915
        </p>
        <p>
          <strong>Project Repository: </strong>{""}
          <a href="https://github.com/Nunomatos7/tdw-mp2-Nuno-Matos" target="_blank" rel="noopener noreferrer">
          https://github.com/Nunomatos7/tdw-mp2-Nuno-Matos
          </a>
        </p>
        <p>
          <strong>Deployment link: </strong>{""}
          <a href="https://offfsidezone.vercel.app/" target="_blank" rel="noopener noreferrer">
          https://offfsidezone.vercel.app/
          </a>
        </p>
        <p>
          <strong>API football 1: </strong>
            <a href="https://rapidapi.com/api-sports/api/api-football" target="_blank" rel="noopener noreferrer">
            https://rapidapi.com/api-sports/api/api-football
            </a>
        </p>
        <p>
          <strong>API football 2: </strong>
          <a href="https://dashboard.api-football.com/soccer/tester" target="_blank" rel="noopener noreferrer">
          https://dashboard.api-football.com/soccer/tester
          </a>
        </p>
      </Section>

      <Section>
        <h2>2. Project Overview</h2>
        <p>
            OfffsideZone is a web application that provides users with football-related insights such as league 
            standings, team details, match data, and player comparisons. By integrating real-time APIs, the application 
            presents a rich and interactive experience for football enthusiasts.
        </p>
        <p>
            This project was developed as part of MiniProject2 in the subject of TDW, and the theme comes from my passion for football and the desire to develop a web application that 
            provides football enthusiasts with a comprehensive and engaging experience. OfffsideZone is a sleek, user-friendly solution to this demand.
        </p>
        <p>
            The user can navigate through the website, view league standings, team details, match data, and player 
            comparisons. The application uses real-time APIs to fetch data from two football-related resources, 
            including league standings, team details, match data, and player comparisons. The application is built 
            with React, a popular JavaScript library for building user interfaces.
        </p>
        <p>
            The project is hosted on Vercel, a platform for static websites and serverless functions. Vercel provides an 
            easy and cost-effective way to deploy and manage web applications, making it a popular choice for developers  
            looking to host their projects online. I also used Github for version control and Github Actions for CI/CD, namely for receiving Microsoft Teams notifications.
        </p>

      </Section>

      <Section>
        <h2>3. Technologies Used</h2>
        <Technologies />
      </Section>

      <Section>
        <h2>4. Project Tree</h2>
        <pre>
{`all-football-info
├─ .dist
├─ .vercel
├─ all-football-info
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  └─ src
│     ├─ api
│     │  ├─ footballApi.js
│     │  └─ teamDetailsApi.js
│     ├─ App.css
│     ├─ App.js
│     ├─ App.test.js
│     ├─ assets
│     │  └─ images
│     │     └─ logo.jpg
│     ├─ components
│     │  ├─ FloatingLeagueButton.js
│     │  ├─ GameDetailsModal.js
│     │  ├─ LeagueSelectorModal.js
│     │  ├─ NavigationMenu.js
│     │  └─ Technologies.js
│     ├─ index.css
│     ├─ index.js
│     ├─ logo.svg
│     ├─ pages
│     │  ├─ About.js
│     │  ├─ Home.js
│     │  ├─ LeagueStandings.js
│     │  ├─ PlayerComparison.js
│     │  ├─ TeamDetail.js
│     │  └─ Teams.js
│     ├─ redux
│     │  ├─ slices
│     │  │  └─ leagueSlice.js
│     │  └─ store.js
│     ├─ reportWebVitals.js
│     ├─ setupTests.js
│     └─ styles
│        ├─ GlobalStyles.js
│        └─ theme.js
└─ README.md`}
        </pre>

      </Section>

      <Section>
        <h2>5. Application Design and Structure</h2>
        <p>
          The application follows a modular architecture with reusable components and well-defined pages. 
          Each page focuses on a specific feature, such as displaying league standings or player comparisons. 
          Styled-components ensure visual consistency, while React Router provides smooth navigation. The entire 
          project is also entirely responsive, ensuring a seamless experience across devices.
        </p>

        <h3>Pages</h3>
        <ul>
          <li>
            <strong>Home:</strong> Landing page with the selected league's matches, filters and league selector.
          </li>
          <li>
            <strong>Teams:</strong> Displays the teams of the selected league. Opens the team's details by clicking on the team.
          </li>
          <li>
            <strong>Team Detail:</strong> Displays team details for selected team and the team's players. This is the page where the cross APIs' data occured to receive teams info like date of foundation.
          </li>
          <li>
            <strong>League Standings:</strong> Displays league standings for selected league. Opens the team's details by clicking on the team name/logo.
          </li>
          <li>
            <strong>Player Comparison:</strong> Displays player comparison for two selected players, where all the dropdowns are searchable. The user can compare their stats and see the difference between them.
          </li>
          <li>
            <strong>About:</strong> Displays project report.
          </li>
        </ul>
        <br />

        <h3>Components</h3>
        <ul>
          <li>
            <strong>Technologies:</strong> Displays the technologies used in the project to use in this report.
          </li>
          <li>
            <strong>FloatingLeagueButton:</strong> Opens the league selector modal.
          </li>
          <li>
            <strong>LeagueSelectorModal:</strong> Displays the league selector modal.
          </li>
          <li>
            <strong>GameDetailsModal:</strong> Displays the game details modal, where the user can see all the match details.
          </li>
          <li>
            <strong>NavigationMenu:</strong> Displays the navigation menu with links to the Home, Teams, League Standings, Player Comparison, and About pages.
          </li>
        </ul>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "100px 0px 100px 0px" }}>
          <h1 style={{ textAlign: "center" }}>Project Architecture</h1>
          <img src={arch} alt="Project Architecture" style={{ width: "50%", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }} />
        </div>
        </Section>

        <Section>
          <h2>6. Key Features</h2>
            <ul>
            <li>Ability to check for passed or upcoming matches.</li>
            <li>Interactive search for teams and players.</li>
            <li>Interactive filtering for leagues and seasons.</li>
            <li>Real-time data fetching from APIs for team details and player comparisons.</li>
            <li>Dynamic data fetching from APIs, crossed data between APIs and data cached for efficiency using RTK Query.</li>
            <li>Local Storage used to save the selected league everytime.</li>
            <li>Interactive UI elements like modals, filters, and dropdowns for enhanced usability.</li>
            <li>Responsive design optimized for both desktop and mobile devices.</li>
            </ul>
      </Section>

      <Section>
        <h2>7. Challenges and Solutions</h2>
        <p>
          Several technical challenges were encountered during the project:
        </p>
        <ul>
          <li>
            <strong>Challenge:</strong> Handling large datasets without impacting performance.
            <br />
            <strong>Solution:</strong> Used RTK Query's built-in caching mechanism to minimize redundant API calls.
          </li>
          <li>
            <strong>Challenge:</strong> Creating a fully responsive and visually appealing UI.
            <br />
            <strong>Solution:</strong> Applied media queries and tested across multiple devices to ensure responsiveness.
          </li>
          <li>
            <strong>Challenge:</strong> Combine the two APIs to fetch team details like founded date.
            <br />
            <strong>Solution:</strong> Go around and around till I found the solution.
          </li>
          <li>
            <strong>Challenge:</strong> When first load the page, having the selected league logo on the floatting button.
            <br />
            <strong>Solution:</strong> Try after try until I found the solution.
          </li> 
          <li>
            <strong>Challenge:</strong> When open a team details page, the page is to heavy to load all player's pictures in big teams.
            <br />
            <strong>Try:</strong> I tried to implement a load more button but I didn't succeeded.
          </li>

        </ul>
      </Section>

      <Section>
        <h2>8. Conclusion and Future Work</h2>
        <p>
          OfffsideZone successfully demonstrates the integration of modern web technologies to deliver an engaging 
          football statistics platform. While the project meets its primary goals, there is room for future enhancements:
        </p>
        <ul>
          <li>Incorporating live updates for matches and player statistics.</li>
          <li>Adding advanced analytics and visualizations for deeper insights.</li>
          <li>Supporting user accounts for personalized experiences.</li>
        </ul>
        <p>
          This project has been an enriching experience, showcasing the potential of React, Redux, and styled-components 
          in building feature-rich web applications.
        </p>
      </Section>
    
      <Footer>
        <FooterText>
          <p>
            &copy; 2024 OfffsideZone. All rights reserved. Designed and developed by {"Nuno Matos"}
          </p>
        </FooterText>
      </Footer>

    </AboutContainer>

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

const AboutContainer = styled.div`
  padding: 100px 200px 0px 200px;
  text-align: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #ffffff;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 50px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 10px;
  }
`;

const Header = styled.div`
  margin-bottom: 50px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 10px;
  animation: ${fadeIn} 0.5s ease-in-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 60px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-top: 80px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  position: absolute;
  top: 20px;
  left: 30px;
  cursor: pointer;
  `;

const LogoContainer = styled.div`
  width: 70px;
  height: 70px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 2px;

  @media (max-width: 480px) {
    opacity: 0;
  }
`;

const AppName = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Slogan = styled.p`
  font-size: 0.8rem;
  color: #d0d0d0;
  margin: 0;
  text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Section = styled.div`
  margin-bottom: 40px;
  text-align: justify;
  animation: ${fadeIn} 0.5s ease-in-out;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p,
  ul {
    font-size: 1rem;
    line-height: 1.6;
  }

  ul {
    list-style: disc;
    margin-left: 20px;
  }

  pre {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 10px;
    border-radius: 12px;
    overflow-x: auto;
  }
`;

const Footer = styled.footer`
  margin-top: 50px;
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.7);
`;

const FooterText = styled.div`
  font-size: 1rem;
  color: #fff;
`;

export default About;
