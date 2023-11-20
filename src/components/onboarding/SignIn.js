import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authorizeUser } from '../../redux/user/userSlice';

const SignIn = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authorizeUser());
  }, [dispatch]);

  if (user.isAuthorized) return navigate('/');
  return <p>SignIn</p>;
};

export default SignIn;
