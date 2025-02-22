import { useEffect } from 'react';
import { useIsLogin } from '../../hooks/User/useIsLogin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminRoute({ children }) {
  const { data } = useIsLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (data === undefined) return;

    if (data.hasToken === false) {
      toast('로그인이 필요합니다.');
      navigate('/truescope-administrator/cms/administrator/login');
    }
  }, [data]);

  return <>{children}</>
}


export default AdminRoute;