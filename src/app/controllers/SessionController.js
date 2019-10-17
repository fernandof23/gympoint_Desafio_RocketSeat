import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      password: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Failed' });
    }
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      res.status(400).json({ error: 'User not found' });
    }
    if (!(await user.checkPassword(req.body.password))) {
      res.status(400).json({ error: 'Invalid Password' });
    }
    const { id, name, email } = user;

    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expireIn,
      }),
    });
  },
};
