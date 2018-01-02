var settingsProfiler = {

profile: function(creep) {
        var room_name = creep.room.name;
        var energy_sources = creep.room.find(FIND_SOURCES);
        var mineral_sources = creep.room.find(FIND_MINERALS);

        var room_survey = {
            'room_id' : room_name,
            'room_energy_array' : [],
            'room_mineral_array' : [],
            'room_owner': creep.room.controller.owner,
            'room_level': creep.room.controller.level
        }

        for(j in energy_sources) {
            var energy_source = {
                'energy_id' : energy_sources[j].id,
                'energy_miner_id' : 0,
                'energy_container_id' : 0
            }
            room_survey.room_energy_array.push(energy_source);
        }

        for(j in mineral_sources) {
            var mineral_sources = {
                'energy_id' : mineral_sources[j].id,
                'energy_miner_id' : 0,
                'energy_container_id' : 0
            }
            room_survey.room_mineral_array.push(mineral_sources);
        }

        //if(Memory.room_profile) {
        //    var found_profile = Memory.room_profile.filter(function (profile_struct) {
        //        return profile_struct.room_id == room_name;
        //    });

        //    if(!found_profile)
        //        Memory.room_profile.push(room_survey);
        //    }
        //else
        //    Memory.room_profile = [];
            Memory.room_profile = (room_survey);

    }

};

module.exports = settingsProfiler;
