module.exports = {
  build_energy_miner(base_index, room_index, energy_index, spawn_id) {

    var newName = 'miner' + Game.time;
    var spawn = Game.getObjectById(spawn_id);
    var body = [MOVE,CARRY,WORK];
    var num_work_elements = 0;

    if((spawn.room.energyAvailable - 200) < 500) num_work_elements = 1;
    else if((spawn.room.energyAvailable - 200) > 2000) num_work_elements = 20;
    else num_work_elements = (spawn.room.energyAvailable - 200)/100;

    for(i = 0; i < num_work_elements; i++) body.push(WORK);

    spawn.spawnCreep(body, newName,
        {memory: {
          role: 'energy_miner',
          assigned_room: Memory.room_profile[room_index].room_id,
          resource_id: Memory.room_profile[room_index].room_energy[energy_index].energy_id,
          container_id: Memory.room_profile[room_index].room_energy[energy_index].energy_container_id,
          setup: false;
        }});
  },
  build_energy_transport(base_index, room_index, energy_index, spawn_id) {
    var newName = 'transport' + Game.time;
    var spawn = Game.getObjectById(spawn_id);
    var body = [MOVE,CARRY,WORK];
    var num_carry_elements = 0;
    var num_move_elements = 0;

    if((spawn.room.energyAvailable - 200) > 2000) {
      var num_carry_elements = 10;
      var num_move_elements = 10;
    }
    else if((spawn.room.energyAvailable - 200) > 500) {
      var energy_for_carry = spawn.room.energyAvailable * 0.5;
      var energy_for_move = spawn.room.energyAvailable * 0.5;

      num_carry_elements = energy_for_carry/50;
      num_move_elements = energy_for_move/50;
    }

    for(i = 0; i < num_carry_elements; i++) body.push(CARRY);
    for(i = 0; i < num_move_elements; i++) body.push(MOVE);

    spawn.spawnCreep(body, newName,
        {memory: {
          role: 'energy_transport',
          assigned_room: Memory.room_profile[room_index].room_id,
          resource_id: Memory.room_profile[room_index].room_energy[energy_index].energy_id,
          miner_id: Memory.room_profile[room_index].room_energy[energy_index].energy_miner_id,
          container_id: Memory.room_profile[room_index].room_energy[energy_index].energy_container_id,
          setup: false;
        }});
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
