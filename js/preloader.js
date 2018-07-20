// Phaser3 example game
// preloader and loading bar

var Preloader = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Preloader ()
    {
        Phaser.Scene.call(this, {
			key: 'preloader'
		});
    },
	
    setPreloadSprite_new: function (sprite)
    {
		console.log("setPreloadSprite_new: sprite.width=" + sprite.width);
        this.preloadSprite = { sprite: sprite, width: sprite.width, height: sprite.height };

        //sprite.crop(this.preloadSprite.rect);
        sprite.visible = true;

		// set callback for loading progress updates
		this.load.on('progress', this.onProgress, this );
		this.load.on('fileprogress', this.onFileProgress, this );
	},
	
    onProgress: function (value) {

        if (this.preloadSprite)
        {
			// calculate width based on value=0.0 .. 1.0
			var w = Math.floor(this.preloadSprite.width * value);
			
			// set width of sprite			
			this.preloadSprite.sprite.frame.width    = w;
			this.preloadSprite.sprite.frame.cutWidth = w;

			// update screen
			this.preloadSprite.sprite.frame.updateUVs();
		}
	},
	
    onFileProgress: function (file) {
		debugger;
		assetText.setText('onFileProgress: file.key=' + file.key);
	},

    preload: function ()
    {
		// setup the loading bar
		this.loadingbar_bg   = this.add.sprite(400, 300, "loadingbar_bg");
		this.loadingbar_fill = this.add.sprite(400, 300, "loadingbar_fill");
		this.setPreloadSprite_new(this.loadingbar_fill);

		// now load images, audio etc.
		// sprites
		this.load.atlas('sprites', 'img/spritearray.png', 'img/spritearray.json');

		// font
		this.load.bitmapFont('fontwhite', 'img/fontwhite.png', 'img/fontwhite.xml');
		this.load.bitmapFont('shortStack', 'img/shortStack.png', 'img/shortStack.xml');
		
		// sound effects
		//this.load.audio('bg', [this.p('audio/bg.mp3'),this.p('audio/bg.ogg')]);
		this.load.audio('coin', ['snd/coin.mp3', 'snd/coin.ogg']);
		this.load.audio('bomb', ['snd/expl.mp3', 'snd/expl.ogg']);
		this.load.audio('btn',  ['snd/btn.mp3', 'snd/btn.ogg']);
		
		// !! TESTING !! load the same image 100 times just to test the loading bar
		for (var i = 0; i < 500; i++) {
			this.load.image('testloading'+i, 'img/spritearray.png');
		};
		// !! TESTING !!
    },

    create: function ()
    {

		// also create animations
		this.anims.create({
				key: 'cointurn',
				frames: [
					{ key: 'sprites', frame: 'coin1' },
					{ key: 'sprites', frame: 'coin2' },
					{ key: 'sprites', frame: 'coin3' },
					{ key: 'sprites', frame: 'coin4' },
					{ key: 'sprites', frame: 'coin5' },
					{ key: 'sprites', frame: 'coin6' },
					{ key: 'sprites', frame: 'coin7' },
					{ key: 'sprites', frame: 'coin8' }
				],
				frameRate: 15,
				repeat: -1
			});
			
		console.log('Preloader scene is ready, now start the actual game and never return to this scene');

		// dispose loader bar images
		this.loadingbar_bg.destroy();
		this.loadingbar_fill.destroy();
		this.preloadSprite = null;

		// start actual game
		this.scene.start('mainmenu');

    }
});
