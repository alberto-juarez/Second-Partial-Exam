const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */
const sportSchem = mongoose.Schema({
  id : {
    type : String,
    required : true,
    unique : true
  },
  name : {
    type : String,
    required : true
  },
  num_players : {
    type : Number,
    required : true
  }
});

const sportCol = mongoose.model('sports',sportSchem);

const Sport = {
  nuevo : function(nuevoSport){
    return sportCol.create(nuevoSport).then(nuevo =>{
      return nuevo;
    })
    .catch(e => {
      throw new Error("no se creo");
    });
  },
  // hacer lo de delete
  borrar : function(id){
    return sportCol.find({id:id})
    .remove()
    .then(x =>{
      return "Si se borro";
    })
    .catch(e => {
      throw new Error("no se borro");
    });
    // return playerCol.find(id).remove();
  }
}

module.exports = {
    Sport
};
