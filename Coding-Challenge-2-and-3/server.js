const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Sport} = require('./models/sport-model.js')
const app = express();
const uuid = require( 'uuid' );

app.post('/sports',jsonParser, (req,res) => {
  let id = uuid.v4();
  let name = req.body.name;
  let numPlayers = req.body.players;
  let nuevoSport = {id,name,numPlayers};

  Sport.nuevo(nuevoSport).then(r =>{
    res.statusMessage = "Si se creo";
    return res.status(204).json(r);
  }).catch(e => {
    console.log(e);
  });
});
/* Your code goes here */
app.delete('/sports/delete', jsonParser, (req,res) => {
  console.log("Borrar");
  console.log(req.body.id)
  console.log(req.query.sportId)
  let id = req.body.id;
  let sportId = req.query.sportId;
  if(id){
    if (sportId) {
      if (sportId !== id) {
        res.statusMessage = "IDs provided dont match";
        return res.status(409).end();
      }
    }
  } else {
    res.statusMessage = "No ID was provided";
    return res.status(406).end();
  }
  Sport.borrar(id)

  // .then(r => {
  //   if (!r.length) {
  //     res.statusMessage = "No sport was found with that ID";
  //     return res.status(409).end();
  //   } else {
  //     res.statusMessage = "Sport deleted";
  //     return res.status(204).end();
  //   }
  // })
  // .catch(e => {
  //   res.statusMessage = "Something wrong happened";
  //   return res.status(404).end();
  // })
  // si  no hay sport con ese id 409
  // si se borro 204
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});
