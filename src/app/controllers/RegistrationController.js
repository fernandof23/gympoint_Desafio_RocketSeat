import * as Yup from 'yup';
import { parseISO, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Queue from '../../lib/queue';
import RegistrationMail from '../jobs/RegistrationMail';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { student_id, plan_id } = req.body;

    const existStudent = await Student.findByPk(student_id);

    if (!existStudent) {
      return res.status(400).json({ error: 'Student are not registrate' });
    }
    const existPlan = await Plan.findByPk(plan_id);
    if (!existPlan) {
      return res.status(400).json({ error: 'Invalid Plan' });
    }

    const ifRegistred = await Registration.findOne({ where: { student_id } });
    if (ifRegistred) {
      return res.status(400).json({ error: 'Student already registred' });
    }

    const start_date = parseISO(req.body.start_date);

    const end_date = addMonths(start_date, existPlan.duration);

    const price = existPlan.price * existPlan.duration;

    const { id } = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    await Queue.add(RegistrationMail.key, {
      existStudent,
      existPlan,
      price,
      start_date,
      end_date,
    });

    return res.json({ id, student_id, plan_id, start_date, end_date, price });
  },

  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await Registration.findAll({
      where: {},
      attributes: [
        'id',
        'ativo',
        'daysLeft',
        'start_date',
        'end_date',
        'price',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email', 'age'],
        },
        {
          model: Plan,
          as: 'plans',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });
    return res.json(registrations);
  },

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number(),
      plan_id: Yup.number(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const register = await Registration.findByPk(req.params.registration_id);

    if (!register) {
      return res.status(400).json({ error: 'Register not found' });
    }
    const { student_id, plan_id } = req.body;

    // eslint-disable-next-line eqeqeq
    if (student_id && !(student_id == register.student_id)) {
      const existStudent = await Student.findByPk(student_id);
      const registerStudent = await Registration.findOne({
        where: { student_id },
      });

      if (!existStudent) {
        return res.status(400).json({ error: 'Student not found' });
      }
      if (registerStudent) {
        return res.status(401).json({ error: 'Student already register' });
      }
    }
    const existPlan = await Plan.findByPk(plan_id);
    if (!existPlan) {
      return res.status(400).json({ error: 'Plan not exist' });
    }

    let { start_date } = register;
    if (req.body.start_date) {
      start_date = parseISO(req.body.start_date);
    }

    const end_date = addMonths(start_date, existPlan.duration);
    const price = existPlan.price * existPlan.duration;

    const { id } = await register.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({
      id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  },
  async delete(req, res) {
    const register = await Registration.findByPk(req.params.registration_id);
    if (!register) {
      return res.status(400).json({ error: 'Register not Found' });
    }

    await Registration.destroy({ where: { id: req.params.registration_id } });
    return res.json({ ok: 'Register deletes with sucess' });
  },
};
