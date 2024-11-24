import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import AppBarComponent from './components/AppBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box>
      <AppBarComponent />
      <Container
        maxWidth="lg"
        style={{
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
