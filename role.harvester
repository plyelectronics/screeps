var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.storing && creep.carry.energy == 0) {
            creep.memory.storing = false;
            creep.say('🔄 Harvesting');
	    }
	    if(!creep.memory.storing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.storing = true;
	        creep.say('🔄 Storing Energy');
	    }

	    if(creep.memory.storing) {
	        let extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_EXTENSION && s.energy != 50
            });
            let spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_SPAWN && s.energy < 300
            });
            let tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_TOWER && s.energy < 1000
            });
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] < s.storeCapacity
            });
            let storage_target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] < s.storeCapacity
            });
            if(extension) {
                if(creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extension, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(spawn) {
                if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(container){
                if(container!=undefined){
                    if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
            }
            else if(storage_target){
                if(storage_target!=undefined){
                    if(creep.transfer(storage_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage_target, {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
            }
            else if(tower){
                if(tower!=undefined){
                    if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffff00'}});
                    }
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    //creep.say('All Storage full...');
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            var harvest_source_num = 1;
            if(creep.memory.role == 'builder') harvest_source_num = 0;

            var harvest_report = creep.harvest(sources[harvest_source_num]);
            if(harvest_report == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[harvest_source_num], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else if(harvest_report == ERR_NOT_ENOUGH_RESOURCES) {
                creep.memory.storing = true;
	            creep.say('🔄 Storing Energy');
            }
	    }
	}
};

module.exports = roleHarvester;
