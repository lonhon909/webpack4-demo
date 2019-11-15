const babylon = require('@babel/parser');
let types = require('@babel/types');
let generate = require('@babel/generator').default;
let traverse = require('@babel/traverse').default;
const originalSource = `class Person{
    constructor(name){
        this.name = name;
    }
    getName(){
        return this.name
    }
}`;
// 将 当前模块 的内容转换成 AST
const ast = babylon.parse(originalSource);
// 遍历语法树，寻找要修改的目标节点
traverse(ast, {
    // 如果当前节点是一个 class 时
    ClassDeclaration: (nodePath) => {
        let node = nodePath.node;
        let bodys = node.body.body;
        let id = node.id;
        bodys = bodys.map(body => {
            if (body.kind === 'constructor') {
                return types.functionExpression(id, body.params, body.body)
            } else {
                let left = types.memberExpression(id, types.identifier('prototype'));
                left = types.memberExpression(left, body.key);
                let right = types.functionExpression(null, body.params, body.body);
                return types.assignmentExpression('=', left, right);
            }
        });
        nodePath.replaceWithMultiple(bodys);
    }
});
// 把转换后的抽象语法树重新生成代码
let {code} = generate(ast);
console.log('新的 code =>', code);