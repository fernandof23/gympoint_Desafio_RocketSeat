import User from '../models/User';

export default {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { name, email, createdAt } = await User.create(req.body);
    return res.json({ name, email, createdAt });
  },
};
