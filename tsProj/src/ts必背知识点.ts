// 数组
// Array<数据类型>  元素全为num类型的数组
let arr: Array<number> = [1, 2, 3, 4];
// 数据类型[]  （同上）元素全为num类型的数组
let arr1: number[] = [1, 2, 3, 4]; // 可赋值为任意数组
// 元组（Tuple） 已知数组元素数据类型和元素总数量的数据类型
let arr2: [number, string] = [1, 'a'];
// let arr3: [number, string] = []; // 赋值为空数组会报错
// arr2[0] = 'a'; // 报错；必须赋值为数字类型
// arr2[0] = 1000; 

// any 表示任意类型 在对现有代码进行改写的时候，any类型是十分有用的，它允许你在编译时可选择地包含或移除类型检查。
let somevar: any = 10;
// enum: 枚举类型,默认情况下从0开始为元素编号，你也可以手动的指定成员的数值。
enum Gender{
    male = 1,
    female = 0,
    unknow = -1
}
let gender: Gender = Gender.male;
// 类型断言  好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 
let stri: any = "abc";
let len: number = (<string>stri).length;
// 类型断言写法二 两种形式是等价的
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;


//函数类型的接口
interface SumInterFace{
    (a: number, b: number): number
}
let sum: SumInterFace = function (a: number, b: number) {
    return a + b;
}


//类类型的接口
interface PersonInterFace{
    name: string,
    age: number,
    eat():void
}
class XiaoMing implements PersonInterFace{
    name: string = "小明";
    age: number = 18;

    eat() {
        
    }
}

// 接口继承接口
interface TwoDPoint{
    x: number,
    y: number
}
interface ThreeDPoint{
    z: number
}
interface FourDPoint extends ThreeDPoint, TwoDPoint{
    time: Date
}


// 类的声明
class Person{
    // 和ES6不同的是，TS中属性必须声明，需要指定类型
    familyAddress: string
    // 声明好属性之后，属性必须赋值一个默认值或者在构造函数中进行初始化
    age: number
    constructor(familyAddress: string, age: number) {
        this.familyAddress = familyAddress;
        this.age = age;
    }
    sayHello(msg: string): void {
        console.log(msg);
    }

    // 属性的存取器
    get FamilyAddress(): string{
        return this.familyAddress;
    }
    set FamilyAddress(value: string) {
        // 设置器中可以添加相关的校验逻辑
        if (value.length < 2 || value.length > 5) {
            throw new Error("名字不合法，不许使用！")
        }
        this.familyAddress = value;
    }
}


//类的继承
class Animal{
    age: number
    constructor(age: number) {
        this.age = age;
    }

    eat() {
        console.log("吃个大鸡腿儿")
    }
}
class Dog extends Animal{
    type: string
    constructor(type: string, age: number) {
        super(age);
        this.type = type;
    }

    // 子类中如果出现了和父类同名的方法，则会进行覆盖
    // 也就是调用的时候，调用的就是子类中的方法了！
    eat() {
        console.log('狗对象中的eat方法')
    }
}

// 访问修饰符：
// 指的就是可以在类的成员前通过添加关键字来设置当前成员的访问权限
// public: 公开的，默认   所有人都可以进行访问
// private： 私有的， 只能在当前类中进行访问
// protected： 受保护的，这能在当前类或者子类中进行访问
enum Color{
    red,
    yellow,
    blue
}
class Car{
    // 如果不加访问修饰符 则当前成员默认是公开的 所有人都可以访问的
    public color: Color
    constructor() {
        this.color = Color.red;
        // this.run();
        // this.loadPeople();
    }
    // 加了private之后，当前成员就只能在当前类中使用了！
    private run() {
        
    }
    // 加了protected之后，当前成员就只能在当前类或者子类中使用了！
    protected loadPeople() {
        
    }
}

