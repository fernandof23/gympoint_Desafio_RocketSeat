import * as Yup from 'yup';
import Order from '../schemas/HelpOrders';
import Students from '../models/Student';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const student = await Students.findByPk(req.params.student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const answer = await Order.create({
      student_id: req.params.student_id,
      question: req.body.question,
    });
    return res.json(answer);
  },

  async index(req, res) {
    const student = await Students.findByPk(req.params.student_id);
    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    const answer = await Order.find({
      student_id: req.params.student_id,
    });

    return res.json(answer);
  },
};
