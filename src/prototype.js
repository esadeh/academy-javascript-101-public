"use strict";
function Animal(name){
    if(name){
        this.name = name;
    }
}

Animal.prototype.name = 'Default';

Animal.prototype.toString = function(){
    return this.name+' is '+this.type+ ' with '+this.legs+' legs that says "'+this.voice+'"';
}
Animal.prototype.speak = function(){
    return this.voice;
}

Animal.prototype.type = 'an animal';
Animal.prototype.legs = 100;
Animal.prototype.voice='Kukukuchoo';
function Mammal(name) {
    Animal.apply(this, arguments);
}

Mammal.prototype = new Animal();
Mammal.prototype.type = 'a mammal';

Mammal.prototype.legs = 4;





function Dog(name){
    Mammal.apply(this, arguments);

}

Dog.prototype = new Mammal();
Dog.prototype.type = 'a dog';
Dog.prototype.voice = 'Woof';