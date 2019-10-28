import * as Yup from 'yup';
import Student from '../models/Student';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation Fails' });
    }

    const emailExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'user already exists' });
    }

    const { name, email, age, weight, height } = await Student.create(req.body);

    return res.json({ name, email, age, weight, height });
  },

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fails' });
    }
    const user = await Student.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(req.body.email === user.email)) {
      const emailExists = await Student.findOne({
        where: { email: req.body.email },
      });
      if (emailExists) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    const { name, email, age, weight, height } = await user.update(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  },

  async show(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'User not found' });
    }
    return res.json(student);
  },

  async delete(req, res) {
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'User not found' });
    }

    await Student.destroy({ where: { id: req.params.id } });

    return res.json({ ok: 'Student deleted with Sucess' });
  },
  async index(req, res) {
    const { page = 1 } = req.query;
    const students = await Student.findAll({
      where: {},
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(students);
  },
};
