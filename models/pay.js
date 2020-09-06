module.exports = function (sequelize, DataTypes) {



    let Pay = sequelize.define("Pay", {
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
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }


    });

    Pay.associate = function (models) {
        Pay.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

    };
    return Pay;
};


