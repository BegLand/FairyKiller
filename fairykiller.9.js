function skill_applicable(target,skill)
{
  var glob = G.skills[skill];
  if(!glob) log(skill);
  return (character.level >= (glob.level || 0)) && character.mp >= (glob.mp || 0)
    && !is_on_cooldown(skill)
}
setInterval(use_hp_or_mp,500);
setInterval(()=>{
	if (character.rip) return;
	let target = get_target_of(get_entity("RisingKyron"))
	if (!target) {
		return;
	}
	if (!get_targeted_monster()) {
		change_target(target)
	}
  	if (target.target && target.s.stunned && target.s.stunned.ms>=400 && distance(character,target) < 30) {
		attack(target)
	}
	console.log(skill_applicable(target,"stomp"))
  if(character.ctype === "warrior" && skill_applicable(target,"stomp") && !target.s.stunned && !target.target && can_attack(target) && distance(character,target) < 30) {
    stomp()
	  attack(target)
    setTimeout(scare, 3.15*1000)
  }
},100)

setInterval(()=>{
  if (character.rip) return;
  if(smart.moving) return;
	const target = get_targeted_monster()
	if(!target) return smart_move("greenfairy");
	const rX = (Math.random()*20)-10;
	const rY = (Math.random()*20)-10;
 	move(target.x+rX,target.y+rY)
},300)
setInterval(()=>{
  if (character.rip) respawn()
},5000)
function stomp(){
  const slot = character.items.findIndex(i => i && i.name === "basher")
  const fireblade = character.items.findIndex(i => !i)
  if(character.slots.offhand) unequip("offhand")
  equip(slot)
  use("stomp")
  equip(slot)
  equip(fireblade)
}
function scare(){
  const jackoslot = character.items.findIndex(i => i && i.name === "jacko")
  equip(jackoslot)
  use("scare")
  equip(jackoslot)
}
function on_party_invite(name) {
    if (name != "RisingKyron") return
    accept_party_invite(name)
}


// matin
setInterval(rspeedBuff,5000);

function rspeedBuff(){
  if (character.ctype !== "rogue") return;
  for(id in parent.entities)
  {
    let curr = parent.entities[id];
    if (curr.player !== true) continue;
    if (curr.distance > G.skills.rspeed.distance) continue;
    if (character.mp < G.skills.rspeed.mp) continue;
		if (!curr.s.rspeed){
      use_skill("rspeed",curr)
      log(`Buffed ${curr.name} with rspeed!`);
      return;
      }
  }
}

