function replaceWithUzz(word) {
    const vowels = 'aeiouyæøå';
    let hasVowel = false;
    for (let i = word.length - 1; i >= 0; i--) {
        if (vowels.includes(word[i].toLowerCase())) {
            hasVowel = true;
            return word.substring(0, i) + 'uzz';
        }
    }
    if (!hasVowel) { 
        return word + 'uzz';
    }
    return word;
}

function translateTextNodes(element) {
    for (let node of element.childNodes) {
        if (node.nodeType === 3 && node.nodeValue.trim() !== '') { // Text node and not empty
            const words = node.nodeValue.split(' ');
            const translatedWords = words.map(replaceWithUzz);
            node.nodeValue = translatedWords.join(' ');
        } else if (node.nodeType === 1) { // Element node
            translateTextNodes(node); // Recursively translate text nodes in child elements
        }
    }
}

function translatePage() {
    const elements = document.body.getElementsByTagName('*');
    for (let element of elements) {
        translateTextNodes(element);
    }
}

// Initial translation
translatePage();

// Use MutationObserver to watch for dynamically added content
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Delay processing to ensure content is fully loaded
                    setTimeout(() => {
                        translateTextNodes(node);
                        const descendants = node.getElementsByTagName('*');
                        for (let descendant of descendants) {
                            translateTextNodes(descendant);
                        }
                    }, 500);
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });
