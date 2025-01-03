export function order(arreglo, type, direction) {
    let arrayAux = [...arreglo];
    let arrayToSend;
    switch (type) {
        case "profitsPercent":
            if (direction === "asc")
                arrayToSend = arrayAux.sort(function (a, b) {
                    if (a.profitsPercent > b.profitsPercent) return 1;
                    else if (a.profitsPercent < b.profitsPercent) return -1;
                    else return 0;
                });
            else
                arrayToSend = arrayAux.sort(function (b, a) {
                    if (a.profitsPercent > b.profitsPercent) return 1;
                    else if (a.profitsPercent < b.profitsPercent) return -1;
                    else return 0;
                });
            break;
        case "portfolioPercent":
            if (direction === "asc")
                arrayToSend = arrayAux.sort(function (a, b) {
                    if (a.portfolioPercent > b.portfolioPercent) return 1;
                    else if (a.portfolioPercent < b.portfolioPercent) return -1;
                    else return 0;
                });
            else
                arrayToSend = arrayAux.sort(function (b, a) {
                    if (a.portfolioPercent > b.portfolioPercent) return 1;
                    else if (a.portfolioPercent < b.portfolioPercent) return -1;
                    else return 0;
                });
            break;
        case "date":
            if (direction === "asc")
                arrayToSend = arrayAux.sort(function (a, b) {
                    if (a.date > b.date) return 1;
                    else if (a.date < b.date) return -1;
                    else return 0;
                });
            else
                arrayToSend = arrayAux.sort(function (b, a) {
                    if (a.date > b.date) return 1;
                    else if (a.date < b.date) return -1;
                    else return 0;
                });
            break;
        default:
            console.log("Error al ordernar...");
            arrayToSend = [...arreglo];
            break;
    }
    // console.log(arrayToSend);
    return arrayToSend;
}
