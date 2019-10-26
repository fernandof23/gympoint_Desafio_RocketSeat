import Sequelize, { Model } from 'sequelize';

class Registration extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.INTEGER,
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
