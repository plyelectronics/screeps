var roleBuilder = require('role.builder');
var roleHarvester = require('role.harvester');

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
            roleHarvester.run(creep);
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

                let tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_TOWER && (s.energy < (s.energyCapacity * .35))
                });
                if(tower){
                    if(tower!=undefined){
                        creep.memory.id_fill = tower.id;
                        creep.memory.status_fill = true;
                    }
                }else{
                    //roleBuilder.run(creep);
                    //roleHarvester.run(creep);
                    creep.memory.run_harvest = true;
                }
	        }

	    }
	    else {

	         var energy_dropped = creep.pos.findClosestByPath(
            FIND_DROPPED_RESOURCES,
            1
        );

        if (energy_dropped) {
            if(creep.pickup(energy_dropped) == ERR_NOT_IN_RANGE) {
                creep.moveTo(energy_dropped, {visualizePathStyle: {stroke: '#ffff00'}});
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
                let storage_cont = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
                });
                if(storage_cont){
                    if(storage_cont!=undefined){
                        if(creep.withdraw(storage_cont, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage_cont, {visualizePathStyle: {stroke: '#ffff00'}});
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
	}
}

};

module.exports = roleRepair_Bot;
