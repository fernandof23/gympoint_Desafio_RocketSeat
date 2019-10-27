import Mail from '../../lib/mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }) {
    const { existStudent, answer } = data;

    await Mail.sendMail({
      to: `${existStudent.name}<${existStudent.email}>`,
      subject: 'Pergunta Respondida',
      template: 'orderMail',
      context: {
        student: existStudent.name,
        question: answer.question,
        answer: answer.answer,
      },
    });
  }
}

export default new OrderMail();
