var npt = require('normalplaytime');

/**
 * Return parser instance
 * 
 * @param  DOMParser domparser DOMParser via dependency injection. 
 *         Via node, xmldom can be used. In the browser, the native DOMParser is available.
 *         
 * @return object with `parse` method
 */
var parser = function(domparser) {
    
    var parse = function(text) {

        var parser = new domparser();
        var xml    = parser.parseFromString(text, "text/xml");
        var chapterTags = xml.getElementsByTagName('Marker');

        var chapters = [];

        for (var i = 0; i < chapterTags.length; i++) {
            var tag = chapterTags[i];

            // skip markers that are not chapters
            if (!tag.getAttribute('Type') || tag.getAttribute('Type').toLowerCase() !== 'chapter') {
                continue;
            }

            var start = npt.parse(tag.getAttribute('Time'));
            var title = tag.getAttribute('Name');
            var href  = tag.getAttribute('URL');

            if (start !== null) {
                var chapter = {
                    start: start,
                    title: title.trim()
                };

                if (href) {
                    chapter.href = href.trim();
                }

                chapters.push(chapter);
            }
        }
        chapters.sort(function(chapterA, chapterB) {
           return chapterA.start - chapterB.start;
        });

        return chapters;

    };

    return {
        parse: parse
    }
}

module.exports = {
    parser: parser
};
