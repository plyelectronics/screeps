var stateEnum = {
    FIX_RAMP: 0,
    SEARCH_WALL:1,
}
var state = stateEnum.SEARCH_RAMP_INIT;
StructureTower.prototype.defend =
    function () {
                        console.log('Searching for enemy');
                var hostiles = this.room.find(FIND_HOSTILE_CREEPS);
                if(hostiles.length > 0) {
                    console.log('enemey found');
                    var username = hostiles[0].owner.username;
                    Game.notify(`User ${username} spotted in this.room.name`);
                    var towers = this.room.find(
                        FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                    towers.forEach(tower => tower.attack(hostiles[0]));
                }else{

                console.log('wall')
                var repair_target = this.room.find(FIND_STRUCTURES, {
                filter: (s) => s.hits < 100000 && s.structureType==STRUCTURE_WALL
                });
                if(repair_target){
                    var towers = this.room.find(
                    FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                    towers.forEach(tower => tower.repair(repair_target[0]));
                }
                state = stateEnum.FIX_RAMP;

                }
      

    };
