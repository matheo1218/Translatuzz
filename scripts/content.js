function replaceWithUzz(word) {
    const vowels = 'aeiouAEIOU';
    let hasVowel = false;
    for (let i = word.length - 1; i >= 0; i--) {
        if (vowels.includes(word[i])) {
            hasVowel = true;
            return word.substring(0, i) + 'uzz';
        }
    }
    if (!hasVowel) { 
        return word + 'uzz';
    }
    return word;
}

function translatePage() {
    const elements = document.body.getElementsByTagName('p'); //Må nesten bare "whiteliste" hvilke elementer som skal bli oversatt, hvis ikke blir allt knulla
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