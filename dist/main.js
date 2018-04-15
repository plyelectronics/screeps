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
var roleScout_Bot = require('role.scout');
var roleController_Bot = require('role.controller_bot');

function scout_room(room_name) {
  if(Memory.room_scout_queue === undefined) Memory.room_scout_queue = [];
  Memory.room_scout_queue.push(
    {
      target_room : room_name,
      base_id : base_id
    });
  console.log('Adding room ' + room_name + ' to scout queue, from base ' + base_id + '.');
}

module.exports.loop = function () {

    //settingsProfiler.room_profile(Game.rooms['E84S27'],0);
    //settingsProfiler.room_profile(Game.rooms['E83S27'],0);
    if(Memory.base_profile === undefined) {
      for(const i in Game.spawns) {
        var base_num = settingsProfiler.base_profile(Game.spawns[i].room.name);
        settingsProfiler.room_profile(Game.spawns[i].room.name, base_num);
      }
    }

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
        else if(creep.memory.role == 'ranged_defense') {
            roleRanged.run(creep);
        }
        else if(creep.memory.role == 'scout_bot') {
            roleScout_Bot.scout(creep);
        }
        else if(creep.memory.role == 'controller_bot') {
          if(creep.memory.action === 'reserve')
            roleController_Bot.reserve_controller(creep);
          else if(creep.memory.action === 'claim')
            roleController_Bot.claim_controller(creep);
          else if(creep.memory.action === 'attack')
            roleController_Bot.attack_controller(creep);
        }
    }

    var cpu_used = Game.cpu.getUsed();
    if(true) {
        console.log('USED CPU: ' + Game.cpu.getUsed());
        console.log('BUCKET CPU: ' + Game.cpu.bucket);
    }
}
