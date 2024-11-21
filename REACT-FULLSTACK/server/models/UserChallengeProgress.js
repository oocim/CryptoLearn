module.exports = (sequelize, DataTypes) => {
    const UserChallengeProgresses = sequelize.define("UserChallengeProgresses", {
        progressId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'userId',
            },
        },
        challengeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Challenges',
                key: 'challengeId',
            },
        },
        solved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    UserChallengeProgresses.associate = (models) => {
        UserChallengeProgresses.belongsTo(models.Users, {
            foreignKey: "userId",
            onDelete: "CASCADE", // Delete progress if the user is deleted
        });

        UserChallengeProgresses.belongsTo(models.Challenges, {
            foreignKey: "challengeId",
            onDelete: "CASCADE", // Delete progress if the challenge is deleted
        });
    };

    return UserChallengeProgresses;
};