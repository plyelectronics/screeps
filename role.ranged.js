function attack_enemy(creep) {
  let closestHostileTower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
          filter: s => s.structureType == STRUCTURE_TOWER
      });
  if(closestHostileTower) {
      if(creep.rangedAttack(closestHostileTower) == ERR_NOT_IN_RANGE) {
              creep.moveTo(closestHostileTower);
          }
  }
  else {
      //Attacking Any Creeps
      var closestHostilecreep = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
      if(closestHostilecreep) {
          if(creep.rangedAttack(closestHostilecreep) == ERR_NOT_IN_RANGE) {
              creep.moveTo(closestHostilecreep);
          }
      }
      else {
          //Attack SPAWNs
          var closestHostilespawn = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          if(closestHostilespawn) {
              if(creep.rangedAttack(closestHostilespawn) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(closestHostilespawn);
              }
          }
          else {
              var closestHostilegeneral = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                  filter: s => s.structureType != STRUCTURE_CONTROLLER
              });
              if(closestHostilegeneral) {
                  if(creep.rangedAttack(closestHostilegeneral) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(closestHostilegeneral);
                  }
              }
          }
      }
  }
}


module.exports = {
  run(creep) {
    if(creep.room.name == creep.memory.target_room){
      var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id === creep.room.name});

      if(room_index != undefined) {

        if(Memory.room_profile[room_index].room_hostiles_array.length) {
          attack_enemy(creep);
        }
        else {
          // if ticks to live < 50% and in base move back to spawn for renewing
          // if ticks to live > 90% move to flag position
          var guard_flag_name = 'GUARD_' + Memory.room_profile[room_index].room_id;

            if(creep.memory.randevu_point) {
                for(i = -1; i < 5; i++) {
                    for(j = -1; j < 5; j++) {
                        if(((creep.pos.x + i) == Game.flags[guard_flag_name].pos.x) && ((creep.pos.y + j) == Game.flags[guard_flag_name].pos.y)) {
                            creep.memory.randevu_point = false;
                        }
                    }
                }

                if(creep.memory.randevu_point ? (creep.moveTo(Game.flags[guard_flag_name]) == ERR_NO_PATH) : false) {
                    creep.memory.randevu_point = false;
                }
            }
            else if(creep.ticksToLive < 500) {

                var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_SPAWN
                });
                if(spawn && (spawn.room.energyAvailable > 800)) {
                    creep.moveTo(spawn)
                }
            }
            else if(creep.ticksToLive > 1400) creep.memory.randevu_point = true;
        }
      }
      else {
        attack_enemy(creep);
      }
    }
  	else {
	    var targetPos = new RoomPosition(25, 25, creep.memory.target_room);
      var result = creep.moveTo(targetPos);
  	}
  }
}
