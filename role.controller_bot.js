function creep_moveTo_room(creep) {
  var targetPos = new RoomPosition(25, 25, creep.memory.scout_room);
  creep.moveTo(targetPos);
}

function creep_sign_controller(creep) {
  if(creep.room.controller.sign.username != 'letsil');
    creep.signController(creep.room.controller, 'Claimed by the Letsil Empire. Cry havoc and let slip the dogs of war!');
}

function creep_find_room_profile(creep) {
  return Memory.room_profile ? Memory.var room_profile = Memory.room_profile ?
    Memory.room_profile.filter(function(find_room){return ((find_room.room_home_base == Memory.base_profile[i].base_index) &&
    (find_room.room_id == creep.memory.scout_room))}) :
    [];
}

function creep_controller_main(creep, action) {
  if(creep.room.name === creep.memory.scout_room) {

    var room_profile = creep_find_room_profile(creep);

    if(room_profile.length === 0) {
      console.log(creep.name + ': The room_profile for room ' + creep.memory.scout_room + ' has not been added yet.');
    }
    else {
      creep_sign_controller(creep);

      if(action === 'reserve') {
        if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE)
          creep.moveTo(creep.room.controller);
      }
      else if(action === 'claim') {
        if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE)
          creep.moveTo(creep.room.controller);
      }
      else if(action === 'attack') {
        if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE)
          creep.moveTo(creep.room.controller);
      }
    }
  }
  else {
    moveTo_room(creep);
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
