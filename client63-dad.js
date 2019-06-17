function World(e, t, a) {
    console.log("Creating a new World!"),
    this.room,
    this.player,
    this.events = {},
    this.settings = a,
    this.stage = new createjs.Stage(e),
    this.stage.room = new createjs.Container,
    this.stage.ui = new createjs.Container,
    this.stage.gear = new createjs.Container,
    this.stage.beep = new createjs.Container,
    this.stage.addChild(this.stage.room, this.stage.ui, this.stage.gear, this.stage.beep),
    t && (this.socket = t,
    this.socketHandler(t));
    var r = this;
    createjs.Ticker.framerate = 60,
    createjs.Ticker.on("tick", function(e) {
        r.stage.update(e)
    });
    var s = new CardContainer("ghost_ship");
    s.setTransform(20, 20, .5, .5),
    s.on("click", function() {
        console.log("CLICK")
    }),
    this.stage.ui.addChild(s)
}
function Beep(e, t) {
    this.socket = e || {},
    this.world = t || {},
    this.mc = new createjs.Container;
    var a = this;
    e && e.on("beep", function(e) {
        console.log("beep", e),
        e.item && a.showItem(e.item)
    })
}
function Button(e) {
    createjs.Container.call(this);
    var t = new createjs.Sprite(uxSS,e);
    this.addChild(t)
}
function Code(e, t) {
    this.socket = e,
    this.world = t;
    var a = this;
    t.on("code", function(e) {
        a.handleMessage(e)
    })
}
function ItemIcon(e, t) {
    createjs.Container.call(this),
    this.slotId = t,
    this.itemId = e,
    this.isActive = !1,
    this.handleClick,
    this.background = new createjs.Sprite(uxSS,"item");
    var a = new createjs.Bitmap("/media/63-dad/icons/" + e + ".png");
    a.x = 2,
    a.y = 2,
    a.scaleX = .5,
    a.scaleY = .5,
    this.addChild(this.background, a)
}
function Player(e) {
    this.playerId = e.playerId,
    this.nickname = e.nickname,
    this.critterId = e.critterId,
    this.inventory = e.inventory,
    this.friends = e.friends,
    this.gear = e.gear || {},
    this.status,
    this.level,
    this.weapon,
    this.def = 10,
    this.str = 10,
    this.armour,
    this.isDead,
    this.gold = e.gold,
    this.goldInBank,
    this.xp,
    this.hp = 100,
    this.mp,
    this.gems,
    localStorage.setItem("playerId", this.playerId)
}
function Room(e, t) {
    if (createjs.Container.call(this),
    this.background = new createjs.Container,
    this.foreground = new createjs.Container,
    this.game = new createjs.Container,
    this.balloons = new createjs.Container,
    this.nicknames = new createjs.Container,
    this.editor = new createjs.Container,
    this.player = t,
    this.playerlist = {},
    this.addChild(this.background),
    this.addChild(this.game),
    world.settings.roomPath)
        var a = world.settings.roomPath;
    else
        a = "";
    if (this.game.addEventListener("tick", function(e) {
        e.target.children.sort(sortDepth)
    }),
    2 == e.version && e.artwork) {
        if (void 0 !== e.artwork.background) {
            var r = new createjs.Bitmap(a + e.artwork.background);
            this.background.addChild(r)
        }
        if (void 0 !== e.artwork.foreground) {
            var s = new createjs.Bitmap(a + e.artwork.foreground);
            this.foreground.addChild(s)
        }
        if (e.artwork.sprites) {
            e.artwork.sprites.images[0] = a + e.artwork.sprites.images[0],
            this.spritesheet = new createjs.SpriteSheet(e.artwork.sprites);
            for (var i = e.artwork.sprites.frames, o = 0; o < i.length; o++) {
                var n = new createjs.Sprite(this.spritesheet);
                n.gotoAndStop(o),
                n.x = i[o][7],
                n.y = i[o][8],
                this.game.addChild(n)
            }
        }
    }
    if (this.addChild(this.foreground),
    this.addChild(this.nicknames),
    this.addChild(this.balloons),
    this.addChild(this.editor),
    this.addChild(this.cards),
    null != e.playerlist)
        for (o = 0; o < e.playerlist.length; o++)
            this.addPlayer(e.playerlist[o])
}
function sortDepth(e, t) {
    return e.y - t.y
}
function GridContainer(e, t) {
    createjs.Container.call(this);
    var a = new createjs.Shape;
    a.graphics.setStrokeStyle(1).beginStroke("#FFFFFF").drawRect(0, 0, 32, 32);
    for (var r = 0; r < t; r++)
        for (var s = 0; s < e; s++) {
            var i = a.clone();
            i.x = 32 * s,
            i.y = 32 * r,
            this.addChild(i)
        }
}
function createBalloon(e, t) {
    var a = t + 20
      , r = e + 20
      , s = new createjs.Shape;
    return s.graphics.setStrokeStyle(1).beginStroke("#888888").beginFill("#FFFFFF"),
    s.graphics.moveTo(5, 0).arcTo(r, 0, r, 5, 5).arcTo(r, a, r - 5, a, 5).lineTo(80, a).lineTo(70, a + 10).lineTo(70, a).arcTo(0, a, 0, a - 5, 5).arcTo(0, 0, 5, 0, 5),
    s.x = 0 - r / 2,
    s.y = -10,
    s
}
World.prototype.on = function(e, t) {
    "object" != typeof this.events[e] && (this.events[e] = []),
    this.events[e].push(t)
}
,
World.prototype.emit = function(e) {
    var t, a, r, s = [].slice.call(arguments, 1);
    if ("object" == typeof this.events[e])
        for (r = (a = this.events[e].slice()).length,
        t = 0; t < r; t++)
            a[t].apply(this, s)
}
,
World.prototype.socketHandler = function(a) {
    var r = this;
    this.stage;
    a.on("connect", function() {}),
    a.on("disconnect", function() {
        console.log("DISCONNECT")
    }),
    a.on("login", function(e) {
        console.log("login", e);
        var t = new Player(e);
        r.player = t,
        setInterval(function() {
            t.getPlayerId() != t.playerId && a.disconnect()
        }, 1e4),
        r.joinRoom("tavern")
    }),
    a.on("message", function(e) {
        console.log("message", e)
    }),
    a.on("warn", function(e) {
        console.error("WARN", e)
    }),
    a.on("joinRoom", function(e) {
        console.log("joinRoom", e),
        r.handleJoinRoom(e)
    }),
    a.on("playerData", function(e) {
        console.log("playerData", e),
        r.player.updateData(e)
    }),
    a.on("roomData", function(e) {
        console.log("roomData", e)
    }),
    a.on("worldData", function(e) {
        console.log("worldData", e)
    }),
    a.on("beep", function(e) {
        r.emit("beep", e)
    }),
    a.on("A", function(e) {
        console.info("A", e),
        r.room.addPlayer(e)
    }),
    a.on("R", function(e) {
        console.info("R", e),
        r.room.removePlayer(e)
    }),
    a.on("G", function(e) {
        console.info("G", e),
        r.room.updateGear(e)
    }),
    a.on("X", function(e) {
        r.room.movePlayer(e)
    }),
    a.on("M", function(e) {
        console.info("M", e),
        r.room.addBalloon(e)
    })
}
,
World.prototype.login = function(e) {
    this.socket.open(),
    this.socket.emit("login", {
        ticket: e
    })
}
,
World.prototype.logout = function() {
    console.log("logout"),
    sessionStorage.clear(),
    this.socket.disconnect(),
    cheerioPath && (document.location.href = cheerioPath)
}
,
World.prototype.sendMessage = function(e) {
    if (console.log("sendMessage", e),
    "/" == (e = e.trim()).substr(0, 1))
        this.emit("code", e);
    else {
        this.socket.emit("sendMessage", {
            message: e
        });
        var t = {
            i: this.player.playerId,
            n: this.player.nickname,
            m: e
        };
        console.info("M", t),
        this.room.addBalloon(t)
    }
}
,
World.prototype.joinRoom = function(e) {
    this.socket.emit("joinRoom", {
        roomId: e
    })
}
,
World.prototype.handleJoinRoom = function(e) {
    this.addRoom(e),
    this.addRoomUI(),
    this.addInventoryScreen()
}
,
World.prototype.updateGear = function(e) {
    this.socket.emit("updateGear", e)
}
,
World.prototype.addRoom = function(e) {
    this.room && (console.log("Remove Room"),
    this.room.removeAllChildren(),
    delete this.room),
    console.log("Add Room!", e),
    this.room = new Room(e,this.player);
    this.stage;
    var r = this.room;
    this.room.on("click", function(e) {
        var t = Math.floor(e.localX)
          , a = Math.floor(e.localY);
        socket.emit("click", {
            x: t,
            y: a
        }),
        r.movePlayer({
            i: this.player.playerId,
            x: t,
            y: a
        })
    }),
    this.stage.room.addChild(this.room)
}
,
World.prototype.addRoomUI = function() {
    console.log("Add Room UI!");
    var e = new createjs.Container
      , t = new Button("box");
    t.scaleX = .5,
    t.scaleY = .5,
    t.x = 760,
    t.y = 420;
    var a = this;
    t.click(function() {
        a.inventory.show()
    }),
    e.addChild(t),
    this.stage.ui.addChild(e)
}
,
World.prototype.addInventoryScreen = function() {
    console.log("Add Inventory Screen!"),
    this.inventory || (this.inventory = new InventoryScreen(this.player),
    this.inventory.hide(),
    this.stage.gear.addChild(this.inventory))
}
,
Beep.prototype.show = function() {
    var e = this
      , t = new createjs.Graphics;
    t.beginFill("black"),
    t.drawRect(0, 0, 850, 480);
    var a = new createjs.Shape(t);
    a.alpha = .6,
    a.on("click", function() {
        e.close()
    }),
    this.mc.addChild(a),
    this.mc.visible = !0
}
,
Beep.prototype.hide = function() {
    this.mc.visible = !1
}
,
Beep.prototype.close = function() {
    this.mc.removeAllChildren(),
    this.mc.visible = !1
}
,
Beep.prototype.showItem = function(e) {
    this.show();
    var t = new BeepItem(e);
    this.mc.addChild(t.mc)
}
,
Beep.prototype.showCard = function(e) {}
,
Beep.prototype.showWarning = function(e) {}
,
Button.prototype = Object.create(createjs.Container.prototype),
Button.prototype.click = function(e) {
    this.on("click", e)
}
,
Code.prototype.handleMessage = function(e) {
    var t = e.split(" ")
      , a = t.shift().substr(1).toLowerCase();
    switch (a) {
    case "nicknames":
        this.toggleNicknames();
        break;
    case "balloons":
        this.toggleBalloons();
        break;
    case "join":
        world.joinRoom(t[0].toLowerCase());
        break;
    case "darkmode":
        toggleDarkmode && toggleDarkmode();
    default:
        this.socket.emit("code", {
            code: a,
            options: t
        })
    }
}
,
Code.prototype.toggleNicknames = function() {
    var e = this.world.room.nicknames;
    e.visible ? e.visible = !1 : e.visible = !0
}
,
Code.prototype.toggleBalloons = function() {
    var e = this.world.room.balloons;
    e.visible ? e.visible = !1 : e.visible = !0
}
,
ItemIcon.prototype = Object.create(createjs.Container.prototype),
ItemIcon.prototype.click = function(e) {
    this.on("click", e)
}
,
ItemIcon.prototype.setActive = function(e) {
    e ? (this.background.gotoAndStop("item_active"),
    this.isActive = !0) : (this.background.gotoAndStop("item"),
    this.isActive = !1)
}
,
Player.prototype.getPlayerId = function() {
    return localStorage.getItem("playerId")
}
,
Player.prototype.updateData = function(e) {
    console.info("updateData", e),
    e.gear && (this.gear = e.gear),
    e.inventory && this.inventory.push(e.inventory)
}
,
Player.prototype.addItem = function(e) {
    console.log("Player.addItem", e);
    var t = this.getItemFromInventory(e);
    t && (this.gear[t.slot] = t.itemId)
}
,
Player.prototype.removeItem = function(e) {
    console.log("Player.removeItem", e),
    delete this.gear[e]
}
,
Player.prototype.isItemActive = function(e) {
    for (var t in this.gear)
        if (this.gear[t] == e)
            return !0;
    return !1
}
,
Player.prototype.getItemFromInventory = function(e) {
    for (var t = 0; t < this.inventory.length; t++)
        if (this.inventory[t].itemId == e)
            return this.inventory[t]
}
,
Room.prototype = Object.create(createjs.Container.prototype),
Room.prototype.sortDepth = function() {
    this.game.children.sort(sortDepth)
}
,
Room.prototype.addPlayer = function(e) {
    var t = e.i;
    if (null == this.playerlist[t]) {
        var a = new PlayerContainer(e);
        this.player.playerId == e.i && (a.isLocal = !0),
        a.x = e.x,
        a.y = e.y,
        a.targetX = e.x,
        a.targetY = e.y;
        var r = findDirection(e.r);
        a.updateDirection(r),
        a.updateState("stand"),
        this.game.addChild(a),
        this.playerlist[t] = a;
        var s = new createjs.Container;
        s.x = e.x,
        s.y = e.y,
        a.balloon = s,
        this.balloons.addChild(s);
        var i = new createjs.Container;
        i.x = e.x,
        i.y = e.y;
        var o = new createjs.Text(e.n,"12px Arial","#000000");
        o.textAlign = "center",
        o.lineWidth = 100,
        o.y = 15,
        i.addChild(o),
        a.nickname = i,
        this.nicknames.addChild(i)
    }
}
,
Room.prototype.addBalloon = function(e) {
    var t = this.playerlist[e.i]
      , a = new createjs.Container
      , r = new createjs.Text(e.m,"12px Arial","#000000");
    r.textAlign = "center",
    r.lineWidth = 100;
    var s = r.getBounds()
      , i = createBalloon(100, s.height);
    a.addChild(i, r),
    a.y = 0 - s.height - 80,
    t.balloon.addChild(a);
    setTimeout(function() {
        t.balloon.removeChild(a)
    }, 5e3)
}
,
Room.prototype.removePlayer = function(e) {
    var t = this.playerlist[e.i];
    this.game.removeChild(t),
    this.balloons.removeChild(t.balloon),
    this.nicknames.removeChild(t.nickname),
    delete this.playerlist[e.i]
}
,
Room.prototype.updateGear = function(e) {
    var t = this.playerlist[e.i];
    t && t.updateGear(e.g)
}
,
Room.prototype.showEditor = function() {
    var e = new GridContainer(20,20);
    e.alpha = .5,
    this.editor.addChild(e)
}
,
GridContainer.prototype = Object.create(createjs.Container.prototype),
Room.prototype.movePlayer = function(e) {
    var t = this.playerlist[e.i];
    if (!t.isMoving || t.targetX != e.x || t.targetY != e.y) {
        void 0 === e.r && (e.r = Math.floor(calculateAngle(t.x, t.y, e.x, e.y))),
        t.isMoving = !0,
        t.targetX = e.x,
        t.targetY = e.y;
        var a = findDirection(e.r);
        t.updateDirection(a),
        t.updateState("move");
        var r = calculateDistance(t.x, t.y, e.x, e.y) * t.speed;
        t.tween = createjs.Tween.get(t, {
            override: !0
        }).to({
            x: e.x,
            y: e.y
        }, r, createjs.Ease.linear).call(function() {
            if (this.isMoving = !1,
            t.updateState("stand"),
            t.nickname.x = t.x,
            t.nickname.y = t.y,
            t.balloon.x = t.x,
            t.balloon.y = t.y,
            t.isLocal) {
                t.x,
                t.y;
                socket.emit("trigger", {
                    x: t.x,
                    y: t.y
                })
            }
        }).addEventListener("change", function() {
            t.nickname.x = t.x,
            t.nickname.y = t.y,
            t.balloon.x = t.x,
            t.balloon.y = t.y
        })
    }
}
;
var boot = boot || {};
!function() {
    var t = {
        primary: ["#007bff", "#ffffff"],
        secondary: ["#6c757d", "#ffffff"],
        success: ["#28a745", "#ffffff"],
        warning: ["#ffc107", "#212529"],
        danger: ["#dc3545", "#ffffff"],
        light: ["#f8f9fa", "#212529"],
        dark: ["#343a40", "#ffffff"]
    }
      , a = {
        sm: [.875, .5, .5],
        md: [1, 1, .625],
        lg: [1.25, 1.25, .75]
    };
    function h(e) {
        e = e || {};
        this.style = e.style || "primary",
        this.size = e.size || "md",
        this.base = e.base || 16,
        this.width = e.width,
        this.height = e.height,
        this.radius = .25 * this.base,
        this.font_size = e.font_size || a[this.size][0] * this.base,
        this.font_colour = t[this.style][1],
        this.font_family = e.font_family || "Arial",
        this.font = this.font_size + "px " + this.font_family,
        this.fill = t[this.style][0],
        this.mx = a[this.size][1] * this.font_size,
        this.my = a[this.size][2] * this.font_size
    }
    function e(e, t) {
        createjs.Container.call(this);
        t = new h(t);
        var a = new createjs.Text(e,t.font,t.font_colour);
        a.textBaseline = "middle",
        a.x = t.mx,
        a.y = t.my + t.font_size / 2 + 2,
        a.snapToPixel = !0;
        var r = a.getBounds()
          , s = Math.floor(r.width)
          , i = t.font_size
          , o = s + 2 * t.mx
          , n = i + 2 * t.my
          , l = new createjs.Shape;
        l.graphics.beginFill(t.fill).drawRoundRect(0, 0, o, n, t.radius),
        this.addChild(l, a),
        this.setBounds(0, 0, o, n)
    }
    function r(e) {
        createjs.Container.call(this);
        var t = (e = new h(e)).width || 200
          , a = e.height || e.base
          , r = e.radius
          , s = new createjs.Shape;
        s.graphics.beginFill("#f8f9fa").drawRoundRect(0, 0, t, a, r);
        var i = new createjs.Shape;
        i.graphics.beginFill(e.fill).drawRect(0, 0, t, a),
        i.mask = s,
        i.scaleX = 0,
        this.mc = i,
        this.addChild(s, i)
    }
    function s(e, t, a) {
        createjs.Container.call(this),
        this.setBounds(0, 0, e, t),
        this.init(),
        a && Array.isArray(a) && this.update(a)
    }
    (e.prototype = Object.create(createjs.Container.prototype)).click = function(e) {
        this.on("click", e)
    }
    ,
    (r.prototype = Object.create(createjs.Container.prototype)).update = function(e) {
        var t = e / 100;
        this.mc.scaleX = t
    }
    ,
    r.prototype.center = function() {
        console.log(this.parent),
        console.log(this.parent.getBounds()),
        this.parent
    }
    ,
    (s.prototype = Object.create(createjs.Container.prototype)).init = function() {
        this.list = [],
        this.nextX = 0,
        this.nextY = 0,
        this.rowWidth = 0,
        this.rowHeight = 0,
        this.gutter = 10
    }
    ,
    s.prototype.update = function(e) {
        e = e || this.list;
        this.removeAllChildren(),
        this.init();
        for (var t = 0; t < e.length; t++)
            this.append(e[t])
    }
    ,
    s.prototype.append = function(e) {
        var t = this.getBounds()
          , a = e.getBounds();
        this.nextX + a.width > t.width && (this.nextX = 0,
        this.nextY += this.gutter + this.rowHeight,
        this.rowHeight = 0),
        a.height > this.rowHeight && (this.rowHeight = a.height),
        e.x = this.nextX,
        e.y = this.nextY,
        this.addChild(e),
        this.nextX += a.width + this.gutter,
        this.list.push(e)
    }
    ,
    boot.Button = e,
    boot.ProgressBar = r,
    boot.Grid = s
}();
var deck = deck || {};
function BeepItem(e) {
    this.mc = new createjs.Container;
    var t = new createjs.Graphics;
    t.beginFill("black"),
    t.drawRect(0, 100, 850, 200);
    var a = new createjs.Shape(t);
    this.mc.addChild(a);
    var r = new createjs.Bitmap("/media/63-dad/icons/" + e.itemId + ".png");
    r.regX = 80,
    r.regY = 80,
    r.x = 425,
    r.y = 120,
    this.mc.addChild(r),
    e.name && (e.title = e.name);
    var s = new createjs.Text(e.title,"40px Luckiest Guy","#ffffff");
    if (s.textAlign = "center",
    s.lineHeight = 40,
    s.lineWidth = 400,
    s.x = 425,
    s.y = 210,
    this.mc.addChild(s),
    e.text) {
        var i = new createjs.Text(e.text,"16px Arial","#AAAAAA");
        i.textAlign = "center",
        i.lineWidth = 300,
        i.x = 425,
        i.y = 250,
        this.mc.addChild(i)
    }
}
function BadgeContainer(e, t) {
    createjs.Container.call(this);
    new createjs.Text;
    var a = new createjs.Shape;
    a.graphics.ss(1).s("#EEEEEE").f("#EEEEEE").rr(0, 0, 200, 20, 5),
    this.addChild(a)
}
function ButtonContainer(e, t) {
    createjs.Container.call(this);
    new createjs.Text;
    var a = new createjs.Shape;
    a.graphics.ss(1).s("#007bff").f("#007bff").rr(0, 0, 200, 20, 5),
    this.addChild(a)
}
function CardContainer(e) {
    createjs.Container.call(this);
    var t = new createjs.Bitmap("/media/63-dad/cards/oomm/" + e + ".png");
    this.addChild(t)
}
function CritterContainer(e) {
    createjs.MovieClip.call(this);
    var t = critterData[e];
    this.state = "stand",
    this.isMoving = !1,
    this.isForward = !0,
    this.hasTail = !1,
    this.currentDirection = 4,
    this.framerate = 30,
    this.loop = -1,
    this.regX = 68,
    this.regY = 140;
    var a = new createjs.SpriteSheet(t);
    this.bodyContainer = new createjs.Container,
    this.feetContainer = new createjs.Container,
    this.baseContainer = new createjs.Container,
    this.addChild(this.baseContainer, this.feetContainer, this.bodyContainer),
    this.skin = new createjs.Container,
    this.face = new createjs.Container,
    this.feet = new createjs.Container,
    this.tail = new createjs.Container,
    this.skin.sprite = new createjs.Sprite(a,"body4"),
    this.skin.addChild(this.skin.sprite),
    this.face.sprite = new createjs.Sprite(a,"smile4"),
    this.face.addChild(this.face.sprite),
    this.feet.sprite = new createjs.Sprite(a,"feet"),
    this.feetContainer.addChild(this.feet.sprite),
    t.animations.tail4 && (this.tail.sprite = new createjs.Sprite(a,"tail4"),
    this.tail.addChild(this.tail.sprite),
    this.hasTail = !0),
    this.backs = ["pack", "eyes", "ears", "belt"],
    this.slots = {
        eyes: new createjs.Container,
        eyes_back: new createjs.Container,
        ears: new createjs.Container,
        ears_back: new createjs.Container,
        head: new createjs.Container,
        hand: new createjs.Container,
        belt: new createjs.Container,
        belt_back: new createjs.Container,
        mask: new createjs.Container,
        body: new createjs.Container,
        pack: new createjs.Container,
        pack_back: new createjs.Container
    },
    this.forward = [this.tail, this.slots.pack_back, this.slots.belt_back, this.slots.ears_back, this.slots.eyes_back, this.skin, this.face, this.slots.mask, this.slots.body, this.slots.head, this.slots.ears, this.slots.eyes, this.slots.pack, this.slots.belt, this.slots.hand],
    this.backward = [this.slots.hand, this.slots.pack_back, this.slots.belt_back, this.slots.ears_back, this.slots.eyes_back, this.skin, this.face, this.slots.eyes, this.slots.mask, this.slots.body, this.slots.head, this.slots.ears, this.slots.pack, this.slots.belt, this.tail];
    for (var r = 0; r < this.forward.length; r++)
        this.bodyContainer.addChild(this.forward[r]);
    t.animations.shadow && (this.baseContainer.sprite = new createjs.Sprite(a,"shadow"),
    this.baseContainer.addChild(this.baseContainer.sprite)),
    this.timeline.addTween(createjs.Tween.get(this.bodyContainer).wait(1).to({
        y: 4
    }).wait(1).to({
        y: -12
    }).wait(1).to({
        y: -16
    }).wait(1).to({
        y: -8
    }).wait(1)),
    this.timeline.addTween(createjs.Tween.get(this.feetContainer).wait(2).to({
        y: -8
    }).wait(1).to({
        y: -16
    }).wait(1).to({
        y: -6
    }).wait(1)),
    this.timeline.addTween(createjs.Tween.get(this.baseContainer)),
    this.updateDirection(),
    this.stop()
}
function ItemSprite(e) {
    var t = new createjs.Sprite(itemSS,e + "3");
    return t.name = e,
    t
}
function DeckContainer() {
    createjs.Container.call(this),
    this.width = 850,
    this.height = 480,
    this.show(),
    this.showCard("ghost_ship")
}
function ItemContainer(e, t, a) {
    if (createjs.Container.call(this),
    this.itemId = e,
    this.isActive = t || !1,
    this.background = new createjs.Sprite(uxSS,"item"),
    this.addChild(this.background),
    t && this.background.gotoAndStop("item-active"),
    e) {
        var r = new createjs.Bitmap("/media/63-dad/icons/viking.png");
        r.scaleX = .3,
        r.scaleY = .3,
        r.x = 10,
        r.y = 10,
        this.addChild(r)
    }
    this.on("click", function() {
        this.isActive ? (this.background.gotoAndStop("item"),
        this.isActive = !1) : (this.background.gotoAndStop("item-active"),
        this.isActive = !0),
        a && a(this.isActive)
    })
}
function MascotContainer(e) {
    createjs.MovieClip.call(this),
    this.scaleX = 1,
    this.scaleY = 1,
    this.framerate = 30,
    this.loop = -1,
    this.currentDirection,
    this.directionFrames = [0, 1, 3, 3, 4, 5, 5, 7];
    var t = new createjs.SpriteSheet(e);
    this.sprite = new createjs.Sprite(t,"body4"),
    this.addChild(this.sprite),
    this.stop()
}
function PlayerContainer(e, t) {
    createjs.Container.call(this),
    this.playerId = e.i,
    this.isLocal = !1,
    this.critterId = e.c,
    this.isMoving = !1,
    this.nickname,
    this.balloon,
    this.direction = 0,
    this.animation = "none",
    this.speed = 5,
    this.targetX,
    this.targetY,
    "RocketSnail" == e.n ? this.critter = new MascotContainer(mascotData.snail) : this.critter = new CritterContainer(this.critterId),
    this.critter.scaleX = .5,
    this.critter.scaleY = .5,
    e.g && this.updateGear(e.g),
    this.addChild(this.critter)
}
!function() {
    function e(e, t, a, r) {
        createjs.Container.call(this),
        this.x = e,
        this.y = t,
        this.w = a,
        this.h = r,
        this.background = new s(a,r),
        this.addChild(this.background)
    }
    function s(e, t) {
        var a = new createjs.Shape;
        return a.graphics.beginFill("#ffc107").drawRect(0, 0, e, t),
        a
    }
    function a(e) {
        if (createjs.Container.call(this),
        e.image) {
            var t = new createjs.Bitmap(e.image);
            this.addChild(t)
        }
        if (e.menu) {
            var a = new r(e.menu);
            a.setTransform(0, 362),
            this.addChild(a)
        }
    }
    function r(e) {
        createjs.Container.call(this);
        for (var t = e.length, a = 0; a < t; a++) {
            var r = new boot.Button(e[a].text);
            r.x = 80 * a,
            this.addChild(r)
        }
    }
    (e.prototype = Object.create(createjs.Container.prototype)).append = function(e) {
        var t = this.children
          , a = t[t.length - 1];
        e.y = a.height + a.y,
        this.addChild(e)
    }
    ,
    e.prototype.showCard = function(e) {
        var t = new a(e);
        this.addChild(t)
    }
    ,
    e.prototype.addMenu = function() {
        console.log("addMenu");
        var e = new r;
        this.append(e)
    }
    ,
    a.prototype = Object.create(createjs.Container.prototype),
    r.prototype = Object.create(createjs.Container.prototype),
    deck.Deck = e,
    deck.Card = a,
    deck.Menu = r
}(),
BadgeContainer.prototype = Object.create(createjs.Container.prototype),
ButtonContainer.prototype = Object.create(createjs.Container.prototype),
ButtonContainer.prototype.large = function() {
    return console.log("LARGE"),
    this
}
,
ButtonContainer.prototype.style = function() {
    console.log("STYLE")
}
,
CardContainer.prototype = Object.create(createjs.Container.prototype),
CritterContainer.prototype = Object.create(createjs.MovieClip.prototype),
CritterContainer.prototype.addItem = function(e, t) {
    if (this.backs.includes(e))
        this.removeItem(e),
        this.removeItem(e + "_back"),
        this.slots[e].addChild(new ItemSprite(t)),
        this.slots[e + "_back"].addChild(new ItemSprite(t + "_BACK")),
        this.updateDirection();
    else {
        var a = this.slots[e];
        a && (this.removeItem(e),
        a.addChild(new ItemSprite(t)),
        this.updateDirection())
    }
}
,
CritterContainer.prototype.removeItem = function(e) {
    this.backs.includes(e) ? (this.slots[e].removeAllChildren(),
    this.slots[e + "_back"].removeAllChildren()) : this.slots[e].removeAllChildren()
}
,
CritterContainer.prototype.updateGear = function(e) {
    for (var t in this.slots)
        this.removeItem(t);
    for (var t in e)
        this.addItem(t, e[t])
}
,
CritterContainer.prototype.updateDirection = function(e) {
    for (var t in void 0 === e && (e = this.currentDirection),
    1 < e && e < 7 ? (this.isForward || (this.isForward = !0,
    this.updateDepth()),
    this.face.sprite.gotoAndStop("smile" + e),
    this.face.visible = !0) : (this.isForward && (this.isForward = !1,
    this.updateDepth()),
    this.face.visible = !1),
    this.slots) {
        var a = this.slots[t];
        if (a.children[0]) {
            var r = a.children[0]
              , s = r.name + e;
            itemData.animations[s] ? (r.gotoAndStop(s),
            a.visible = !0) : a.visible = !1
        }
    }
    this.skin.sprite.gotoAndStop("body" + e),
    this.hasTail && this.tail.sprite.gotoAndStop("tail" + e),
    this.currentDirection = e
}
,
CritterContainer.prototype.updateDepth = function() {
    if (this.isForward)
        var e = this.forward;
    else
        e = this.backward;
    for (var t = 0; t < e.length; t++) {
        var a = e[t];
        this.bodyContainer.setChildIndex(a, t)
    }
}
,
CritterContainer.prototype.updateState = function(e) {
    "move" == e ? (this.state = e,
    this.gotoAndPlay(0)) : (this.state = e,
    this.gotoAndStop(0))
}
,
DeckContainer.prototype = Object.create(createjs.Container.prototype),
DeckContainer.prototype.show = function() {
    var e = new createjs.Shape;
    e.graphics.beginFill("black").drawRect(0, 0, this.width, this.height),
    e.alpha = .6,
    this.addChild(e),
    this.visible = !0
}
,
DeckContainer.prototype.showCard = function(e) {
    var t = new CardContainer(e);
    t.setTransform(299, 40),
    t.on("click", function() {
        console.log("CLICK")
    }),
    this.addChild(t)
}
,
ItemContainer.prototype = Object.create(createjs.Container.prototype),
MascotContainer.prototype = Object.create(createjs.MovieClip.prototype),
MascotContainer.prototype.updateDirection = function(e) {
    void 0 === e ? e = this.currentDirection : this.currentDirection = e;
    var t = this.directionFrames[e];
    null != t && this.sprite.gotoAndStop("body" + t)
}
,
MascotContainer.prototype.addItem = function() {}
,
MascotContainer.prototype.removeItem = function() {}
,
MascotContainer.prototype.updateGear = function() {}
,
MascotContainer.prototype.updateState = function(e) {
    "move" == e ? this.sprite.gotoAndPlay("body" + this.currentDirection) : this.updateDirection()
}
,
PlayerContainer.prototype = Object.create(createjs.Container.prototype),
PlayerContainer.prototype.updateDirection = function(e) {
    this.direction = e,
    this.critter.updateDirection(e)
}
,
PlayerContainer.prototype.updateRotation = function(e) {
    this.character.rotation = e
}
,
PlayerContainer.prototype.updateState = function(e) {
    this.critter.updateState(e)
}
,
PlayerContainer.prototype.updateGear = function(e) {
    this.critter.updateGear(e)
}
;
var EventEmitter = function() {
    this.events = {}
};
EventEmitter.prototype.on = function(e, t) {
    "object" != typeof this.events[e] && (this.events[e] = []),
    this.events[e].push(t)
}
,
EventEmitter.prototype.removeListener = function(e, t) {
    var a;
    "object" == typeof this.events[e] && -1 < (a = indexOf(this.events[e], t)) && this.events[e].splice(a, 1)
}
,
EventEmitter.prototype.emit = function(e) {
    var t, a, r, s = [].slice.call(arguments, 1);
    if ("object" == typeof this.events[e])
        for (r = (a = this.events[e].slice()).length,
        t = 0; t < r; t++)
            a[t].apply(this, s)
}
,
EventEmitter.prototype.once = function(t, a) {
    this.on(t, function e() {
        this.removeListener(t, e),
        a.apply(this, arguments)
    })
}
;
var artwork = {};
function calculateDistance(e, t, a, r) {
    var s = a - e
      , i = r - t;
    return Math.sqrt(s * s + i * i)
}
function calculateAngle(e, t, a, r) {
    var s = a - e
      , i = t - r
      , o = Math.atan2(s, i)
      , n = Math.floor(180 * o / Math.PI);
    return n < 0 ? n + 360 : n
}
function findDirection(e) {
    var t = Math.floor((e + 22.5) / 45);
    return 7 < t ? 0 : t
}
artwork.crosshair = new createjs.Shape,
artwork.crosshair.graphics.setStrokeStyle(1).beginStroke("black").moveTo(-10, 0).lineTo(10, 0).moveTo(0, -10).lineTo(0, 10);
var critterData = {
    hamster: {
        images: ["/media/63-dad/critters/hamster.png"],
        frames: [[1, 1, 65, 99, 0, -36, -43], [1, 102, 65, 99, 0, -36, -43], [1, 102, 65, 99, 0, -36, -43], [68, 1, 65, 99, 0, -36, -43], [68, 1, 65, 99, 0, -36, -43], [68, 102, 65, 99, 0, -36, -43], [135, 1, 65, 98, 0, -36, -44], [135, 101, 65, 98, 0, -36, -44], [1, 203, 60, 23, 0, -38, -129], [63, 203, 40, 41, 0, -48, -58], [105, 203, 36, 41, 0, -60, -58], [105, 203, 36, 41, 0, -60, -58], [143, 201, 50, 51, 0, -43, -97], [195, 201, 36, 41, 0, -40, -58], [195, 201, 36, 41, 0, -40, -58]],
        animations: {
            body1: {
                frames: [0]
            },
            body2: {
                frames: [1]
            },
            body3: {
                frames: [2]
            },
            body5: {
                frames: [3]
            },
            body6: {
                frames: [4]
            },
            body7: {
                frames: [5]
            },
            body0: {
                frames: [6]
            },
            body4: {
                frames: [7]
            },
            shadow: {
                frames: [8]
            },
            smile4: {
                frames: [9]
            },
            smile2: {
                frames: [10]
            },
            smile3: {
                frames: [11]
            },
            feet: {
                frames: [12]
            },
            smile5: {
                frames: [13]
            },
            smile6: {
                frames: [14]
            }
        }
    },
    beaver: {
        images: ["/media/63-dad/critters/beaver.png"],
        framerate: 20,
        frames: [[1, 1, 65, 98, 0, -36, -44], [68, 1, 65, 98, 0, -36, -44], [135, 1, 65, 98, 0, -36, -44], [135, 1, 65, 98, 0, -36, -44], [202, 1, 65, 98, 0, -36, -44], [269, 1, 65, 98, 0, -36, -44], [269, 1, 65, 98, 0, -36, -44], [336, 1, 65, 98, 0, -36, -44], [403, 1, 52, 64, 0, -45, -78], [457, 1, 54, 62, 0, -22, -79], [513, 1, 54, 61, 0, -60, -80], [569, 1, 27, 55, 0, -94, -78], [569, 1, 27, 55, 0, -94, -78], [1, 101, 54, 23, 0, -41, -44], [57, 101, 54, 23, 0, -41, -44], [403, 67, 50, 27, 0, -43, -121], [113, 101, 51, 23, 0, -42, -44], [166, 101, 51, 23, 0, -43, -44], [166, 101, 51, 23, 0, -43, -44], [219, 101, 51, 23, 0, -42, -44], [219, 101, 51, 23, 0, -42, -44], [272, 101, 51, 23, 0, -43, -44], [457, 65, 40, 48, 0, -48, -59], [499, 65, 36, 49, 0, -60, -58], [499, 65, 36, 49, 0, -60, -58], [537, 64, 36, 49, 0, -40, -58], [537, 64, 36, 49, 0, -40, -58], [575, 58, 26, 54, 0, -16, -78], [575, 58, 26, 54, 0, -16, -78], [598, 1, 3, 3, 0, 0, 0]],
        animations: {
            body0: {
                frames: [0]
            },
            body1: {
                frames: [1]
            },
            body2: {
                frames: [2]
            },
            body3: {
                frames: [3]
            },
            body4: {
                frames: [4]
            },
            body5: {
                frames: [5]
            },
            body6: {
                frames: [6]
            },
            body7: {
                frames: [7]
            },
            tail0: {
                frames: [8]
            },
            tail1: {
                frames: [9]
            },
            tail7: {
                frames: [10]
            },
            tail5: {
                frames: [11]
            },
            tail6: {
                frames: [12]
            },
            ears0: {
                frames: [13]
            },
            ears4: {
                frames: [14]
            },
            feet: {
                frames: [15]
            },
            ears1: {
                frames: [16]
            },
            ears2: {
                frames: [17]
            },
            ears3: {
                frames: [18]
            },
            ears5: {
                frames: [19]
            },
            ears6: {
                frames: [20]
            },
            ears7: {
                frames: [21]
            },
            smile4: {
                frames: [22]
            },
            smile2: {
                frames: [23]
            },
            smile3: {
                frames: [24]
            },
            smile5: {
                frames: [25]
            },
            smile6: {
                frames: [26]
            },
            tail2: {
                frames: [27]
            },
            tail3: {
                frames: [28]
            },
            tail4: {
                frames: [29]
            }
        }
    },
    lizard: {
        images: ["/media/63-dad/critters/lizard.png"],
        framerate: 20,
        frames: [[1, 1, 65, 108, 0, -36, -52], [68, 1, 78, 104, 0, -23, -52], [148, 1, 77, 104, 0, -36, -52], [227, 1, 85, 90, 0, -16, -52], [227, 1, 85, 90, 0, -16, -52], [227, 93, 53, 31, 0, -44, -37], [227, 93, 53, 31, 0, -44, -37], [282, 93, 53, 31, 0, -42, -37], [314, 1, 84, 90, 0, -36, -52], [314, 1, 84, 90, 0, -36, -52], [337, 93, 52, 31, 0, -42, -37], [391, 93, 52, 31, 0, -40, -37], [391, 93, 52, 31, 0, -40, -37], [400, 1, 65, 90, 0, -36, -52], [445, 93, 52, 30, 0, -42, -37], [467, 1, 54, 42, 0, -41, -61], [467, 45, 47, 41, 0, -53, -62], [467, 45, 47, 41, 0, -53, -62], [499, 88, 50, 27, 0, -43, -121], [516, 45, 47, 41, 0, -36, -62], [516, 45, 47, 41, 0, -36, -62]],
        animations: {
            body0: {
                frames: [0]
            },
            body1: {
                frames: [1]
            },
            body7: {
                frames: [2]
            },
            body2: {
                frames: [3]
            },
            body3: {
                frames: [4]
            },
            ears2: {
                frames: [5]
            },
            ears3: {
                frames: [6]
            },
            ears7: {
                frames: [7]
            },
            body5: {
                frames: [8]
            },
            body6: {
                frames: [9]
            },
            ears1: {
                frames: [10]
            },
            ears5: {
                frames: [11]
            },
            ears6: {
                frames: [12]
            },
            body4: {
                frames: [13]
            },
            ears4: {
                frames: [14]
            },
            smile4: {
                frames: [15]
            },
            smile2: {
                frames: [16]
            },
            smile3: {
                frames: [17]
            },
            feet: {
                frames: [18]
            },
            smile5: {
                frames: [19]
            },
            smile6: {
                frames: [20]
            }
        }
    }
}
  , itemData = {
    framerate: 10,
    frames: [[1, 1, 112, 129, 0, -12, -5], [1, 132, 112, 128, 0, -12, -1], [115, 1, 105, 126, 0, -1, -5], [1, 262, 105, 126, 0, -30, -5], [115, 129, 90, 126, 0, 0, -2], [115, 129, 90, 126, 0, 0, -2], [222, 1, 90, 126, 0, -46, -2], [222, 1, 90, 126, 0, -46, -2], [314, 1, 117, 70, 0, -17, -70], [433, 1, 117, 70, 0, -2, -70], [433, 1, 117, 70, 0, -2, -70], [1, 390, 88, 97, 0, -24, -19], [207, 129, 88, 97, 0, -24, -19], [1, 489, 88, 97, 0, -24, -19], [1, 588, 81, 97, 0, -28, -19], [1, 687, 80, 97, 0, -28, -19], [1, 786, 80, 97, 0, -29, -19], [1, 885, 79, 97, 0, -28, -19], [1, 984, 77, 97, 0, -28, -19], [1, 984, 77, 97, 0, -28, -19], [1, 1083, 77, 97, 0, -32, -19], [1, 1083, 77, 97, 0, -32, -19], [552, 1, 105, 68, 0, -17, -72], [659, 1, 102, 68, 0, -17, -72], [659, 1, 102, 68, 0, -17, -72], [763, 1, 102, 67, 0, -18, -30], [1, 1182, 86, 90, 0, -28, -20], [1, 1274, 86, 90, 0, -22, -20], [1, 1366, 86, 90, 0, -28, -20], [1, 1458, 92, 89, 0, -22, -21], [1, 1549, 92, 89, 0, -22, -21], [867, 1, 98, 76, 0, -12, -29], [314, 73, 103, 54, 0, -30, -36], [314, 73, 103, 54, 0, -30, -36], [297, 129, 92, 89, 0, -22, -21], [1, 1640, 67, 21, 0, -35, -71], [419, 73, 102, 57, 0, -17, -60], [391, 132, 92, 89, 0, -22, -21], [485, 132, 88, 89, 0, -26, -21], [485, 132, 88, 89, 0, -26, -21], [523, 73, 93, 57, 0, -19, -27], [618, 71, 94, 61, 0, -13, -28], [575, 134, 92, 89, 0, -22, -21], [669, 134, 89, 89, 0, -22, -21], [669, 134, 89, 89, 0, -22, -21], [714, 71, 85, 61, 0, -24, -18], [760, 134, 89, 89, 0, -25, -21], [760, 134, 89, 89, 0, -25, -21], [801, 79, 93, 53, 0, -22, -28], [896, 79, 89, 89, 0, -22, -21], [896, 79, 89, 89, 0, -22, -21], [207, 228, 94, 55, 0, -22, -27], [303, 220, 86, 87, 0, -22, -23], [391, 223, 92, 89, 0, -22, -21], [485, 223, 88, 89, 0, -26, -21], [485, 223, 88, 89, 0, -26, -21], [575, 225, 89, 89, 0, -22, -21], [575, 225, 89, 89, 0, -22, -21], [666, 225, 86, 87, 0, -28, -23], [754, 225, 86, 87, 0, -22, -23], [115, 257, 90, 50, 0, -23, -31], [108, 309, 93, 69, 0, -23, -30], [108, 309, 93, 69, 0, -23, -30], [207, 285, 93, 51, 0, -23, -29], [207, 285, 93, 51, 0, -23, -29], [203, 338, 97, 51, 0, -20, -29], [203, 338, 97, 51, 0, -20, -29], [302, 309, 87, 71, 0, -25, -14], [391, 314, 93, 66, 0, -20, -30], [391, 314, 93, 66, 0, -20, -30], [486, 314, 87, 67, 0, -27, -13], [486, 314, 87, 67, 0, -27, -13], [575, 316, 88, 74, 0, -24, -14], [108, 380, 93, 55, 0, -23, -30], [203, 391, 102, 46, 0, -8, -90], [307, 382, 102, 49, 0, -18, -30], [91, 437, 86, 71, 0, -25, -14], [91, 510, 86, 67, 0, -23, -13], [91, 510, 86, 67, 0, -23, -13], [179, 439, 74, 81, 0, -32, -26], [179, 439, 74, 81, 0, -32, -26], [179, 439, 74, 81, 0, -32, -26], [255, 439, 74, 81, 0, -30, -26], [255, 439, 74, 81, 0, -30, -26], [255, 439, 74, 81, 0, -30, -26], [255, 439, 74, 81, 0, -30, -26], [255, 439, 74, 81, 0, -30, -26], [179, 522, 96, 57, 0, -28, -34], [331, 433, 76, 77, 0, -31, -31], [331, 433, 76, 77, 0, -31, -31], [331, 433, 76, 77, 0, -31, -31], [331, 433, 76, 77, 0, -31, -31], [331, 433, 76, 77, 0, -31, -31], [411, 382, 73, 51, 0, -31, -89], [409, 435, 75, 77, 0, -30, -31], [409, 435, 75, 77, 0, -30, -31], [409, 435, 75, 77, 0, -30, -31], [486, 383, 62, 93, 0, -37, -50], [550, 392, 85, 68, 0, -18, -28], [70, 1640, 65, 21, 0, -36, -69], [277, 522, 92, 57, 0, -22, -27], [371, 514, 90, 61, 0, -23, -14], [666, 314, 102, 39, 0, -17, -101], [665, 355, 102, 39, 0, -17, -101], [637, 396, 93, 56, 0, -20, -30], [770, 314, 78, 40, 0, -27, -89], [770, 314, 78, 40, 0, -27, -89], [769, 356, 80, 45, 0, -37, -34], [732, 403, 102, 45, 0, -26, -100], [732, 450, 102, 28, 0, -17, -89], [732, 450, 102, 28, 0, -17, -89], [732, 450, 102, 28, 0, -17, -89], [732, 450, 102, 28, 0, -17, -89], [732, 450, 102, 28, 0, -17, -89], [732, 450, 102, 28, 0, -17, -89], [732, 450, 102, 28, 0, -17, -89], [842, 225, 60, 87, 0, -26, -47], [851, 170, 71, 53, 0, -33, -28], [924, 170, 61, 56, 0, -49, -38], [904, 228, 75, 74, 0, -35, -35], [904, 228, 75, 74, 0, -35, -35], [550, 462, 88, 51, 0, -25, -31], [640, 454, 85, 68, 0, -33, -29], [486, 478, 62, 45, 0, -37, -33], [727, 480, 96, 49, 0, -18, -28], [463, 525, 87, 51, 0, -24, -31], [463, 525, 87, 51, 0, -24, -31], [552, 515, 79, 69, 0, -32, -31], [552, 515, 79, 69, 0, -32, -31], [633, 524, 88, 51, 0, -23, -31], [723, 531, 96, 49, 0, -22, -28], [633, 577, 88, 46, 0, -23, -31], [723, 582, 87, 51, 0, -25, -31], [723, 582, 87, 51, 0, -25, -31], [851, 314, 60, 87, 0, -50, -47], [913, 304, 72, 59, 0, -32, -85], [913, 365, 72, 58, 0, -31, -26], [913, 365, 72, 58, 0, -31, -26], [836, 403, 75, 71, 0, -26, -39], [836, 403, 75, 71, 0, -26, -39], [913, 425, 72, 56, 0, -32, -88], [91, 579, 82, 56, 0, -27, -19], [175, 581, 79, 54, 0, -30, -36], [175, 581, 79, 54, 0, -30, -36], [256, 581, 78, 59, 0, -29, -49], [84, 637, 80, 48, 0, -40, -97], [84, 637, 80, 48, 0, -40, -97], [83, 687, 77, 71, 0, -29, -28], [83, 760, 76, 70, 0, -26, -27], [83, 832, 78, 59, 0, -29, -49], [82, 893, 74, 70, 0, -27, -29], [166, 637, 78, 48, 0, -28, -96], [166, 637, 78, 48, 0, -28, -96], [162, 687, 75, 66, 0, -26, -42], [246, 642, 80, 45, 0, -37, -34], [239, 689, 74, 63, 0, -30, -81], [239, 689, 74, 63, 0, -30, -81], [336, 581, 74, 59, 0, -30, -81], [336, 581, 74, 59, 0, -30, -81], [328, 642, 80, 45, 0, -37, -34], [315, 689, 74, 63, 0, -32, -81], [315, 689, 74, 63, 0, -32, -81], [412, 577, 49, 84, 0, -20, -42], [412, 577, 49, 84, 0, -20, -42], [463, 578, 70, 69, 0, -35, -43], [535, 586, 74, 59, 0, -32, -81], [535, 586, 74, 59, 0, -32, -81], [82, 965, 78, 41, 0, -29, -89], [80, 1008, 68, 67, 0, -36, -31], [80, 1008, 68, 67, 0, -36, -31], [80, 1077, 49, 84, 0, -67, -42], [80, 1077, 49, 84, 0, -67, -42], [836, 476, 75, 32, 0, -35, -61], [836, 476, 75, 32, 0, -35, -61], [913, 483, 72, 56, 0, -31, -28], [913, 483, 72, 56, 0, -31, -28], [825, 510, 80, 45, 0, -37, -34], [907, 541, 78, 47, 0, -29, -49], [907, 541, 78, 47, 0, -29, -49], [907, 541, 78, 47, 0, -29, -49], [821, 557, 80, 38, 0, -20, -50], [812, 597, 79, 45, 0, -20, -34], [463, 649, 73, 26, 0, -33, -63], [463, 649, 73, 26, 0, -33, -63], [538, 647, 78, 40, 0, -31, -89], [538, 647, 78, 40, 0, -31, -89], [618, 625, 74, 59, 0, -30, -81], [618, 625, 74, 59, 0, -30, -81], [694, 635, 77, 54, 0, -29, -22], [410, 663, 51, 48, 0, -27, -22], [463, 677, 73, 51, 0, -32, -89], [538, 689, 79, 45, 0, -20, -34], [619, 686, 73, 51, 0, -31, -89], [694, 691, 78, 47, 0, -29, -49], [694, 691, 78, 47, 0, -29, -49], [694, 691, 78, 47, 0, -29, -49], [391, 713, 69, 46, 0, -34, -41], [391, 713, 69, 46, 0, -34, -41], [391, 713, 69, 46, 0, -34, -41], [462, 730, 74, 57, 0, -30, -49], [462, 730, 74, 57, 0, -30, -49], [538, 736, 77, 55, 0, -31, -21], [538, 736, 77, 55, 0, -31, -21], [617, 739, 74, 57, 0, -30, -49], [617, 739, 74, 57, 0, -30, -49], [693, 740, 77, 55, 0, -28, -21], [693, 740, 77, 55, 0, -28, -21], [773, 644, 79, 45, 0, -20, -34], [774, 691, 77, 54, 0, -30, -22], [772, 747, 79, 45, 0, -20, -34], [854, 644, 77, 45, 0, -38, -32], [854, 644, 77, 45, 0, -38, -32], [853, 691, 74, 59, 0, -32, -81], [853, 691, 74, 59, 0, -32, -81], [853, 752, 76, 45, 0, -22, -32], [853, 752, 76, 45, 0, -22, -32], [903, 590, 72, 52, 0, -32, -88], [933, 644, 52, 51, 0, -32, -18], [929, 697, 56, 26, 0, -40, -63], [931, 725, 54, 51, 0, -57, -19], [931, 725, 54, 51, 0, -57, -19], [931, 778, 54, 51, 0, -25, -19], [931, 778, 54, 51, 0, -25, -19], [772, 794, 79, 33, 0, -35, -50], [853, 799, 76, 45, 0, -22, -32], [853, 799, 76, 45, 0, -22, -32], [693, 797, 77, 45, 0, -38, -32], [693, 797, 77, 45, 0, -38, -32], [772, 829, 77, 45, 0, -38, -32], [772, 829, 77, 45, 0, -38, -32], [851, 846, 77, 45, 0, -38, -32], [851, 846, 77, 45, 0, -38, -32], [89, 1163, 71, 60, 0, -31, -27], [89, 1225, 71, 60, 0, -34, -27], [89, 1287, 74, 59, 0, -30, -81], [89, 1287, 74, 59, 0, -30, -81], [89, 1348, 74, 59, 0, -32, -81], [89, 1348, 74, 59, 0, -32, -81], [89, 1409, 69, 47, 0, -37, -49], [95, 1458, 74, 59, 0, -30, -81], [95, 1458, 74, 59, 0, -30, -81], [95, 1519, 74, 59, 0, -32, -81], [95, 1519, 74, 59, 0, -32, -81], [95, 1580, 71, 58, 0, -32, -29], [137, 1640, 65, 21, 0, -36, -69], [168, 1580, 71, 58, 0, -32, -29], [204, 1640, 65, 21, 0, -36, -69], [162, 755, 76, 45, 0, -22, -32], [162, 755, 76, 45, 0, -22, -32], [240, 754, 76, 48, 0, -29, -28], [240, 754, 76, 48, 0, -29, -28], [240, 754, 76, 48, 0, -29, -28], [318, 754, 71, 59, 0, -31, -28], [391, 761, 69, 57, 0, -37, -49], [391, 761, 69, 57, 0, -37, -49], [161, 802, 77, 28, 0, -35, -64], [163, 832, 74, 59, 0, -30, -81], [163, 832, 74, 59, 0, -30, -81], [158, 893, 74, 59, 0, -32, -81], [158, 893, 74, 59, 0, -32, -81], [240, 804, 76, 45, 0, -22, -32], [240, 804, 76, 45, 0, -22, -32], [239, 851, 76, 48, 0, -31, -28], [239, 851, 76, 48, 0, -31, -28], [239, 851, 76, 48, 0, -31, -28], [234, 901, 74, 59, 0, -30, -81], [234, 901, 74, 59, 0, -30, -81], [162, 954, 69, 56, 0, -30, -49], [150, 1012, 74, 59, 0, -32, -81], [150, 1012, 74, 59, 0, -32, -81], [233, 962, 73, 51, 0, -32, -89], [226, 1015, 73, 55, 0, -31, -89], [318, 815, 71, 56, 0, -34, -28], [318, 815, 71, 56, 0, -34, -28], [391, 820, 69, 57, 0, -37, -49], [391, 820, 69, 57, 0, -37, -49], [462, 789, 71, 59, 0, -34, -28], [535, 793, 73, 55, 0, -32, -89], [610, 798, 73, 51, 0, -31, -89], [462, 850, 77, 32, 0, -36, -50], [317, 873, 72, 55, 0, -32, -85], [391, 879, 69, 56, 0, -30, -49], [462, 884, 73, 51, 0, -32, -89], [310, 930, 77, 34, 0, -24, -50], [310, 930, 77, 34, 0, -24, -50], [308, 966, 73, 51, 0, -31, -89], [301, 1019, 73, 51, 0, -32, -89], [389, 937, 77, 28, 0, -35, -64], [383, 967, 73, 51, 0, -31, -89], [376, 1020, 73, 51, 0, -32, -89], [541, 850, 67, 56, 0, -35, -23], [610, 851, 72, 55, 0, -32, -85], [537, 908, 76, 28, 0, -25, -64], [615, 908, 69, 46, 0, -33, -41], [615, 908, 69, 46, 0, -33, -41], [615, 908, 69, 46, 0, -33, -41], [615, 908, 69, 46, 0, -33, -41], [615, 908, 69, 46, 0, -33, -41], [468, 937, 66, 33, 0, -35, -50], [458, 972, 73, 51, 0, -31, -89], [451, 1025, 73, 51, 0, -32, -89], [536, 938, 75, 32, 0, -26, -61], [536, 938, 75, 32, 0, -26, -61], [533, 972, 72, 52, 0, -32, -88], [526, 1026, 72, 52, 0, -32, -88], [613, 956, 73, 26, 0, -30, -63], [613, 956, 73, 26, 0, -30, -63], [607, 984, 72, 55, 0, -32, -85], [600, 1041, 72, 52, 0, -32, -88], [150, 1073, 75, 33, 0, -35, -61], [150, 1073, 75, 33, 0, -35, -61], [131, 1108, 71, 53, 0, -33, -28], [227, 1072, 75, 33, 0, -26, -61], [227, 1072, 75, 33, 0, -26, -61], [304, 1072, 69, 47, 0, -37, -49], [375, 1073, 72, 55, 0, -32, -85], [449, 1078, 72, 52, 0, -32, -88], [523, 1080, 72, 55, 0, -32, -85], [597, 1095, 72, 52, 0, -32, -88], [162, 1163, 71, 59, 0, -31, -28], [162, 1224, 71, 59, 0, -34, -28], [165, 1285, 71, 59, 0, -31, -28], [165, 1346, 71, 59, 0, -34, -28], [204, 1108, 69, 53, 0, -34, -89], [235, 1163, 71, 59, 0, -32, -28], [235, 1224, 71, 58, 0, -32, -29], [238, 1284, 71, 58, 0, -34, -26], [238, 1284, 71, 58, 0, -34, -26], [238, 1344, 72, 56, 0, -31, -28], [238, 1344, 72, 56, 0, -31, -28], [275, 1121, 62, 40, 0, -37, -37], [308, 1163, 66, 57, 0, -35, -22], [308, 1222, 66, 57, 0, -35, -22], [311, 1281, 71, 56, 0, -34, -28], [311, 1281, 71, 56, 0, -34, -28], [312, 1339, 72, 56, 0, -31, -28], [312, 1339, 72, 56, 0, -31, -28], [376, 1130, 71, 56, 0, -34, -28], [376, 1130, 71, 56, 0, -34, -28], [449, 1132, 72, 55, 0, -32, -85], [523, 1137, 72, 54, 0, -32, -87], [523, 1137, 72, 54, 0, -32, -87], [523, 1137, 72, 54, 0, -32, -87], [376, 1188, 71, 55, 0, -33, -26], [449, 1189, 72, 54, 0, -32, -87], [449, 1189, 72, 54, 0, -32, -87], [523, 1193, 72, 54, 0, -32, -87], [597, 1149, 72, 54, 0, -32, -87], [597, 1149, 72, 54, 0, -32, -87], [597, 1205, 71, 53, 0, -33, -28], [376, 1245, 66, 34, 0, -35, -60], [384, 1281, 66, 56, 0, -34, -20], [384, 1281, 66, 56, 0, -34, -20], [386, 1339, 66, 56, 0, -36, -20], [386, 1339, 66, 56, 0, -36, -20], [444, 1245, 66, 34, 0, -35, -60], [452, 1281, 69, 53, 0, -34, -89], [454, 1336, 69, 53, 0, -34, -89], [454, 1336, 69, 53, 0, -34, -89], [512, 1249, 76, 28, 0, -25, -64], [523, 1279, 69, 53, 0, -34, -89], [525, 1334, 69, 53, 0, -34, -89], [525, 1334, 69, 53, 0, -34, -89], [594, 1260, 69, 53, 0, -34, -89], [596, 1315, 69, 53, 0, -34, -21], [596, 1370, 73, 26, 0, -33, -63], [596, 1370, 73, 26, 0, -33, -63], [525, 1389, 69, 52, 0, -34, -89], [454, 1391, 69, 52, 0, -34, -89], [596, 1398, 69, 52, 0, -34, -89], [596, 1398, 69, 52, 0, -34, -89], [525, 1443, 69, 52, 0, -34, -89], [596, 1452, 69, 52, 0, -34, -89], [596, 1452, 69, 52, 0, -34, -89], [312, 1397, 73, 26, 0, -30, -63], [312, 1397, 73, 26, 0, -30, -63], [387, 1397, 65, 50, 0, -36, -90], [387, 1397, 65, 50, 0, -36, -90], [387, 1397, 65, 50, 0, -36, -90], [454, 1445, 69, 52, 0, -34, -89], [241, 1402, 69, 49, 0, -34, -91], [171, 1407, 68, 46, 0, -34, -94], [171, 1455, 69, 49, 0, -34, -91], [171, 1506, 69, 49, 0, -34, -91], [171, 1506, 69, 49, 0, -34, -91], [242, 1453, 69, 49, 0, -34, -91], [242, 1504, 69, 49, 0, -34, -91], [242, 1504, 69, 49, 0, -34, -91], [313, 1425, 69, 49, 0, -34, -91], [384, 1449, 68, 47, 0, -34, -93], [313, 1476, 65, 51, 0, -36, -89], [313, 1476, 65, 51, 0, -36, -89], [313, 1476, 65, 51, 0, -36, -89], [380, 1498, 68, 46, 0, -34, -94], [450, 1499, 68, 46, 0, -34, -94], [450, 1499, 68, 46, 0, -34, -94], [313, 1529, 65, 50, 0, -36, -90], [313, 1529, 65, 50, 0, -36, -90], [380, 1546, 68, 46, 0, -34, -94], [450, 1547, 68, 46, 0, -34, -94], [450, 1547, 68, 46, 0, -34, -94], [967, 1, 12, 64, 0, -31, -39], [171, 1557, 60, 16, 0, -38, -68], [241, 1594, 62, 44, 0, -37, -34], [242, 1555, 62, 37, 0, -37, -37], [306, 1581, 68, 46, 0, -34, -94], [376, 1594, 68, 47, 0, -34, -93], [446, 1595, 68, 47, 0, -34, -93], [446, 1595, 68, 47, 0, -34, -93], [305, 1629, 60, 26, 0, -38, -63], [525, 1497, 68, 47, 0, -34, -93], [520, 1546, 68, 47, 0, -34, -93], [520, 1546, 68, 47, 0, -34, -93], [516, 1595, 68, 47, 0, -34, -93], [595, 1506, 68, 46, 0, -34, -94], [595, 1506, 68, 46, 0, -34, -94], [595, 1506, 68, 46, 0, -34, -94], [590, 1554, 68, 46, 0, -34, -94], [590, 1554, 68, 46, 0, -34, -94], [586, 1602, 68, 46, 0, -34, -94], [339, 1121, 29, 38, 0, -80, -63], [339, 1121, 29, 38, 0, -80, -63], [801, 70, 62, 5, 0, -37, -70], [685, 844, 68, 46, 0, -34, -94], [685, 844, 68, 46, 0, -34, -94], [686, 892, 65, 51, 0, -36, -89], [688, 945, 68, 46, 0, -34, -94], [681, 993, 68, 46, 0, -34, -94], [674, 1041, 65, 51, 0, -36, -89], [674, 1041, 65, 51, 0, -36, -89], [674, 1041, 65, 51, 0, -36, -89], [755, 876, 68, 46, 0, -34, -94], [755, 876, 68, 46, 0, -34, -94], [758, 924, 65, 51, 0, -36, -89], [825, 893, 65, 50, 0, -36, -90], [825, 945, 68, 46, 0, -34, -94], [758, 977, 65, 50, 0, -36, -90], [758, 977, 65, 50, 0, -36, -90], [825, 993, 68, 46, 0, -34, -94], [825, 993, 68, 46, 0, -34, -94], [892, 893, 65, 50, 0, -36, -90], [892, 893, 65, 50, 0, -36, -90], [895, 945, 65, 50, 0, -36, -90], [895, 945, 65, 50, 0, -36, -90], [895, 997, 68, 46, 0, -34, -94], [751, 1029, 68, 46, 0, -34, -94], [821, 1041, 68, 46, 0, -34, -94], [891, 1045, 68, 46, 0, -34, -94], [891, 1045, 68, 46, 0, -34, -94], [741, 1077, 68, 46, 0, -34, -94], [674, 1094, 65, 50, 0, -36, -90], [674, 1094, 65, 50, 0, -36, -90], [674, 1094, 65, 50, 0, -36, -90], [671, 1146, 65, 50, 0, -36, -90], [671, 1146, 65, 50, 0, -36, -90], [811, 1089, 68, 46, 0, -34, -94], [811, 1089, 68, 46, 0, -34, -94], [881, 1093, 68, 46, 0, -34, -94], [741, 1125, 65, 50, 0, -36, -90], [808, 1137, 65, 50, 0, -36, -90], [808, 1137, 65, 50, 0, -36, -90], [875, 1141, 65, 50, 0, -36, -90], [875, 1141, 65, 50, 0, -36, -90], [738, 1177, 65, 50, 0, -36, -90], [738, 1177, 65, 50, 0, -36, -90], [671, 1198, 65, 46, 0, -36, -94], [805, 1189, 65, 46, 0, -36, -94], [872, 1193, 65, 46, 0, -36, -94], [872, 1193, 65, 46, 0, -36, -94], [738, 1229, 65, 46, 0, -36, -94], [805, 1237, 65, 46, 0, -36, -94], [805, 1237, 65, 46, 0, -36, -94], [872, 1241, 65, 46, 0, -36, -94], [670, 1246, 64, 36, 0, -35, -50], [670, 1246, 64, 36, 0, -35, -50], [665, 1284, 60, 26, 0, -38, -63], [667, 1312, 62, 48, 0, -37, -29], [671, 1362, 62, 45, 0, -37, -33], [667, 1409, 62, 47, 0, -36, -29], [667, 1409, 62, 47, 0, -36, -29], [667, 1458, 62, 47, 0, -38, -29], [667, 1458, 62, 47, 0, -38, -29], [665, 1507, 62, 45, 0, -37, -33], [660, 1554, 62, 45, 0, -37, -33], [736, 1277, 63, 41, 0, -36, -33], [731, 1320, 62, 40, 0, -37, -37], [735, 1362, 61, 45, 0, -37, -33], [731, 1409, 62, 44, 0, -37, -34], [731, 1455, 62, 44, 0, -37, -34], [801, 1285, 62, 44, 0, -37, -34], [865, 1289, 62, 43, 0, -36, -33], [865, 1289, 62, 43, 0, -36, -33], [795, 1331, 59, 26, 0, -40, -62], [795, 1331, 59, 26, 0, -40, -62], [798, 1359, 61, 45, 0, -38, -33], [861, 1334, 61, 45, 0, -37, -33], [924, 1334, 61, 45, 0, -38, -33], [861, 1381, 62, 43, 0, -38, -33], [861, 1381, 62, 43, 0, -38, -33], [925, 1381, 51, 51, 0, -53, -18], [929, 1289, 29, 43, 0, -27, -63], [798, 1406, 61, 45, 0, -37, -33], [795, 1453, 61, 45, 0, -38, -33], [861, 1426, 62, 43, 0, -36, -33], [861, 1426, 62, 43, 0, -36, -33], [925, 1434, 51, 48, 0, -58, -22], [858, 1471, 62, 37, 0, -37, -37], [922, 1484, 56, 25, 0, -40, -60], [795, 1500, 61, 45, 0, -37, -33], [731, 1501, 62, 43, 0, -38, -33], [731, 1501, 62, 43, 0, -38, -33], [858, 1510, 62, 40, 0, -37, -37], [922, 1511, 62, 43, 0, -36, -33], [922, 1511, 62, 43, 0, -36, -33], [729, 1546, 62, 37, 0, -37, -37], [793, 1547, 62, 43, 0, -38, -33], [793, 1547, 62, 43, 0, -38, -33], [857, 1552, 61, 45, 0, -38, -33], [920, 1556, 59, 34, 0, -39, -43], [724, 1585, 57, 16, 0, -43, -68], [724, 1585, 57, 16, 0, -43, -68], [920, 1592, 57, 16, 0, -36, -68], [920, 1592, 57, 16, 0, -36, -68], [851, 134, 29, 30, 0, -27, -63], [851, 134, 29, 30, 0, -27, -63], [942, 1141, 27, 48, 0, -90, -90], [660, 1601, 56, 25, 0, -40, -60], [718, 1603, 56, 26, 0, -40, -63], [718, 1603, 56, 26, 0, -40, -63], [656, 1628, 56, 25, 0, -40, -60], [714, 1631, 29, 30, 0, -80, -63], [745, 1631, 29, 30, 0, -27, -63], [745, 1631, 29, 30, 0, -27, -63], [951, 1093, 29, 43, 0, -27, -63], [931, 831, 32, 22, 0, -9, -99], [930, 855, 29, 30, 0, -80, -63], [776, 1603, 29, 38, 0, -80, -63], [776, 1603, 29, 38, 0, -80, -63], [807, 1592, 29, 24, 0, -74, -63], [807, 1618, 29, 24, 0, -33, -63], [271, 1640, 21, 14, 0, -82, -69], [825, 876, 21, 14, 0, -33, -69], [838, 1599, 29, 24, 0, -74, -63], [869, 1599, 29, 24, 0, -33, -63]],
    animations: {
        backpack_green0: {
            frames: [0]
        },
        backpack_green_BACK4: {
            frames: [1]
        },
        backpack_green1: {
            frames: [2]
        },
        backpack_green7: {
            frames: [3]
        },
        backpack_green_BACK2: {
            frames: [4]
        },
        backpack_green_BACK3: {
            frames: [5]
        },
        backpack_green_BACK5: {
            frames: [6]
        },
        backpack_green_BACK6: {
            frames: [7]
        },
        float_yellow1: {
            frames: [8]
        },
        float_yellow5: {
            frames: [9]
        },
        float_yellow6: {
            frames: [10]
        },
        space_helmet_white0: {
            frames: [11]
        },
        space_helmet_white4: {
            frames: [12]
        },
        space_helmet_white_closed4: {
            frames: [13]
        },
        space_helmet_white1: {
            frames: [14]
        },
        space_helmet_white7: {
            frames: [15]
        },
        space_helmet_white_closed5: {
            frames: [16]
        },
        space_helmet_white_closed3: {
            frames: [17]
        },
        space_helmet_white2: {
            frames: [18]
        },
        space_helmet_white3: {
            frames: [19]
        },
        space_helmet_white5: {
            frames: [20]
        },
        space_helmet_white6: {
            frames: [21]
        },
        float_yellow4: {
            frames: [22]
        },
        float_yellow2: {
            frames: [23]
        },
        float_yellow3: {
            frames: [24]
        },
        pirate_hat_black4: {
            frames: [25]
        },
        bunny_blue1: {
            frames: [26]
        },
        bunny_pink7: {
            frames: [27]
        },
        bunny_white1: {
            frames: [28]
        },
        bunny_blue0: {
            frames: [29]
        },
        bunny_blue4: {
            frames: [30]
        },
        pot0: {
            frames: [31]
        },
        pot5: {
            frames: [32]
        },
        pot6: {
            frames: [33]
        },
        bunny_pink0: {
            frames: [34]
        },
        snorkel_blue1: {
            frames: [35]
        },
        float_yellow_BACK0: {
            frames: [36]
        },
        bunny_pink4: {
            frames: [37]
        },
        bunny_blue2: {
            frames: [38]
        },
        bunny_blue3: {
            frames: [39]
        },
        box_hat_brown1: {
            frames: [40]
        },
        pot1: {
            frames: [41]
        },
        bunny_white0: {
            frames: [42]
        },
        bunny_blue5: {
            frames: [43]
        },
        bunny_blue6: {
            frames: [44]
        },
        paperhat0: {
            frames: [45]
        },
        bunny_pink2: {
            frames: [46]
        },
        bunny_pink3: {
            frames: [47]
        },
        box_hat_brown4: {
            frames: [48]
        },
        bunny_pink5: {
            frames: [49]
        },
        bunny_pink6: {
            frames: [50]
        },
        box_hat_brown0: {
            frames: [51]
        },
        bunny_blue7: {
            frames: [52]
        },
        bunny_white4: {
            frames: [53]
        },
        bunny_white2: {
            frames: [54]
        },
        bunny_white3: {
            frames: [55]
        },
        bunny_white5: {
            frames: [56]
        },
        bunny_white6: {
            frames: [57]
        },
        bunny_pink1: {
            frames: [58]
        },
        bunny_white7: {
            frames: [59]
        },
        fishing_green0: {
            frames: [60]
        },
        pirate_hat_black5: {
            frames: [61]
        },
        pirate_hat_black6: {
            frames: [62]
        },
        box_hat_brown2: {
            frames: [63]
        },
        box_hat_brown3: {
            frames: [64]
        },
        box_hat_brown5: {
            frames: [65]
        },
        box_hat_brown6: {
            frames: [66]
        },
        pirate_hat_blue1: {
            frames: [67]
        },
        pirate_hat_black2: {
            frames: [68]
        },
        pirate_hat_black3: {
            frames: [69]
        },
        pirate_hat_blue5: {
            frames: [70]
        },
        pirate_hat_blue6: {
            frames: [71]
        },
        pirate_hat_blue0: {
            frames: [72]
        },
        pirate_hat_black1: {
            frames: [73]
        },
        guitar_blue0: {
            frames: [74]
        },
        pirate_hat_black0: {
            frames: [75]
        },
        pirate_hat_blue7: {
            frames: [76]
        },
        pirate_hat_blue2: {
            frames: [77]
        },
        pirate_hat_blue3: {
            frames: [78]
        },
        easteregg_c0: {
            frames: [79]
        },
        easteregg_c1: {
            frames: [80]
        },
        easteregg_c7: {
            frames: [81]
        },
        easteregg_c2: {
            frames: [82]
        },
        easteregg_c3: {
            frames: [83]
        },
        easteregg_c4: {
            frames: [84]
        },
        easteregg_c5: {
            frames: [85]
        },
        easteregg_c6: {
            frames: [86]
        },
        pot4: {
            frames: [87]
        },
        easteregg_a2: {
            frames: [88]
        },
        easteregg_a3: {
            frames: [89]
        },
        easteregg_a4: {
            frames: [90]
        },
        easteregg_a5: {
            frames: [91]
        },
        easteregg_a6: {
            frames: [92]
        },
        hoodie_black1: {
            frames: [93]
        },
        easteregg_a0: {
            frames: [94]
        },
        easteregg_a1: {
            frames: [95]
        },
        easteregg_a7: {
            frames: [96]
        },
        space_pack_white0: {
            frames: [97]
        },
        sleeping0: {
            frames: [98]
        },
        goggles_black0: {
            frames: [99]
        },
        box_hat_brown7: {
            frames: [100]
        },
        pirate_hat_blue4: {
            frames: [101]
        },
        float_yellow0: {
            frames: [102]
        },
        float_yellow7: {
            frames: [103]
        },
        pirate_hat_black7: {
            frames: [104]
        },
        backpack_green2: {
            frames: [105]
        },
        backpack_green3: {
            frames: [106]
        },
        ballcap_black1: {
            frames: [107]
        },
        guitar_blue4: {
            frames: [108]
        },
        float_yellow_BACK1: {
            frames: [109]
        },
        float_yellow_BACK2: {
            frames: [110]
        },
        float_yellow_BACK3: {
            frames: [111]
        },
        float_yellow_BACK4: {
            frames: [112]
        },
        float_yellow_BACK5: {
            frames: [113]
        },
        float_yellow_BACK6: {
            frames: [114]
        },
        float_yellow_BACK7: {
            frames: [115]
        },
        space_pack_white1: {
            frames: [116]
        },
        toque_blue4: {
            frames: [117]
        },
        snorkel_blue_BACK1: {
            frames: [118]
        },
        snorkel_blue2: {
            frames: [119]
        },
        snorkel_blue3: {
            frames: [120]
        },
        fishing_green1: {
            frames: [121]
        },
        sleeping4: {
            frames: [122]
        },
        ballcap_black0: {
            frames: [123]
        },
        pickle0: {
            frames: [124]
        },
        fishing_green2: {
            frames: [125]
        },
        fishing_green3: {
            frames: [126]
        },
        sleeping2: {
            frames: [127]
        },
        sleeping3: {
            frames: [128]
        },
        fishing_green7: {
            frames: [129]
        },
        pickle4: {
            frames: [130]
        },
        fishing_green4: {
            frames: [131]
        },
        fishing_green5: {
            frames: [132]
        },
        fishing_green6: {
            frames: [133]
        },
        space_pack_white7: {
            frames: [134]
        },
        monk4: {
            frames: [135]
        },
        toque_white2: {
            frames: [136]
        },
        toque_white3: {
            frames: [137]
        },
        snorkel_blue5: {
            frames: [138]
        },
        snorkel_blue6: {
            frames: [139]
        },
        monk0: {
            frames: [140]
        },
        paperhat4: {
            frames: [141]
        },
        pot2: {
            frames: [142]
        },
        pot3: {
            frames: [143]
        },
        headphones_black4: {
            frames: [144]
        },
        guitar_blue2: {
            frames: [145]
        },
        guitar_blue3: {
            frames: [146]
        },
        pot7: {
            frames: [147]
        },
        sleeping7: {
            frames: [148]
        },
        headphones_white4: {
            frames: [149]
        },
        sleeping1: {
            frames: [150]
        },
        guitar_blue5: {
            frames: [151]
        },
        guitar_blue6: {
            frames: [152]
        },
        snorkel_blue7: {
            frames: [153]
        },
        ballcap_blue1: {
            frames: [154]
        },
        monk2: {
            frames: [155]
        },
        monk3: {
            frames: [156]
        },
        hoodie_black2: {
            frames: [157]
        },
        hoodie_black3: {
            frames: [158]
        },
        ballcap_green1: {
            frames: [159]
        },
        monk5: {
            frames: [160]
        },
        monk6: {
            frames: [161]
        },
        space_pack_white_BACK2: {
            frames: [162]
        },
        space_pack_white_BACK3: {
            frames: [163]
        },
        snorkel_blue4: {
            frames: [164]
        },
        hoodie_black5: {
            frames: [165]
        },
        hoodie_black6: {
            frames: [166]
        },
        backpack_green4: {
            frames: [167]
        },
        sleeping5: {
            frames: [168]
        },
        sleeping6: {
            frames: [169]
        },
        space_pack_white_BACK5: {
            frames: [170]
        },
        space_pack_white_BACK6: {
            frames: [171]
        },
        goggles_black2: {
            frames: [172]
        },
        goggles_black3: {
            frames: [173]
        },
        toque_blue2: {
            frames: [174]
        },
        toque_blue3: {
            frames: [175]
        },
        ballcap_yellow1: {
            frames: [176]
        },
        headphones_black0: {
            frames: [177]
        },
        headphones_black_BACK0: {
            frames: [178]
        },
        headphones_black_BACK4: {
            frames: [179]
        },
        bandana_red4: {
            frames: [180]
        },
        ballcap_black7: {
            frames: [181]
        },
        "3d_black2": {
            frames: [182]
        },
        "3d_black3": {
            frames: [183]
        },
        backpack_green5: {
            frames: [184]
        },
        backpack_green6: {
            frames: [185]
        },
        hoodie_blue2: {
            frames: [186]
        },
        hoodie_blue3: {
            frames: [187]
        },
        paperhat1: {
            frames: [188]
        },
        party_green0: {
            frames: [189]
        },
        hoodie_black7: {
            frames: [190]
        },
        ballcap_blue7: {
            frames: [191]
        },
        hoodie_blue1: {
            frames: [192]
        },
        headphones_white0: {
            frames: [193]
        },
        headphones_white_BACK0: {
            frames: [194]
        },
        headphones_white_BACK4: {
            frames: [195]
        },
        easteregg_b0: {
            frames: [196]
        },
        easteregg_b1: {
            frames: [197]
        },
        easteregg_b7: {
            frames: [198]
        },
        headphones_black2: {
            frames: [199]
        },
        headphones_black3: {
            frames: [200]
        },
        paperhat2: {
            frames: [201]
        },
        paperhat3: {
            frames: [202]
        },
        headphones_white2: {
            frames: [203]
        },
        headphones_white3: {
            frames: [204]
        },
        paperhat5: {
            frames: [205]
        },
        paperhat6: {
            frames: [206]
        },
        ballcap_green7: {
            frames: [207]
        },
        paperhat7: {
            frames: [208]
        },
        ballcap_yellow7: {
            frames: [209]
        },
        ballcap_black2: {
            frames: [210]
        },
        ballcap_black3: {
            frames: [211]
        },
        hoodie_blue5: {
            frames: [212]
        },
        hoodie_blue6: {
            frames: [213]
        },
        ballcap_black5: {
            frames: [214]
        },
        ballcap_black6: {
            frames: [215]
        },
        hoodie_black0: {
            frames: [216]
        },
        party_green7: {
            frames: [217]
        },
        pirate_patch4: {
            frames: [218]
        },
        party_green2: {
            frames: [219]
        },
        party_green3: {
            frames: [220]
        },
        party_green5: {
            frames: [221]
        },
        party_green6: {
            frames: [222]
        },
        bandana_red1: {
            frames: [223]
        },
        ballcap_blue5: {
            frames: [224]
        },
        ballcap_blue6: {
            frames: [225]
        },
        ballcap_blue2: {
            frames: [226]
        },
        ballcap_blue3: {
            frames: [227]
        },
        ballcap_green2: {
            frames: [228]
        },
        ballcap_green3: {
            frames: [229]
        },
        ballcap_yellow2: {
            frames: [230]
        },
        ballcap_yellow3: {
            frames: [231]
        },
        toque_white1: {
            frames: [232]
        },
        toque_white7: {
            frames: [233]
        },
        hoodie_green2: {
            frames: [234]
        },
        hoodie_green3: {
            frames: [235]
        },
        hoodie_green5: {
            frames: [236]
        },
        hoodie_green6: {
            frames: [237]
        },
        headphones_black1: {
            frames: [238]
        },
        hoodie_pink2: {
            frames: [239]
        },
        hoodie_pink3: {
            frames: [240]
        },
        hoodie_pink5: {
            frames: [241]
        },
        hoodie_pink6: {
            frames: [242]
        },
        toque_blue0: {
            frames: [243]
        },
        goggles_white0: {
            frames: [244]
        },
        toque_pink0: {
            frames: [245]
        },
        snorkel_blue0: {
            frames: [246]
        },
        ballcap_green5: {
            frames: [247]
        },
        ballcap_green6: {
            frames: [248]
        },
        pickle1: {
            frames: [249]
        },
        pickle5: {
            frames: [250]
        },
        pickle6: {
            frames: [251]
        },
        toque_blue1: {
            frames: [252]
        },
        headphones_black5: {
            frames: [253]
        },
        headphones_black6: {
            frames: [254]
        },
        goggles_black1: {
            frames: [255]
        },
        hoodie_purple2: {
            frames: [256]
        },
        hoodie_purple3: {
            frames: [257]
        },
        hoodie_purple5: {
            frames: [258]
        },
        hoodie_purple6: {
            frames: [259]
        },
        ballcap_yellow5: {
            frames: [260]
        },
        ballcap_yellow6: {
            frames: [261]
        },
        pickle2: {
            frames: [262]
        },
        pickle3: {
            frames: [263]
        },
        pickle7: {
            frames: [264]
        },
        hoodie_white2: {
            frames: [265]
        },
        hoodie_white3: {
            frames: [266]
        },
        headphones_black7: {
            frames: [267]
        },
        hoodie_white5: {
            frames: [268]
        },
        hoodie_white6: {
            frames: [269]
        },
        hoodie_blue7: {
            frames: [270]
        },
        monk1: {
            frames: [271]
        },
        toque_blue5: {
            frames: [272]
        },
        toque_blue6: {
            frames: [273]
        },
        headphones_white5: {
            frames: [274]
        },
        headphones_white6: {
            frames: [275]
        },
        toque_blue7: {
            frames: [276]
        },
        monk7: {
            frames: [277]
        },
        hoodie_green1: {
            frames: [278]
        },
        bandana_red0: {
            frames: [279]
        },
        hoodie_black4: {
            frames: [280]
        },
        headphones_white7: {
            frames: [281]
        },
        hoodie_green7: {
            frames: [282]
        },
        bandana_red5: {
            frames: [283]
        },
        bandana_red6: {
            frames: [284]
        },
        hoodie_pink1: {
            frames: [285]
        },
        hoodie_pink7: {
            frames: [286]
        },
        goggles_white1: {
            frames: [287]
        },
        hoodie_purple1: {
            frames: [288]
        },
        hoodie_purple7: {
            frames: [289]
        },
        viking0: {
            frames: [290]
        },
        hoodie_blue4: {
            frames: [291]
        },
        goggles_black7: {
            frames: [292]
        },
        easteregg_b2: {
            frames: [293]
        },
        easteregg_b3: {
            frames: [294]
        },
        easteregg_b4: {
            frames: [295]
        },
        easteregg_b5: {
            frames: [296]
        },
        easteregg_b6: {
            frames: [297]
        },
        bandana_red7: {
            frames: [298]
        },
        hoodie_white1: {
            frames: [299]
        },
        hoodie_white7: {
            frames: [300]
        },
        goggles_black5: {
            frames: [301]
        },
        goggles_black6: {
            frames: [302]
        },
        hoodie_blue0: {
            frames: [303]
        },
        hoodie_green0: {
            frames: [304]
        },
        "3d_black5": {
            frames: [305]
        },
        "3d_black6": {
            frames: [306]
        },
        hoodie_green4: {
            frames: [307]
        },
        hoodie_pink0: {
            frames: [308]
        },
        goggles_white2: {
            frames: [309]
        },
        goggles_white3: {
            frames: [310]
        },
        toque_pink4: {
            frames: [311]
        },
        goggles_white5: {
            frames: [312]
        },
        goggles_white6: {
            frames: [313]
        },
        headphones_white1: {
            frames: [314]
        },
        hoodie_pink4: {
            frames: [315]
        },
        hoodie_purple0: {
            frames: [316]
        },
        hoodie_purple4: {
            frames: [317]
        },
        hoodie_white0: {
            frames: [318]
        },
        toque_pink1: {
            frames: [319]
        },
        toque_pink7: {
            frames: [320]
        },
        toque_purple1: {
            frames: [321]
        },
        toque_purple7: {
            frames: [322]
        },
        pirate_capt_black0: {
            frames: [323]
        },
        toque_white0: {
            frames: [324]
        },
        toque_purple0: {
            frames: [325]
        },
        toque_white5: {
            frames: [326]
        },
        toque_white6: {
            frames: [327]
        },
        toque_pink2: {
            frames: [328]
        },
        toque_pink3: {
            frames: [329]
        },
        propeller0: {
            frames: [330]
        },
        viking1: {
            frames: [331]
        },
        viking7: {
            frames: [332]
        },
        toque_pink5: {
            frames: [333]
        },
        toque_pink6: {
            frames: [334]
        },
        toque_purple2: {
            frames: [335]
        },
        toque_purple3: {
            frames: [336]
        },
        toque_purple5: {
            frames: [337]
        },
        toque_purple6: {
            frames: [338]
        },
        hoodie_white4: {
            frames: [339]
        },
        lifejacket_red0: {
            frames: [340]
        },
        lifejacket_red1: {
            frames: [341]
        },
        lifejacket_red7: {
            frames: [342]
        },
        toque_white4: {
            frames: [343]
        },
        lifejacket_red2: {
            frames: [344]
        },
        lifejacket_red3: {
            frames: [345]
        },
        lifejacket_red4: {
            frames: [346]
        },
        lifejacket_red5: {
            frames: [347]
        },
        lifejacket_red6: {
            frames: [348]
        },
        toque_purple4: {
            frames: [349]
        },
        goggles_black4: {
            frames: [350]
        },
        viking2: {
            frames: [351]
        },
        viking3: {
            frames: [352]
        },
        viking5: {
            frames: [353]
        },
        viking6: {
            frames: [354]
        },
        goggles_white4: {
            frames: [355]
        },
        pirate_capt_black1: {
            frames: [356]
        },
        pirate_capt_black2: {
            frames: [357]
        },
        pirate_capt_black3: {
            frames: [358]
        },
        goggles_white7: {
            frames: [359]
        },
        pirate_capt_black4: {
            frames: [360]
        },
        pirate_capt_black5: {
            frames: [361]
        },
        pirate_capt_black6: {
            frames: [362]
        },
        pirate_capt_black7: {
            frames: [363]
        },
        viking4: {
            frames: [364]
        },
        "3d_white2": {
            frames: [365]
        },
        "3d_white3": {
            frames: [366]
        },
        pirate_capt_red0: {
            frames: [367]
        },
        pirate_capt_red1: {
            frames: [368]
        },
        pirate_capt_red2: {
            frames: [369]
        },
        pirate_capt_red3: {
            frames: [370]
        },
        pirate_capt_red4: {
            frames: [371]
        },
        pirate_capt_red5: {
            frames: [372]
        },
        pirate_capt_red6: {
            frames: [373]
        },
        "3d_white5": {
            frames: [374]
        },
        "3d_white6": {
            frames: [375]
        },
        space_black0: {
            frames: [376]
        },
        space_black1: {
            frames: [377]
        },
        space_black7: {
            frames: [378]
        },
        pirate_capt_red7: {
            frames: [379]
        },
        space_suit_white0: {
            frames: [380]
        },
        hawaii_orange0: {
            frames: [381]
        },
        space_suit_white1: {
            frames: [382]
        },
        space_suit_white2: {
            frames: [383]
        },
        space_suit_white3: {
            frames: [384]
        },
        space_suit_white4: {
            frames: [385]
        },
        space_suit_white5: {
            frames: [386]
        },
        space_suit_white6: {
            frames: [387]
        },
        space_suit_white7: {
            frames: [388]
        },
        overalls_orange0: {
            frames: [389]
        },
        space_blue0: {
            frames: [390]
        },
        space_blue1: {
            frames: [391]
        },
        space_blue7: {
            frames: [392]
        },
        hawaii_orange1: {
            frames: [393]
        },
        hawaii_orange2: {
            frames: [394]
        },
        hawaii_orange3: {
            frames: [395]
        },
        space_black2: {
            frames: [396]
        },
        space_black3: {
            frames: [397]
        },
        hawaii_orange4: {
            frames: [398]
        },
        hawaii_orange5: {
            frames: [399]
        },
        hawaii_orange6: {
            frames: [400]
        },
        snorkel_blue_BACK0: {
            frames: [401]
        },
        sunglasses_square_black4: {
            frames: [402]
        },
        ballcap_black4: {
            frames: [403]
        },
        propeller4: {
            frames: [404]
        },
        hawaii_orange7: {
            frames: [405]
        },
        overalls_orange1: {
            frames: [406]
        },
        overalls_orange2: {
            frames: [407]
        },
        overalls_orange3: {
            frames: [408]
        },
        "3d_black4": {
            frames: [409]
        },
        overalls_orange4: {
            frames: [410]
        },
        overalls_orange5: {
            frames: [411]
        },
        overalls_orange6: {
            frames: [412]
        },
        overalls_orange7: {
            frames: [413]
        },
        pirate_belt_blue0: {
            frames: [414]
        },
        pirate_belt_blue1: {
            frames: [415]
        },
        pirate_belt_blue7: {
            frames: [416]
        },
        pirate_belt_blue2: {
            frames: [417]
        },
        pirate_belt_blue3: {
            frames: [418]
        },
        pirate_belt_blue4: {
            frames: [419]
        },
        headphones_black_BACK2: {
            frames: [420]
        },
        headphones_black_BACK3: {
            frames: [421]
        },
        sunglasses_square_black0: {
            frames: [422]
        },
        pirate_belt_blue5: {
            frames: [423]
        },
        pirate_belt_blue6: {
            frames: [424]
        },
        space_blue4: {
            frames: [425]
        },
        plaid_blue0: {
            frames: [426]
        },
        plaid_blue1: {
            frames: [427]
        },
        space_red0: {
            frames: [428]
        },
        space_red1: {
            frames: [429]
        },
        space_red7: {
            frames: [430]
        },
        plaid_blue2: {
            frames: [431]
        },
        plaid_blue3: {
            frames: [432]
        },
        space_red4: {
            frames: [433]
        },
        space_black4: {
            frames: [434]
        },
        plaid_blue4: {
            frames: [435]
        },
        space_black5: {
            frames: [436]
        },
        space_black6: {
            frames: [437]
        },
        plaid_blue5: {
            frames: [438]
        },
        plaid_blue6: {
            frames: [439]
        },
        space_blue2: {
            frames: [440]
        },
        space_blue3: {
            frames: [441]
        },
        space_blue5: {
            frames: [442]
        },
        space_blue6: {
            frames: [443]
        },
        plaid_blue7: {
            frames: [444]
        },
        plaid_red0: {
            frames: [445]
        },
        plaid_red1: {
            frames: [446]
        },
        plaid_red2: {
            frames: [447]
        },
        plaid_red3: {
            frames: [448]
        },
        plaid_red4: {
            frames: [449]
        },
        space_orange0: {
            frames: [450]
        },
        space_orange1: {
            frames: [451]
        },
        space_orange7: {
            frames: [452]
        },
        space_orange2: {
            frames: [453]
        },
        space_orange3: {
            frames: [454]
        },
        plaid_red5: {
            frames: [455]
        },
        plaid_red6: {
            frames: [456]
        },
        plaid_red7: {
            frames: [457]
        },
        space_orange4: {
            frames: [458]
        },
        space_orange5: {
            frames: [459]
        },
        space_orange6: {
            frames: [460]
        },
        space_red2: {
            frames: [461]
        },
        space_red3: {
            frames: [462]
        },
        space_red5: {
            frames: [463]
        },
        space_red6: {
            frames: [464]
        },
        tshirt_white0: {
            frames: [465]
        },
        tshirt_white1: {
            frames: [466]
        },
        tshirt_white2: {
            frames: [467]
        },
        tshirt_white3: {
            frames: [468]
        },
        tshirt_white4: {
            frames: [469]
        },
        tshirt_white5: {
            frames: [470]
        },
        tshirt_white6: {
            frames: [471]
        },
        tshirt_white7: {
            frames: [472]
        },
        bandana_red2: {
            frames: [473]
        },
        bandana_red3: {
            frames: [474]
        },
        "3d_white4": {
            frames: [475]
        },
        propeller_gold0: {
            frames: [476]
        },
        ballcap_blue0: {
            frames: [477]
        },
        propeller_gold2: {
            frames: [478]
        },
        propeller_gold3: {
            frames: [479]
        },
        propeller_gold5: {
            frames: [480]
        },
        propeller_gold6: {
            frames: [481]
        },
        ballcap_green0: {
            frames: [482]
        },
        ballcap_yellow0: {
            frames: [483]
        },
        propeller_gold4: {
            frames: [484]
        },
        propeller_blue0: {
            frames: [485]
        },
        propeller1: {
            frames: [486]
        },
        ballcap_blue4: {
            frames: [487]
        },
        ballcap_green4: {
            frames: [488]
        },
        ballcap_yellow4: {
            frames: [489]
        },
        propeller2: {
            frames: [490]
        },
        propeller3: {
            frames: [491]
        },
        pirate_patch2: {
            frames: [492]
        },
        pirate_patch3: {
            frames: [493]
        },
        propeller7: {
            frames: [494]
        },
        propeller_blue1: {
            frames: [495]
        },
        propeller_blue7: {
            frames: [496]
        },
        propeller5: {
            frames: [497]
        },
        propeller6: {
            frames: [498]
        },
        party_green1: {
            frames: [499]
        },
        headphones_black_BACK1: {
            frames: [500]
        },
        propeller_gold1: {
            frames: [501]
        },
        propeller_gold7: {
            frames: [502]
        },
        propeller_blue2: {
            frames: [503]
        },
        propeller_blue3: {
            frames: [504]
        },
        party_green4: {
            frames: [505]
        },
        propeller_blue4: {
            frames: [506]
        },
        pirate_patch0: {
            frames: [507]
        },
        propeller_pink1: {
            frames: [508]
        },
        propeller_blue5: {
            frames: [509]
        },
        propeller_blue6: {
            frames: [510]
        },
        propeller_pink0: {
            frames: [511]
        },
        propeller_pink2: {
            frames: [512]
        },
        propeller_pink3: {
            frames: [513]
        },
        propeller_pink4: {
            frames: [514]
        },
        propeller_pink5: {
            frames: [515]
        },
        propeller_pink6: {
            frames: [516]
        },
        propeller_pink7: {
            frames: [517]
        },
        space_pack_white_BACK4: {
            frames: [518]
        },
        sunglasses_square_black2: {
            frames: [519]
        },
        sunglasses_square_black3: {
            frames: [520]
        },
        sunglasses_square_black5: {
            frames: [521]
        },
        sunglasses_square_black6: {
            frames: [522]
        },
        headphones_black_BACK5: {
            frames: [523]
        },
        headphones_black_BACK6: {
            frames: [524]
        },
        guitar_blue1: {
            frames: [525]
        },
        pirate_patch1: {
            frames: [526]
        },
        pirate_patch5: {
            frames: [527]
        },
        pirate_patch6: {
            frames: [528]
        },
        pirate_patch7: {
            frames: [529]
        },
        headphones_black_BACK7: {
            frames: [530]
        },
        headphones_white_BACK5: {
            frames: [531]
        },
        headphones_white_BACK6: {
            frames: [532]
        },
        headphones_white_BACK1: {
            frames: [533]
        },
        guitar_blue7: {
            frames: [534]
        },
        headphones_white_BACK7: {
            frames: [535]
        },
        headphones_white_BACK2: {
            frames: [536]
        },
        headphones_white_BACK3: {
            frames: [537]
        },
        "3d_black1": {
            frames: [538]
        },
        "3d_black7": {
            frames: [539]
        },
        sunglasses_square_black1: {
            frames: [540]
        },
        sunglasses_square_black7: {
            frames: [541]
        },
        "3d_white1": {
            frames: [542]
        },
        "3d_white7": {
            frames: [543]
        }
    },
    images: ["/media/63-dad/items/items.png"]
}
  , itemSS = new createjs.SpriteSheet(itemData)
  , mascotData = {
    snail: {
        critterId: "snail",
        images: ["/media/63-dad/critters/snail.png"],
        type: "sprite",
        framerate: 10,
        frames: [[1, 1, 83, 103, 0, 38, 98], [86, 1, 83, 103, 0, 44, 98], [171, 1, 81, 105, 0, 38, 100], [254, 1, 83, 105, 0, 34, 97], [339, 1, 83, 105, 0, 46, 97], [424, 1, 81, 105, 0, 43, 100], [1, 106, 81, 106, 0, 34, 97], [84, 106, 81, 106, 0, 48, 97], [167, 108, 55, 110, 0, 27, 95], [224, 108, 55, 111, 0, 27, 100], [281, 108, 59, 111, 0, 29, 100], [342, 108, 59, 112, 0, 29, 104], [403, 108, 105, 113, 0, 40, 106], [1, 214, 105, 113, 0, 63, 106], [108, 220, 97, 114, 0, 38, 107], [207, 221, 97, 114, 0, 59, 106]],
        animations: {
            body1: {
                frames: [2, 0]
            },
            body7: {
                frames: [5, 1]
            },
            body3: {
                frames: [6, 3]
            },
            body5: {
                frames: [7, 4]
            },
            body0: {
                frames: [8, 9]
            },
            body4: {
                frames: [10, 11]
            },
            body2: {
                frames: [14, 12]
            },
            body6: {
                frames: [15, 13]
            }
        }
    }
}
  , uxData = {
    images: ["/media/63-dad/ux/ux.png"],
    frames: [[1, 1, 104, 86, 0, 0, 0], [107, 1, 84, 84, 0, 0, 0], [193, 1, 84, 84, 0, 0, 0], [279, 1, 40, 40, 0, 0, 0], [279, 43, 40, 40, 0, 0, 0]],
    animations: {
        box: {
            frames: [0]
        },
        item_active: {
            frames: [1]
        },
        item: {
            frames: [2]
        },
        close: {
            frames: [3]
        },
        open_btn: {
            frames: [4]
        }
    }
}
  , uxSS = new createjs.SpriteSheet(uxData);
function InventoryScreen(e) {
    createjs.Container.call(this),
    this.player = e,
    this.name = "inventory",
    this.background = new createjs.Shape(art.background),
    this.background.alpha = .6,
    this.background.on("click", function() {}),
    this.addChild(this.background),
    this.hasChanged = !1,
    this.handleOpen,
    this.handleClose;
    var t = new Button("close");
    t.click(function() {
        console.log(this.parent)
    }),
    t.x = 750,
    t.y = 50,
    t.click(function() {
        this.parent.close()
    }),
    this.addChild(t),
    this.critter = new CritterContainer(e.critterId),
    this.critter.x = 700,
    this.critter.y = 300,
    this.critter.updateGear(e.gear),
    this.addChild(this.critter),
    this.grid = new createjs.Container,
    this.grid.x = 20,
    this.grid.y = 10,
    this.addChild(this.grid),
    this.showIcons()
}
InventoryScreen.prototype = Object.create(createjs.Container.prototype),
InventoryScreen.prototype.close = function() {
    socket.emit("updateGear", this.player.gear),
    this.visible = !1
}
,
InventoryScreen.prototype.hide = function() {
    this.visible = !1
}
,
InventoryScreen.prototype.show = function() {
    this.showIcons(),
    this.visible = !0
}
,
InventoryScreen.prototype.showIcons = function() {
    this.grid.removeAllChildren();
    var e = this
      , t = this.critter
      , a = this.player;
    this.icons = [];
    for (var r = 0; r < a.inventory.length; r++) {
        var s = a.inventory[r];
        (n = new ItemIcon(s.itemId,s.slot)).scaleX = .75,
        n.scaleY = .75,
        n.click(function() {
            this.isActive ? (t.removeItem(this.slotId),
            a.removeItem(this.slotId)) : (t.addItem(this.slotId, this.itemId),
            a.addItem(this.itemId)),
            e.updateIcons()
        }),
        this.icons.push(n)
    }
    this.updateIcons();
    var i = 0
      , o = 0;
    for (r = 0; r < this.icons.length; r++) {
        var n;
        (n = this.icons[r]).x = i,
        n.y = o,
        this.grid.addChild(n),
        550 < (i += 75) && (i = 0,
        o += 75)
    }
}
,
InventoryScreen.prototype.updateIcons = function() {
    for (var e = 0; e < this.icons.length; e++) {
        var t = this.icons[e]
          , a = this.player.isItemActive(t.itemId);
        t.setActive(a)
    }
}
;
var art = art || {};
art.background = new createjs.Graphics,
art.background.beginFill("black"),
art.background.drawRect(0, 0, 850, 480);
