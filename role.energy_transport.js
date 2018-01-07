module.exports = {
  run(creep) {
    var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id == creep.memory.assigned_room});
    var energy_index = Memory.room_profile[room_index].room_energy.findIndex(function(find_energy){return find_energy.energy_id == creep.memory.resource_id});
    var source = Game.getObjectById(creep.memory.resource_id);

    if(!creep.memory.setup) {
      //Memory.room_profile[room_index].room_energy[energy_index].energy_transport_id = creep.id;
      creep.memory.id = creep.id;
      creep.memory.setup = true;
    }
    if(creep.ticksToLive == 25){
        Memory.room_profile[room_index].room_energy[energy_index].energy_transport_id = '0';
    }

    if(creep.memory.storing && creep.carry.energy == 0) {
        creep.memory.storing = false;
    }
    if(!creep.memory.storing && (_.sum(creep.carry) == creep.carryCapacity)) {
        creep.memory.storing = true;
    }

    if(creep.memory.storing) {

      var container_construction = source.pos.findInRange(FIND_MY_CONSTRUCTION_SITES, 1, {
        filter: s => s.structureType == STRUCTURE_STORAGE
      });

      if(container_construction.length > 0) {
        if(creep.build(container_construction[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(container_construction[0]);
        }
      }
      else {

        let extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: s => s.structureType == STRUCTURE_EXTENSION && s.energy != 50
          });
          let spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: s => s.structureType == STRUCTURE_SPAWN && s.energy < 300
          });
          var first_base_spawn = Game.getObjectById(Memory.base_profile[Memory.room_profile[room_index].room_home_base].base_spawn[0].spawn_id);
          var container_target = first_base_spawn.pos.findInRange(FIND_STRUCTURES, 5, {
              filter: s => s.structureType == STRUCTURE_CONTAINER  && (_.sum(s.store) < s.storeCapacity)
              });
          let storage_target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: s => s.structureType == STRUCTURE_STORAGE && (_.sum(s.store) < s.storeCapacity)
          });

          if(extension) {
              if(creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(extension);
              }
          }
          else if(spawn) {
              if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(spawn);
              }
          }
          else if(container_target.length > 0){
              if(creep.transfer(container_target[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(container_target[0]);
              }
          }
          else if(storage_target){
              if(creep.transfer(storage_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(storage_target);
              }
          }
          else {
              console.log('The energy transport units are needing another job...(trying to store energy)');
          }
        }
    }
    else {
      var source = Game.getObjectById(creep.memory.resource_id);
      var container = source.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: s => s.structureType == STRUCTURE_CONTAINER
      });

      if((container.length > 0) ? (_.sum(container[0].store) > 0) : false) {
        var withdraw_report = creep.withdraw(container[0], RESOURCE_ENERGY);
        if(withdraw_report == ERR_NOT_IN_RANGE) {
            creep.moveTo(container[0]);
        }
      }
      else {
        var target_dropped_energy = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        if(target_dropped_energy.length > 0) {
            if(creep.pickup(target_dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target_dropped_energy[0]);
            }
        }
        else {
              creep.memory.storing = true;
          }
      }
    }
  }
}
