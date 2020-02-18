import { IDoom3Token, IDoom3Tokenizer, Doom3Factory, ETokenType } from "./src/doom3Tokenizer";

let str:string = `
    numMeshes 5
    /*
    * joints 关键字定义了骨骼动画的bindPose
    */

    joints {
        "origin" -1 ( 0 0 0 ) ( -0.5 -0.5 -0.5 )
        "Baby" 0 ( -12.1038131714 0 79.004776001 ) ( -0.5 -0.5 -0.5 )
        // origin
    }
`;
let tokenizer: IDoom3Tokenizer = Doom3Factory.createDoom3Tokenizer();
let token: IDoom3Token = tokenizer.createDoom3Token();
tokenizer.setSource(str);
while(tokenizer.getNextToken(token)) {
    if(token.type === ETokenType.NUMBER) {
        console.log('NUMBER:' + token.getFloat());
    } else if (token.isString("joints")) {
        console.log("开始解析joints数据");
    } else {
        console.log("STRING:" + token.getString());
    }
}