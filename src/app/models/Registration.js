import Sequelize, { Model } from 'sequelize';
import { isBefore, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.INTEGER,
        ativo: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), this.end_date);
          },
        },
        daysLeft: {
          type: Sequelize.VIRTUAL,
          get() {
            return formatDistance(new Date(), this.end_date, { locale: pt });
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static assossiate(models) {
    this.belongsTo(models.Plans, { foreignKey: 'plan_id', as: 'plans' });
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });
  }
}

export default Registration;
