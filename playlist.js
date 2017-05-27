'use strict'; // i dont remember if i needed this or not but here it is

// Okay these comments should walk you through how this whole thing works.

// this is here because its useful
function randint(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// This is the "class" for your playlist. It wraps everything about the playlist
// up into a neat little package that handles everything you need. You shouldn't
// have to touch it. Scroll down until you see more comment blocks.
function Playlist(element) {
	var self = this;

    self.songs = []; //Store songs

	self.element = element;

	self.songCount = null;

	self.currentSong = null;

	// options:
	self.shuffleOnEnd = false;

	self.add = function(title, author, src) { //Add a song to the playlist
        self.songs.push({
            'title': title,
            'author': author,
            'src': src
        });
		if (self.songs.length == 1) {
			self.songCount = 0;
			self.currentSong = self.songs[self.songCount];
		}
    };

	self.shuffle = function() {
		var songDict = {};

		for (var x in self.songs) {
			var songnum = -1;
			while(songnum == -1 || (songnum in songDict)) {
				songnum = randint(0, self.songs.length - 1);
			}
			songDict[songnum] = self.songs[x]
		}
		var dictKeys = Object.keys(songDict);
		dictKeys.sort();

		var newArray = [];
		for (x in dictKeys) {
			newArray.push(songDict[x]);
		}

		self.songs = newArray;
		if(self.element.paused) {
			self.songCount = 0;
			self.currentSong = self.songs[self.songCount];
		}
		else {
			self.songCount = -1;
		}
	};

	self.play = function() {
		if (self.songCount === null) {
			throw new Error('Playlist has no songs.');
		}
		self.element.src = self.currentSong.src;
		self.element.play();
	}

	self.element.addEventListener("ended", function() {
		self.songCount++;
		if (self.songCount >= self.songs.length) {
			if (self.shuffleOnEnd) {
				self.shuffle();
			}
			else {
				self.songCount = 0;
			}
		}
		self.currentSong = self.songs[self.songCount];
        self.element.src = self.currentSong.src;
        self.element.play();
	}, false);
}

/* STOP SCROLLING STOP SCROLLING STOP SCROLLING STOP SCROLLING STOP SCROLLING
Now before you continue, you should put an empty Audio element in your HTML.
It should look something like this:

<audio id="music-player" controls=true></audio>

set controls to false if you want to control the audio yourself via javascript
buttons.

Of special note, make sure you keep track of what "Some-ID" is. You can use any
string (well almost).
Now initialize the Playlist class as a new object with that element by referring
to it by it's ID.
*/

var playlist = new Playlist(document.getElementById('music-player'));

// Now, add your songs with the following format:
playlist.add(
    'Burnt Rice (Aiobahn & Jh-Anu remix)', // name (note the comma)
    'Shawn Wasabi + YDG (feat. YUNG GEMMY)', // artist (ditto)
    './burntriceremix.mp3' // location (NO COMMA)
);

playlist.add(
    'RICE BALLS', // name (note the comma)
    'PINK GUY', // artist (ditto)
    './riceballs.mp3' // location (NO COMMA)
);

playlist.add(
    'TERIYAKI GOD', // name (note the comma)
    'PINK GUY', // artist (ditto)
    './teriyakigod.mp3' // location (NO COMMA)
);

playlist.add(
    'KILL YOURSELF', // name (note the comma)
    'PINK GUY', // artist (ditto)
    './killyourself.mp3' // location (NO COMMA)
);

playlist.add(
    'Tengaku', // name (note the comma)
    'Wagakki Band', // artist (ditto)
    './tengaku.mp3' // location (NO COMMA)
);

playlist.add(
    'The Big Black', // name (note the comma)
    'The Quick Brown Fox', // artist (ditto)
    './thebigblack.mp3' // location (NO COMMA)
);

playlist.add(
    'Quinoa Balls', // name (note the comma)
    'ANDREW HUANG', // artist (ditto)
    './quinoaballs.mp3' // location (NO COMMA)
);

playlist.add(
    'Brain Power', // name (note the comma)
    'NOMA', // artist (ditto)
    './brainpower.mp3' // location (NO COMMA)
);

playlist.add(
    'PINK SEASON: THE PROPHECY', // name (note the comma)
    'PINK GUY (feat. GETTER, BORGORE, AXEL BOY & TASTYTREAT)', // artist (ditto)
    './theprophecy.mp3' // location (NO COMMA)
);

playlist.add(
    'Figue Folle', // name (note the comma)
    'Igorrr & Ruby My Dear', // artist (ditto)
    './figuefolle.mp3' // location (NO COMMA)
);

// they don't need to be split across multiple lines, just remember the commas.
// Add as many as you want. It can expand.

// If you want the playlist to shuffle every time it finishes playing all the
// songs, uncomment this.
playlist.shuffleOnEnd = true;

// But since you want it to be random every time, we should shuffle the playlist
// before we actually start playing it.

playlist.shuffle();

/*
 okay now if you just ran this code, it would work, but now let's get fancier.
 Let's add that now playing bit you wanted.
 Make sure you have two elements in your page that you want to display the
 track title and track artist. Something like...

<div class="songinfo">
  <span id="song-artist"></span> - <span id="song-title"></span>
</div>

 Then, stick the IDs of those two into this bit down here, where relevant:
*/

var title = document.getElementById('song-title');
var author = document.getElementById('song-artist');

// Now, we hook into the event that fires every time the song has finished
// playing:

playlist.element.addEventListener("ended", function(){
    // and then we tell it to update those two elements with the text we need.
    author.textContent = playlist.currentSong.author;
	title.textContent = playlist.currentSong.title;
}, false);

// But those won't update until *after* a song has played, so first we need to
// get the ball rolling:
playlist.play()

// then update those two variables for the first time.
author.textContent = playlist.currentSong.author;
title.textContent = playlist.currentSong.title;
