var roleUpgrader = require('role.upgrader');

var roleRepair_Bot = {
  /** @param {Creep} creep **/
  run: function(creep) {
    var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id === creep.room.name});

    var carried_resource = _.findKey(creep.carry);
    if((carried_resource !== undefined) ? carried_resource !== RESOURCE_ENERGY : false)
    {
        if(creep.transfer(creep.room.storage, carried_resource) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(creep.room.storage);
        }
        return;
    }

    if(creep.memory.fixing && _.sum(creep.carry) == 0) {
          creep.memory.fixing = false;
          creep.memory.run_harvest = false;
    }
    if(!creep.memory.fixing && (_.sum(creep.carry) == creep.carryCapacity)) {
        creep.memory.fixing = true;

        // Evaluating if there is enough energy to warrent filling up the terminal to sell on the marketplace
        if(creep.room.terminal){
            if(creep.room.storage.store[RESOURCE_ENERGY] < (creep.room.storage.storeCapacity * .50))
            {
                creep.memory.fill_terminal = false;
            }
            else if(creep.room.storage.store[RESOURCE_ENERGY] > (creep.room.storage.storeCapacity * .80))
            {
                creep.memory.fill_terminal = true;
            }
        }
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
                if(creep.build(other_targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(other_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(creep.memory.fill_terminal)
            {
              if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
              {
                creep.moveTo(creep.room.terminal, {visualizePathStyle: {stroke: '#ffff00'}});
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
        if (energy_dropped && (!Memory.room_profile[room_index].room_hostiles)) {
          if(creep.pickup(energy_dropped) == ERR_NOT_IN_RANGE) {
             creep.moveTo(energy_dropped);
           }
           return;
        }
        else {
          if(creep.room.storage ? (creep.room.storage.store[RESOURCE_ENERGY] > 0) : false)
          {
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.storage);
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
