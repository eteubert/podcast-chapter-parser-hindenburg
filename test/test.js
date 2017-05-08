var DOMParser = require('xmldom').DOMParser;
var assert = require("assert");
var hindenburg = require('../index.js').parser(DOMParser);

const wrap = function(xml) {
	return `<?xml version="1.0" encoding="utf-8"?>
<Session Version="Hindenburg Journalist 1.15.1769" Samplerate="48000">
  <AudioPool Path="Hindenburg Test Files" Location="/Users/example/Mobile Studio/Recordings Mobile Studio/Test/Hindenburg">
	<File Id="1" Name="Track 2 1.wav" Duration="29.654" Channels="2" Leq="-36.7" Dyn="2.58"/>
	<File Id="2" Name="Track 2 2.wav" Duration="52.182" Channels="2" Leq="-68.0"/>
  </AudioPool>
  <Tracks>
	<Track Name="Track 1"/>
	<Track Name="Track 2" Rec="1" Mute="1">
	  <Region Ref="1" Name="Track 2 1" Length="09.406" Offset="00.145"/>
	  <Region Ref="2" Name="Track 2 2" Start="09.406" Length="51.928" Offset="00.145"/>
	</Track>
	<Track Name="Track 3"/>
	<Track Name="Track 4"/>
  </Tracks>
  <Clipboard>
	<Group Caption="Group 1"/>
	<Group Caption="Group 2"/>
	<Group Caption="Group 3"/>
	<Group Caption="Group 4"/>
  </Clipboard>
  <Markers>
	` + xml + `
  </Markers>
</Session>`;
}

describe('hindenburg', function() {
	describe('#parse()', function() {

	    it('should return empty list for no chapters', function() {
	    	assert.deepEqual([], hindenburg.parse(wrap('<Marker Id="1" Name="Marker 1" Time="21.200" Type="NotAChapter"/>')));
	    });

		it('should return json with start, title and href', function() {
			assert.deepEqual([{ start: 1200, title: "Intro", href: "http://example.com" }], hindenburg.parse(wrap('<Marker Id="1" Name="Intro" Time="1.200" Type="Chapter" URL="http://example.com"/>')));
		});

		it('should read multiple chapters', function() {
			assert.deepEqual([
				{ start: 1200, title: "Intro" },
				{ start: 2400, title: "Second" }
			], hindenburg.parse(wrap('<Marker Id="1" Name="Intro" Time="1.200" Type="Chapter"/><Marker Id="2" Name="Second" Time="2.400" Type="Chapter"/>')));
		});

        it('should handle markers without type', function () {
            assert.deepEqual([
                { start: 19600, title: "Marker 4" },
                { start: 44200, title: "Marker 5" }
            ], hindenburg.parse(wrap('<Marker Id="3" Name="Marker 3" Time="40.400"/><Marker Id="4" Name="Marker 4" Time="19.600" Type="Chapter"/><Marker Id="5" Name="Marker 5" Time="44.200" Type="Chapter"/>')));
        })

	});
});
