module.exports = function (sequelize, DataTypes) {



    let Cost = sequelize.define("Cost", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },


        origin: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        cost: {
            type: DataTypes.DECIMAL,
            allowNull: true
        }


    });

    Cost.associate = function (models) {
        Cost.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

    };
    return Cost;
};


