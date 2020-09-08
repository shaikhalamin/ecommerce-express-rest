module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {

        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        root_category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        parent_category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        child_category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        weight: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        href: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Product;
};