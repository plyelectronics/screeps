var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        //Decision tree if needing to fill up on energy or not
        if(creep.memory.upgrading && creep.carry.energy == 0) {
              creep.memory.upgrading = false;
        }
        else if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        // Upgrade Controller
        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }

            return;
        }

        // Continue if needing to fill up energy reserves

        // Withdraw Energy from room's storage
        if(creep.room.storage ? (creep.room.storage.store[RESOURCE_ENERGY] > 0) : false){
            if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.storage);
            }

            return;
        }

        // Withdraw Energy from closest container
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
};

module.exports = roleUpgrader;
