import * as Yup from 'yup';
import Plans from '../models/Plan';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const plan = await Plans.create(req.body);

    return res.json(plan);
  },

  async index(req, res) {
    const plans = await Plans.findAll({ where: {} });
    return res.json(plans);
  },

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    if (!req.params.plan_id) {
      return res.status(401).json({ error: 'Incorret Params' });
    }

    const plan = await Plans.findByPk(req.params.plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Invalid Plan' });
    }

    const { id, title, duration, price, updated_at } = await plan.update(
      req.body
    );

    return res.json({
      id,
      title,
      duration,
      price,
      updated_at,
    });
  },

  async delete(req, res) {
    if (!req.params.plan_id) {
      return res.status(401).json({ error: 'Incorret Params' });
    }

    const plan = await Plans.findByPk(req.params.plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Invalid Plan' });
    }

    await Plans.destroy({ where: { id: req.params.plan_id } });

    return res.json({ ok: 'Deleted with Sucess' });
  },
};
