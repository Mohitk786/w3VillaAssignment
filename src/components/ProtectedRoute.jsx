import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, path }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); 

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (path === '/admin' && user.accountType !== 'Admin') {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string,
};

export default ProtectedRoute;
