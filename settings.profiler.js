module.exports = {
  //Game.rooms['E84S27'] is expected to be the function input
  room_profile(creep, room, base_num) {
    if (room != undefined) {
      var valid_room = Memory.room_profile ? Memory.room_profile.filter(function(find_room){return find_room.room_id == room.name}) : undefined;
      if(valid_room.length > 0) {
        console.log('Room already saved: ' + valid_room[0].room_id);
      }
      else {

        var energy_sources = room.find(FIND_SOURCES);
        var mineral_sources = room.find(FIND_MINERALS);
        var HostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
          filter:function(enemy){enemy.owner.username !== 'Source Keeper'}
        });
        var SourceKeeperCreeps = room.find(FIND_HOSTILE_CREEPS, {
          filter:function(enemy){enemy.owner.username === 'Source Keeper'}
        });

        var room_purpose = 'default';
        // If controller level then save base
        if((room.controller.level > 0) && (room.controller.owner ? (room.controller.owner.username === creep.owner.username) : false))
          room_purpose = 'base';
        // If controller level then save enemy_base
        else if((room.controller.level > 0) && (room.controller.owner ? (room.controller.owner.username !== creep.owner.username) : false))
          room_purpose = 'enemy_base';
        // If controller reservation active then save enemy_expansion
        else if((room.controller.reservation ? (room.controller.reservation.username === creep.owner.username) : false))
          room_purpose = 'base_remote_mining';
        // If controller reservation active then save enemy_expansion
        else if((room.controller.reservation ? (room.controller.reservation.username !== creep.owner.username) : false))
          room_purpose = 'enemy_remote_mining';
        // If hostiles are source keepers then save source_keeper_room
        else if(SourceKeeperCreeps.length > 0)
          room_purpose = 'source_keeper';
        // If hostiles but not source keepers then save contested_room
        else if((SourceKeeperCreeps.length === 0) && (HostileCreeps.length > 0))
          room_purpose = 'contested_room';
        // If energy and or minerals then save resource_room
        else if((energy_sources.length > 0) || (mineral_sources.length > 0))
          room_purpose = 'resource_room';

        var room_action = 'default'
        if((room.controller.level > 0) && (room.controller.owner ? (room.controller.owner.username === creep.owner.username) : false))
          room_action = 'base';
        else if(SourceKeeperCreeps.length > 0)
          room_action = 'source_keeper';
        else if((HostileCreeps.length == 0) && ((energy_sources.length > 0) || (mineral_sources.length > 0)))
          room_action = 'potential_resource_expansion';

        var room_survey = {
            'room_id' : room.name,
            'room_energy' : [],
            'room_mineral' : [],
            'room_owner': room.controller.owner,
            'room_level': room.controller.level,
            'room_purpose' : room_purpose,
            'room_home_base' : base_num,
            'room_action' : room_action,
            'room_hostiles' : (HostileCreeps.length > 0) ? true : false,
            'room_hostiles_array' : [],
            'room_healing' : false,
            'room_healing_array' : []
        }

        for(j in energy_sources) {
            var energy_source = {
                'energy_id' : energy_sources[j].id,
                'energy_miner_id' : 'na',
                'energy_transport_id' : 'na',
                'energy_container_id' : 'na',
                'energy_road' : false
            }
            room_survey.room_energy.push(energy_source);
        }

        for(j in mineral_sources) {
            var mineral_sources = {
                'mineral_id' : mineral_sources[j].id,
                'mineral_miner_id' : 'na',
                'mineral_transport_id' : 'na',
                'mineral_container_id' : 'na',
                'mineral_road' : false
            }
            room_survey.room_mineral.push(mineral_sources);
        }

        if(Memory.room_profile) {
          Memory.room_profile.push(room_survey);
        }
        else {
          var tmp_room_array = [room_survey];
          Memory.room_profile = tmp_room_array;
        }
        //console.log('New Room is saved: ' + room.name);
      }
    }
    else {
      //console.log('Room is currently undefined');
    }
  },
  base_profile(room) {
    if (room != undefined) {
      var base_survey = {
        'base_index' : 0,
        'base_id' : room.name,
        'base_spawn' : []
      }

      var spawn = _.filter(Game.spawns, (spawn) => spawn.room.name == room.name);
      for(j in spawn) {
        var base_spawn_ind = {
          'spawn_id' : spawn[j].id,
          'spawn_available' : true
        }
        base_survey.base_spawn.push(base_spawn_ind);
      }

      if(Memory.base_profile) {
        var verify_base = Memory.base_profile.filter(function(find_base) {return find_base.base_id == room.name});
        if(verify_base != undefined) {
          var element_index = verify_base[0].base_index;
          base_survey.base_index = element_index;
          Memory.base_profile.splice(element_index, 1, base_survey);
        }
        else {
          var element_index = Memory.base_profile.length;
          Memory.base_profile.push(base_survey);
        }
      }
      else {
        var initial_base_array = [base_survey];
        Memory.base_profile = initial_base_array;
      }
      //console.log('Saving Base');
    }


  }
}
