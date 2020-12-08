import { getUserByEmail, addUser } from "../../services/userServices.js";
import { validateRegistration } from '../../middlewares/validations.js';
import { bcrypt } from '../../deps.js';


const showRegistration = ({ render }) => {
  render('register.ejs', { errors: [], email: '' });
}

const postRegistration = async({request, response, render}) => {
  const data = await validateRegistration(request);
  if(data.errors) {
    render('register.ejs', data);
    return;
  }
  const password = data.password;
  const email = data.email;
  const verification = data.verification;

  if (password !== verification) {
    response.body = 'Verfication Password did not match';
    response.status = 401;
    return;
  }

  const existingUsers = await getUserByEmail(email);
  if (existingUsers.rowCount > 0) {
    response.body = 'This email is already reserved';
    return;
  }
  const hash = await bcrypt.hash(password);
  await addUser(email, hash);
  response.redirect('/auth/login');
};

const showLogin = ({ render }) => {
  render('login.ejs', { errors: [], email: '' });
}

const postLogin = async({request, response, session, render}) => {
  const body = request.body();
  const params = await body.value;
  const email = params.get('email');
  const password = params.get('password');
  const existingUsers = await getUserByEmail(email);
  if (existingUsers.rowCount === 0) {
      const data = {
        errors: {
          errror: { error: "Invalid email or password" },
        }
      }
      render('login.ejs', data)
      response.status = 401;
      return;
  }

  const userObj = existingUsers.rowsOfObjects()[0];
  const hash = userObj.password;
  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
      response.status = 401;
      return;
  }
  await session.set('authenticated', true);
  await session.set('user', {
      id: userObj.id,
      email: userObj.email
  });
  response.body = 'Authentication successful!';
  response.redirect('/behavior/reporting');
}

const logout = async ({ response, session }) => {
  await session.set('user', undefined)
  await session.set('authenticated', undefined);
  response.redirect('/auth/login');
}

export { showRegistration, postRegistration, showLogin, postLogin, logout};