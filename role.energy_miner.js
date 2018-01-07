module.exports = {
  run(creep) {
    var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id == creep.memory.assigned_room});
    var energy_index = Memory.room_profile[room_index].room_energy.findIndex(function(find_energy){return find_energy.energy_id == creep.memory.resource_id});


    if(!creep.memory.setup) {
      creep.memory.id = creep.id;
      creep.memory.setup = true;
    }

    //Move to resource and mine drop
    var source = Game.getObjectById(creep.memory.resource_id);

    if((source.ticksToRegeneration > creep.ticksToLive) && (source.energy == 0)) {
        creep.suicide();
    }

    var container = source.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: s => s.structureType == STRUCTURE_CONTAINER
    });

    if(container.length > 0) {
      creep.memory.build_container = false;
      if(creep.pos != container[0].pos){
          creep.moveTo(container[0]);
      }
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
              creep.memory.build_container = true;
              break;
            }
            if(i == 0) construction_pos.x++;
            else if((i > 0) && (i < 3)) construction_pos.y--;
            else if((i > 2) && (i < 5)) construction_pos.x--;
            else if((i > 4) && (i < 7)) construction_pos.y++;
          }
        }
    }
    }

    if(source.energy > 0){
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    else if((container.length > 0)) {
        if(creep.memory.repaircontainer) {
            if((creep.carry.energy == 0) && (container[0].energy > 0)) creep.withdraw(container[0], RESOURCE_ENERGY);
            else creep.repair(container[0]);

            if(container[0].hits >= (container[0].hitsMax * 0.95))
            creep.memory.repaircontainer = false;
        }
        else if(container[0].hits <= (container[0].hitsMax * 0.75))
            creep.memory.repaircontainer = true;
    }
    else if((creep.memory.build_container) && (creep.energy > 0)) {
        var container_construction = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        });
        console.log('Number of construction sites' + container_construction.length);
        if((container_construction.length > 0) && (creep.energy > 0)) creep.build(container_construction[0]);
    }
  }
}
