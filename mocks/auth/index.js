import { rest } from 'msw';
import params from '../params.config.js';
import dummy from './dummy.json';
import moment from 'moment';
import { API_PREFIX, LOGIN_URL, PROFILE_URL } from '@/config/url.js';

export const LoginHandler = [
  rest.post(`${API_PREFIX}${LOGIN_URL}`, async (req, res, ctx) => {
    // const result = await req.json();
    const result = req.body;
    const { email, password } = result;
    let user = dummy.users.find((user) => user.email === email);

    if (email === user.email && password === user.password) { 
      const time = params.TOKEN_EXPIRATION;
      return res(
        ctx.status(200),
        ctx.json({
          isLogged: true,
          token: user.token,
          life_token: moment().add(time.value, time.unit).toDate(),
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Correo electrónico o contraseña inválidos, intente nuevamente' })
      );
    }
  }),
  rest.get(`${API_PREFIX}${PROFILE_URL}`, async (req, res, ctx) => {
    const token = req.headers.get('Authorization').replace('Bearer ', '');
    const user = dummy.users.find((user) => user.token == token);
    if(user === undefined || user === null)
      return res(
        ctx.status(401),
        ctx.json({ message: 'No se ha podido autenticar su solicitud, inicie session e intente nuevamente mas tarde' })
      );
    return res(
      ctx.status(200),
      ctx.json(user.profile)
    );
  }),
];