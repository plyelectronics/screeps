var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

      //var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      //if(closestHostile && (creep.memory.role == 'upgrader')) {
      //    creep.say('🔪 Attack')
      //    if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
      //        creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ff0000'}});
      //    }
      //}
      //else {

          if(creep.memory.upgrading && creep.carry.energy == 0) {
              creep.memory.upgrading = false;
        }
        else if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
              if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.room.controller);
              }
          }
          else {
              let storage_cont = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                  filter: s => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
              });
              if(storage_cont){
                  if(storage_cont!=undefined){
                      if(creep.withdraw(storage_cont, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                          creep.moveTo(storage_cont);
                      }
                  }
              }
              else {
                  let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                      filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
                  });
                  if(container){
                      if(container!=undefined){
                          if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                              creep.moveTo(container);
                          }
                      }
                  }
              }
          }
      //}
	}
};

module.exports = roleUpgrader;
