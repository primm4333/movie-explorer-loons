import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
        <Outlet />
      </Container>
    </>
  );
}
