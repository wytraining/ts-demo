// 父类：Animal
export class Animal {
    name: string;
    age: number;
    getColor: any;

    //构造函数
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    //自定义一个静态方法
    static friends(a1: any, a2: any) {
        return `${a1.name} and ${a2.name} are friends`
    }

    //自定义方法friends
    friends(a1: any, a2: any) {
        return `${a1.name} and ${a2.name} are friends`
    }

    //自定义方法getInfo
    getInfo(name: string, age: number) {
        // 创建实例时传入的参数
        // return this.name + ':' + this.age;

        // 调用此函数的时候传入的参数
        return name + ':' + age;
    }

}


// 子类：Fish
export class Fish extends Animal {
    color: string;

    //构造函数
    constructor(name: string, age: number, color: string) {
        //子类继承父类必须调用super
        //super关键字用于访问调用对象父类上的函数，可以调用父类的构造函数，也可以调用父类的普通函数
        super(name, age);
        this.color = color;
    }

}

Animal.prototype.getColor = function (color: string) {
    console.log(color);
};


// Animal：创建实例
export const dog = new Animal('dog_1',12);
export const cat = new Animal('cat_1',15);


// Fish：创建实例
export const fish = new Fish('fish_1', 26, 'yellow');

// 调用静态方法friends
Animal.friends(dog, cat);