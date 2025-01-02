import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/GlobalTheme';
import { AuthProvider } from './context/AuthContext';
import routes from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              if (route.children) {
                return (
                  <Route key={index} path={route.path} element={route.element}>
                    {route.children.map((child, childIndex) => (
                      <Route
                        key={childIndex}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                  </Route>
                );
              }
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            })}
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
