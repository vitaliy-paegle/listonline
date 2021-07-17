const ID = {
    generateID: function(){
        const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        const numbers = [0,1,2,3,4,5,6,7,8,9];
        function key (arrayKeys) {
            return arrayKeys[Math.floor(Math.random() * arrayKeys.length)]
        }
        return  `${key(numbers)}${key(numbers)}${key(numbers)}${key(letters)}${key(letters)}${key(letters)}${key(numbers)}${key(numbers)}${key(numbers)}${key(letters)}${key(letters)}${key(letters)}`
    },
    generateEmailCode: function(){        
        const numbers = [0,1,2,3,4,5,6,7,8,9];
        function key (arrayKeys) {
            return arrayKeys[Math.floor(Math.random() * arrayKeys.length)]
        }
        return  `${key(numbers)}${key(numbers)}${key(numbers)}`
    }
}
module.exports = ID;