module.exports = {
  run(creep) {
    var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id == creep.memory.assigned_room});
    var energy_index = Memory.room_profile[room_index].room_energy.findIndex(function(find_energy){return find_energy.energy_id == creep.memory.resource_id});

    if(!creep.memory.setup) {
      Memory.room_profile[room_index].room_energy[energy_index].energy_miner_id = creep.id;
    }

    //Move to resource and mine drop
    var source = Game.getObjectById(creep.memory.resource_id);
    var harvest_report = creep.harvest(source);
    if(harvest_report == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    else if(harvest_report == ERR_NOT_ENOUGH_RESOURCES) {
      //creep.moveTo(sources[harvest_source_num], {visualizePathStyle: {stroke: '#ffaa00'}});
    }

  }
}
