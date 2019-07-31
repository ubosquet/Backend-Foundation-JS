module.exports = function(models) {
    models.film.belongsToMany(models.actor, 
        { 
            through: models.film_actor,
            foreignKey: 'film_id'
        });
    models.actor.belongsToMany(models.film,
        {
            through: models.film_actor,
            foreignKey: 'actor_id'
        });
}
