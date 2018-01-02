require('prototype.tower');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepair_Bot = require('role.repair_bot');
var roleBerserker = require('role.berserker');
var roleRanged = require('role.ranged');
var roleReserves = require('role.troop_hold');
var settingsProfiler = require('settings.profiler');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    var repair_bots = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair_bot');
    console.log('Repair Bot: ' + repair_bots.length);

    var berserkers = _.filter(Game.creeps, (creep) => creep.memory.role == 'berserker');
    console.log('Berserkers: ' + berserkers.length);

    var rangers = _.filter(Game.creeps, (creep) => creep.memory.role == 'ranged');
    console.log('Rangers: ' + rangers.length);

    var hostiles = Game.rooms['E84S27'].find(FIND_HOSTILE_CREEPS);

    var low_creeps = false;

    if(harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        if (harvesters.length == 0) Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
        else if (harvesters.length == 1) Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
        else Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});
        low_creeps = true;
    }
    else if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        if (upgraders.length < 2) Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
        else Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,ATTACK], newName,
            {memory: {role: 'upgrader'}});
        low_creeps = true;
    }
    else if(builders.length < 3) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
        low_creeps = true;
    }
    else if(repair_bots.length < 2) {
        var newName = 'Repair_Bot' + Game.time;
        console.log('Spawning new repair_bot: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'repair_bot'}});
        low_creeps = true;
    }
    else if((berserkers.length < 8) && (hostiles.length > 0)) {
        var newName = 'Berserker' + Game.time;
        console.log('Spawning new berserker: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK,MOVE,ATTACK], newName,
            {memory: {role: 'berserker'}});
        low_creeps = true;
    }
    else if((rangers.length < 5) && (hostiles.length > 0)) {
        var newName = 'Ranger' + Game.time;
        console.log('Spawning new ranger: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,MOVE,RANGED_ATTACK,ATTACK], newName,
            {memory: {role: 'ranged'}});
        low_creeps = true;
    }


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
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            if(Room.energyAvailable < (Room.energyCapacityAvailable/2) || low_creeps)
                creep.memory.temporary_harvester = 'on';
            if(creep.memory.temporary_harvester == 'on')
                roleHarvester.run(creep);
            else roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'repair_bot') {
            settingsProfiler.profile(creep);
            roleRepair_Bot.run(creep);
        }
        else if(creep.memory.role == 'berserker') {
            //if (berserkers.length >= 4) {
                roleBerserker.run(creep);
            //}
            //else roleReserves.reserves(creep);
        }
        else if(creep.memory.role == 'ranged') {
            roleRanged.run(creep);
        }
    }

    var cpu_used = Game.cpu.getUsed();
    if(true) {
        console.log('USED CPU: ' + Game.cpu.getUsed());
        console.log('BUCKET CPU: ' + Game.cpu.bucket);
    }
}
