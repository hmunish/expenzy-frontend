import { useDispatch, useSelector } from 'react-redux';
import { signup, updatePageType } from '../../redux/onboard/onboardSlice';
import Navbar from '../common/Navbar';
import googleImg from '../assets/google.png';
import Notification from '../common/Notification';

const SignUp = () => {
  const onboard = useSelector((state) => state.onboard);
  const dispatch = useDispatch();

  const handlerSignUp = (e) => {
    e.preventDefault();
    dispatch(signup({ email: e.target.email.value, password: e.target.password.value }));
  };

  return (
    <main>
      {onboard.isLoading && <Notification message="Signing Up..." type="loading" />}
      {onboard.isError && <Notification message={onboard.isError} type="error" />}
      {onboard.isSignUp && <Notification message="Signed up successfully" type="success" />}
      <Navbar text="Sign Up" clickHandler={() => { dispatch(updatePageType('onboard')); }} />
      <section className="signup">
        <form className="signup" onSubmit={handlerSignUp}>
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <label htmlFor="tc-agree">
            <input type="checkbox" value="tc-agree" id="tc-agree" name="tcAgree" required />
            <span>
              By signing up, you agree to the&nbsp;
              <a href="index.html" className="clr-p">Terms of Service and Privacy Policy</a>
            </span>
          </label>
          <button type="submit" className="dark">Sign Up</button>
          <p id="or-with">Or with</p>
        </form>
        <div className="form-other-options">
          <button type="button" className="light">
            <img alt="Google" src={googleImg} />
            Signup with Google
          </button>
          <p>
            Already have an account?&nbsp;
            <button type="button" className="clr-p switch-form" onClick={() => dispatch(updatePageType('signin'))}>Sign In</button>
          </p>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
