var roleUpgrader = require('role.upgrader');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }

	    if(creep.memory.building) {
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
                var road_targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                    filter: s => s.structureType == STRUCTURE_ROAD
                });
                if(road_targets.length) {
                    if(creep.build(road_targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(road_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    var ramp_targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                        filter: s => s.structureType == STRUCTURE_RAMPART
                    });
                    if(ramp_targets.length) {
                        if(creep.build(ramp_targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(ramp_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else {
                        var wall_targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
                            filter: s => s.structureType == STRUCTURE_WALL
                        });
                        if(wall_targets.length) {
                            if(creep.build(wall_targets[0]) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(wall_targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                            }
                        }
                        else {
                            roleUpgrader.run(creep);
                        }
                    }
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
                }
            }
	    }
	}
};

module.exports = roleBuilder;
