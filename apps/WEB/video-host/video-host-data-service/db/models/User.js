import {
  isAfterTwelveHoursAgo,
  isBeforeTwelveHoursFromNow,
} from './../../utils/date';

export function define(DataTypes) {
  return {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(254),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [3, 254],
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [4, 255],
      },
    },
    verified: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true,
        isAfter: isAfterTwelveHoursAgo,
        isBefore: isBeforeTwelveHoursFromNow,
      },
    }
  };
}

export function associations(models, self) {
  // self.hasMany(models.Events, { ... });
}

export default {
  define,
  associations,
};
