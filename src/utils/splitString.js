const splitString = (string) => {
    const stringArray = [];
    const regex = /[\s\S]/gu;

    let match;

    while ((match = regex.exec(string)) !== null) {
        stringArray.push(match[0])
    }

    return stringArray;
}

export default splitString;