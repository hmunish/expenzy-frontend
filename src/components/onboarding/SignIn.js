import { useDispatch } from 'react-redux';
import { updatePageType } from '../../redux/onboard/onboardSlice';
import Navbar from '../common/Navbar';

const SignIn = () => {
  const dispatch = useDispatch();
  return (
    <main>
      <Navbar text="Sign In" clickHandler={() => { dispatch(updatePageType('onboard')); }} />
      <section className="signin">
        <form className="signin">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
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
