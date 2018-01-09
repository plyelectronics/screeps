module.exports = {
  run(creep) {
    var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id == creep.memory.assigned_room});
    var energy_index = Memory.room_profile[room_index].room_energy.findIndex(function(find_energy){return find_energy.energy_id == creep.memory.resource_id});
    var source = Game.getObjectById(creep.memory.resource_id);

    if(!creep.memory.setup) {
      Memory.room_profile[room_index].room_energy[energy_index].energy_miner_id = creep.id;
      creep.memory.id = creep.id;
      creep.memory.setup = true;

      var container = source.pos.findInRange(FIND_STRUCTURES, 1, {
          filter: s => s.structureType == STRUCTURE_CONTAINER
      });

      if(container.length > 0) {
        creep.memory.container_id = container[0].id;
        Memory.room_profile[room_index].room_energy[energy_index].energy_container_id = container[0].id;
      }
      else {
        if((container.length == 0) && (Memory.room_profile[room_index].room_level > 1)) {
          var container_construction = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
              filter: s => s.structureType == STRUCTURE_CONTAINER
          });
          if(container_construction.length == 0) {
            var construction_pos = source.pos;
            construction_pos.y++;

            for(i = 0; i < 7; i++) {
              if(construction_pos.createConstructionSite(STRUCTURE_CONTAINER) == OK) {
                break;
              }

              if(i == 0) construction_pos.x++;
              else if((i > 0) && (i < 3)) construction_pos.y--;
              else if((i > 2) && (i < 5)) construction_pos.x--;
              else if((i > 4) && (i < 7)) construction_pos.y++;
            }
          }
          else {
            creep.memory.build_container_id = container_construction.id;
          }
        }
      }
    }

    var container = (creep.memory.container_id != undefined) ?
      Game.getObjectById(creep.memory.container_id) : undefined;
    var build_container = (creep.memory.build_container_id != undefined) ?
      Game.getObjectById(creep.memory.build_container_id) : undefined;

    if((container != undefined) ? ((creep.pos.x != container.pos.x) || (creep.pos.y != container.pos.y)) : false){
        creep.moveTo(container);
        return;
    }
    else if ((build_container != undefined) ? ((creep.pos.x != build_container.pos.x) || (creep.pos.y != build_container.pos.y)) : false){
        creep.moveTo(build_container);
        return;
    }

    //Move to resource and mine drop
    if((source.ticksToRegeneration > creep.ticksToLive) && (source.energy == 0)) {
        creep.suicide();
        return;
    }


    if(source.energy > 0){
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    else if(container != undefined) {
        if(creep.memory.repaircontainer && ((creep.carry.energy > 0) || (container.store.energy > 0))) {
            if((creep.carry.energy == 0) && (container.store.energy > 0)) creep.withdraw(container, RESOURCE_ENERGY);
            else creep.repair(container);

            if(container.hits >= (container.hitsMax * 0.95))
              creep.memory.repaircontainer = false;
        }
        else if(container.hits <= (container.hitsMax * 0.75))
            creep.memory.repaircontainer = true;
    }
    else if((build_container != undefined) && (creep.energy > 0)) {
        creep.build(build_container);
    }
  }
}
