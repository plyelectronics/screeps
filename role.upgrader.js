var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile && (creep.memory.role == 'upgrader')) {
            creep.say('🔪 Attack')
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        else {

            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
	        }
	        else if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	            creep.memory.upgrading = true;
	            creep.say('⚡ upgrade');
	        }

	        if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else {
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
                });
                if(container){
                    if(container!=undefined){
                        if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container, {visualizePathStyle: {stroke: '#ffff00'}});
                        }
                    }
                }
                else {
                    //var sources = creep.room.find(FIND_SOURCES);
                    //if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    //    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    //}
                }
            }
        }
	}
};

module.exports = roleUpgrader;
