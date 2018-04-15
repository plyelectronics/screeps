function creep_moveTo_room(creep) {
  var targetPos = new RoomPosition(25, 25, creep.memory.target_room);
  creep.moveTo(targetPos);
}

function creep_sign_controller(creep) {
  if(creep.room.controller.sign ? creep.room.controller.sign.username != 'letsil' : false);
    creep.signController(creep.room.controller, 'Claimed by the Letsil Empire. Cry havoc and let slip the dogs of war!');
}

function creep_find_room_profile(creep) {
  return Memory.room_profile ? Memory.room_profile.filter(function(find_room){return find_room.room_id == creep.room.name}) : [];
}

function creep_controller_main(creep, action) {
  if(creep.room.name === creep.memory.target_room) {

    var room_profile = creep_find_room_profile(creep);

    if(room_profile.length === 0) {
      console.log(creep.name + ': The room_profile for room ' + creep.memory.target_room + ' has not been added yet.');
    }
    else {
      var room_index = Memory.room_profile.findIndex(function(find_room){return find_room.room_id == creep.memory.target_room});
      creep_sign_controller(creep);

      if(action === 'reserve') {
        var report = creep.reserveController(creep.room.controller);
        if(report === OK)
          Memory.room_profile[room_index].room_purpose = 'base_remote_mining';
        else if(report == ERR_NOT_IN_RANGE)
          creep.moveTo(creep.room.controller);
      }
      else if(action === 'claim') {
        var report = creep.claimController(creep.room.controller);
        if(report == OK)
          Memory.room_profile[room_index].room_purpose = 'base';
        else if(report == ERR_NOT_IN_RANGE)
          creep.moveTo(creep.room.controller);
      }
      else if(action === 'attack') {
        var report = creep.attackController(creep.room.controller);
        if(report == ERR_NOT_IN_RANGE)
          creep.moveTo(creep.room.controller);
      }
    }
  }
  else {
    creep_moveTo_room(creep);
  }
}

module.exports = {
  reserve_controller(creep) {
    creep_controller_main(creep,'reserve');
  },
  claim_controller(creep) {
    creep_controller_main(creep,'claim');
  },
  attack_controller(creep) {
    creep_controller_main(creep,'attack');
  }
}
