import React, { ComponentType } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface WithRouterProps {
  navigate: ReturnType<typeof useNavigate>;
  location: ReturnType<typeof useLocation>;
}

const withRouter =
  <P extends object>(Component: ComponentType<P & WithRouterProps>) =>
  (props: P) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <Component {...props} navigate={navigate} location={location} />;
  };

export default withRouter;
