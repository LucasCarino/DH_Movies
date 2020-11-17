const { sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Actor = sequelize.define('Actor', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        favorite_movie_id: DataTypes.INTEGER
    });
    Actor.associate = models => {
        Actor.belongsTo(models.Movie, {
            as: 'favoriteMovie',
            foreignKey: 'favorite_movie_id'
        });
        Actor.belongsToMany(models.Movie, {
            as: 'Movies',
            through: 'actor_movie',
        })
    }
    return Actor
}