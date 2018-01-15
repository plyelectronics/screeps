

module.exports = {
  build_energy_miner(base_index, room_index, energy_index, spawn_id) {

    var newName = 'miner' + Game.time;
    var spawn = Game.getObjectById(spawn_id);
    var body = [MOVE,CARRY,WORK];
    var energy_available = spawn.room.energyAvailable;


    if (Memory.room_profile[room_index].room_action == 'base') {
      var num_interations = (energy_available - 200)/100;
      for(i = 0; (i < (num_interations-1)) || (i==9); i++) {
        body.push(WORK);
      }
    }
    else if (Memory.room_profile[room_index].room_energy[energy_index].energy_road) {
      if(energy_available < 900) return true;
      body.push(MOVE, MOVE, MOVE, CARRY, WORK, WORK, WORK, WORK, WORK);
      var num_interations = (energy_available - 900)/250;
      for(i = 0; (i < (num_interations-1)) || (i==2); i++) {
        body.push(WORK, WORK, MOVE);
      }
    }
    else {
      if(energy_available < 900) return true;
      body.push(MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, WORK, WORK, WORK, WORK);
      var num_interations = (energy_available - 900)/150;
      for(i = 0; (i < (num_interations-1)) || (i==4); i++) {
        body.push(WORK, MOVE);
      }
    }

    var creep_name = 'energy_miner';
    var creeps_in_base = _.filter(Game.creeps, (creep) => creep.memory.base_room == Memory.base_profile[base_index].base_id);
    if(creeps_in_base < 2) {
      console.log('In Base ' + Memory.base_profile[base_index].base_id + ' there are only ' + creeps_in_base.length + ' creeps. Making Harvester.');
      creep_name = 'harvester';
    }

    if(spawn.spawnCreep(body, newName,
        {memory: {
          role: creep_name,
          assigned_room: Memory.room_profile[room_index].room_id,
          resource_id: Memory.room_profile[room_index].room_energy[energy_index].energy_id,
          base_room: Memory.base_profile[base_index].base_id,
          setup: false
        }}) == OK) {
          return false;
    }
    else {
        return true;
    }
  },
  build_energy_transport(base_index, room_index, energy_index, spawn_id) {
    var newName = 'transport' + Game.time;
    var spawn = Game.getObjectById(spawn_id);
    var body = [WORK,CARRY,MOVE];
    var energy_available = spawn.room.energyAvailable;

    if (Memory.room_profile[room_index].room_action == 'base') {
      var num_interations = (energy_available - 200)/150;
      for(i = 0; (i < (num_interations-1)) || (i==7); i++) {
        body.push(CARRY, CARRY, MOVE);
      }
    }
    else if (Memory.room_profile[room_index].room_energy[energy_index].energy_road) {
      if(energy_available < 500) return true;
      body.push(MOVE, CARRY, CARRY, MOVE, CARRY, CARRY);
      var num_interations = (energy_available - 500)/150;
      for(i = 0; (i < (num_interations-1)) || (i==5); i++) {
        body.push(CARRY, CARRY, MOVE);
      }
    }
    else {
      if(energy_available < 550) return true;
      body.push(MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE);
      var num_interations = (energy_available - 550)/100;
      for(i = 0; (i < (num_interations-1)) || (i==5); i++) {
        body.push(CARRY, MOVE);
      }
    }

    if(spawn.spawnCreep(body, newName,
        {memory: {
          role: 'energy_transport',
          assigned_room: Memory.room_profile[room_index].room_id,
          ferry_room: Memory.base_profile[Memory.room_profile[room_index].room_home_base].base_id,
          base_room: Memory.base_profile[Memory.room_profile[room_index].room_home_base].base_id,
          resource_id: Memory.room_profile[room_index].room_energy[energy_index].energy_id,
          miner_id: Memory.room_profile[room_index].room_energy[energy_index].energy_miner_id,
          container_id: Memory.room_profile[room_index].room_energy[energy_index].energy_container_id,
          container_targets: [],
          storage_targets: [],
          storing: false,
          setup: false
        }}) == OK) {
          return false;
    }
    else {
      return true;
    }
  },
  build_extractor(base_index, room_index, energy_index, spawn_id) {

  },
  build_mineral_transport(base_index, room_index, energy_index, spawn_id) {

  },
  build_upgrader(base_index, room_index, spawn_id) {

  },
  build_builder(base_index, room_index, spawn_id) {

  },
  build_repair_bot(base_index, room_index, spawn_id) {

  }
}
