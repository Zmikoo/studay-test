
export enum ETokenType {
    NONE,
    STRING,
    NUMBER
}

export interface IDoom3Token{
    reset():void;
    readonly type:ETokenType;
    getString():string;
    getFloat():number;
    getInt():number;
    isString(str:string):boolean;
}

export interface IDoom3Tokenizer{
    setSource(source:string):void;
    reset():void;
    getNextToken(token:IDoom3Token):boolean;
}

class Doom3Token implements IDoom3Token {
    private _type!: ETokenType;// (!使该变量可以延迟初始化赋值，如果没有!,则TypeScript必须只能1.在成员声明时就赋值， 2.在contrustor中赋值 )
    private _charArr:string[] = [];
    private _val!:number;
    public constructor(){
        // this._charArr.length = 0;
        // this._type = ETokenType.NONE;
        // this._val = 0.0;

        this.reset();
    }

    public reset():void{
        this._charArr.length = 0;
        this._type = ETokenType.NONE;
        this._val = 0.0;
    }

    public get type():ETokenType{
        return this._type;
    }

    // 获取当前token的字符串值
    public getString():string{
        return this._charArr.join('');
    }

    // 获取当前Token的浮点数值
    public getFloat():number{
        return this._val;
    }

    // 获取当前token的int类型值
    public getInt():number{
        return parseInt(this._val.toString(),10);
    }

    public isString(str:string):boolean {
        let count:number = this._charArr.length;
        if (str.length !== count) {
            return false;
        }

        for (let i:number = 0; i < count; i++) {
            if (this._charArr[i] !== str[i]) {
                return false;
            }
        }

        return true;
    }
    
    public addChar(c:string):void {
        this._charArr.push(c);
    }

    // 设置数字，并将类性设置为number
    public setVal(num: number) : void {
        this._val = num;
        this._type = ETokenType.NUMBER;
    }

    public setType(type:ETokenType):void {
        this._type = type;
    }
}

class Doom3Tokenizer implements IDoom3Tokenizer{
    private _digits: string[] = ['0','1','2','3','4','5','6','7','8','9'];
    private _whiteSpaces: string[] = [' ','\t','\v','\n'];
    private _source: string = 'Doom3Tokenizer';
    private _currIdx: number = 0;
    public setSource (source : string) : void {
        this._source = source;
        this._currIdx = 0;
    }

    public reset () : void {
        this._currIdx = 0;
    }

    // 判断某个字符是不是数字
    private _isDigit (c:string):boolean {
        for (let i : number = 0; i < this._digits.length; i++) {
            if (c === this._digits[i]) {
                return true;
            }
        }
        return false;
    }

    // 判断某个字符是不是空白符
    private _isWhitespace (c:string) : boolean {
        for (let i:number = 0; i < this._isWhitespace.length; i++) {
            if (c === this._whiteSpaces[i]) {
                return true;
            }
        }
        return false;
    }

    // 获取当前的索引指向的char，并且将索引加1，后移一位
    private _getChar () : string {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source.charAt(this._currIdx++); // 后加加 返回当前的索引，并将索引加1；
        }
        return "";
    }

    private _peerChar () : string {
        if (this._currIdx >= 0 && this._currIdx < this._source.length) {
            return this._source.charAt(this._currIdx)                                                                 ;
        }
        return "";
    }

    private _ungetChar () : void {
        // 将索引前移1位
        if (this._currIdx > 0) {
            --this._currIdx
        }
    }

    public getNextToken (tok:IDoom3Token) : boolean {
        // 使用as关键字将IDoom3Token向下转型为Doom
        let token : Doom3Token = tok as Doom3Token;
        // 初始化为空字符串
        let c : string = "";
        // 重用Token,每次调用reset()函数时，将Token的索引重置为0
        // 避免发生内存重新分配
        token.reset();
        do {
            c = this._skipWhitespace();
            if (c === '/' && this._peekChar() === '/') {
                c = this._skipComments0();
            } else if (c === '/' && this._peerChar() === '*') {
                c = this._skipComments1();
            } else if (this._isDigit(c) || c === '-' || (c === '.' && this._isDigit(this._peekChar()))) {
                this._ungetChar();
                this._getNumber(token);
                return true;
            } else if (c === '\"' || c === '\'') {
                this._getSubstring(token,c);
                return true;
            } else if (c.length > 0) {
                this._ungetChar();
                this._getString(token);
                return true;
            }
        } while (c.length > 0);
        return false;
    }
}