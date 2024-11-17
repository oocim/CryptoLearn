module.exports = (sequelize, DataTypes) => {
    const Challenges = sequelize.define("Challenges", {
        challengeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        cipherType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('easy', 'normal', 'hard'),
            allowNull: false,
        },
        prompt: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        solution: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });


    Challenges.associate = (models) => {
        // A Challenge can have many progress entries
        Challenges.hasMany(models.UserChallengeProgresses, {
            foreignKey: "challengeId",
        });
    };

    return Challenges;
};