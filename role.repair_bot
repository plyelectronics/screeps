var roleRepair_Bot = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.fixing && creep.carry.energy == 0) {
            creep.memory.fixing = false;
            creep.say('🔄 Getting Resources');
	    }
	    if(!creep.memory.fixing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.fixing = true;
	        creep.say('🔨 Filling Tower');
	    }

	    if(creep.memory.fixing) {
	        //var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            //    filter: (structure) => structure.hits < structure.hitsMax/2
            //});
            //if(closestDamagedStructure) {
            //    if(creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
            //        creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffd700'}});
            //    }
            //}
            //else {
	        //    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            //    if(targets.length) {
            //        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            //            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            //        }
            //    }
            //}

            let tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_TOWER && s.energy < 1000
            });
            if(tower){
                if(tower!=undefined){
                    if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
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
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
	    }
	}
};

module.exports = roleRepair_Bot;
