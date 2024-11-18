module.exports = (sequelize, DataTypes) => {
    const Challenges = sequelize.define("Challenges", {
        challengeId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },      
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ciphertext: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        plaintext: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timeLimit: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        hint: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        cipherType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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