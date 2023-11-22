import { useDispatch } from 'react-redux';
import { updatePageType } from '../../redux/onboard/onboardSlice';
import Navbar from '../common/Navbar';
import googleImg from '../assets/google.png';

const SignUp = () => {
  const dispatch = useDispatch();
  return (
    <main>
      <Navbar text="Sign Up" clickHandler={() => { dispatch(updatePageType('onboard')); }} />
      <section className="signup">
        <form className="signup">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <label htmlFor="tc-agree">
            <input type="checkbox" value="tc-agree" id="tc-agree" />
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
