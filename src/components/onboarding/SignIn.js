import { useDispatch, useSelector } from 'react-redux';
import { signin, updatePageType } from '../../redux/onboard/onboardSlice';
import TopBar from '../common/TopBar';
import Notification from '../common/Notification';
import { updateAuthorization } from '../../redux/user/userSlice';

const SignIn = () => {
  const onboard = useSelector((state) => state.onboard);
  const dispatch = useDispatch();

  const handlerSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await dispatch(signin({ email, password }));
    if (!response.payload.authorization) return;
    dispatch(updateAuthorization(response.payload.authorization));
  };

  return (
    <main>
      {onboard.isLoading && <Notification message="Signing In..." type="loading" />}
      {onboard.isError && <Notification message={onboard.isError} type="error" />}
      {onboard.isSignIn && <Notification message="Signed In successfully. Redirecting..." type="success" />}
      <TopBar text="Sign In" clickHandler={() => { dispatch(updatePageType('onboard')); }} />
      <section className="signin">
        <form className="signin" onSubmit={handlerSignIn}>
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button type="submit" className="dark">Sign In</button>
        </form>
        <div className="form-other-options">
          <a id="forgot-pwd" href="/">Forgot Password?</a>
          <p>
            Don’t have an account yet?&nbsp;
            <button type="button" className="clr-p switch-form" onClick={() => dispatch(updatePageType('signup'))}>Sign Up</button>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignIn;
