var roleUpgrader = require('role.upgrader');

var roleRepair_Bot = {
  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.fixing && _.sum(creep.carry) == 0) {
          creep.memory.fixing = false;
          creep.memory.run_harvest = false;
    }
    if(!creep.memory.fixing && (_.sum(creep.carry) == creep.carryCapacity)) {
        creep.memory.fixing = true;
    }

    if(creep.memory.run_harvest) {
      if((creep.memory.wait_time !== undefined) ? ((creep.memory.wait_time % 20) == 0) : (creep.memory.wait_time = 0)){
        let tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.structureType == STRUCTURE_TOWER && (s.energy < (s.energyCapacity * .35))
        });
        if(tower){
          if(tower!=undefined){
              creep.memory.id_fill = tower.id;
              creep.memory.status_fill = true;
              creep.memory.run_harvest = false;
          }
        }
      }

      creep.memory.wait_time++;

      var targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
            filter: s => s.structureType != STRUCTURE_WALL &&
            s.structureType != STRUCTURE_RAMPART &&
            s.structureType != STRUCTURE_ROAD
        });
        if(targets.length) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var other_targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(other_targets.length) {
                if(creep.build(road_targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(road_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
              roleUpgrader.run(creep);
            }
        }
    }
    else if(creep.memory.fixing) {

        if(creep.memory.status_fill) {
            var fill_id_object = Game.getObjectById(creep.memory.id_fill);
            if(fill_id_object.energy >= (fill_id_object.energyCapacity*0.95)) {
                creep.memory.status_fill = false;
            }
            else {
                if(creep.transfer(fill_id_object, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(fill_id_object, {visualizePathStyle: {stroke: '#ffff00'}});
                  }
            }
        }
        else {
          let tower = creep.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: s => s.structureType == STRUCTURE_TOWER && (s.energy < (s.energyCapacity * .35))
          });
          if(tower){
              if(tower!=undefined){
                  creep.memory.id_fill = tower.id;
                  creep.memory.status_fill = true;
              }
          }else{
              creep.memory.run_harvest = true;
              creep.memory.wait_time = 0;
          }
        }
    }
    else {
        var energy_dropped = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,1);
        if (energy_dropped) {
          if(creep.pickup(energy_dropped) == ERR_NOT_IN_RANGE) {
             creep.moveTo(energy_dropped);
           }
           return;
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
    }
}

};

module.exports = roleRepair_Bot;
