import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3 {
    margin: 0 0 20px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  button {
    cursor: pointer;
  }

  /* Global scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px; /* Vertical scrollbar width */
    height: 8px; /* Horizontal scrollbar height */
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1); /* Track background */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(120deg, #007bff, #ff7bff); /* Thumb gradient */
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0.1); /* Thumb spacing */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(120deg, #0056b3, #ff49eb); /* Hover effect */
  }

  /* Firefox-specific scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #007bff rgba(255, 255, 255, 0.1);
`;

export default GlobalStyles;
