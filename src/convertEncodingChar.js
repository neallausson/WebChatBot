

const convertEncodingChar = (str) => {

    return str.replace(/'/g, "#8217;").replace(/,/g, '&#44');
};

export default convertEncodingChar