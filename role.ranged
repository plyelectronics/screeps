var roleRanged = {

    /** @param {Creep} creep **/
run: function(creep) {
    if(creep.room.name == Memory.attackRoomID_1){
        //Attacking any Tower Defense
        let closestHostileTower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_TOWER
            });
        if(closestHostileTower) {
            if(creep.rangedAttack(closestHostileTower) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostileTower);
                }
        }
        else {
            //Attacking Any Creeps
            var closestHostilecreep = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
            if(closestHostilecreep) {
                if(creep.rangedAttack(closestHostilecreep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestHostilecreep);
                }
            }
            else {
                //Attack SPAWNs
                var closestHostilespawn = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if(closestHostilespawn && false) {
                    if(creep.rangedAttack(closestHostilespawn) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestHostilespawn);
                    }
                }
                else {
                    var closestHostilegeneral = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                        filter: s => s.structureType != STRUCTURE_CONTROLLER
                    });
                    if(closestHostilegeneral) {
                        if(creep.rangedAttack(closestHostilegeneral) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(closestHostilegeneral);
                        }
                    }
                }
            }
        }
    }
	else {
	    var targetPos = new RoomPosition(25, 25, Memory.attackRoomID_1);
        var result = creep.moveTo(targetPos);
	}
}

};

module.exports = roleRanged;
