const { response } = require('express');
const EventModel = require('../models/EventModel');


const getEvents = async( req, resp = response ) => {

      const events = await EventModel.find()
                                     .populate('user','name');

      return resp.status(200).json({
            ok:true,
            events
      });
};

const createEvent = async ( req, resp = response ) => {

      const event = new EventModel( req.body );

      try {
            event.user = req.uid
            const eventSaved = await event.save();
         
            return resp.status(201).json({
                        ok:true,
                        eventSaved
            });

      } catch (error) {
            console.log(error);
            return resp.status(500).json({
                  ok:false,
                  msg:'Hable con el administrador'
            });
      }
}

const updateEvent = async( req, resp = response ) => {

      const eventId = req.params.id;
      const uid = req.uid;

      try {
            
            const event = await EventModel.findById( eventId );

            if( !event ){
                  return resp.status(404).json({
                        ok:false,
                        msg:'Evento no existe para ese ID'
                  });
            }

            if( event.user.toString() !== uid ){
                  return resp.status(401).json({
                        ok:false,
                        msg:'No tiene privilegios para editar este evento'
                  });
            }

            const eventUpdatedBody = {
                  ...req.body,
                  user: uid
            }

            const  eventUpdated = await EventModel.findByIdAndUpdate( eventId, eventUpdatedBody, { new: true } );

            return resp.json({
                  ok:true,
                  event: eventUpdated
            });

      } catch (error) {
            console.log(error);
            return resp.status(500).json({
                  ok:false,
                  msg:'Hable con el administrador'
            });
      }
}

const deleteEvent = async( req, resp = response ) => {

      const eventId = req.params.id;
      const uid = req.uid;

      try {
            const event = await EventModel.findById( eventId );

            if( !event ){
                  return resp.status(404).json({
                        ok:false,
                        msg:'Evento no existe para ese ID'
                  });
            }

            if( event.user.toString() !== uid ){
                  return resp.status(401).json({
                        ok:false,
                        msg:'No tiene privilegios para eliminar este evento'
                  });
            }
            await EventModel.findByIdAndDelete( eventId );

            return resp.json({ok: true});

      } catch (error) {
            console.log(error);
            return resp.status(500).json({
                  ok:false,
                  msg:'Hable con el administrador'
            });
      }
}
module.exports = {
      getEvents,
      createEvent,
      updateEvent,
      deleteEvent          
}