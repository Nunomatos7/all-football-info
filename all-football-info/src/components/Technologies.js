import React from "react";
import styled from "styled-components";

const Technologies = () => {
  const techStack = [
    {
      name: "React",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      color: "0A5EB0",
    },
    {
      name: "Redux",
      logo: "https://avatars.githubusercontent.com/u/13142323?v=4",
      color: "#640D5F",
    },
    {
      name: "RTK Query",
      logo: "https://redux-toolkit.js.org/img/redux.svg",
      color: "#d942f5",
    },
    {
      name: "React Router",
      logo: "https://res.cloudinary.com/dw6wav4jg/image/upload/v1717915293/react-router-icon-2048x1116-jfeevj0l_k93jyv.png",
      color: "#ca4245",
    },
    {
      name: "JavaScript",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      color: "#f7df1e",
    },
    {
      name: "Styled Components",
      logo: "https://styled-components.com/favicon.png",
      color: "#db7093",
    },
    {
        name: "Vercel",
        logo: "https://static-00.iconduck.com/assets.00/logo-vercel-icon-512x444-szlkql7g.png",
        color: "#3781b3",
    },
    {
      name: "API-Football 1",
      logo: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=png/47092c406e4cdbb2c6a4376534757a00.png",
      color: "#37b358",
    },
    {
      name: "API-Football 2",
      logo: "https://img.poki-cdn.com/cdn-cgi/image/quality=78,width=1200,height=1200,fit=cover,f=png/47092c406e4cdbb2c6a4376534757a00.png",
      color: "#37b358",
    },
  ];

  return (
    <Container>
      <TechGrid>
        {techStack.map((tech) => (
          <TechCard key={tech.name} color={tech.color}>
            <Logo src={tech.logo} alt={tech.name} />
            <TechName>{tech.name}</TechName>
          </TechCard>
        ))}
      </TechGrid>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 30px 30px;
  text-align: center;
  background: linear-gradient(120deg, #007bff, #ff7bff);
  color: #fff;

  h2 {
    text-align: left;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const TechCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color || "#fff"};
  border-radius: 12px;
  width: 150px;
  height: 150px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Logo = styled.img`
  width: 50px;
  margin-bottom: 10px;
`;

const TechName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
`;

export default Technologies;
