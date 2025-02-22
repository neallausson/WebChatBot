const convertToJSONString = (str) => {
    // Remplacer les guillemets simples par des guillemets doubles
    let converted = str.replace(/'/g, '"');
  
    // Remplacer les valeurs Decimal('...') par des nombres simples
    converted = converted.replace(/Decimal\(['"](\d+\.?\d*)['"]\)/g, "$1");
    converted = converted.replaceAll("True", "true");
    converted = converted.replaceAll("False", "false");
    converted = converted.replaceAll(/#8217;/g, "'");
    converted = converted.replaceAll(/&#44/g, ",");
  
    return converted;
};

export default convertToJSONString