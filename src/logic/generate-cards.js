
// генерируем все возможные названия карточек
module.exports.getAllCardNames = () => {
    let names = [];
    ['0', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'J', 'K', 'Q'].forEach((left) => {
        ['C', 'D', 'H', 'S'].forEach((right) => {
            names.push(left + right);
        });
    });
    return names;
};
