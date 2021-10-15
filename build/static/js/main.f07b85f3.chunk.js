(this["webpackJsonpphaser-mp"]=this["webpackJsonpphaser-mp"]||[]).push([[0],{1541:function(e,t){},1544:function(e,t,s){"use strict";s.r(t),s.d(t,"config",(function(){return N}));var i=s(582),n=s.n(i),o=(s(598),s(12)),a=s.n(o),c=s(36),r=s(45),h=s(106),l=s(47),u=s(46),d=s(583),p=s.n(d),y=s(584),f=s.n(y),b=s(585),m=s.n(b),_=s(86),x=s(591),v=function e(){Object(c.a)(this,e)};v.WIDTH=1200,v.HEIGHT=720;var g=function(e){Object(l.a)(s,e);var t=Object(u.a)(s);function s(e,i,n){return Object(c.a)(this,s),t.call(this,e,i,n,"bullet")}return Object(r.a)(s,[{key:"fire",value:function(e,t,s){var i={0:[0,-750],"-90":[-750,0],90:[750,0],"-180":[0,750],45:[750,-750],"-45":[-750,-750],135:[750,750],"-135":[-750,750]};this.body.reset(e,t),this.setAngle(s),this.setActive(!0),this.setVisible(!0),this.setVelocityY(i[String(parseInt(s))][1]),this.setVelocityX(i[String(parseInt(s))][0])}},{key:"preUpdate",value:function(e,t){Object(x.a)(Object(_.a)(s.prototype),"preUpdate",this).call(this,e,t),(this.y<=-10||this.y>=v.HEIGHT+10||this.x<=-10||this.x>=v.WIDTH+10)&&this.set_bullet(!1)}},{key:"set_bullet",value:function(e){this.setActive(e),this.setVisible(e)}}]),s}(a.a.Physics.Arcade.Sprite),k=function(e){Object(l.a)(s,e);var t=Object(u.a)(s);function s(e){var i;return Object(c.a)(this,s),(i=t.call(this,e.physics.world,e)).disabled=!1,i.createMultiple({frameQuantity:1,key:"bullet",active:!1,visible:!1,classType:g}),i}return Object(r.a)(s,[{key:"fireBullet",value:function(e,t,s,i){var n=this.getFirstDead(!1);n&&(n.fire(e,t,s),i())}},{key:"get_all_bullets",value:function(){return this.children.entries.map((function(e){return{x:e.x,y:e.y,angle:e.angle,active:e.active,visible:e.visible}}))}}]),s}(a.a.Physics.Arcade.Group),w=s(586),O=s.n(w),j=s(587),I=s.n(j),T=s(588),A=s.n(T),K=s(589),D=s.n(K),E=s(590),H=s.n(E),S=function(e){Object(l.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(c.a)(this,s);for(var i=arguments.length,n=new Array(i),o=0;o<i;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).get_new_spaceship=function(t,s,i,n,o){var a=e.add.text(-30,25,"".concat(n,": ").concat(i),{color:"#00ff00",align:"center",fontSize:"13px"}),c=e.add.sprite(0,0,"ship");c.setAngle(o);var r=e.add.container(t,s,[c,a]);return r.setSize(45,45),e.physics.add.existing(r,!1),e.physics.add.existing(c,!1),r.body.setCollideWorldBounds(!0),{score_text:a,ship:c,cont:r}},e.emit_coordinates=function(){e.socket.emit("update_coordinates",{x:e.ship.cont.x,y:e.ship.cont.y,score:e.score,name:e.name,angle:e.ship.ship.angle,bullets:e.bullets.get_all_bullets(e.socket.id)})},e.get_coin=function(t,s){var i=e.add.sprite(t,s,"coin");return e.physics.add.existing(i,!1),e.physics.add.collider(i,e.ship.ship,e.fire,null,Object(h.a)(e)),i},e.fire=function(t){e.coin_sound.play(),t.x=a.a.Math.Between(20,v.WIDTH-20),t.y=a.a.Math.Between(20,v.HEIGHT-20),e.score+=5,e.ship.score_text.setText("".concat(e.name,": ").concat(e.score)),e.socket.emit("update_coin",{x:t.x,y:t.y}),e.check_for_winner(e.score)},e.get_enemy_bullets=function(t,s){for(var i=new k(Object(h.a)(e)),n=function(n){i.children.entries[n].setAngle(t[n].angle),i.children.entries[n].setActive(t[n].active),i.children.entries[n].setVisible(t[n].visible),i.children.entries[n].x=t[n].x,i.children.entries[n].y=t[n].y,e.physics.add.collider(i.children.entries[n],e.ship.ship,(function(t){t.disabled?setTimeout((function(){t.disabled=!1}),100):(e.emmit_collision(s,n),e.animate_explosion("0"),t.disabled=!0)}),null,Object(h.a)(e))},o=0;o<t.length;o++)n(o);return i},e.update_enemy_bullets=function(t,s){for(var i=e.others[t].bullets,n=0;n<s.length;n++)i.children.entries[n].x=s[n].x,i.children.entries[n].y=s[n].y,i.children.entries[n].setAngle(s[n].angle),i.children.entries[n].setActive(s[n].active),i.children.entries[n].setVisible(s[n].visible)},e.emmit_collision=function(t,s){e.socket.emit("collision",{bullet_user_id:t,bullet_index:s})},e.animate_explosion=function(t){var s;"0"===t?((s=e.ship.cont).setActive(!1),e.score=Math.max(0,e.score-2),e.ship.score_text.setText("".concat(e.name,": ").concat(e.score)),setTimeout((function(){s.setActive(!0)}),1e3)):s=e.others[t].ship.cont,e.add.sprite(s.x,s.y,"boom").anims.play("explode"),e.explosion_sound.play()},e.check_for_winner=function(t){if(t>=100){var s=[{name:e.name,score:e.score}];for(var i in e.others)s.push({name:e.others[i].name,score:e.others[i].score});s=s.sort((function(e,t){return t.score-e.score})),setTimeout((function(){return e.socket.disconnect()}),20),e.scene.start("winner",s)}},e}return Object(r.a)(s,[{key:"init",value:function(e){this.ENDPOINT="https://phaser3-game-react.herokuapp.com",console.log(this.ENDPOINT),this.name=e,this.keys=this.input.keyboard.createCursorKeys(),this.space=this.input.keyboard.addKey(a.a.Input.Keyboard.KeyCodes.SPACE),this.score=0,this.others={},this.x=a.a.Math.Between(50,v.WIDTH-50),this.y=a.a.Math.Between(50,v.HEIGHT-50)}},{key:"preload",value:function(){this.load.spritesheet("boom",O.a,{frameWidth:64,frameHeight:64,endFrame:23}),this.load.image("coin",p.a),this.load.image("ship",f.a),this.load.image("bullet",m.a),this.load.audio("explosion",I.a),this.load.audio("shot",A.a),this.load.audio("coin",D.a)}},{key:"create",value:function(){var e=this,t={key:"explode",frames:this.anims.generateFrameNumbers("boom",{start:0,end:23,first:23}),frameRate:50};this.explosion_sound=this.sound.add("explosion"),this.shot_sound=this.sound.add("shot"),this.coin_sound=this.sound.add("coin"),this.anims.create(t),this.ship=this.get_new_spaceship(this.x,this.y,this.score,this.name,0),this.socket=H()(this.ENDPOINT),this.bullets=new k(this),this.socket.on("to_new_user",(function(t,s){e.id=t.id,e.others=t.others;for(var i=0,n=Object.keys(e.others);i<n.length;i++){var o=n[i],a=e.others[o].x,c=e.others[o].y,r=e.others[o].score,h=e.others[o].name,l=e.others[o].angle,u=e.others[o].bullets;e.others[o].ship=e.get_new_spaceship(a,c,r,h,l),e.others[o].bullets=e.get_enemy_bullets(u,o),e.others[o].score=r,e.others[o].name=h,e.check_for_winner(r)}e.coin=e.get_coin(t.coin.x,t.coin.y),e.emit_coordinates()})),this.socket.on("to_others",(function(t,s){var i=t.id,n=t.x,o=t.y,a=t.score,c=t.name,r=t.angle,h=t.bullets;if(i in e.others)e.others[i].ship.cont.x=n,e.others[i].ship.cont.y=o,e.others[i].ship.score_text.setText("".concat(c,": ").concat(a)),e.others[i].ship.ship.setAngle(r),e.update_enemy_bullets(i,h),e.others[i].score=a,e.others[i].name=c;else{var l=e.get_new_spaceship(n,o,a,c,r),u=e.get_enemy_bullets(h,i);e.others[i]={x:n,y:o,ship:l,bullets:u,score:a,name:c}}e.check_for_winner(a)})),this.socket.on("coin_changed",(function(t,s){e.coin_sound.play(),e.coin.x=t.coin.x,e.coin.y=t.coin.y})),this.socket.on("other_collision",(function(t,s){var i=t.bullet_user_id,n=t.bullet_index,o=t.exploded_user_id;i===e.socket.id&&e.bullets.children.entries[n].setVisible(!1),e.animate_explosion(o)})),this.socket.on("other_shot",(function(t,s){return e.shot_sound.play()})),this.socket.on("user_disconnected",(function(t,s){e.others[t.id].ship.score_text.destroy(),e.others[t.id].ship.ship.destroy(),e.others[t.id].ship.cont.destroy(),delete e.others[t.id]}))}},{key:"update",value:function(){var e=this,t=this.ship.cont,s=this.ship.ship,i="";this.keys.down.isDown&&t.active&&(t.y+=7,i+="d"),this.keys.up.isDown&&t.active&&(t.y-=7,i+="u"),this.keys.right.isDown&&t.active&&(t.x+=7,i+="r"),this.keys.left.isDown&&t.active&&(t.x-=7,i+="l");var n={u:0,d:180,l:270,r:90,ur:45,ul:-45,dr:135,dl:225};i in n&&s.setAngle(n[i]),a.a.Input.Keyboard.JustDown(this.space)&&this.bullets.fireBullet(this.ship.cont.x,this.ship.cont.y-5,this.ship.ship.angle,(function(){e.socket.emit("shot"),e.shot_sound.play()})),this.emit_coordinates()}}]),s}(a.a.Scene),C=function(e){Object(l.a)(s,e);var t=Object(u.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"init",value:function(){var e="abcdefghijklmnopqrstuvwxyz".split("").join(",");this.keys=this.input.keyboard.addKeys(e),this.backspace=this.input.keyboard.addKey(a.a.Input.Keyboard.KeyCodes.BACKSPACE),this.enter=this.input.keyboard.addKey(a.a.Input.Keyboard.KeyCodes.ENTER)}},{key:"create",value:function(){this.welcome_text="Welcome, enter your name\n\n",this.text=this.add.text(450,250,this.welcome_text,{color:"#00ff00",align:"center",fontSize:"20px"}),this.name=""}},{key:"update",value:function(){for(var e=0,t=Object.keys(this.keys);e<t.length;e++){var s=t[e];a.a.Input.Keyboard.JustDown(this.keys[s])&&this.name.length<15&&(this.name+=s)}a.a.Input.Keyboard.JustDown(this.backspace)&&(this.name=this.name.substring(0,this.name.length-1)),a.a.Input.Keyboard.JustDown(this.enter)&&this.scene.start("playgame",this.name),this.text.setText(this.welcome_text+this.name)}}]),s}(a.a.Scene),B=function(e){Object(l.a)(s,e);var t=Object(u.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(r.a)(s,[{key:"init",value:function(e){this.players=e,this.enter=this.input.keyboard.addKey(a.a.Input.Keyboard.KeyCodes.ENTER)}},{key:"create",value:function(){for(var e in this.winner_text="Winner is ".concat(this.players[0].name,"\n\nScoreboard:\n--------------------\n"),this.players)this.winner_text+="".concat(this.players[e].name,": ").concat(this.players[e].score,"\n");this.winner_text+="\n\nPress Enter to play again",this.text=this.add.text(450,50,this.winner_text,{color:"#00ff00",align:"center",fontSize:"20px"})}},{key:"update",value:function(){this.enter.isDown&&this.scene.start("playgame")}}]),s}(a.a.Scene),N={type:a.a.AUTO,width:v.WIDTH,height:v.HEIGHT,physics:{default:"arcade"},backgroundColor:"#202830"},W=new a.a.Game(N);W.scene.add("playgame",S),W.scene.add("welcome",C),W.scene.add("winner",B),W.scene.start("welcome"),n.a.render(null,document.getElementById("root"))},583:function(e,t,s){e.exports=s.p+"static/media/coin.87cc3c60.svg"},584:function(e,t,s){e.exports=s.p+"static/media/spaceship.1121fa40.svg"},585:function(e,t,s){e.exports=s.p+"static/media/bullet.419a6b56.svg"},586:function(e,t,s){e.exports=s.p+"static/media/explosion.5ddcf208.png"},587:function(e,t,s){e.exports=s.p+"static/media/exp.34c43c52.m4a"},588:function(e,t,s){e.exports=s.p+"static/media/shot.07c74a5b.mp3"},589:function(e,t,s){e.exports=s.p+"static/media/coin_collect.238d934d.wav"},592:function(e,t,s){e.exports=s(1544)},598:function(e,t,s){}},[[592,1,2]]]);
//# sourceMappingURL=main.f07b85f3.chunk.js.map