function replaceWithUzz(word) {
    const vowels = 'aeiouAEIOU';
    for (let i = word.length - 1; i >= 0; i--) {
        if (vowels.includes(word[i])) {
            return word.substring(0, i) + 'uzz';
        }
    }
    return word;
}

function translatePage() {
    const elements = document.body.getElementsByTagName('*');
    for (let element of elements) {
        for (let node of element.childNodes) {
            if (node.nodeType === 3) { // Text node
                const words = node.nodeValue.split(' ');
                const translatedWords = words.map(replaceWithUzz);
                node.nodeValue = translatedWords.join(' ');
            }
        }
    }
}

translatePage();