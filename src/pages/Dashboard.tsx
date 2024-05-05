import { SearchSection } from '~/components/SearchSection.tsx';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {


  return (<>
    <div className="dashboard-wrapper bg-gray-50">
      <SearchSection />
      <Outlet/>
    </div>
  </>)
}