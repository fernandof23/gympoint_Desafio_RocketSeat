import { subDays } from 'date-fns';
import Checkins from '../models/Checkins';
import Students from '../models/Student';

export default {
  async store(req, res) {
    const student = await Students.findByPk(req.params.student_id);
    if (!student) {
      return res.status(400).json({ error: 'Invalid Student' });
    }
    const deleteLastCheckins = await Checkins.findAll({
      where: { student_id: student.id },
    });

    deleteLastCheckins.forEach(async check => {
      const dateCheckin = check.createdAt;
      if (dateCheckin < subDays(new Date(), 7)) {
        await Checkins.destroy({ where: { id: check.id } });
      }
    });

    const lastCheckins = await Checkins.findAll({
      where: { student_id: student.id },
    });

    if (lastCheckins.length >= 7) {
      return res
        .status(401)
        .json({ error: 'You can check in only 7 times for week' });
    }

    const checkin = await Checkins.create({ student_id: student.id });

    return res.json(checkin);
  },

  async index(req, res) {
    const student = await Students.findByPk(req.params.student_id);

    if (!student) {
      return res.status(400).json({ error: 'Invalid Student' });
    }

    const deleteLastCheckins = await Checkins.findAll({
      where: { student_id: student.id },
    });

    deleteLastCheckins.forEach(async check => {
      const dateCheckin = check.createdAt;
      if (dateCheckin < subDays(new Date(), 7)) {
        await Checkins.destroy({ where: { id: check.id } });
      }
    });
    const checkin = await Checkins.findAll({
      where: { student_id: student.id },
    });

    return res.json(checkin);
  },
};
