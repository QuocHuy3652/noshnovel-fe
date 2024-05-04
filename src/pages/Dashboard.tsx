import SearchSection from '~/components/SearchSection.tsx';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <>
      <SearchSection />
      <Outlet />
    </>
  );
};
