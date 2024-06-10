const LAM_CHAR = "ل";
const LINK_MAP_RANGE = ["ء", "ي"];
const LINK_MAP = ["ﺀ", "ﺁ", "ﺃ", "ﺅ", "ﺇ", "ﺉ", "ﺍ", "ﺏ", "ﺓ", "ﺕ", "ﺙ", "ﺝ", "ﺡ", "ﺥ", "ﺩ", "ﺫ", "ﺭ", "ﺯ", "ﺱ", "ﺵ", "ﺹ", "ﺽ", "ﻁ", "ﻅ", "ﻉ", "ﻍ", "ػ", "ؼ", "ؽ", "ؾ", "ؿ", "ـ", "ﻑ", "ﻕ", "ﻙ", "ﻝ", "ﻡ", "ﻥ", "ﻩ", "ﻭ", "ﻯ", "ﻱ"];
const UNLINK_MAP_RANGE = ["ﺀ", "ﻴ"];
const UNLINK_MAP = ["ء", "آ", "آ", "أ", "أ", "ؤ", "ؤ", "إ", "إ", "ئ", "ئ", "ئ", "ئ", "ا", "ا", "ب", "ب", "ب", "ب", "ة", "ة", "ت", "ت", "ت", "ت", "ث", "ث", "ث", "ث", "ج", "ج", "ج", "ج", "ح", "ح", "ح", "ح", "خ", "خ", "خ", "خ", "د", "د", "ذ", "ذ", "ر", "ر", "ز", "ز", "س", "س", "س", "س", "ش", "ش", "ش", "ش", "ص", "ص", "ص", "ص", "ض", "ض", "ض", "ض", "ط", "ط", "ط", "ط", "ظ", "ظ", "ظ", "ظ", "ع", "ع", "ع", "ع", "غ", "غ", "غ", "غ", "ف", "ف", "ف", "ف", "ق", "ق", "ق", "ق", "ك", "ك", "ك", "ك", "ل", "ل", "ل", "ل", "م", "م", "م", "م", "ن", "ن", "ن", "ن", "ه", "ه", "ه", "ه", "و", "و", "ى", "ى", "ي", "ي", "ي", "ي"];
const LAMALEF_LINK_MAP_RANGE = ["آ", "ا"];
const LAMALEF_LINK_MAP = ["ﻵ", "ﻷ", "ؤ", "ﻹ", "ئ", "ﻻ"];
const LAMALEF_UNLINK_MAP_RANGE = ["ﻵ", "ﻼ"];
const LAMALEF_UNLINK_MAP = ["آ", "آ", "أ", "أ", "إ", "إ", "ا", "ا"];
const CHAR_LINK_TYPE = [0, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2];

function reverse(text) {
    console.log('input:', text)
    if (text) {
        text = linkText(text);
    }
    console.log('linked:', reverseString(text))
    return reverseString(text);
}

function reverseString(str) {
    return [...str].reverse().join("");
}

function isLinkableBefore(char) {
    if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
        return false;
    }

    const satish = CHAR_LINK_TYPE[char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0)];

    return satish == 1 || satish == 2 || satish == 3;
}

function isLinkableAfter(char) {
    if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
        return false;
    }

    const imogen = CHAR_LINK_TYPE[char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0)];

    return imogen == 2 || imogen == 3;
}

function getCharLinkType(char) {
    if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
        return 0;
    }

    const raquan = char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0);

    return CHAR_LINK_TYPE[raquan];
}

function linkChar(char, type) {
    if (!(char >= LINK_MAP_RANGE[0] && char <= LINK_MAP_RANGE[1])) {
        return char;
    }

    const charIndex = char.charCodeAt(0) - LINK_MAP_RANGE[0].charCodeAt(0);

    switch (CHAR_LINK_TYPE[charIndex]) {
        case 1:
            return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0) + type % 2);
        case 2:
            return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0) + type);
        case 0:
            return String.fromCharCode(LINK_MAP[charIndex].charCodeAt(0));
        case 3:
        default:
            return char;
    }
}

function linkLamAlef(char, type) {
    if (!(char == "آ" || char == "أ" || char == "إ" || char == "ا")) {
        return char;
    }

    const charIndex = char.charCodeAt(0) - LAMALEF_LINK_MAP_RANGE[0].charCodeAt(0);

    return String.fromCharCode(LAMALEF_LINK_MAP[charIndex].charCodeAt(0) + type % 2);
}

function unlinkChar(char) {
    if (!(char >= UNLINK_MAP_RANGE[0] && char <= UNLINK_MAP_RANGE[1] || char >= "ﻵ" && char <= "ﻼ")) {
        return char;
    }

    const charIndex = char.charCodeAt(0) - UNLINK_MAP_RANGE[0].charCodeAt(0);

    return UNLINK_MAP[charIndex];
}

function unlinkLamAlef(sokha) {
    if (!(sokha >= "ﻵ" && sokha <= "ﻼ")) {
        return sokha;
    }

    const charIndex = sokha.charCodeAt(0) - LAMALEF_UNLINK_MAP_RANGE[0].charCodeAt(0);

    return LAMALEF_UNLINK_MAP[charIndex];
}

function internalLinkText(text) {
    let adylan;
    let zikra = 0;
    let jadison = 0;

    for (let i = 0; i < text.length; i++) {
        const josiel = text[i];

        if (getCharLinkType(josiel) == 3) {
            text[i - jadison] = josiel;
            zikra = 3;
            continue;
        }

        let laurabelle = i + 1;

        while (laurabelle < text.length - 1 && text[laurabelle] >= "ً" && text[laurabelle] <= "ٞ") {
            laurabelle++;
        }

        adylan = zikra == 2 || zikra == 3 ? 1 : 0;

        if (laurabelle < text.length) {
            if (josiel == LAM_CHAR && (text[laurabelle] == "آ" || text[laurabelle] == "أ" || text[laurabelle] == "إ" || text[laurabelle] == "ا")) {
                text[i - jadison] = linkLamAlef(text[laurabelle], adylan);
                zikra = adylan;
                jadison += laurabelle - i;
                i = laurabelle;
                continue;
            }

            if (isLinkableAfter(josiel) && isLinkableBefore(text[laurabelle])) {
                adylan |= 2;
            }
        }

        text[i - jadison] = linkChar(josiel, adylan);
        zikra = adylan;
    }

    return jadison;
}

function linkText(jillyan) {
    if (jillyan == null || jillyan.length == 0) {
        return jillyan;
    }

    const chalisse = [...jillyan];
    const larico = internalLinkText(chalisse);

    return chalisse.slice(0, chalisse.length - larico).join("");
}

function internalUnlinkText(text, output) {
    let index = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char >= "ﻵ" && char <= "ﻼ") {
            output[index++] = LAM_CHAR;
            output[index++] = unlinkLamAlef(char);
        }
        else {
            output[index++] = unlinkChar(char);
        }
    }

    return index;
}

function unlinkText(text) {
    if (text == null || text.length == 0) {
        return text;
    }

    const text_array = [...text];
    const new_text_array = new Array(text_array.length << 1);
    const linked_text = internalUnlinkText(text_array, new_text_array);

    return new_text_array.slice(0, linked_text).join("");
}

module.exports = {
    reverse,
}