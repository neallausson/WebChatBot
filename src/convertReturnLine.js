const convertReturnLine = (text) => {
    // Diviser la chaîne en fonction de "\n"
        const parts = text.split("U+A");
    
        // Tableau pour stocker chaque partie de la chaîne
        const result = [];
    
        // Parcourir chaque partie de la chaîne et ajouter au tableau résultant
        for (let part of parts) {
            result.push(part);
        }
    
        return result
}

export default convertReturnLine