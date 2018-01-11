
var role_creator = require('role.creator');

module.exports = {
    run() {
         console.log('Running run() of creep_logic();');
    },
    output() {
         console.log('Running output() of creep_logic()');
    },
    creep_cleanup(){
      for(var name in Memory.creeps) {
          if(!Game.creeps[name]) {
              delete Memory.creeps[name];
              console.log('Clearing non-existing creep memory:', name);
          }
      }
    },
    creep_generator(base_id){

      if (base_id != undefined) {
        for( i = 0; i < Memory.base_profile.length; i++){
          //reset available spawns
          for(j = 0; j < Memory.base_profile[i].base_spawn.length; j++) {
            var spawn_check = Game.getObjectById(Memory.base_profile[i].base_spawn[j].spawn_id);
            Memory.base_profile[i].base_spawn[j].spawn_available = (spawn_check.spawning == null) ? true : false;
          }

          var available_spawns = Memory.base_profile[i].base_spawn.filter(function(tmp_spawn_array){ return tmp_spawn_array.spawn_available == true});
          var num_scheduled = 0;

          var room_memory = Memory.room_profile ? Memory.room_profile.filter(function(find_room){return find_room.room_home_base == Memory.base_profile[i].base_index}) : [];
          for(j = 0; (j < (room_memory ? room_memory.length : 0) && (available_spawns.length != num_scheduled)); j++) {
            var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id == room_memory[j].room_id});

            //For Building Mining/Support for Mining Bots
            if((room_memory[j].room_purpose == 'base') || (room_memory[j].room_purpose == 'remote_mining')){
              for(k in room_memory[j].room_energy) {
                  var miner_found = _.filter(Game.creeps, (creep => ((creep.memory.role == 'energy_miner')  && (creep.memory.resource_id == room_memory[j].room_energy[k].energy_id))));
                  var transport_found = _.filter(Game.creeps, (creep => ((creep.memory.role == 'energy_transport')  && (creep.memory.resource_id == room_memory[j].room_energy[k].energy_id))));
                if(miner_found.length < 1) role_creator.build_energy_miner(i, room_index, k, available_spawns[num_scheduled++].spawn_id);
                else if(transport_found.length < 1) role_creator.build_energy_transport(i, room_index, k, available_spawns[num_scheduled++].spawn_id);
                if(num_scheduled == available_spawns.length) break;
              }
              if(room_memory.room_level >= 5 && false) {
                for(k in room_memory[j].room_mineral) {
                  if(room_memory[j].room_mineral[k].mineral_miner_id == '0') role_creator.build_extractor(i, room_index, k, available_spawns[num_scheduled++].spawn_id);
                  else if(room_memory[j].room_mineral[k].mineral_transport_id == '0') role_creator.build_mineral_transport(i, room_index, k, available_spawns[num_scheduled++].spawn_id);
                  if(num_scheduled == available_spawns.length) break;
                }
              }
            }

            //For Building Creeps that take care of a base
            if(room_memory[j].room_purpose == 'base') {

              var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
              var repair_bots = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair_bot');

              else if(upgraders.length < 2) {
                  var newName = 'Upgrader' + Game.time;
                  console.log('Spawning new upgrader: ' + newName);
                  if (upgraders.length < 1) Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                      {memory: {role: 'upgrader'}});
                  else Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,ATTACK], newName,
                      {memory: {role: 'upgrader'}});
              }
              else if(repair_bots.length < 2) {
                  var newName = 'Repair_Bot' + Game.time;
                  console.log('Spawning new repair_bot: ' + newName);
                  if(repair_bots.length < 1) Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
                      {memory: {role: 'repair_bot'}});
                  else Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                      {memory: {role: 'repair_bot'}});
              }
            }

          }
        }

        // check miners
        // check runners
        // check builders
        // check repair bots
      }
    }
}
