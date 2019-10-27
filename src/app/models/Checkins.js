import Sequelize, { Model } from 'sequelize';

class Checkins extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }

  static assosiate(model) {
    this.belongsTo(model.Student, { foreignKey: 'student_id', as: 'student' });
  }
}
export default Checkins;
