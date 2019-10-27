import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { existStudent, existPlan, price, start_date, end_date } = data;

    await Mail.sendMail({
      to: `${existStudent.name}<${existStudent.email}>`,
      subject: 'Matricula GymPoint',
      template: 'registration',
      context: {
        student: existStudent.name,
        namePlan: existPlan.title,
        durationPlan: existPlan.duration,
        pricePlan: price,
        startPlan: format(parseISO(start_date), "'dia' dd 'de' MMM 'de' yyyy", {
          locale: pt,
        }),
        endPlan: format(parseISO(end_date), "'dia' dd 'de' MMM 'de' yyyy", {
          locale: pt,
        }),
      },
    });
  }
}

export default new RegistrationMail();
