import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import NavigationMenu from "./components/NavigationMenu";
import LeagueStandings from "./pages/LeagueStandings";
import LeagueSelectorModal from "./components/LeagueSelectorModal";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Router>
        <NavigationMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/:id" element={<TeamDetail />} />
          <Route path="/standings" element={<LeagueStandings />} />
        </Routes>
        <LeagueSelectorModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
