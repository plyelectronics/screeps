require('prototype.tower');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair_Bot = require('role.repair_bot');
var roleBerserker = require('role.berserker');
var roleRanged = require('role.ranged');
var roleReserves = require('role.troop_hold');
var settingsProfiler = require('settings.profiler');
var creep_organizer = require('settings.creep_organizer');
var roleEMiner = require('role.energy_miner');
var roleETransport = require('role.energy_transport');

module.exports.loop = function () {

    //settingsProfiler.room_profile(Game.rooms['E84S27'],0);
    //settingsProfiler.room_profile(Game.rooms['E83S27'],0);
    creep_organizer.creep_cleanup();
    creep_organizer.creep_generator(0);

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    for (let tower of towers) {
        tower.defend();
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'energy_miner') {
            roleEMiner.run(creep);
        }
        else if(creep.memory.role == 'energy_transport') {
            roleETransport.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'repair_bot') {
            roleRepair_Bot.run(creep);
        }
    }

    var cpu_used = Game.cpu.getUsed();
    if(true) {
        console.log('USED CPU: ' + Game.cpu.getUsed());
        console.log('BUCKET CPU: ' + Game.cpu.bucket);
    }
}
