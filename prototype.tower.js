/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.tower');
 * mod.thing == 'a thing'; // true
 */
StructureTower.prototype.defend = function () {
    var hostiles = this.room.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        console.log('enemey found');
        var username = hostiles[0].owner.username;
        Game.notify(`User ${username} spotted in this.room.name`);
        var towers = this.room.find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        towers.forEach(tower => tower.attack(hostiles[0]));
    }else{

        var repair_emergency = this.room.find(FIND_STRUCTURES, {
            filter: (s) => (s.hits <= (s.hitsMax * 0.15) &&
            ((s.structureType != STRUCTURE_WALL) &&
            (s.structureType != STRUCTURE_CONTROLLER)))
        });
        if(repair_emergency.length > 0) {
            Memory.repairContinue = true;
            Memory.repairID = repair_emergency[0].id;
        }

        if(Memory.repairContinue) {
            var repair_id_object = Game.getObjectById(Memory.repairID);
            if(repair_id_object) {
                if(repair_id_object.hits >= (repair_id_object.hitsMax * 0.95)) {
                    Memory.repairContinue = false;
                }
                else {
                    var towers = this.room.find(
                        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                    towers.forEach(tower => tower.repair(repair_id_object));
                }
            }
            else {
                Memory.repairContinue = false;
            }
        }
        else {
            var repair_needy = this.room.find(FIND_STRUCTURES, {
                filter: (s) => (s.hits <= (s.hitsMax * 0.50) &&
                ((s.structureType != STRUCTURE_WALL) &&
                (s.structureType != STRUCTURE_CONTROLLER) &&
                (s.structureType != STRUCTURE_RAMPART)))
            });

            if(repair_needy.length > 0){
                var towers = this.room.find(
                    FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                towers.forEach(tower => tower.repair(repair_needy[0]));
                Memory.repairID = repair_needy[0].id;
                Memory.repairContinue = true;
            }
            else {
                var repair_wall_low = this.room.find(FIND_STRUCTURES, {
            filter: (s) => ( s.hits <= (s.hitsMax * .0001) &&
                ((s.structureType == STRUCTURE_WALL) ||
                (s.structureType == STRUCTURE_RAMPART)))
            });

                if(repair_wall_low.length > 0){
                    console.log('very low rampart...');
                    var towers = this.room.find(
                        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                    towers.forEach(tower => tower.repair(repair_wall_low[0]));
                }
                else {
                    var repair_wall = this.room.find(FIND_STRUCTURES, {
                        filter: (s) => (s.hits <= (s.hitsMax * 0.01)) &&
                        ((s.structureType == STRUCTURE_WALL) ||
                        (s.structureType == STRUCTURE_RAMPART))
                    });

                    if(repair_wall.length > 0){
                        var towers = this.room.find(
                            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                        towers.forEach(tower => tower.repair(repair_wall[0]));
                    }
                }
            }
        }
    }

    };
