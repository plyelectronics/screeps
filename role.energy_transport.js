function transfer_resource (creep, container) {
    var resource_report;
    if(creep.carry.energy){ resource_report = creep.transfer(container, RESOURCE_ENERGY );return resource_report;}
    else if(creep.carry.power){ resource_report = creep.transfer(container, RESOURCE_POWER );return resource_report;}
    else if(creep.carry.U){ resource_report = creep.transfer(container, RESOURCE_UTRIUM );return resource_report;}
    else if(creep.carry.L){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM );return resource_report;}
    else if(creep.carry.K){ resource_report = creep.transfer(container, RESOURCE_KEANIUM );return resource_report;}
    else if(creep.carry.G){ resource_report = creep.transfer(container, RESOURCE_GHODIUM );return resource_report;}
    else if(creep.carry.Z){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM );return resource_report;}
    else if(creep.carry.O){ resource_report = creep.transfer(container, RESOURCE_OXYGEN );return resource_report;}
    else if(creep.carry.H){ resource_report = creep.transfer(container, RESOURCE_HYDROGEN );return resource_report;}
    else if(creep.carry.X){ resource_report = creep.transfer(container, RESOURCE_CATALYST );return resource_report;}
    else if(creep.carry.OH){ resource_report = creep.transfer(container, RESOURCE_HYDROXIDE );return resource_report;}
    else if(creep.carry.ZK){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_KEANITE );return resource_report;}
    else if(creep.carry.UL){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_LEMERGITE );return resource_report;}
    else if(creep.carry.UH){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_HYDRIDE );return resource_report;}
    else if(creep.carry.UO){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_OXIDE );return resource_report;}
    else if(creep.carry.KH){ resource_report = creep.transfer(container, RESOURCE_KEANIUM_HYDRIDE );return resource_report;}
    else if(creep.carry.KO){ resource_report = creep.transfer(container, RESOURCE_KEANIUM_OXIDE );return resource_report;}
    else if(creep.carry.LH){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM_HYDRIDE );return resource_report;}
    else if(creep.carry.LO){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM_OXIDE );return resource_report;}
    else if(creep.carry.ZH){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_HYDRIDE );return resource_report;}
    else if(creep.carry.ZO){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_OXIDE );return resource_report;}
    else if(creep.carry.GH){ resource_report = creep.transfer(container, RESOURCE_GHODIUM_HYDRIDE );return resource_report;}
    else if(creep.carry.GO){ resource_report = creep.transfer(container, RESOURCE_GHODIUM_OXIDE );return resource_report;}
    else if(creep.carry.UH2O){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_ACID );return resource_report;}
    else if(creep.carry.UHO2){ resource_report = creep.transfer(container, RESOURCE_UTRIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.KH2O){ resource_report = creep.transfer(container, RESOURCE_KEANIUM_ACID );return resource_report;}
    else if(creep.carry.KHO2){ resource_report = creep.transfer(container, RESOURCE_KEANIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.LH2O){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM_ACID );return resource_report;}
    else if(creep.carry.LHO2){ resource_report = creep.transfer(container, RESOURCE_LEMERGIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.ZH2O){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_ACID );return resource_report;}
    else if(creep.carry.ZHO2){ resource_report = creep.transfer(container, RESOURCE_ZYNTHIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.GH2O){ resource_report = creep.transfer(container, RESOURCE_GHODIUM_ACID );return resource_report;}
    else if(creep.carry.GHO2){ resource_report = creep.transfer(container, RESOURCE_GHODIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.XUH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_UTRIUM_ACID );return resource_report;}
    else if(creep.carry.XUHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_UTRIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.XKH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_KEANIUM_ACID );return resource_report;}
    else if(creep.carry.XKHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_KEANIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.XLH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_LEMERGIUM_ACID );return resource_report;}
    else if(creep.carry.XLHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.XZH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_ZYNTHIUM_ACID );return resource_report;}
    else if(creep.carry.ZXHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE );return resource_report;}
    else if(creep.carry.XGH2O){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_GHODIUM_ACID );return resource_report;}
    else if(creep.carry.XGHO2){ resource_report = creep.transfer(container, RESOURCE_CATALYZED_GHODIUM_ALKALIDE );return resource_report;}
    return -10;
}

function withdraw_resource (creep, container) {
  var resource_report;
  if(container.store.energy){ resource_report = creep.withdraw(container, RESOURCE_ENERGY );return resource_report;}
  else if(container.store.power){ resource_report = creep.withdraw(container, RESOURCE_POWER );return resource_report;}
  else if(container.store.U){ resource_report = creep.withdraw(container, RESOURCE_UTRIUM );return resource_report;}
  else if(container.store.L){ resource_report = creep.withdraw(container, RESOURCE_LEMERGIUM );return resource_report;}
  else if(container.store.K){ resource_report = creep.withdraw(container, RESOURCE_KEANIUM );return resource_report;}
  else if(container.store.G){ resource_report = creep.withdraw(container, RESOURCE_GHODIUM );return resource_report;}
  else if(container.store.Z){ resource_report = creep.withdraw(container, RESOURCE_ZYNTHIUM );return resource_report;}
  else if(container.store.O){ resource_report = creep.withdraw(container, RESOURCE_OXYGEN );return resource_report;}
  else if(container.store.H){ resource_report = creep.withdraw(container, RESOURCE_HYDROGEN );return resource_report;}
  else if(container.store.X){ resource_report = creep.withdraw(container, RESOURCE_CATALYST );return resource_report;}
  else if(container.store.OH){ resource_report = creep.withdraw(container, RESOURCE_HYDROXIDE );return resource_report;}
  else if(container.store.ZK){ resource_report = creep.withdraw(container, RESOURCE_ZYNTHIUM_KEANITE );return resource_report;}
  else if(container.store.UL){ resource_report = creep.withdraw(container, RESOURCE_UTRIUM_LEMERGITE );return resource_report;}
  else if(container.store.UH){ resource_report = creep.withdraw(container, RESOURCE_UTRIUM_HYDRIDE );return resource_report;}
  else if(container.store.UO){ resource_report = creep.withdraw(container, RESOURCE_UTRIUM_OXIDE );return resource_report;}
  else if(container.store.KH){ resource_report = creep.withdraw(container, RESOURCE_KEANIUM_HYDRIDE );return resource_report;}
  else if(container.store.KO){ resource_report = creep.withdraw(container, RESOURCE_KEANIUM_OXIDE );return resource_report;}
  else if(container.store.LH){ resource_report = creep.withdraw(container, RESOURCE_LEMERGIUM_HYDRIDE );return resource_report;}
  else if(container.store.LO){ resource_report = creep.withdraw(container, RESOURCE_LEMERGIUM_OXIDE );return resource_report;}
  else if(container.store.ZH){ resource_report = creep.withdraw(container, RESOURCE_ZYNTHIUM_HYDRIDE );return resource_report;}
  else if(container.store.ZO){ resource_report = creep.withdraw(container, RESOURCE_ZYNTHIUM_OXIDE );return resource_report;}
  else if(container.store.GH){ resource_report = creep.withdraw(container, RESOURCE_GHODIUM_HYDRIDE );return resource_report;}
  else if(container.store.GO){ resource_report = creep.withdraw(container, RESOURCE_GHODIUM_OXIDE );return resource_report;}
  else if(container.store.UH2O){ resource_report = creep.withdraw(container, RESOURCE_UTRIUM_ACID );return resource_report;}
  else if(container.store.UHO2){ resource_report = creep.withdraw(container, RESOURCE_UTRIUM_ALKALIDE );return resource_report;}
  else if(container.store.KH2O){ resource_report = creep.withdraw(container, RESOURCE_KEANIUM_ACID );return resource_report;}
  else if(container.store.KHO2){ resource_report = creep.withdraw(container, RESOURCE_KEANIUM_ALKALIDE );return resource_report;}
  else if(container.store.LH2O){ resource_report = creep.withdraw(container, RESOURCE_LEMERGIUM_ACID );return resource_report;}
  else if(container.store.LHO2){ resource_report = creep.withdraw(container, RESOURCE_LEMERGIUM_ALKALIDE );return resource_report;}
  else if(container.store.ZH2O){ resource_report = creep.withdraw(container, RESOURCE_ZYNTHIUM_ACID );return resource_report;}
  else if(container.store.ZHO2){ resource_report = creep.withdraw(container, RESOURCE_ZYNTHIUM_ALKALIDE );return resource_report;}
  else if(container.store.GH2O){ resource_report = creep.withdraw(container, RESOURCE_GHODIUM_ACID );return resource_report;}
  else if(container.store.GHO2){ resource_report = creep.withdraw(container, RESOURCE_GHODIUM_ALKALIDE );return resource_report;}
  else if(container.store.XUH2O){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_UTRIUM_ACID );return resource_report;}
  else if(container.store.XUHO2){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_UTRIUM_ALKALIDE );return resource_report;}
  else if(container.store.XKH2O){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_KEANIUM_ACID );return resource_report;}
  else if(container.store.XKHO2){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_KEANIUM_ALKALIDE );return resource_report;}
  else if(container.store.XLH2O){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_LEMERGIUM_ACID );return resource_report;}
  else if(container.store.XLHO2){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE );return resource_report;}
  else if(container.store.XZH2O){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_ZYNTHIUM_ACID );return resource_report;}
  else if(container.store.ZXHO2){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE );return resource_report;}
  else if(container.store.XGH2O){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_GHODIUM_ACID );return resource_report;}
  else if(container.store.XGHO2){ resource_report = creep.withdraw(container, RESOURCE_CATALYZED_GHODIUM_ALKALIDE );return resource_report;}
  return -10;
}

function moveTo_w_road_fix (creep, target) {
  if(creep.carry.energy > 0) {
    var const_road = creep.pos.lookFor(LOOK_CONSTRUCTION_SITES);
    var target_road = creep.pos.lookFor(LOOK_STRUCTURES);
    if(const_road.length > 0) {
      creep.build(const_road[0]);
    }
    else if((target_road.length > 0 ?
      ((target_road[0].structureType == STRUCTURE_ROAD) && (target_road[0].hits < (target_road[0].hitsMax * .40))) :
      false)
    ) {

      creep.memory.repair_road_flag = true;
      creep.memory.repair_road_id = target_road[0].id;
    }
    else {
        creep.moveTo(target);
    }
  }
  else {
    creep.moveTo(target);
  }
}

module.exports = {
  run(creep) {
    var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id == creep.memory.assigned_room});
    var energy_index = Memory.room_profile[room_index].room_energy.findIndex(function(find_energy){return find_energy.energy_id == creep.memory.resource_id});
    var source = Game.getObjectById(creep.memory.resource_id);

    //Setup
    if(!creep.memory.setup) {
      Memory.room_profile[room_index].room_energy[energy_index].energy_transport_id = creep.id;
      creep.memory.id = creep.id;

      var container = source.pos.findInRange(FIND_STRUCTURES, 1, {
          filter: s => s.structureType == STRUCTURE_CONTAINER
      });

      if(container.length > 0) {
        creep.memory.container_id = container[0].id;
        Memory.room_profile[room_index].room_energy[energy_index].energy_container_id = container[0].id;
      }
      else {
        var container_construction = source.pos.findInRange(FIND_CONSTRUCTION_SITES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        });
        if(container_construction.length > 0) {
          creep.memory.build_container_id = container_construction.id;
        }
      }

      var first_base_spawn = Game.getObjectById(Memory.base_profile[Memory.room_profile[room_index].room_home_base].base_spawn[0].spawn_id);
      var container_targets = first_base_spawn.pos.findInRange(FIND_STRUCTURES, 5, {
          filter: s => s.structureType == STRUCTURE_CONTAINER
          });
      for(i in container_targets) {
        creep.memory.container_targets.push(container_targets[i].id);
      }
      let storage_targets = first_base_spawn.pos.findInRange(FIND_STRUCTURES, 5, {
          filter: s => s.structureType == STRUCTURE_STORAGE
      });
      for(i in storage_targets) {
        creep.memory.storage_targets.push(storage_targets[i].id);
      }

      creep.memory.setup = true;
    }

    //Start of execution
    if(creep.ticksToLive == 25){
      if(Memory.room_profile[room_index].room_energy[energy_index].energy_transport_id == creep.id)
        Memory.room_profile[room_index].room_energy[energy_index].energy_transport_id = 'na';
    }

    //Decision whether to refill energy or drop off energy
    if(creep.memory.storing && (_.sum(creep.carry) == 0)) {
        creep.memory.storing = false;
    }
    else if(!creep.memory.storing && (_.sum(creep.carry) == creep.carryCapacity)) {
        creep.memory.storing = true;
    }

    //If Storing....
    if(creep.memory.repair_road_flag) {
      var road_to_fix = Game.getObjectById(creep.memory.repair_road_id);
      if(road_to_fix != undefined) {
        creep.repair(road_to_fix);

        if((road_to_fix.hits > (road_to_fix.hitsMax * .95)) || (creep.carry.energy == 0)) {
          creep.memory.repair_road_flag = false;
        }
      }
      else {
            creep.memory.repair_road_flag = false;
        }
    }
    else if(creep.memory.storing) {

      var build_container = (creep.memory.build_container_id != undefined) ?
        Game.getObjectById(creep.memory.build_container_id) : undefined;

      if(build_container != undefined) {
        if(creep.build(build_container) == ERR_NOT_IN_RANGE) {
            moveTo_w_road_fix(creep, build_container);
        }
        return;
      }
      else if(creep.room.energyAvailable < creep.room.energyCapacityAvailable) {
        let extension = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: s => ((s.structureType == STRUCTURE_EXTENSION) && (s.energy != 50))
        });
        if(extension) {
          if(transfer_resource(creep, extension) == ERR_NOT_IN_RANGE) {
              moveTo_w_road_fix(creep, extension);
          }
          return;
        }
        else {
          let spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: s => s.structureType == STRUCTURE_SPAWN && s.energy < 300
          });
          if(transfer_resource(creep, spawn) == ERR_NOT_IN_RANGE) {
              moveTo_w_road_fix(creep, spawn);
          }
          return;
        }
      }
      else {
        for(i in creep.memory.storage_targets) {
          var storage = Game.getObjectById(creep.memory.storage_targets[i]);
          if(_.sum(storage.store) < storage.storeCapacity) {
            if(transfer_resource(creep, storage) == ERR_NOT_IN_RANGE) {
                moveTo_w_road_fix(creep, storage);
            }
            return;
          }
        }
        for(i in creep.memory.container_targets) {
          var container = Game.getObjectById(creep.memory.container_targets[i]);
          if(_.sum(container.store) < storage.storeCapacity) {
            if(transfer_resource(creep, container) == ERR_NOT_IN_RANGE) {
                moveTo_w_road_fix(creep, container);
            }
            return;
          }
        }
      }
    }
    //If needing to refill energy reserves
    else {
      var resource_container = (creep.memory.container_id != undefined) ?
        (Game.getObjectById(creep.memory.container_id)) : undefined;

      if( (resource_container != undefined) ? (_.sum(resource_container.store) > 0) : false) {
        if(withdraw_resource(creep, resource_container) == ERR_NOT_IN_RANGE){
          moveTo_w_road_fix(creep, resource_container);
        }
        return;
      }
      else {
        var target_dropped_energy = source.pos.findInRange(FIND_DROPPED_RESOURCES, 1);
        if(target_dropped_energy.length > 0) {
          if(creep.pickup(target_dropped_energy[0]) == ERR_NOT_IN_RANGE) {
              moveTo_w_road_fix(creep, target_dropped_energy[0]);
          }
        }
        else {
          if((creep.memory.assigned_room == Memory.base_profile[Memory.room_profile[room_index].room_home_base].base_id) &&
            (source.energy == 0) && (creep.room.energyAvailable < creep.room.energyCapacityAvailable))
          {
            for(i in creep.memory.storage_targets) {
              var storage = Game.getObjectById(creep.memory.storage_targets[i]);
              if(storage.store.energy > 0) {
                if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    moveTo_w_road_fix(creep, storage);
                }
                return;
              }
            }
            for(i in creep.memory.container_targets) {
              var container = Game.getObjectById(creep.memory.container_targets[i]);
              if(storage.store.energy > 0) {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    moveTo_w_road_fix(creep, container);
                }
                return;
              }
            }
          }
          else {
            creep.memory.storing = true;
          }
        }
      }
    }
  }
}
