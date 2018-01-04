module.exports = {
  run(creep) {
    var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id == creep.memory.assigned_room});
    var energy_index = Memory.room_profile[room_index].room_energy.findIndex(function(find_energy){return find_energy.energy_id == creep.memory.resource_id});

    if(!creep.memory.setup) {
      Memory.room_profile[room_index].room_energy[energy_index].energy_transport_id = creep.id;
    }

    //go within radius of resource and pick up dropped energy
    //return when carry is full or all energy dropped is picked up and resource is zero
    //if no energy dropped around resource and resource is zero energy, move to another task

  }
}
