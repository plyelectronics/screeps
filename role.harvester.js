function transfer_resource (creep, container) {
    var resource_report;
    if(creep.carry.energy){ resource_report = creep.transfer(container, RESOURCE_ENERGY );}
    else if(creep.carry.power){ resource_report = creep.transfer(container, RESOURCE_POWER );}
    else if(creep.carry.U){ resource_report = creep.transfer(container, RESOURCE_UTRIUM );}
    else if(creep.carry.L){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM );}
    else if(creep.carry.K){ resource_report = creep.transfer(container, RESOURCE_KEANIUM );}
    else if(creep.carry.G){ resource_report = creep.transfer(container, RESOURCE_GHODIUM );}
    else if(creep.carry.Z){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM );}
    else if(creep.carry.O){ resource_report = creep.transfer(container, RESOURCE_OXYGEN );}
    else if(creep.carry.H){ resource_report = creep.transfer(container, RESOURCE_HYDROGEN );}
    else if(creep.carry.X){ resource_report = creep.transfer(container, RESOURCE_CATALYST );}
    else if(creep.carry.OH){ resource_report = creep.transfer(container, RESOURCE_HYDROXIDE );}
    else if(creep.carry.ZK){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_KEANITE );}
    else if(creep.carry.UL){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_LEMERGITE );}
    else if(creep.carry.UH){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_HYDRIDE );}
    else if(creep.carry.UO){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_OXIDE );}
    else if(creep.carry.KH){ resource_report = creep.transfer(container, RESOURCE_KEANIUM_HYDRIDE );}
    else if(creep.carry.KO){ resource_report = creep.transfer(container, RESOURCE_KEANIUM_OXIDE );}
    else if(creep.carry.LH){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM_HYDRIDE );}
    else if(creep.carry.LO){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM_OXIDE );}
    else if(creep.carry.ZH){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_HYDRIDE );}
    else if(creep.carry.ZO){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_OXIDE );}
    else if(creep.carry.GH){ resource_report = creep.transfer(container, RESOURCE_GHODIUM_HYDRIDE );}
    else if(creep.carry.GO){ resource_report = creep.transfer(container, RESOURCE_GHODIUM_OXIDE );}
    else if(creep.carry.UH2O){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_ACID );}
    else if(creep.carry.UHO2){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_ALKALIDE );}
    else if(creep.carry.KH2O){ resource_report = creep.transfer(container, RESOURCE_KEANIUM_ACID );}
    else if(creep.carry.KHO2){ resource_report = creep.transfer(container, RESOURCE_KEANIUM_ALKALIDE );}
    else if(creep.carry.LH2O){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM_ACID );}
    else if(creep.carry.LHO2){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM_ALKALIDE );}
    else if(creep.carry.ZH2O){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_ACID );}
    else if(creep.carry.ZHO2){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_ALKALIDE );}
    else if(creep.carry.GH2O){ resource_report = creep.transfer(container, RESOURCE_GHODIUM_ACID );}
    else if(creep.carry.GHO2){ resource_report = creep.transfer(container, RESOURCE_GHODIUM_ALKALIDE );}
    else if(creep.carry.XUH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_UTRIUM_ACID );}
    else if(creep.carry.XUHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_UTRIUM_ALKALIDE );}
    else if(creep.carry.XKH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_KEANIUM_ACID );}
    else if(creep.carry.XKHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_KEANIUM_ALKALIDE );}
    else if(creep.carry.XLH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_LEMERGIUM_ACID );}
    else if(creep.carry.XLHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE );}
    else if(creep.carry.XZH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_ZYNTHIUM_ACID );}
    else if(creep.carry.ZXHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE );}
    else if(creep.carry.XGH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_GHODIUM_ACID );}
    else if(creep.carry.XGHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_GHODIUM_ALKALIDE );}
    return resource_report;
}

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.storing && (_.sum(creep.carry) == 0)) {
            creep.memory.storing = false;
	    }
	    if(!creep.memory.storing &&  (_.sum(creep.carry) == creep.carryCapacity)) {
	        creep.memory.storing = true;
	    }

	    if(creep.memory.storing) {
	        let extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_EXTENSION && s.energy != 50
            });
            let spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_SPAWN && s.energy < 300
            });
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && (_.sum(s.store) < s.storeCapacity)
            });
            let storage_target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_STORAGE && (_.sum(s.store) < s.storeCapacity)
            });
            if(extension) {
                if(creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extension);
                }
            }
            else if(spawn) {
                if(creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn);
                }
            }
            else if(container){
                if(container!=undefined){
                    var resource_report = transfer_resource(creep, container);
                    if(resource_report == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
            }
            else if(storage_target){
                if(storage_target!=undefined){
                    var resource_report = transfer_resource(creep, storage_target);
                    if(resource_report == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                    if(resource_report == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage_target);
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
                        creep.moveTo(targets[0]);
                    }
                }
                else {
                    creep.memory.storing = false;
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            var harvest_report = creep.harvest(0);
            if(harvest_report == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[harvest_source_num]);
            }
            else if(harvest_report == ERR_NOT_ENOUGH_RESOURCES) {
                creep.memory.storing = true;
	            creep.moveTo(sources[harvest_source_num]);
            }
	    }
	}
};

module.exports = roleHarvester;
